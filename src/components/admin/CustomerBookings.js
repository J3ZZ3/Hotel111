import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const CustomerBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch rooms from Firestore
  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      const roomsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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

      {bookings.map((booking) => (
        <div key={booking.id}>
          <p>User ID: {booking.userId}</p>
          <p>User Name: {booking.fullName}</p>
          <p>Room Name: {booking.roomName}</p>
          <p>Contact Number: {booking.contactNumber}</p>
          <p>Address: {booking.address}</p>
          <p>Room ID: {booking.roomId}</p>
        <p>Check In: {booking.checkInDate}</p>
        <p>Check Out: {booking.checkOutDate}</p>
          <p>Status: {booking.status}</p>
          <button onClick={() => handleUpdateStatus(booking.id, "approved")}>Approve</button>
          <button onClick={() => handleUpdateStatus(booking.id, "rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default CustomerBookings;
