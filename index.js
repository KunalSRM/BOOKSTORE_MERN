import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Routes
app.use('/books', booksRoute);

app.get('/', (req, res) => {
    console.log(req); // Logs the incoming request
    return res.status(234).send('Welcome to MERN Stack tutorial');
});

// Database Connection and Server Initialization
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });


