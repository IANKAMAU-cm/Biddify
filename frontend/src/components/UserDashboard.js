import React, { useEffect, useState } from "react";
import axios from "axios";
import AuctionItemCard from "./AuctionItemCard";

const UserDashboard = () => {
  const [auctionItems, setAuctionItems] = useState([]);

  useEffect(() => {
    const fetchAuctionItems = async () => {
      const res = await axios.get("/api/auctions");
      setAuctionItems(res.data);
    };
    fetchAuctionItems();
  }, []);

  return (
    <div className="dashboard">
      <h2>Featured Auctions</h2>
      <div className="auction-grid">
        {auctionItems.map((item) => (
          <AuctionItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
// This code defines a user dashboard component that fetches and displays auction items.