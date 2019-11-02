const express = require('express')
const router = express.Router()
const validateToken = require("../middlewares/validateToken");

const auth = require('./auth')
const locations = require('./locations')
const users = require('./users')
const supplies = require('./supplies')
const supplyFamilies = require('./supplyFamilies')

/****public routes***/
router.use('/auth', auth)

/****private routes****/
router.use(validateToken)
router.use('/users', users)
router.use('/locations', locations)
router.use('/supplies', supplies)
router.use('/supply_families',supplyFamilies)

module.exports = router