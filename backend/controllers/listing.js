
import Listing from "../models/listing.js";
import Review from "../models/review.js";
import  getGeoJSON  from "../utils/geoCoding.js";
import axios from "axios";
import { generateDescription } from "../service/aiIntegrate.js";

export const  newListing = async (req, res) => {

    try {
    
    if (!req.file) {
        console.error("No file uploaded in the request.");
      return res.status(400).json({ success: false, message: "Image upload failed" });
      
    }
    console.log("Received file:", req.file);
    const imageUrl = req.file.path; 
    const { title, description, price, location, country, category } = req.body;
    const geometry = await getGeoJSON(location);
   
    const newListing = new Listing({
      title,
      description: description, // Use the generated description
      price,
      location,
      country,
      category,
      geometry,
      image: {
        url: imageUrl,
        filename: req.file.filename
      }, 
      owner: req.user._id 
    });

    await newListing.save();
    res.status(201).json({ success: true, message: "Listing created successfully!", data: newListing });

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const getListings = async (req , res)=>{
    try{
        let listings = await Listing.find({});
        res.json(listings);

    }
    catch(e){
        console.log(e);
    }
}

export const getListingDetails = async (req , res) => {

    try{
        const {id} = req.params;
        let listing = await Listing.findById(id).populate({
            path: "reviews",
            populate: {
                path: "author",
                select: "name"
            }
        })
        res.send(listing);
    }
    catch(e){
        console.log(e);
    }
}



export  async function createReview(req, res){
    try{
        const listingId = req.params.id;
        const { rating, comment } = req.body;
        let listing = await Listing.findById(listingId);
        ;
        if(!listing){
            return res.status(404).json({ error: "Listing not found" });
        }
        const newReview = new Review({
            comment,
            rating,
            author: req.user._id
        });
        
        await newReview.save();
        console.log("New review data" , newReview  );
        listing.reviews.push(newReview._id);
        await listing.save();
        return res.status(201).json({ message: "Review created successfully" });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export async function deleteReview(req , res){
    try{
        let {id , reviewId} = req.params;
        await Review.findByIdAndDelete(reviewId);
        await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}});
        return res.json({message: "Review deleted successfully"});

    }
    catch(e){
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}