const express = require('express')
const locationsRoutes = express.Router()
const Location = require('../models/Location')

locationsRoutes
  .get('/', async (req, res, next) => {
    const locations = await Location.find()
    res.status(200).send(locations)
  })

module.exports = locationsRoutes