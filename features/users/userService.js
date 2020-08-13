const userRepository = require('./userRepository')

const matchCredentials = async (email, pass) => {
    return await userRepository.matchCredentials(email, pass)
}

const saveUser = async (user) => {
    await userRepository.saveUser(user);
}

const listUsers = async () => {
    return await userRepository.findUser();
}

const findUser = async (_id) => {
    return await userRepository.findUserById(_id)
}

const updateUser = async (_id, body, options) => {
    return await userRepository.findByIdAndUpdate(_id, body, options)
}

const deleteUser = async (_id) => {
    await userRepository.findByIdAndDelete(_id)
}

module.exports = {
    saveUser: saveUser,
    listUsers: listUsers,
    findUser: findUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    matchCredentials: matchCredentials
}
