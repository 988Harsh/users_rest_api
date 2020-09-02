const jwt = require('jsonwebtoken')
const admin = (req, res, next) => {

    try {
        console.log("here");
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'hello')
        console.log(decoded.role);
        if (decoded.role !== 'ADMIN')
            res.status(401).send({ error: "You need Admin rights for this!!" })
        else next()
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "failed to check admin!" })
    }
}

module.exports = admin;

