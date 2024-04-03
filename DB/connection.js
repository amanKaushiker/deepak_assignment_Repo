require('dotenv').config(); 
const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        // Connect to MongoDB
        mongoose.connect(process.env.MONGO_URI);
        // Get the default connection
        const db = mongoose.connection;
        
        db.once("open", function () {
            console.log("Connected to MongoDB");
  });
    } catch (error) {
        // If an error occurs, log the error message
        console.error('Error connecting to the database:', error);
    }
}

module.exports = {connectToDatabase}