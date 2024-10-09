import express from 'express';
import Register from '../controllers/RegisterController.js';


const apiRouter = express.Router();

apiRouter.post('/register', Register);

export default apiRouter;