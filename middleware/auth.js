const User = require('../features/users/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, 'hello')
        const role = decoded.role;
        console.log(role);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        req.role = role
    } catch (err) {
        console.log(err);
        res.status(401).send("error: Please Authenticate First!")
    }
    next()
}

module.exports = auth