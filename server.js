const express = require('express')
require('./features/mongoose')
const app = express()
const port = process.env.PORT || 3002
app.use(express.json())


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

module.exports = app