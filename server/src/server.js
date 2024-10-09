import express from 'express';  // Import express for creating the server
import apiRouter from './routes/api.js';  // Import API routes
import cors from 'cors';  // Import CORS to handle cross-origin requests
import mongoose from 'mongoose';  // Import Mongoose to interact with MongoDB
import dotenv from 'dotenv';  // Import dotenv to handle environment variables

// Load environment variables from a .env file
dotenv.config();

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the server only after the database connection is successful
        app.listen(PORT, () =>  {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB:", err);
    });

// Create an Express app
const app = express();

// Define the port the server will run on
const PORT = 3000;

// Middleware to parse incoming JSON request payloads
app.use(express.json());

// Middleware to handle CORS (currently commented out)
// app.use(cors());

// Set up the API routes
app.use("/api/", apiRouter);

// Route for user registration (could be moved to apiRouter)
