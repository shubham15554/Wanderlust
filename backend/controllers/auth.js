import { google } from 'googleapis';


import axios from 'axios';
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import {createSecretToken} from "../utils/createToken.js";
import jwt from "jsonwebtoken";
import {oauth2client} from '../utils/googleConfig.js';
export const signup = async (req , res ) => {

    try{
        const {name , email , password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({error : "Please fill all the fields"});
        }

        const existingUser = await User.find({email});
        if(existingUser.length > 0){
            return res.status(400).json({error : "User already exists"});
        }

        let hashedPassword = await bcrypt.hash(password , 10);
        
        const user = new User({
            name,
            email,
            password : hashedPassword
        }); 

        await user.save();

        let token = createSecretToken(user._id);
         res.cookie("token", token, {
            httpOnly: true,         
            secure: true,           
            sameSite: "none",       
            maxAge: 24 * 60 * 60 * 1000, 
        });
        res.status(201).json({ message: "User signed in successfully", success: true, user })

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({error : "Internal Server Error"});
    }
}



export const signin = async (req , res)=>{

    try{
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({error : "Please fill all the fields"});
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error : "User does not exist"});
        }
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({error : "Invalid credentials"});
        }
        let token = createSecretToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,         
            secure: true,           
            sameSite: "none",       
            maxAge: 24 * 60 * 60 * 1000, 
        });
        res.status(200).json({ message: "User signed in successfully", success: true, user });
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error : "Internal Server Error"});
    }
}


export const googleLogin = async (req , res)=>{
   try{
    console.log("req is coming");
      let {code} = req.body;
      let  googleRes = await oauth2client.getToken(code);
      oauth2client.setCredentials(googleRes.tokens);
      let userRes = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
      let {email , name} = userRes.data;

      let user = await User.findOne({email});
      if(!user){
         user = await User.create({
          email,
          name
         })
      }

      let token = createSecretToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,         
            secure: true,           
            sameSite: "none",       
            maxAge: 24 * 60 * 60 * 1000, 
        });


     console.log("everything  done " , user);
      res.status(200).json({ message: "User signed in successfully", success: true, user });
 
   }
   catch(err){
    console.log(err);
    res.status(500).json({ message: "Something went wrong", success: false });
    
   }
}


export const profile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token found in cookies" });


    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("Decoded Payload:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found in DB" });

    res.status(200).json({ user });
  } catch (error) {
   
    console.log("JWT VERIFY ERROR:", error.message); 
    res.status(401).json({ 
      message: "Invalid token", 
      reason: error.message 
    });
  }
};



export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0), 
  });

  res.status(200).json({ message: "Logged out successfully" });
};