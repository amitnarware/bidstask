const express = require('express');
const UserRegis_Route = express.Router();


const {postregister,postLogin} = require("../controllers/UserRegistration")
UserRegis_Route.post('/register',postregister)
UserRegis_Route.post('/login',postLogin);


module.exports = {UserRegis_Route};