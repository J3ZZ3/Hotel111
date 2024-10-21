import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RoomList from "./RoomList";

const ClientDashboard = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomsData = querySnapshot.docs.map(doc => doc.data());
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Client Dashboard</h1>
      <RoomList rooms={rooms} />
    </div>
  );
};

export default ClientDashboard;