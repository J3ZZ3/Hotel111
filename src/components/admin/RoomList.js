import React from "react";
import { Link } from "react-router-dom";

const RoomList = ({ rooms }) => {
  return (
    <div>
      <h2>Available Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <h3>{room.name}</h3>
              <img src={room.imageUrl} alt={room.name} className="room-image" width={500} />
              <p>{room.description}</p>
              <p>Price: ${room.price}</p>
              <p>Status: {room.isBooked ? "Booked" : "Available"}</p>
              {!room.isBooked && (
                <Link to={`/book-room/${room.id}`} state={{ room }}>
                  <button>Book Now</button>
                </Link>
              )}
              {room.isBooked && <p>This room is currently booked.</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomList;
