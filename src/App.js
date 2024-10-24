import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./components/LandingPage";
import ClientLogin from "./components/client/ClientLogin";
import ClientRegister from "./components/client/ClientRegister";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminResgister";
import AddAdmin from "./components/admin/AddAdmin";
import ClientDashboard from "./components/client/ClientDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import PayNow from "./components/client/PayNow";
import BookingStatus from "./components/client/BookingStatus";
import BookingForm from "./components/client/BookingForm";
import Payment from "./components/client/Payment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import RoomList from "./components/admin/RoomList";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/client-register" element={<ClientRegister />} />
          <Route path="/client-login" element={<ClientLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/pay-now" element={<PayNow />} />
          <Route path="/booking-status/:roomId" element={<BookingStatus />} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/book-room/:roomId" element={<BookingForm />} />
          <Route path="/payment/:roomId" element={<Payment />} />
          <Route path="/" element={<RoomList />} />
          <Route path="/book-room/:id" element={<BookingForm />} />
        </Routes>
      </PayPalScriptProvider>
    </Router>
  );
}

export default App;
