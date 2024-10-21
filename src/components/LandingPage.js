import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Hotel Booking App</h1>
      <p>Choose your login type:</p>
      <div>
        <Link to="/client-login">
          <button style={{ margin: "10px", padding: "10px" }}>Client Login</button>
        </Link>
        <Link to="/admin-login">
          <button style={{ margin: "10px", padding: "10px" }}>Admin Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;