import express from 'express';
import Register from '../routes/register.js';

const apiRouter = express.Router();

apiRouter.post('/register', Register);

export default apiRouter;