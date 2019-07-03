const express = require("express");
const app = express();
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
    const user = new User(req.body);

    user.save()
    .then(result => {
        return res.status(201).send(result);
    })
    .catch(error => {
        return res.status(400).send(error);
    });
});

app.post("/tasks", (req, res) => {
    const task = new Task(req.body);

    task.save()
    .then(result => {
        return res.status(201).send(result);
    })
    .catch(error => {
        return res.status(400).send(error);
    });
});

app.get("/users", (req, res) => {
    User.find({})
    .then(result => {
        return res.send(result);
    })
    .catch(err => {
        return res.status(500).send(err);
    })
});


app.get("/users/:id", (req, res) => {
    const _id = req.params.id;

    User.findById(_id)
    .then(result => {
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    })
    .catch(err => {
        res.status(500).send();
    })
})

app.get("/tasks", (req, res) => {
    Task.find({})
    .then(result => {
        return res.send(result);
    })
    .catch(err => {
        return res.status(500).send(err);
    })
});

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;

    Task.findById(_id)
    .then(result => {
        if (!result) {
            return res.status(404).send();
        }
        res.send(result);
    })
    .catch(err => {
        res.status(500).send();
    })
})


app.listen(port, () => console.log("Listening to port: " + port))