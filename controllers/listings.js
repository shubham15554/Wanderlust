const { model } = require("mongoose");
const Listing = require("../models/listing.js");
const getGeoJSON = require("../utils/findcord.js");



module.exports.index = async (req , res) => {
      let allListings  = await Listing.find({});
      res.render("listing/index" , {allListings});
}

module.exports.renderNewForm =  (req , res) => {
    res.render("listing/new.ejs");
}

module.exports.showListing = async (req , res) => {
   let {id} = req.params;
   const listing = await Listing.findById(id).populate({path : "reviews" , populate : { path : "author"}} ).populate("owner");
   if(!listing){
    req.flash("error" , "Listing you requested for does not exist!");
    return res.redirect("/listings");
   }
   res.render("listing/show.ejs" , {listing});

}

module.exports.createListing =  async (req , res , next) => {
        let listing = req.body.listing ;
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = {url , filename};
        
        let cord = await getGeoJSON(listing.location);
        console.log(cord);
        newListing.geometry = cord;
        await newListing.save();
        console.log(newListing);
        req.flash("success" , "New listing created");
        res.redirect("/listings");
 }

 
module.exports.renderEditForm = async (req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      return req.flash("error" , "Listing you requested for does not exist!");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");

    res.render("listing/edit.ejs" , {listing , originalImageUrl});
 }


 module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    let listing  = await Listing.findByIdAndUpdate(id, { ...req.body.listing } , { new: true });
    let cord = await getGeoJSON(listing.location);
    listing.geometry = cord;
    if(typeof req.file !== "undefined"){
     let url = req.file.path;
     let filename = req.file.filename;
     listing.image = {url , filename};
    }
    await listing.save();
    console.log(listing);
    req.flash("success" , "Listing Updated");
    res.redirect(`/listings/${id}`);
}; 

module.exports.destroyListing = async (req , res) => {
     let { id } = req.params;
      let listing =   await Listing.findByIdAndDelete(id );
       req.flash("success" , "Listing deleted");
      res.redirect("/listings");
}