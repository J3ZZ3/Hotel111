import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddRoom from "./AddRoom";

const AdminDashboard = () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setIsAdding(true)}>Add Room</button>
      <Link to="/add-admin">
        <button>Add Admin</button>
      </Link>

      {isAdding && <AddRoom setIsAdding={setIsAdding} />}
    </div>
  );
};

export default AdminDashboard;