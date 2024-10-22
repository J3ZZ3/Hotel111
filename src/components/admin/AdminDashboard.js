import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddRoom from "./AddRoom";
import RoomList from "./AdminRoomList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const AdminDashboard = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [rooms, setRooms] = useState([]);

  // Fetch rooms from Firestore
  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setIsAdding(true)}>Add Room</button>
      <Link to="/add-admin">
        <button>Add Admin</button>
      </Link>

      {isAdding && <AddRoom setIsAdding={setIsAdding} />}

      <RoomList rooms={rooms} />
    </div>
  );
};

export default AdminDashboard;