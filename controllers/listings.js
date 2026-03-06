const Listing = require("../models/listing.js");
let maptilerSdk;
(async () => {
  maptilerSdk = await import("@maptiler/sdk");
  maptilerSdk.config.apiKey = process.env.MAPTILER_KEY;
})();

module.exports.index = async(req, res) => {
    let { search, category } = req.query;
    let query = {};

    // If search exists but empty, redirect cleanly
    if (search !== undefined && search.trim() === "") {
        return res.redirect("/listings");
    }

    //Search filter
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country: { $regex: search, $options: "i" } }
        ];
    }

    // Category filter
    if (category && category !== "Trending") {
        query.category = category;
    }

    const allListings = await Listing.find(query);
    res.render("./listings/index.ejs", { allListings, search: search || "", category: category || "" });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: {path:"author"}}).populate("owner");
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async(req, res) => {
    //Geocoding
    const response = await maptilerSdk.geocoding.forward(
        req.body.listing.location,
        { limit: 1 }
    );
    if (!response.features || response.features.length === 0) {
        return res.status(400).send("Location not found");
    }
    const geometry = response.features[0].geometry;
    
    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; //current User
    newListing.image = { url, filename };
    newListing.geometry = response.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async(req, res) => {
    let { id } = req.params;
    
    // Geocoding
    const response = await maptilerSdk.geocoding.forward(
        req.body.listing.location,
        { limit: 1 }
    );

    if (!response.features || response.features.length === 0) {
        return res.status(400).send("Location not found");
    }

    const geometry = response.features[0].geometry;

    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing, geometry: geometry}, { new: true });
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};