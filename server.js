const express = require('express')
const routeFile = require('./route')
require('./features/mongoose')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

const router = express.Router()

routeFile.configureRoutes(router)
app.use(router)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

