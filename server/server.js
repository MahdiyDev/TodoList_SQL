require('dotenv').config()
const express = require('express')
const pg = require('./pg/pg')

const app = express()

app.use(require('cors')())
app.use(express.json())

app.get('/todos', async (req, res) => {
    const todos = await pg('select * from todos')

    res.json(todos)
})

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params

        const foundTodo = await pg('select * from todos where id = $1', id)

        res.send(foundTodo[0])
    } catch (e) {
        res.send(e)
    }
})

app.post('/todos', async (req, res) => {
    try {
        const {des} = req.body

        if (des) {
            const newTodo = await pg('insert into todos(des_todo) values($1) returning *', des)
            res.json(newTodo[0])
        }

    } catch (error) {
        res.send(error)
    }

})

app.put('/todos/:id', async (req, res) => {
    try {
        const {des} = req.body
        const { id } = req.params

        const updateTodo = await pg('update todos set des_todo = $1 where id = $2 returning *', des, id)

        res.json(updateTodo[0])
    } catch (e) {
        res.send(e)
    }
})

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pg('delete from todos where id = $1', id)
        res.json('deleted')
    } catch (e) {
        res.send(e)
    }
})

app.listen(process.env.SEVER_PORT, () => {
    console.log(`http://localhost:${process.env.SEVER_PORT}`);
})