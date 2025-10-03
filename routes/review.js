const express = require("express");
const router = express.Router({mergeParams: true});
const wrapasync = require("../utils/wrapasync.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require("../models/review.js");
let {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedin , isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");




// for the review
router.post("/" , isLoggedin , validateReview , wrapasync(reviewController.createReview));

// delete route

router.delete("/:reviewId" , isLoggedin , isAuthor,  wrapasync(reviewController.destroyReview));

module.exports = router;