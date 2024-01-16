const express = require('express');
const AdminViewBids_Route = express.Router();


const {getbids,putProjectid} = require("../controllers/AdminViewBids")
AdminViewBids_Route.get('/bids',getbids)
AdminViewBids_Route.put('/projects/:id/activate',putProjectid);


module.exports = {AdminViewBids_Route};
