const User = require('../features/users/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'hello')

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (req.originalUrl === '/users/' && req.method === 'GET') {
            if (user.role === 'ADMIN') next()
            else res.status(401).send('You are not Authorized to access this page!!')
        }
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
    } catch (err) {
        res.status(400).send("error: Please Authenticate First!")
    }
    next()
}

module.exports = auth