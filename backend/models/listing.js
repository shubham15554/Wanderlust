import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title : {
        type : String,
        required: true
    },

    description: String,
    image : {
        filename: String,
        url: String,

    }, 

    price : {
        type: Number
    },

    location : String,
    country: String,

    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref : "Review"
        }
    ],

    owner : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    geometry: {
        type: {
        type: String, 
        enum: ['Point'], 
        },
        coordinates: {
        type: [Number],
        }
    }


});
let Listing = mongoose.model("Listing", listingSchema);
export default Listing;