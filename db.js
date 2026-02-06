const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Mongoose 6+ automatically handles the parser and topology
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mgdg_db');

        console.log(`MGDG Protocol: Secure Link Established to ${conn.connection.host}`);
    } catch (error) {
        console.error(`MGDG Alert: Database Connection Failed - ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;