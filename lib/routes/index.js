const express = require('express')
const router = express.Router()
const validateToken = require("../middlewares/validateToken");

const auth = require('./auth')
const locations = require('./locations')
const users = require('./users')

/****public routes***/
router.use('/auth', auth)

/****private routes****/
router.use(validateToken)
router.use('/users', users)
router.use('/locations', locations)

module.exports = router