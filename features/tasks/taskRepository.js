const Task = require('./task')

const saveTask = async (task) => {
    await task.save()

}

const findTask = async (owner_id) => {
    return await Task.find({ owner: owner_id })
}

const findTaskById = async (_id, owner_id) => {
    // return await Task.findById(_id)
    return await Task.findOne({ _id, owner: owner_id })
}

const findByIdAndUpdate = async (_id, body, options) => {
    return await Task.findByIdAndUpdate(_id, body, options)
}

const findByIdAndDelete = async (_id, owner_id) => {
    return await Task.findOneAndDelete({ _id, owner: owner_id })
}

module.exports = {
    saveTask: saveTask,
    findTask: findTask,
    findTaskById: findTaskById,
    findByIdAndUpdate: findByIdAndUpdate,
    findByIdAndDelete: findByIdAndDelete
}