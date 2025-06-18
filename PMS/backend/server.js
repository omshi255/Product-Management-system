 import express from 'express';
 import dbConnect from './config/dbConnect.js';
 import dotenv from "dotenv";
import cors from 'cors';
 import router from './routers/user.router.js';
 import productRouter from './routers/product.router.js';


dotenv.config();
//  const express = require('express'); // Importing express
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express.json()); 
app.use(cors());
app.use('/api/users',router); // Register route
app.use('/api/users',router); // Login route
app.use('/api/users',router); // Logout route
app.use('/api/products', productRouter); // Product routes
dbConnect();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
export default app; // Exporting the app for testing purposes