// src/components/client/BookingStatus.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const BookingStatus = () => {
  const { roomId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBookingStatus = async () => {
      const bookingDoc = await getDoc(doc(db, "bookings", roomId));
      if (bookingDoc.exists()) {
        setBooking(bookingDoc.data());
      }
    };

    fetchBookingStatus();
  }, [roomId]);

  if (!booking) return <p>Loading booking status...</p>;

  return (
    <div>
      <h2>Booking Status for {booking.roomName}</h2>
      <p>Status: {booking.status}</p>
      {booking.status === "Paid" && <p>Your payment was successful!</p>}
      {booking.status === "Pending" && <p>Your booking is pending approval.</p>}
      {/* Add more status messages as needed */}
    </div>
  );
};

export default BookingStatus;
