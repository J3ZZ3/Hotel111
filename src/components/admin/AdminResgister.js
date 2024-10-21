import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Firestore import
import Swal from "sweetalert2";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretCode, setSecretCode] = useState(""); // New state for the secret code
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Predefined secret code for admin registration
  const predefinedSecretCode = "adminSecretCode123";

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Check if the entered secret code is correct
      if (secretCode !== predefinedSecretCode) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid admin code. Please try again.",
        });
      }

      // Step 2: Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Step 3: Get the created user and add the `isAdmin` field to Firestore
      const user = userCredential.user;
      const userDocRef = doc(db, "admins", user.uid); // Firestore reference for the admin user

      // Step 4: Set `isAdmin` field to true in Firestore
      await setDoc(userDocRef, {
        email: email,
        password: password,
        isAdmin: true, // Set isAdmin to true for the registered admin
      });

      // Step 5: Show success message
      setSuccess("");
      setEmail("");
      setPassword("");
      setSecretCode(""); // Clear secret code input

      // Redirect to the admin login page
      setTimeout(() => {
        navigate("/admin-login");
      }, 3000);
    } catch (err) {
      setError(err.message); // Show error message if registration fails
    }
  };

  return (
    <div>
      <h1>Register as Admin</h1>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Admin Code"
          value={secretCode}
          onChange={(e) => setSecretCode(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default AdminRegister;
