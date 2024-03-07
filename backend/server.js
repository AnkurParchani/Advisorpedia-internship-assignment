import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// IF there's any error
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception. SHUTTING DOWN...");
  console.log(err.name, err.message);
  process.exit(1);
});

import app from "./app.js";

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// Connecting to DATABASE
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log("Error connecting to database", err));

// If Unhandled Rejection found
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection. SHUTTING DOWN...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Running the server
const port = 3000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
