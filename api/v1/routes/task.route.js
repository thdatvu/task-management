const express = require('express');
const router = express.Router();

//const controller = require("../../controllers/client/task.controller");

const Task = require("../../../models/task.model");
router.get("/", async(req, res) => {
    const tasks = await Task.find({
        deleted: false
    });
    console.log(tasks);
    res.json(tasks);
});

router.get("/detail/:id", async(req, res) => {
    try {
        const id = req.params.id;
        
        const tasks = await Task.findOne({
            _id: id,
            deleted : false
        })
        console.log(tasks)
        res.json(tasks);
    }catch{
        res.json("Not found");
        
    }
});

module.exports = router;