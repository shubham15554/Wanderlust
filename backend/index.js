import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' }); 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import listingRoutes from './routes/listing.js';
import Listing from './models/listing.js';
import cookieParser from 'cookie-parser';
import getGeoJSON from './utils/geoCoding.js';
const app = express();
const PORT = process.env.PORT || 8000;
import { upload } from './middleware/multer.js';
import { generateDescription } from './service/aiIntegrate.js';

import axios from 'axios';
import User from './models/user.js';
import { createSecretToken } from './utils/createToken.js';
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", `https://wanderlust-seven-mocha.vercel.app`],
  credentials: true
}));



app.use("/auth" , authRoutes);
app.use("/listings" , listingRoutes);


app.post("/generate-description" , upload.single('image'), async (req , res)=>{
  try {

    if(!req.file || !req.file.path){
      return res.status(400).json({ error: "No image file uploaded." });
    }

    const imageUrl = req.file.path;

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');
    const description = await generateDescription(base64Image);
    console.log("Generated description from AI:", description);
    res.json({ description });

  }
  catch(err){
    console.error("Error in /generate-description route:", err);
  }
  

});




const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🚀 Connected to MongoDB successfully!");

    app.listen(PORT, () => {
      console.log(`🌍 Server is blasting off on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

startServer();
