const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

//Structure/Columns of our Listing Collection/Table
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String, 
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User" 
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    category: {
        type: String,
        enum: ["Rooms", "Iconic Cities","Beach", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Cruise", "Heritage", "Theme Parks", "Treehouses", "Desert Retreats"]
    }
});

//Mongoose Middleware
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;