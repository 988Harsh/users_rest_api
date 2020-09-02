const sharp = require('sharp')
const User = require('./user')
const userService = require('./userService')
const Task = require('../tasks/task')

const login = async (req, res) => {
    try {
        const user = await userService.matchCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(` Error API ${error}`)
    }
}

const updateUserById = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await userService.updateUser(req.params._id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send({ error: 'No such user found' })
        }

        res.send(user)
    } catch (e) {
        res.status(400).send({ error: e })
    }
}

const deleteUserById = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params._id)

        if (!user) {
            return res.status(501).send({ error: 'no such user' })
        }

        res.send(user)
    } catch (e) {
        res.status(500).send({ error: 'failed!' })
    }
}

const getUserById = async (req, res) => {
    try {
        // console.log(req.params._id);
        const user = await User.findById(req.params._id)
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send({ error: 'Error fetching user' });
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
        // await userService.saveUser(req.user);
        req.user.save();
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
    // console.log("Here", req.originalUrl);
    try {
        let count = await User.count('_id');
        let users = await userService.listUsers(req.query.page);
        res.send({ users, count })

    } catch (err) {
        console.log(err);
        res.status(500).send({ error: "Error reading param" })
    }
}

const userProfile = async (req, res) => {
    // console.log(req.user);
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
    // console.log("Here!");
    try {
        await Task.find({ owner: req.user._id }).remove()
        await userService.deleteUser(req.user._id)
        res.status(200).send(req.user)
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
    showAllUsers: showAllUsers,
    getUserById: getUserById,
    updateUserById: updateUserById,
    deleteUserById: deleteUserById,
}


