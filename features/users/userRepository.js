const User = require('./user')

const matchCredentials = async (email, pass) => {
    return await User.findByCredentials(email, pass)
}

const saveUser = async (user) => {
    await user.save()

}

const findUser = async () => {
    return await User.find({})
}

const findUserById = async (_id) => {
    return await User.findById(_id)
}

const findByIdAndUpdate = async (_id, body, options) => {
    return await User.findByIdAndUpdate(_id, body, options)
}

const findByIdAndDelete = async (_id) => {
    await User.findByIdAndDelete(_id)
}

module.exports = {
    saveUser: saveUser,
    findUser: findUser,
    findUserById: findUserById,
    findByIdAndUpdate: findByIdAndUpdate,
    findByIdAndDelete: findByIdAndDelete,
    matchCredentials: matchCredentials
}