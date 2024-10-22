import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';
import stripeRoute from './routes/stripeRoute.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const mongoDBURL = process.env.MONGODB_URL;


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/checkout', stripeRoute);

app.use('*', (req, res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')))

mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database");
    app.listen(8080, () => {
        console.log("Server is listing on port 8080")
    });
}).catch((error) => {
    console.log(error)
});