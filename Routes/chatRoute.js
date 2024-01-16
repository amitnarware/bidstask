const express = require('express');
const chat_Route = express.Router();


const {getchatid, postchat} = require("../controllers/chat")
chat_Route.post('/chat/send',postchat)
chat_Route.get('/chat/:user_id',getchatid);


module.exports = {chat_Route};