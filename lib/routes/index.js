const express = require('express')
const router = express.Router()

const locations = require('./locations')
const users = require('./users')

router.use('/locations', locations)
router.use('/users', users)

module.exports = router