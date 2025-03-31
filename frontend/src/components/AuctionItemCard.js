import React from "react";

const AuctionItemCard = ({ item }) => {
  return (
    <div className="auction-card">
      <img src={item.images[0]} alt={item.title} />
      <h3>{item.title}</h3>
      <p>Starting Price: ${item.startingPrice}</p>
      <p>Ends: {new Date(item.auctionEndTime).toLocaleString()}</p>
    </div>
  );
};

export default AuctionItemCard;
// This code defines a card component for displaying auction items.