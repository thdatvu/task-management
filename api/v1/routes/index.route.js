
const taskRouters = require("./task.route");
const userRouters = require("./user.route");

module.exports = (app) => { 
    const version = "/api/v1"
    app.use(version+"/tasks", taskRouters);
    app.use(version+"/users", userRouters);
    
}