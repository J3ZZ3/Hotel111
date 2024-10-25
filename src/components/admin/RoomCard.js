
import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import EditRoom from "./EditRoom";
import "./AdminStyles/RoomCard.css";

const RoomCard = ({ room }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [averageRating, setAverageRating] = useState(null); // State to store average rating

  const fetchAverageRating = async () => {
    try {
      const ratingsRef = collection(db, "ratings");
      const q = query(ratingsRef, where("roomId", "==", room.id));
      const querySnapshot = await getDocs(q);

      const ratings = querySnapshot.docs.map(doc => doc.data().rating);
      if (ratings.length > 0) {
        const total = ratings.reduce((acc, rating) => acc + rating, 0);
        setAverageRating((total / ratings.length).toFixed(1));
      } else {
        setAverageRating("No ratings yet");
      }
    } catch (error) {
      console.error("Error fetching ratings: ", error);
      setAverageRating("Error loading ratings");
    }
  };

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const handleDeleteRoom = async () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteDoc(doc(db, "rooms", room.id));
        alert("Room deleted successfully.");
      } catch (error) {
        console.error("Error deleting room: ", error);
      }
    }
  };

  return (
    <div className="room-card-rc">
      {isEditing ? (
        <EditRoom room={room} setIsEditing={setIsEditing} />
      ) : (
        <>
          <div className="room-details">
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Room Type: {room.roomType}</p>
            <p>Amenities: {room.amenities}</p>
            <p>Price: ${room.price}</p>
            <p>Average Rating: {averageRating}</p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-button" onClick={handleDeleteRoom}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomCard;