
// cloud_config.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("@fluidjs/multer-cloudinary");
const multer = require("multer"); 

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,       // match .env
  api_secret: process.env.CLOUD_API_SECRET, // match .env
});


const storage = new CloudinaryStorage({
  folder: 'wanderlust_devs',
  cloudinary: cloudinary,
  params: {
   allowed_formats : ["png" , "jpg", "jpeg"] // supports promises as well
   
  },
});

module.exports = {
    cloudinary,
    storage
}
