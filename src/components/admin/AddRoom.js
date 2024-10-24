import React, { useState } from "react";
import { db, storage } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

const AddRoom = ({ setIsAdding }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");

  const handleAddRoom = async (e) => {
    e.preventDefault();

    if (!name || !description || !amenities || !price || !roomType || !imageFile) {
      setError("Please fill out all fields and upload an image.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required, and an image must be uploaded.",
      });
      return;
    }

    try {
      const imageRef = ref(storage, `rooms/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);

      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "rooms"), {
        name,
        description,
        amenities,
        price: parseFloat(price),
        roomType,
        imageUrl,
      });

      Swal.fire({
        icon: "success",
        title: "Room Added",
        text: "The room has been added successfully.",
      });

      setIsAdding(false);
    } catch (err) {
      console.error("Error adding room: ", err);
      setError("Failed to add room. Please try again.");
    }
  };

  return (
    <div className="add-room-container">
      <h2>Add a New Room</h2>
      <form onSubmit={handleAddRoom}>
        <input
          type="text"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Room Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          placeholder="Room Amenities"
          value={amenities}
          onChange={(e) => setAmenities(e.target.value)}
        />
        <input
          type="number"
          placeholder="Room Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
          <option value="">Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="King">King</option>
          <option value="Suite">Suite</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit">Add Room</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddRoom;