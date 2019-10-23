const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

require('./db')
const routes = require('./routes')
app.use('/api', routes)

module.exports = app