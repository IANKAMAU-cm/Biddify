const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// This code defines a function to connect to a MongoDB database using Mongoose.
// It uses async/await for handling asynchronous operations and logs the connection status.
// If the connection fails, it logs the error message and exits the process with a failure code (1).
// The function is exported for use in other parts of the application.
// The connection string is expected to be stored in an environment variable called MONGO_URI.
// The function uses the mongoose library to connect to the MongoDB database.
// It uses the useNewUrlParser and useUnifiedTopology options to avoid deprecation warnings.
// The function is called in the main application file to establish the database connection when the server starts.
// The connection is established using the connect method of mongoose, which returns a promise.
// The connection status is logged to the console using console.log.
// If the connection is successful, it logs "MongoDB connected..."