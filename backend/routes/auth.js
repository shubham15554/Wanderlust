import express from 'express';
const router = express.Router();
import { profile, signup , signin , logout, googleLogin } from '../controllers/auth.js';

// signup route

router.post("/signup" , signup);
router.post("/signin" , signin);
router.post("/logout", logout);
router.get('/profile' , profile);
router.post('/googleAuth',googleLogin );
export default router;