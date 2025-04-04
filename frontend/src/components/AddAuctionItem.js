import React, { useState } from "react";
import axios from "axios";
import "../styles/styles.css"; // Import the CSS file

const AddAuctionItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    auctionEndTime: "",
    category: "electronics",
    serialNumber: "Not Applicable",
    model: "Not Applicable",
    yearOfManufacture: "Not Applicable",
    color: "Not Applicable",
    primaryDamage: "Not Applicable",
    secondaryDamage: "Not Applicable",
    VIN: "Not Applicable",
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
      await axios.post("http://localhost:5000/api/auctions/create", data);
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
        <input type="text" name="serialNumber" placeholder="Serial Number" onChange={handleChange} />
        <input type="text" name="model" placeholder="Model" onChange={handleChange} />
        <input type="text" name="yearOfManufacture" placeholder="Year of Manufacture" onChange={handleChange} />
        <input type="text" name="color" placeholder="Color" onChange={handleChange} />
        <input type="text" name="primaryDamage" placeholder="Primary Damage" onChange={handleChange} />
        <input type="text" name="secondaryDamage" placeholder="Secondary Damage" onChange={handleChange} />
        <input type="text" name="VIN" placeholder="VIN" onChange={handleChange} />
        <input type="number" name="odometer" placeholder="Odometer" onChange={handleChange} />
        <select name="working" onChange={handleChange}>
          <option value={true}>Working</option>
          <option value={false}>Not Working</option>
        </select>
        <input type="file" name="images" multiple onChange={handleFileChange} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddAuctionItem;