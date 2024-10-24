
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          const q = query(collection(db, "bookings"), where("userId", "==", userId));
          const querySnapshot = await getDocs(q);

          const bookingsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setBookings(bookingsData);
        } else {
          setError("No logged-in user found.");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p>Loading booking history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="booking-history-container">
        <Link to='/client-dashboard'>
            <button>Back</button>
        </Link>
      <h2>Your Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.roomName}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>{booking.status}</td>
                <td>{booking.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingHistory;