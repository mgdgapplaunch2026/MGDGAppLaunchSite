const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Serve static files (CSS, JS, Images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// 2. Route for the Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. Catch-all for 404s (optional, for that institutional feel)
app.use((req, res) => {
    res.status(404).send('MGDG Protocol: Access Denied (404)');
});

app.listen(PORT, () => {
    console.log(`
    -------------------------------------------
    MGDG INSTITUTIONAL PORTAL ACTIVE
    Access Point: http://localhost:${PORT}
    Status: Protocol Initialized
    -------------------------------------------
    `);
});