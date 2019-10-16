const express = require('express')
const router = express.Router()
const locations = require('./locations')
router.use('/locations', locations)
// Add more routes here if you want!
module.exports = router