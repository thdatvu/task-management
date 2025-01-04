const express = require("express");
const app = express();
const database = require("./config/database");
require("dotenv").config();
const port = process.env.PORT;

database.connect();

const Task = require("./models/task.model");

app.get("/tasks", async(req, res) => {
    const tasks = await Task.find({
        deleted: false
    });
    console.log(tasks);
    res.json(tasks);
});

app.get("/tasks/detail/:id", async(req, res) => {
    try {s
        const id = req.params.id;
    
        const tasks = await Task.findOne({
            _id: id,
            deleted : false
        })
        res.json(tasks);
    }catch{
        res.json("Not found");
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});