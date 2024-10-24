// src/components/client/Payment.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Payment = () => {
  const { roomId } = useParams(); // Get roomId from the URL
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    try {
      // Update the booking status to "Paid"
      const bookingRef = doc(db, "bookings", roomId);
      await updateDoc(bookingRef, { status: "Paid" });

      // Redirect to booking status page
      navigate(`/booking-status/${roomId}`);
    } catch (error) {
      console.error("Error updating booking status: ", error);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Room ID: {roomId}</p>
      {/* Implement PayPal payment logic here */}
      <button onClick={handlePaymentSuccess}>Pay Now</button>
    </div>
  );
};

export default Payment;
