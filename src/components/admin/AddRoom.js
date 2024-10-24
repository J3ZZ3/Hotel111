import React, { useState } from "react";
import { db, storage } from "../../firebase/firebaseConfig"; // Import storage for file upload
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // For handling image upload
import Swal from "sweetalert2";

const AddRoom = ({ setIsAdding }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState("");
  const [price, setPrice] = useState("");
  const [roomType, setRoomType] = useState("");
  const [imageFiles, setImageFiles] = useState([]); // To store selected image files
  const [error, setError] = useState("");

  const handleAddRoom = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!name || !description || !amenities || !price || !roomType || imageFiles.length === 0) {
      setError("Please fill out all fields and upload at least one image.");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required, and at least one image must be uploaded.",
      });
      return;
    }

    try {
      const imageUrls = []; // Array to store URLs of uploaded images

      // Upload each image to Firebase Storage
      for (const file of imageFiles) {
        const imageRef = ref(storage, `rooms/${file.name}`);
        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl); // Add URL to array
      }

      // Add room data to Firestore
      await addDoc(collection(db, "rooms"), {
        name,
        description,
        amenities,
        price: parseFloat(price), // Ensure price is a number
        roomType,
        images: imageUrls, // Store the array of image URLs
      });

      // Success alert and reset form
      Swal.fire({
        icon: "success",
        title: "Room Added",
        text: "The room has been added successfully.",
      });

      setIsAdding(false); // Close the form
      resetForm(); // Reset form fields
    } catch (err) {
      console.error("Error adding room: ", err);
      setError("Failed to add room. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setAmenities("");
    setPrice("");
    setRoomType("");
    setImageFiles([]); // Clear image files
    setError(""); // Clear error
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
          multiple // Allow multiple file selection
          onChange={(e) => setImageFiles(Array.from(e.target.files))} 
        />
        <button type="submit">Add Room</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddRoom;