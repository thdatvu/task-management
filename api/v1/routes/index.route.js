
const taskRouters = require("./task.route");

module.exports = (app) => { 
    const version = "/api/v1"
    app.use(version+"/tasks", taskRouters);
    
   
}