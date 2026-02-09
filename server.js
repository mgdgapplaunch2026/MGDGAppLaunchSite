// INITIALIZE ENVIRONMENT FIRST
require('dotenv').config(); 

// NOW REQUIRE OTHER MODULES
const express = require('express');
const cors = require('cors'); 
const path = require('path');
const mongoose = require('mongoose');
const dns = require('dns');
const leadRoutes = require('./routes/leadroutes'); // Now this will see the API Key!

// 1. CONFIGURATION
dns.setServers(['8.8.8.8', '1.1.1.1']); // Force reliable DNS for Atlas

const app = express();
const PORT = process.env.PORT || 5000;

// 2. DATABASE CONNECTION
const connectDB = async () => {
    try {
        // We use the URI from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MGDG Protocol: Secure Link Established to ${conn.connection.host}`);
    } catch (error) {
        console.error(`MGDG Alert: Database Connection Failed - ${error.message}`);
        // If the DB fails, we shut down the server to prevent "Zombie" states
        process.exit(1); 
    }
};

connectDB();

// 3. MIDDLEWARE (The "Security Gates")
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 4. STATIC ASSETS & ROUTES
app.use(express.static(path.join(__dirname, 'public')));

// Your API endpoint
app.use('/api/v1/leads', leadRoutes);

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send('MGDG Protocol: Access Denied (404)');
});

// 5. START SERVER
app.listen(PORT, () => {
    console.log(`
    -------------------------------------------
    MGDG INSTITUTIONAL PORTAL ACTIVE
    Access Point: http://localhost:${PORT}
    Status: Protocol Fully Operational
    -------------------------------------------
    `);
});