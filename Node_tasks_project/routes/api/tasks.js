// routes/api/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');

// Create a task
router.post('/', async (req, res) => {
    try {
        const taskObject = {
            title: req.body.title,
            status: req.body.status || "Pending",
            date: req.body.date || new Date(),
        };
        const task = new Task(taskObject);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Get one task
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Update one task
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const taskBody = {
            title: req.body.title,
            status: req.body.status,
            date: req.body.date,
        };
        const updatedTask = await Task.findByIdAndUpdate(id, taskBody, { new: true });

        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Delete one task
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (deletedTask) {
            res.json({ message: "Task has been deleted" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Delete all tasks
router.delete('/', async (req, res) => {
    try {
        await Task.deleteMany({});
        res.json({ message: "All tasks have been deleted" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;