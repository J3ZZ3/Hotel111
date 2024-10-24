// src/components/client/PayNow.js

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc , setDoc } from "firebase/firestore";

const PayNow = () => {
  const { roomId } = useParams();

  useEffect(() => {
    // Load the PayPal SDK
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=NY3U3CQ28MZQJ"; // Replace with your Sandbox Client ID
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: async (data, actions) => {
          // Call your server to set up the transaction
          const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId }), // Send room ID for tracking
          });
          const order = await response.json();
          return order.id; // Return the order ID
        },
        onApprove: async (data, actions) => {
          // Call your server to capture the transaction
          const response = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          const details = await response.json();
          alert("Transaction completed by " + details.payer.name.given_name);
          // Update booking status in Firestore
          await updateBookingStatus(roomId);
        },
        onError: (err) => {
          console.error("PayPal Checkout onError", err);
        },
      }).render("#paypal-button-container");
    };

    document.body.appendChild(script);
  }, [roomId]);

  const updateBookingStatus = async (roomId) => {
    // Update Firestore booking status to "Paid"
    await setDoc(doc(db, "bookings", roomId), {
      status: "Paid",
      paymentDate: new Date().toISOString(),
    });
  };

  return <div id="paypal-button-container"></div>;
};

export default PayNow;
