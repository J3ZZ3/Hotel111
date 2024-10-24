import React, { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const Payment = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const paypalRef = useRef();

  const handlePaymentSuccess = async () => {
    try {
      const bookingRef = doc(db, "bookings", roomId);
      await updateDoc(bookingRef, { status: "Paid" });

      navigate(`/booking-status/${roomId}`);
    } catch (error) {
      console.error("Error updating booking status: ", error);
      alert("An error occurred while updating the booking status.");
    }
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `Booking for Room ID: ${roomId}`,
                amount: {
                  currency_code: "GBP", 
                  value: 300.00, 
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Order captured successfully", order);
          alert("Payment successful. Thank you for booking with us.");

          handlePaymentSuccess();
        },
        onError: (err) => {
          console.log("Payment error:", err);
        },
      })
      .render(paypalRef.current);
  }, [roomId]); 

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Room ID: {roomId}</p>
      <div ref={paypalRef}></div>
    </div>
  );
};

export default Payment;