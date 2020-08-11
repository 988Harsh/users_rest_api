const express = require('express')
require('./features/mongoose')

const userRouter = require('./features/users/user_route')

const app = express()
const port = process.env.PORT || 3002

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})