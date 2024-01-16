const {connection} = require("../module/dbconfig")
const { authenticateUser } = require("../middleware/authentication");
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const app = express();

const server = http.createServer(app);
const io = socketIo(server);


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle chat messages
    socket.on('chat:message', (message) => {
        io.emit('chat:message', message); // Broadcast the message to all connected clients
    });
});


let postchat = app.post('/chat/send', authenticateUser, (req, res) => {
    const { receiver_id, content } = req.body;
    const sender_id = req.userId; // Extracted from JWT authentication middleware

    try {
        // Emit the message to the receiver and sender
        io.emit(`chat:${receiver_id}`, { sender_id, content });
        io.emit(`chat:${sender_id}`, { sender_id, content });

        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending message' });
    }
});

// Get Messages for a User
let getchatid = app.get('/chat/:user_id', authenticateUser, (req, res) => {
    const { user_id } = req.params;
    const current_user_id = req.userId; // Extracted from JWT authentication middleware

    // Listen for chat messages related to the current user and the specified user
    io.on('connection', (socket) => {
        // Listen for messages for the current user
        socket.on(`chat:${current_user_id}`, (message) => {
            // Process the message, e.g., save it to the database
            // ...
        });

        // Listen for messages for the specified user
        socket.on(`chat:${user_id}`, (message) => {
            // Process the message, e.g., save it to the database
            // ...
        });
    });

    // Retrieve messages from the database for the specified user
    try {
        // Fetch messages from the database
        // ...

        res.json({ success: true, messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching messages' });
    }
});
module.exports = { getchatid, postchat}

