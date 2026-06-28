import express from 'express';
const router = express.Router();
import { signup  } from '../controllers/auth.js';
import { getListings , newListing , getListingDetails , createReview , deleteReview } from '../controllers/listing.js';
import { protect } from '../middleware/protect.js';
import  isAuthor  from '../middleware/isAuthor.js';
import { upload } from '../middleware/multer.js';

router.get("/" , getListings)
router.post("/new" , protect  ,  upload.single("image") , newListing);
router.get("/:id" , getListingDetails);

router.post("/reviews/new/:id" , protect , createReview);
router.delete("/:id/reviews/:reviewId" , protect , isAuthor , deleteReview);



//router.post("/signin" , signin);


export default router;