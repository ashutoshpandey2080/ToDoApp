import express from "express";
import { apiRouter, apiProtected } from "./routes/api.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

// Load environment variables from a .env file
dotenv.config();

// Create an Express app
const app = express();

// Define the port the server will run on
const PORT = 3000;

// Middleware to parse incoming JSON request payloads
app.use(express.json());
app.use(cors()); // CORS

// Set up unprotected API routes (public routes like login/register)
app.use("/api/", apiRouter);

// Set up protected API routes (use AuthMiddleware for routes that need authentication)
app.use("/api/", AuthMiddleware, apiProtected);

// Connect to MongoDB using the connection string from environment variables
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
