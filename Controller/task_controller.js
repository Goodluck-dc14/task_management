const task_model = require('../Model/task_model');
const user_model = require('../Model/user_model');
const mongoose = require('mongoose');

const create_task = async (req, res) => {
    try {
        const id = req.user.id;
        const { title, description, due_data, priority } = req.body;
        const user = await user_model.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        if (!title) {
            return res.status(400).json({ message: "title is required to perform operation" });
        }
        const taskData = await task_model({
            title,
            description,
            due_data,
            priority
        });

        taskData.user = user;
        taskData.save();

        user.task.push(new mongoose.Types.ObjectId(taskData._id));
        user.save();

        res.status(201).json({
            status: "Success",
            message: "Task was created successfully",
            data: taskData
        });
    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

const get_task = async (req, res) => {
    try {
        const id = req.params.conversationId;

        const task = await task_model.find();

        if (task < 1) {
            return res.status(404).json({ message: "this collection is empty" });
        }

        res.status(200).json({
            status: "Success",
            data: task
        });
    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

const get_task_detail = async (req, res) => {
    try {
        const id = req.params.taskId;

        const task = await task_model.findById(id);
        if (!task) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({
            status: "Success",
            data: task
        });
    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

const update_task = async (req, res) => {
    try {
        const id = req.params.taskId;
        const task = await task_model.findById(id);
        if (!task) {
            return res.status(404).json({ message: "No data found" });
        }

        const taskUpdate = await task_model.findByIdAndUpdate(task._id, req.body, { new: true });

        res.status(200).json({
            status: "Success",
            message: "task updated successfully",
            data: taskUpdate
        });
    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

const delete_task = async (req, res) => {
    try {
        const id = req.params.taskId;
        const task = await task_model.findById(id);
        if (!task) {
            return res.status(404).json({ message: "No data found" });
        }

        await task_model.findByIdAndDelete(task._id);

        res.status(200).json({
            status: "Success",
            message: "task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "An error Occured",
            message: error.message
        });
    }
};

module.exports = {
    create_task,
    get_task,
    get_task_detail,
    update_task,
    delete_task
};
