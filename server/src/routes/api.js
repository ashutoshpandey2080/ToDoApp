import express from 'express';  // Import express to create the router
import Register from '../controllers/RegisterController.js';  // Import the registration controller
import { RegisterSchema } from '../validationSchema/registerSchema.js';  // Import validation schema for registering users

// Create a new router for handling API routes
const apiRouter = express.Router();

// Define the POST /register route
// The RegisterSchema middleware validates the incoming request data
// The Register controller handles the logic for user registration
apiRouter.post('/register', RegisterSchema, Register);

export default apiRouter;  // Export the router to be used in the main app
