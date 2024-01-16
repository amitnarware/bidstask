const {connection} = require("../module/dbconfig")
const { authenticateUser } = require("../middleware/authentication");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const SECRET_KEY = "amit";

 let getbids = app.get("/bids", authenticateUser,async(req,res) => {
    const user_id = req.UserId;  // Extracted from JWT authenticate middleware

    try{
      let bids = await connection.query("SELECT * FROM bids WHERE user_id = ?",[user_id]);
      res.json({success:true,bids})
    } catch (error){
        res.status(500).json({success:true,message:"Error fetch bids"});
    }
})

// Activate project
let putProjectid =  app.put("/projects/:id/activate", authenticateUser,async(req,res) => {
   let project_id = req.params.id;

   try{
    const result = await connection.query("UPDATE projects SET active = true WHERE id = ?",[project_id]);
    res.json({success:true,message:"Project activated succesfully"});

   } catch (error){
    res.status(500).json({success:false,message:"Error in acytivating project"});
   }
})

module.exports = {getbids,putProjectid}