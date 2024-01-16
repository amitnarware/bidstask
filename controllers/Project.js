const {connection} = require("../module/dbconfig")
const { authenticateUser } = require("../middleware/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const SECRET_KEY = "amit";

// Create Project
  let postprojects = app.post("/projects",authenticateUser, async(req,res) => {
    const {tittle,description,expire_date} = req.body;

    try{
        const result = await connection.query("INSERT INTO projects(title,description,expire_date) VALUES(?,?,?)",[tittle,description,expire_date]);
        res.json({sucess:true,messsage:"Project created successfully"});
    } catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error creating project"})
    }
})

//  Bid Submission
 let getbids = app.get("/bids",authenticateUser, async(req,res) => {
    const {project_id,amount} = req.body;
    const user_id = req.userId;  // Extracted from jwt authentication middleware

    try{
        const result = await connection.query("INSERT INTO bids(user_id,project_id,amount) VALUES(?,?,?)",[user_id,project_id,amount]);
        res.json({success:true,message:"Bid submittes successfully"})
    } catch(err){
        res.status(500).json({succes:false,message:"Error in submitting bid"})
    }
})

module.exports = { getbids,postprojects }