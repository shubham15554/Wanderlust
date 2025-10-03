const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req , res) => {
    let { id } = req.params;
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    console.log(newReview);
    await listing.save();
     req.flash("success" , "New review created");
    console.log("new review saved");
    res.redirect(`/listings/${id}`);
}


module.exports.destroyReview = async (req , res) => {
     let {id , reviewId} = req.params;
     await Review.findByIdAndDelete(reviewId);
     await Listing.findByIdAndUpdate(id , {$pull: {reviews : reviewId}});
      req.flash("success" , "review deleted");
     res.redirect(`/listings/${id}`);
    
};