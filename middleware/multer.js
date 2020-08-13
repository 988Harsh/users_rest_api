const multer = require('multer')

const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024 * 3
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|svg)$/)) cb(new Error('Please upload an image!'))

        cb(undefined, true)
    }
})

module.exports.upload = upload