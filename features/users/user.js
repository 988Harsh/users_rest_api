const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../tasks/task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    role: {
        type: String,
        default: 'USER',
        hidden: true
    }
}, {
    timestamps: true
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.role

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'hello')

    user.tokens = user.tokens.concat({ token: token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    let isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user

}

//Hashing password
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        const hash = await bcrypt.hash(user.password, 8)
        user.password = hash
    }

    next()
})

userSchema.pre('remove', async function () {
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next()
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User