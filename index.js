const express = require("express");
const bodyParser = require ("body-parser");
const cors = require('cors')
const app = express();
const database = require("./config/database");

const routeApiVer1 = require("./api/v1/routes/index.route")
require("dotenv").config();
const port = process.env.PORT;

database.connect();
// parse application/json
app.use(bodyParser.json());
app.use(cors());
routeApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});