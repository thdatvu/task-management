const Task = require("../../../models/task.model");

//[GET] api/v1/tasks
module.exports.index = async(req, res) => {
    const find = {
        deleted: false
    }
    if(req.query.status) {
        find.status = req.query.status;
    }
    //Sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    const tasks = await Task.find(find).sort(sort);
    //End Sort
    res.json(tasks);
};
//[GET] api/v1/tasks/detail/:id
module.exports.detail = async(req, res) => {
    try {
        const id = req.params.id;
        
        const tasks = await Task.findOne({
            _id: id,
            deleted : false
        })
       
        res.json(tasks);
    }catch{
        res.json("Not found");
        
    }
};