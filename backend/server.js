import express from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

const app = express(); //create servers //

app.use(cors());

app.use(express.json()); //parsing middleware that enables the server to read and accept JSON in a requests body
//specify the initial routes
app.use("/api/v1/movies", movies);
app.use('*', (req,res) => {
    res.status(404).json({error: "not found"});
});

export default app;