const userRouter = require('./features/users/userRoute')
const taskRouter = require('./features/tasks/taskRoute')

const configureRoutes = (router) => {
    userRouter.userRouter(router)
    taskRouter.taskRouter(router)
}

// module.exports.routes = routes
module.exports.configureRoutes = configureRoutes