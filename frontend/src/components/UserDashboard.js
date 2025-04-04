import React, { useEffect, useState } from "react";
import axios from "axios";
import AuctionItemCard from "./AuctionItemCard";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const [auctionItems, setAuctionItems] = useState([]);
  const { category } = useParams(); // Get the category from the URL

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const endpoint = category
          ? `http://localhost:5000/api/auctions?category=${category}`
          : "http://localhost:5000/api/auctions?category=featured"; // Default to "featured"
        const res = await axios.get(endpoint);
        setAuctionItems(res.data);
      } catch (error) {
        console.error("Error fetching auction items:", error);
      }
    };
    fetchAuctionItems();
  }, [category]);

  return (
    <div className="dashboard">
      <h2>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Auctions` : "Featured Auctions"}</h2>
      <div className="auction-grid">
        {auctionItems.map((item) => (
          <AuctionItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;