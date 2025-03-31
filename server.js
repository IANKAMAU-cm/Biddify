require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Use the imported connectDB function

const authRoutes = require("./routes/auth");
const auctionRoutes = require("./routes/auctions");

const http = require("http");
const { Server } = require("socket.io");
const AuctionItem = require("./models/AuctionItem");

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("newBid", async (data) => {
    const { auctionId, userId, amount } = data;

    try {
      const auctionItem = await AuctionItem.findById(auctionId);
      auctionItem.bids.push({ user: userId, amount });
      await auctionItem.save();

      io.emit("bidUpdate", { auctionId, bids: auctionItem.bids });
    } catch (error) {
      console.error("Error processing new bid:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Connect to MongoDB
connectDB(); // Use the imported connectDB function

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes);

module.exports = app;