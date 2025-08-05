const mongoose = require('mongoose');
require("dotenv").config();

const { MONGODB_URL } = process.env;
console.log("MONGODB_URL:", MONGODB_URL); // Debugging line to check the URL

const connectDB = async () => {
    if (!MONGODB_URL) {
        console.error("MONGODB_URL is not defined in environment variables.");
        process.exit(1);
    }
    try {
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection failed", error);
        process.exit(1);
    }
};

module.exports = connectDB;