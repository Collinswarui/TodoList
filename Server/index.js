import express from 'express';
import todoRouter from './Routes/todoRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// console.log('Mongo_URI: ', process.env.MONGO_URI);

mongoose.set('debug', true);

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000, // 30 seconds
  })
    .then(() => {
      console.log("Connected to DB!!");
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err.message);
    });

// Create app
const app = express();

app.use(express.json());

app.use('/api/todos', todoRouter);

const port = 3000;
app.listen(
    port, () => console.log(`Server running on port ${port}`)
);