const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");

const Listing = require("../models/listing.js");
const {isLoggedin , isOwner , validateListing} = module.require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');

const {storage} = require("../cloud_config.js");
const upload = multer({ storage })

router
    .route("/")
    .get( wrapasync(listingController.index))
    .post(isLoggedin , upload.single('listing[image]') , wrapasync(listingController.createListing));
   
    
router.get("/new" , isLoggedin ,listingController.renderNewForm);


router
   .route("/:id")
   .get( wrapasync (listingController.showListing))
   .put(isLoggedin ,  isOwner , upload.single("listing[image]") ,  validateListing , wrapasync(listingController.updateListing))
   .delete(isLoggedin, isOwner, wrapasync(listingController.destroyListing))



router.get("/:id/edit" ,isLoggedin, isOwner, wrapasync(listingController.renderEditForm));




module.exports = router;