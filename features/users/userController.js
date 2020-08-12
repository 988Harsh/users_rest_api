const User = require('./user')
const user_service = require('./userService')

const userPost = async (req, res) => {
    const user = new User(req.body)
    try {
        await user_service.saveUser(user)
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

const userGet = async (req, res) => {
    try {
        const users = await user_service.listUsers()
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
}

const userGetId = async (req, res) => {
    const _id = req.params.id

    try {
        const user = await user_service.findUser(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

const userPatch = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await user_service.updateUser(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

const userDelete = async (req, res) => {
    try {
        const user = await user_service.deleteUser(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    userPost: userPost,
    userGet: userGet,
    userGetId: userGetId,
    userPatch: userPatch,
    userDelete: userDelete
}


