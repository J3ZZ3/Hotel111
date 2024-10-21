import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const AddRoom = ({ setIsAdding }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleAddRoom = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "rooms"), {
        name,
        description,
        price,
      });
      alert("Room added successfully!");
      setIsAdding(false);
    } catch (err) {
      alert("Error adding room: " + err.message);
    }
  };

  return (
    <div>
      <h1>Add New Room</h1>
      <form onSubmit={handleAddRoom}>
        <input
          type="text"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoom;