
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc , setDoc } from "firebase/firestore";

const PayNow = () => {
  const { roomId } = useParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AWUsGXF7f8N694qvZd2XgY2yPGdc874dAh72jR4ryPuX4c6BeINgx2ZdPIbCkpjxeE61Z1FPUPeWyGjA";
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        createOrder: async (data, actions) => {
          const response = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId }),
          });
          const order = await response.json();
          return order.id;
        },
        onApprove: async (data, actions) => {
          const response = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          const details = await response.json();
          alert("Transaction completed by " + details.payer.name.given_name);
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
    await setDoc(doc(db, "bookings", roomId), {
      status: "Paid",
      paymentDate: new Date().toISOString(),
    });
  };

  return <div id="paypal-button-container"></div>;
};

export default PayNow;
