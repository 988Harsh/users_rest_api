const taskController = require('./taskController')
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')


const taskRouter = (router) => {
    router.post('/tasks', auth, taskController.addTask)
    router.get('/tasks', auth, taskController.listTasks)
    // router.get('/tasks/all', admin, taskController.showAllTasks);
    router.get('/tasks/:id', auth, taskController.fetchTask)
    router.patch('/tasks/:id', auth, taskController.updateTask)
    router.delete('/tasks/:id', auth, taskController.deleteTask)
}

module.exports.taskRouter = taskRouter