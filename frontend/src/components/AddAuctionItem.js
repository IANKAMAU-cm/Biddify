import React, { useState } from "react";
import axios from "axios";

const AddAuctionItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    auctionEndTime: "",
    category: "electronics",
    serialNumber: "N/A",
    model: "N/A",
    yearOfManufacture: "N/A",
    color: "N/A",
    primaryDamage: "N/A",
    secondaryDamage: "N/A",
    VIN: "N/A",
    odometer: 0,
    working: true,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "images") {
        Array.from(formData.images).forEach((file) => data.append("images", file));
      } else {
        data.append(key, formData[key]);
      }
    }
    try {
      await axios.post("/api/auctions/create", data);
      alert("Auction item added successfully!");
    } catch (error) {
      console.error("Failed to add auction item:", error);
    }
  };

  return (
    <div className="add-auction">
      <h2>Add Auction Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="number" name="startingPrice" placeholder="Starting Price" onChange={handleChange} required />
        <input type="datetime-local" name="auctionEndTime" onChange={handleChange} required />
        <select name="category" onChange={handleChange}>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="vehicles">Vehicles</option>
          <option value="real estate">Real Estate</option>
          <option value="machinery">Machinery</option>
          <option value="featured">Featured</option>
        </select>
        <input type="file" name="images" multiple onChange={handleFileChange} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddAuctionItem;
// This code defines a form for adding auction items, including file uploads and various fields.