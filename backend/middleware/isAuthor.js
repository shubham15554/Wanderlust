

import Review from "../models/review.js";
export default async  function isAuthor(req, res, next) {
    let {id , reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        return res.redirect(`/listings/${id}`);
    }
    next();
   
}