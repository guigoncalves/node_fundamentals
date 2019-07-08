const express = require("express");
const app = express();

const userRoute = require('./routes/user');
const taskRoute = require('./routes/task');

require("./db/mongoose");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoute);
app.use(taskRoute);


app.listen(port, () => console.log("Listening to port: " + port))