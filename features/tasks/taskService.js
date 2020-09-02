const taskRepository = require('./taskRepository')

const saveTask = async (task) => {
    await taskRepository.saveTask(task);
}

const listTasks = async (owner_id) => {
    return await taskRepository.findTask(owner_id);
}

const findTask = async (_id, owner_id) => {
    return await taskRepository.findTaskById(_id, owner_id)
}

const updateTask = async (_id, body, options) => {
    return await taskRepository.findByIdAndUpdate(_id, body, options)
}

const deleteTask = async (_id, owner_id) => {
    return await taskRepository.findByIdAndDelete(_id, owner_id)
}

module.exports = {
    saveTask: saveTask,
    listTasks: listTasks,
    findTask: findTask,
    updateTask: updateTask,
    deleteTask: deleteTask
}
