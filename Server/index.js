import express from 'express';
import cookieParser from "cookie-parser";
import todoRouter from './Routes/todoRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();



// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB!!");
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err.message);
    });

// Create app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/todos', todoRouter);

const port = 3007;
app.listen(
    port, () => console.log(`Server running on port ${port}`)
);