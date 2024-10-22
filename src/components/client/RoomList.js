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
          {rooms.map((room, index) => (
            <li key={index}>
              <h3>{room.name}</h3>
              <img src={room.imageUrl} alt={room.name} className="room-image" width={500} />
              <p>{room.description}</p>
              <p>Room Type: {room.roomType}</p>
              <p>Amenities: {room.amenities}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Price: R{room.price}</p>
              <Link to={`/book-room/${room.id}`}>Book Room</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomList;