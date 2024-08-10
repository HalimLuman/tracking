const express = require('express');
const {
    startTracking,
    stopTracking,
    recordDownload,
    recordWebsiteVisit,
    getAllComputers,
} = require('../controllers/computerController');

const router = express.Router();

// Start tracking
router.post('/start', startTracking);

// Stop tracking
router.post('/stop/:id', stopTracking);

// Record a download
router.post('/download/:id', recordDownload);

// Record a website visit
router.post('/website/:id', recordWebsiteVisit);

// Get all computers data
router.get('/', getAllComputers);

module.exports = router;
