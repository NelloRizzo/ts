import { Application } from 'express'
import express from 'express'

import { ToDoExtractor, UserExtractor, Aggregator } from './es.js'

const port = 8888
const app = express()

app.get("/users", async (req, res) => {
    const user = new UserExtractor()
    res.send(await user.get())
})

app.get("/todos", async (req, res) => {
    const todo = new ToDoExtractor()
    res.send(await todo.get())
})

app.get("/", async (req, res) => {
    const agg = new Aggregator()
    res.send(await agg.get())
})

app.listen(port, () => console.log(`Server start listening at ${new Date()} on port ${port}...`))