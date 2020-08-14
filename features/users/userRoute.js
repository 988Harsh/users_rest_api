const userController = require('./userController')
const auth = require('../../middleware/auth')
const { upload } = require('../../middleware/multer')

const userRouter = (router) => {

    router.get('/users/', auth, userController.showAllUsers)
    router.post('/users/login', userController.login)
    router.post('/users/logout', auth, userController.logout)
    router.post('/users/logoutAll', auth, userController.logoutAll)
    router.post('/users', userController.insertUser)
    router.get('/users/me', auth, userController.userProfile)
    router.patch('/users/me', auth, userController.updateUser)
    router.delete('/users/me', auth, userController.deleteUser)
    router.post('/users/me/avatar', auth, upload.single('upload'), userController.addAvatar)
    router.get('/users/me/avatar', auth, userController.showAvatar)
}

module.exports.userRouter = userRouter