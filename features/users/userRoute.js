const userController = require('./userController')
const auth = require('../../middleware/auth')
const { upload } = require('../../middleware/multer')
const { access } = require('../../middleware/access')
const admin = require('../../middleware/admin')
const { route } = require('../../app')

const userRouter = (router) => {

    router.get('/users', access, userController.showAllUsers)
    router.post('/users/login', userController.login)
    router.post('/users/logout', auth, userController.logout)
    router.post('/users/logoutAll', auth, userController.logoutAll)
    router.post('/users', access, userController.insertUser)

    //
    router.get('/users/:_id', access, userController.getUserById);
    router.patch('/users/:_id', access, userController.updateUserById);
    router.delete('/users/:_id', access, userController.deleteUserById);
    //

    router.get('/users/profile/me', auth, userController.userProfile)
    router.patch('/users/me', auth, userController.updateUser)
    router.delete('/users/me', access, auth, userController.deleteUser)
    router.post('/users/me/avatar', auth, upload.single('upload'), userController.addAvatar)
    router.get('/users/me/avatar', auth, userController.showAvatar)
}

module.exports.userRouter = userRouter