const express = require('express');
const Project_Route = express.Router();


const { getbids,postprojects} = require("../controllers/Project")
Project_Route.post('/projects', postprojects )
Project_Route.get('/bids', getbids);


module.exports = {Project_Route};