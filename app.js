if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
let port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//MongoDB/Atlas
const dns = require("dns");
const dbUrl = process.env.ATLASDB_URL;

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Parsing Data (Getting Through Request)
app.use(express.urlencoded( { extended: true }));

//Method Override
app.use(methodOverride("_method"));

//EJS Mate
app.engine("ejs", ejsMate);

//To use static files like css,js etc
app.use(express.static(path.join(__dirname, "/public")));

//Connecting Database
dns.setServers(["1.1.1.1", "0.0.0.0"]);
main()
    .then(() => {
        console.log(`Connected To Database`);
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,                  
    },
    touchAfter: 24 * 3600, 
});

store.on("error", (err) => {
    console.log("Error in MONGO SESSION STORE", err);
});

//Defining Session Options And Flash
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(flash());

//Authorization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.search = req.query.search || "";
    res.locals.category = req.query.category || "";
    next();
});

app.use("/listings", listingRouter); //Listing Routes
app.use("/listings/:id/reviews", reviewRouter); //Reviews Routes
app.use("/", userRouter); //User Routes

//For Not Defined Routes
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//Middleware for error handling
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message }); 
});

//Server
app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});