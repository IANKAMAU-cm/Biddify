import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/styles.css";

const ManageAuctions = () => {
  const [auctionItems, setAuctionItems] = useState([]);

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auctions");
        setAuctionItems(res.data);
      } catch (error) {
        console.error("Error fetching auction items:", error);
      }
    };
    fetchAuctionItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auctions/${id}`);
      setAuctionItems(auctionItems.filter((item) => item._id !== id));
      alert("Auction item deleted successfully!");
    } catch (error) {
      console.error("Error deleting auction item:", error);
    }
  };

  return (
    <div className="manage-auctions">
      <h2>Manage Auctions</h2>
      <div className="auction-list">
        {auctionItems.map((item) => (
          <div key={item._id} className="auction-item">
            <h3>{item.title}</h3>
            <p>Starting Price: ${item.startingPrice}</p>
            <p>Ends: {new Date(item.auctionEndTime).toLocaleString()}</p>
            <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAuctions;