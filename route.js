const app = require('./server')

const userRouter = require('./features/users/userRoute')
app.use(userRouter)
