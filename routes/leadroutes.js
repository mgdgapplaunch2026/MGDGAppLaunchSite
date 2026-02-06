const express = require('express');
const router = express.Router();
const leadController = require('../controller/leadcontroller.js');

// POST /api/v1/leads
router.post('/', leadController.captureLead);

module.exports = router;