# 🌍 Wanderlust

**Wanderlust** is a full-stack travel listing web application where users can explore destinations, create listings, upload images, write reviews, and view locations on an interactive map.

It is inspired by platforms like **Airbnb**, allowing users to share and discover travel destinations around the world.

-------------------------------------------------

# ✨ Features

### 🏠 Listings

* Create new travel listings
* Edit or delete your listings
* View detailed listing pages
* Upload images for listings

### ⭐ Reviews

* Add reviews with ratings
* Delete your own reviews
* View reviews in card format

### 👤 Authentication

* User Signup
* User Login / Logout
* Secure password hashing using Passport

### 🔐 Authorization

* Only listing owners can edit/delete listings
* Only review authors can delete reviews

### 🔎 Search & Filters

* Search destinations
* Category based filters
* Tax toggle switch

### 🗺 Maps & Location

* Interactive map integration
* Automatic geocoding of locations
* Custom markers with popup

### 📱 Responsive Design

* Mobile friendly layout
* Responsive filters, map, and review cards

### ☁️ Cloud Services

* Cloud image storage using Cloudinary
* MongoDB Atlas cloud database
* Deployed using Render

-------------------------------------------------

# 🛠 Tech Stack

## Frontend

* **EJS**
* **Bootstrap**
* **Font Awesome**
* **Google Fonts**

## Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

## Authentication

* **Passport.js**
* **Passport Local**
* **Passport Local Mongoose**

## File Upload

* **Multer**
* **Cloudinary**
* **Multer Storage Cloudinary**

## Maps

* **MapTiler SDK**
* **GeoJSON**

## Other Tools

* Joi (Schema Validation)
* Express Session
* Connect Flash
* Connect Mongo
* Method Override
* Dotenv

-------------------------------------------------

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```
ATLASDB_URL=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret

MAPTILER_API_KEY=your_maptiler_key

SESSION_SECRET=your_secret
```

Run the application

```bash
nodemon app.js
```

Open in browser

```
http://localhost:3000
```

-------------------------------------------------

# 📂 Project Structure

```
Wanderlust
│
├── controllers
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── views
│   ├── listings
│   ├── users
│   └── layouts
│
├── public
│   ├── css
│   └── js
│
├── utils
│   ├── wrapAsync.js
│   └── ExpressError.js
│
└── app.js
```

---

# ☁️ Deployment

This project is deployed using:

* **MongoDB Atlas** – Cloud database
* **Cloudinary** – Image hosting
* **Render** – Application hosting

-------------------------------------------------

# 🚀 Live Website

[https://your-render-url.onrender.com/listings](https://projects-mots.onrender.com/listings)

-------------------------------------------------

# 👩‍💻 Author
**Dhwani Randeri**

-------------------------------------------------
