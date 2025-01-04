const express = require("express");
const app = express();
const database = require("./config/database");

const routeApiVer1 = require("./api/v1/routes/index.route")
require("dotenv").config();
const port = process.env.PORT;

database.connect();

routeApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});