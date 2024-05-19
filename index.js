const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./Utils/db");
const user_router = require("./Routers/user_router");
const task_router = require('./Routers/task_router');
const mongoose = require('mongoose');

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "Connected to Chat_App DataBase"
    });
});

app.use("/api/user", user_router);
app.use("/api/task", task_router);

const server = app.listen(port, () => {
    console.log("Listening To Server");
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('User Connected to socket.io');
    socket.on('setup', (userId) => {
        socket.join(userId); socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User Join Room: ' + room);
    });

    socket.on('new task', (newTask) => {
        let chat = newTask;
        // const user = getUser(recieverId);
        if (!chat.sendeId) return console.log('chat.user not defined');
        // if (chat.newTask.sendeId ) return;

        socket.in(newTask.conversationId).emit('message recieved', newTask);
    });
});

