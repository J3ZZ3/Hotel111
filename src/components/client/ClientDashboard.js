// src/components/client/ClientDashboard.js

import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomList from "../admin/RoomList"; // Reusing the admin RoomList component
import { Link } from "react-router-dom"; // Import Link for navigation
import "./ClientDashboard.css"; // Optional: Import CSS for styling

const ClientDashboard = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "rooms"));
        const roomsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="client-dashboard">
      <h1>Client Dashboard</h1>
      <div className="dashboard-header">
        <Link to="/booking-history" className="view-history-button">View Booking History</Link>
        <Link to="/booking-status/:roomId" className="view-user-bookings">My Bookings</Link>
      </div>
      <RoomList rooms={rooms} />
    </div>
  );
};

export default ClientDashboard;