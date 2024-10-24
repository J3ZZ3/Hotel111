// src/components/client/BookRoom.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const BookRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    id: "",
    contact: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      const roomDoc = await getDoc(doc(db, "rooms", roomId));
      if (roomDoc.exists()) {
        setRoom(roomDoc.data());
      } else {
        console.log("Room not found");
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new booking document in Firestore
    await setDoc(doc(db, "bookings", roomId), {
      ...formData,
      roomId: roomId,
      roomName: room.name,
      status: "Pending", // Initial status
    });

    // Redirect to payment page or confirmation
    navigate(`/payment/${roomId}`);
  };

  if (!room) return <p>Loading room information...</p>;

  return (
    <div>
      <h2>Booking Form for {room.name}</h2>
      <p>{room.description}</p>
      <p>Price: ${room.price}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" required onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" required onChange={handleChange} />
        </div>
        <div>
          <label>ID:</label>
          <input type="text" name="id" required onChange={handleChange} />
        </div>
        <div>
          <label>Contact Number:</label>
          <input type="text" name="contact" required onChange={handleChange} />
        </div>
        <div>
          <label>Check-In Date:</label>
          <input type="date" name="checkInDate" required onChange={handleChange} />
        </div>
        <div>
          <label>Check-Out Date:</label>
          <input type="date" name="checkOutDate" required onChange={handleChange} />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookRoom;
