import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig"; // Import storage

const EditRoom = ({ room, setIsEditing }) => {
  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description);
  const [amenities, setAmenities] = useState(room.amenities);
  const [price, setPrice] = useState(room.price);
  const [roomType, setRoomType] = useState(room.roomType);
  const [image, setImage] = useState(null); // New state for image

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = room.imageUrl; // Default to existing image URL

      // If a new image is uploaded, update the image in Firebase Storage
      if (image) {
        const imageRef = ref(storage, `rooms/${room.id}`); // Storage reference
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef); // Get the new image URL
      }

      // Reference to the room document in Firestore
      const roomRef = doc(db, "rooms", room.id);

      // Update room details in Firestore
      await updateDoc(roomRef, {
        name,
        description,
        amenities,
        price,
        roomType,
        imageUrl, // Update imageUrl in Firestore
      });

      setIsEditing(false); // Close the form after updating
      alert("Room updated successfully.");
    } catch (error) {
      console.error("Error updating room: ", error);
      alert("Error updating room.");
    }
  };

  return (
    <div>
      <h2>Edit Room</h2>
      <form onSubmit={handleUpdateRoom}>
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
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="King">King</option>
          <option value="Suite">Suite</option>
        </select>

        {/* Upload new image */}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Update Room</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditRoom;