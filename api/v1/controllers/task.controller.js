const Task = require("../../../models/task.model");
const paginationHelper = require("../../../helpers/pagination")
const searchHelper = require("../../../helpers/search")

//[GET] api/v1/tasks
module.exports.index = async(req, res) => {
    const find = {
        deleted: false
    }
    if(req.query.status) {
        find.status = req.query.status;
    }
    const objectSearch = searchHelper(req.query);
    if(req.query.keyword) {
        find.title = objectSearch.regex;
    }
    //Pagination
    let initPagination = {
        currentPage:1,
        limitItems:2
    }
    const countTasks = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    );
    //End pagination
    //Sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
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