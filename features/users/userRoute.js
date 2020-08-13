const userController = require('./userController')
const auth = require('../../middleware/auth')

const userRouter = (router) => {
    router.post('/users/login', userController.login)
    router.post('/users/logout', auth, userController.logout)
    router.post('/users/logoutAll', auth, userController.logoutAll)
    router.post('/users', userController.insertUser)
    router.get('/users/me', auth, userController.userProfile)
    router.patch('/users/me', auth, userController.updateUser)
    router.delete('/users/me', auth, userController.deleteUser)
}

module.exports.userRouter = userRouter