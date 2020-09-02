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

        if (req.role === 'ADMIN') {
            const tasks = await Task.find({}, null, { limit: 3, skip: (req.query.page - 1) * 3 })
            const count = await Task.count('_id');
            // console.log(count, " ", tasks);
            res.status(200).send({ tasks, count })
        }

        let match = {}
        let sort = {}

        // if (req.query.sortBy) {
        //     const parts = req.query.sortBy.split(',')
        //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        // }

        // if (req.query.completed) {
        //     match.completed = req.query.completed === 'true'
        // }
        let count = await Task.count({ owner: req.user._id });
        // console.log(count);
        await req.user.populate({
            path: 'tasks',
            // match,

            options: {
                limit: 3,
                skip: (req.query.page - 1) * 3,
                // sort
            }
        }).execPopulate()
        let tasks = req.user.tasks;
        res.send({ tasks, count })
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

const showAllTasks = async (req, res) => {
    console.log("Here");
    try {
        const tasks = await Task.find({}, null, { limit: 3, skip: (req.query.page - 1) * 3 })
        const count = await Task.count('_id');
        console.log(count, " ", tasks);
        res.status(200).send({ tasks, count })
    } catch (error) {
        res.status(400).send({ error: "Error fetching tasks" });
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
            res.status(404).send({ error: "No such task!" })
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
    deleteTask: deleteTask,
    showAllTasks: showAllTasks,
}