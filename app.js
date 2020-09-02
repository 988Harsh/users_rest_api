const express = require('express')
const cors = require('cors')
const routeFile = require('./route')
require('./features/mongoose')
const app = express()
app.use(express.json())

app.use(cors({ origin: '*' }));


const router = express.Router()
routeFile.configureRoutes(router)
app.use(router)

module.exports = app;