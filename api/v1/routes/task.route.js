const express = require('express');
const router = express.Router();

const controller = require("../controllers/task.controller");

const Task = require("../../../models/task.model");
router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);
module.exports = router;