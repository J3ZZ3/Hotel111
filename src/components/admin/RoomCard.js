import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import EditRoom from "./EditRoom";

const RoomCard = ({ room }) => {
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="room-card">
      {isEditing ? (
        <EditRoom room={room} setIsEditing={setIsEditing} />
      ) : (
        <>
        <div className="room-details">
            <h3>• {room.name}</h3>
            <img src={room.imageUrl} alt={room.name} className="room-image" width={500} />
            <p>{room.description}</p>
            <p>Room Type: {room.roomType}</p>
              <p>Amenities: {room.amenities}</p>
              <p>Capacity: {room.capacity}</p>
            <p>Price: R{room.price}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDeleteRoom}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomCard;