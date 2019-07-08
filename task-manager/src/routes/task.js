const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);

    try  {
        await task.save();
        return res.status(201).send(task);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get("/tasks", (req, res) => {
    Task.find({})
    .then(result => {
        return res.send(result);
    })
    .catch(err => {
        return res.status(500).send(err);
    })
});

router.get("/tasks/:id", (req, res) => {
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
});

router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates'});
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
        if (!task) {
            return res.status(404).send()
        }
        res.send(task);
    } catch(e) {
        return res.status(500).send(e);
    }
});


router.delete('/tasks/:id', (req, res) => {
    try {
        const user = Task.findByIdAndDelete(req.params.id);

        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        return res.status(500).send()
    }
});

module.exports = router;