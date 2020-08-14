const sharp = require('sharp')
const User = require('./user')
const userService = require('./userService')

const login = async (req, res) => {
    try {
        const user = await userService.matchCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(400).send("Error")
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await userService.saveUser(req.user)
        res.send("Logged Out")
    } catch (err) {
        res.status(500).send()
    }
}

const logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await userService.saveUser(req.user)
        res.send("Logged Out")
    } catch (err) {
        res.status(500).send()
    }
}

const insertUser = async (req, res) => {
    const user = new User(req.body)
    user.role = 'USER'
    try {
        await userService.saveUser(user)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

const showAllUsers = async (req, res) => {
    try {
        let users = await userService.listUsers();
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
}

const userProfile = async (req, res) => {
    res.send(req.user)
}


const updateUser = async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await userService.saveUser(req.user);
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }

}

const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.user._id)
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

const addAvatar = async (req, res) => {


    const buffer = await sharp(req.file.buffer)
        .resize({ width: 500, height: 500 })
        .png()
        .toBuffer()

    req.user.avatar = buffer

    await userService.saveUser(req.user)
    res.send()
}

const showAvatar = async (req, res) => {
    try {
        const user = await userService.findUser(req.user._id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (err) {
        res.status(500).send()
    }
}

module.exports = {
    insertUser: insertUser,
    userProfile: userProfile,
    updateUser: updateUser,
    deleteUser: deleteUser,
    login: login,
    logout: logout,
    logoutAll: logoutAll,
    addAvatar: addAvatar,
    showAvatar: showAvatar,
    showAllUsers: showAllUsers
}


