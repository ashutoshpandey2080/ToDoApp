import express from 'express';
import apiRouter from './utils/api.js';

const app =express();

const PORT = 3000;

app.use("/api/",apiRouter);
// app.post('/register', (req, res)  => res.send("Registered"));

app.listen(PORT, () =>  {
    console.log(`Server is running on port ${PORT}`);
})