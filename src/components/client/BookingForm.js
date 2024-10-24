import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { Link } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const { room } = location.state || {};
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    contactNumber: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Booking details:', formData);
  };

  if (!room) {
    return <p>No room data available.</p>;
  }

  return (
    <div>
      <h3>Booking Form for {room.name}</h3>
      <p><strong>Description:</strong> {room.description}</p>
      <p><strong>Price:</strong> ${room.price}</p>
      <p><strong>Status:</strong> {room.isBooked ? 'Booked' : 'Available'}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Contact Number:
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Check-In Date:
            <input
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Check-Out Date:
            <input
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        
      </form>

      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: room.price.toString(), 
              },
            }],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          console.log('Transaction completed by ' + details.payer.name.given_name);
          alert('Payment Successfull');
        }}
        onError={(err) => {
          console.error('Payment error:', err);
          alert('Payment failed');
        }}
      />
      <Link to="/client-dashboard">
      <button type="submit">Complete Booking</button>
      </Link>
    </div>
  );
};

export default BookingForm;
