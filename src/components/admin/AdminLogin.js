import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig"; // Firestore import

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Step 2: Check if the user is an admin by fetching their document from Firestore
      const user = userCredential.user;
      const docRef = doc(db, "admins", user.uid); // Reference to the Firestore admin document
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        // Step 3: Check if user has isAdmin set to true
        const userData = docSnap.data();
        if (userData.isAdmin) {
          // Proceed to the admin dashboard if the user is an admin
          navigate("/admin-dashboard");
        } else {
          setError("Access denied. You are not an admin.");
        }
      } else {
        setError("Admin not found.");
      }
    } catch (err) {
      setError("Invalid credentials or error. Please try again.");
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>Don't have an account? <a href="/admin-register">Register</a></p>
    </div>
  );
};

export default AdminLogin;