import express from 'express';  // Import express to create the router
import Register from '../controllers/RegisterController.js';  // Import the registration controller
import { RegisterSchema } from '../validationSchema/registerSchema.js';  // Import validation schema for registering users
import Login from '../controllers/LoginController.js';
import { LoginSchema } from '../validationSchema/LogicSchema.js';
import { CreateTodo } from '../controllers/TodoController.js';
import TodoSchema from '../validationSchema/TodoSchema.js';
import { TodoList } from '../controllers/TodoList.js';
import { MarkTodo }  from '../controllers/MarkTodoController.js';


// Create a new router for handling API routes
export const apiRouter = express.Router();
export const apiProtected = express.Router();

// Define the POST /register route
// The RegisterSchema middleware validates the incoming request data
// The Register controller handles the logic for user registration
apiRouter.post('/register', RegisterSchema, Register);
apiRouter.get('/login', LoginSchema , Login);

//Protected Route
apiProtected.post('/createTodo', TodoSchema , CreateTodo);
apiProtected.get('/todolist', TodoList);
apiProtected.post('/markTodo', MarkTodo);
