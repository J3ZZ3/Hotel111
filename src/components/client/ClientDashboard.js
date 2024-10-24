// src/components/client/ClientDashboard.js

import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomList from "../admin/RoomList";
import { Link } from "react-router-dom"; // Import Link for navigation

const ClientDashboard = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomsData = querySnapshot.docs.map((doc) => doc.data());
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Client Dashboard</h1>
      <Link to="/payment-history">View Payment History</Link> {/* Link to Payment History */}
      <RoomList rooms={rooms} />
    </div>
  );
};

export default ClientDashboard;
