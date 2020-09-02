const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../features/users/user')
const Task = require('../../features/tasks/task')


const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'raj',
    email: 'raj@example.com',
    password: 'raj12345',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, 'hello')
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'palak',
    email: 'palak@example.com',
    password: 'palak123',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, 'hello')
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setUpDB = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    setUpDB: setUpDB,
    userOne,
    userOneId,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
}