import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddRoom from "./AddRoom";
import RoomList from "./AdminRoomList";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const AdminDashboard = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);

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

    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsData);
    };

    fetchRooms();
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    const bookingRef = doc(db, "bookings", bookingId);
    await updateDoc(bookingRef, { status: newStatus });
    alert(`Booking has been ${newStatus}`);
    // Optionally refresh the bookings list or update the state
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setIsAdding(true)}>Add Room</button>
      <Link to="/add-admin">
        <button>Add Admin</button>
      </Link>

      {isAdding && <AddRoom setIsAdding={setIsAdding} />}

      <h2>Rooms</h2>
      <RoomList rooms={rooms} />

      <h2>Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>User ID: {booking.userId}</p>
          <p>Room ID: {booking.roomId}</p>
          <p>Status: {booking.status}</p>
          <button onClick={() => handleUpdateStatus(booking.id, "approved")}>Approve</button>
          <button onClick={() => handleUpdateStatus(booking.id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
