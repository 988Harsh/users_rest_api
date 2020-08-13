const Task = require('./task')
const taskService = require('./taskService')

const addTask = async (req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await taskService.saveTask(task)
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}

const listTasks = async (req, res) => {
    try {
        // const tasks = await taskService.listTasks(req.user._id)
        // await req.user.populate('tasks').execPopulate()  <-- For all tasks

        let match = {}
        let sort = {}

        if (req.query.sortBy) {
            const parts = req.query.sortBy.split(',')
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        }

        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
}

const fetchTask = async (req, res) => {
    const _id = req.params.id

    try {
        const task = await taskService.findTask(_id, req.user._id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
}

const updateTask = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await taskService.findTask(req.params.id, req.user._id)
        // const task = await taskService.findTask(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await taskService.saveTask(task)


        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id, req.user._id)
        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = {
    addTask: addTask,
    listTasks: listTasks,
    fetchTask: fetchTask,
    updateTask: updateTask,
    deleteTask: deleteTask
}