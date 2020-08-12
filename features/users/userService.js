const user_repo = require('./userRepository')

const saveUser = async (user) => {
    await user_repo.saveUser(user);
}

const listUsers = async () => {
    return await user_repo.findUser();
}

const findUser = async (_id) => {
    return await user_repo.findUserById(_id)
}

const updateUser = async (_id, body, options) => {
    return await user_repo.findByIdAndUpdate(_id, body, options)
}

const deleteUser = async (_id) => {
    await user_repo.findByIdAndDelete(_id)
}

module.exports = {
    saveUser: saveUser,
    listUsers: listUsers,
    findUser: findUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
