import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../firebase/firebaseConfig";

const Booking = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const roomDoc = doc(db, "rooms", roomId);
      const roomData = await getDoc(roomDoc);
      setRoom(roomData.data());
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleBooking = async () => {
    if (!auth.currentUser) {
      alert("Please log in to book a room.");
      return;
    }

    const roomDoc = doc(db, "rooms", roomId);
    await updateDoc(roomDoc, {
      bookedBy: auth.currentUser.uid,
    });

    setIsBooked(true);
    alert("Room booked successfully!");
  };

  if (!room) {
    return <p>Loading room details...</p>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <p>Price: ${room.price}</p>
      <button onClick={handleBooking} disabled={isBooked}>
        {isBooked ? "Room Booked" : "Book Room"}
      </button>
    </div>
  );
};

export default Booking;