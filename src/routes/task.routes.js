const express = require('express')
const app = express()

const Task = require('../models/task')


app.get('/', async(req, res) => {

    // let id = req.params.id

    const db = await Task.find({})
    console.log('db', db)
    res.json({
        db
    })
})

app.get('/:id', async(req, res) => {
    let id = req.params.id

    const db = await Task.findById(id, {})

    res.json({
        ok: true,
        db
    })

})

app.post('/', async(req, res) => {
    console.log('req.body', req.body)

    const { title, description } = req.body

    let task = new Task({
        title,
        description
    })

    await task.save()

    res.json({
        ok: true,
        task
    })
})

app.put('/:id', async(req, res) => {
    const {title, description} = req.body
    const taskUpdate = {title, description}

    let id = req.params.id;

    await Task.findByIdAndUpdate(id, taskUpdate)

    res.json({
        ok: true,
        taskUpdate
    })
})

app.delete('/:id', async(req, res) => {

    let id = req.params.id

    await Task.findByIdAndDelete(id)

    res.json({
        ok: true,
        result: 'task deleted'
    })

})


module.exports = app;