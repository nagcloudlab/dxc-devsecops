
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();


const { MongoClient, ServerApiVersion } = require("mongodb");

const mongoUri = "mongodb://localhost:27017";
const client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

router.get('/top5', (req, res) => {
    const db = client.db("todosdb");
    const todosCollection = db.collection("todos");
    // Async IO
    todosCollection.find().limit(5).toArray()
        .then(todos => {
            res.json(todos);
        })
        .catch(err => {
            console.error("Error fetching top todos:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});
router.delete('/:todoId', (req, res) => {
    const todoId = req.params.todoId;
    const db = client.db("todosdb");
    const todosCollection = db.collection("todos");
    todosCollection.deleteOne({ _id: Number.parseInt(todoId) })
        .then(result => {
            if (result.deletedCount === 1) {
                res.status(200).json({ message: "Todo deleted successfully" });
            } else {
                res.status(404).json({ error: "Todo not found" });
            }
        })
        .catch(err => {
            console.error("Error deleting todo:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

router.post('/', bodyParser.json(),(req, res) => { 

    const body = req.body;
    const title = body.title;
    const completed = body.completed || false;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const newTodo = {
        title: title,
        completed: completed,
    };

    const db = client.db("todosdb");
    const todosCollection = db.collection("todos");
    todosCollection.insertOne(newTodo)
        .then(result => {
            res.status(201).json({ message: "Todo created successfully", todo: result });
        })
        .catch(err => {
            console.error("Error creating todo:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});



module.exports = router;