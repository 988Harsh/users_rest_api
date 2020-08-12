const express = require('express')
const User = require('./user')
const userController = require('./userController')
const router = new express.Router()

router.post('/users', userController.userPost)
router.get('/users', userController.userGet)
router.get('/users/:id', userController.userGetId)
router.patch('/users/:id', userController.userPatch)
router.delete('/users/:id', userController.userDelete)

module.exports = router