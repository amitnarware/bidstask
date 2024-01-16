const {connection} = require("../module/dbconfig")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const express = require('express');
const app = express();

const SECRET_KEY = "amit";

//  Registeration
let postregister = app.post("/register",async(req,res) => {
    const { username,password,role} =req.body;
    const hasedPassword = await bcrypt.hash(password,10);

    try {
        const result = await connection.query("INSERT INTO users (username,password,role) VALUES(?,?,?)",[username,hashpassword,role]);
        res.json({sucess:true, message:"user registered succesfully"})
    } catch(error){
        res.status(500).json({success:true,message:"Error in registering user"})
    }
});
  //   Authentication
  let postLogin = app.post("/Login",async(req,res) => {
    const {username,password} = req.body

    try {
        const user = await connection.query("SELECT * FROM users WHERE username = ?",[username]);

        if(user || user.length === 0){
            return res.status(400).json({success:false,message:"Authentication failed"})
        }
        const passwordMatch = await bcrypt.compare(password,user[0].password);
        if(passwordMatch){
            const token = jwt.sign({userId:user[0].id,username:user[0].username,role:user[0].role}, SECRET_KEY,{expiresIn:"1h"})
            res.json({sucess:true,token});
        } else{
            res.status(401).json({sucess:false,message:"Authentication failed"})
        }
    } catch(error){
        res.status(500).json({sucess:false,message:"Error in Authrntication"})
    }
  })
module.exports = {postregister,postLogin}
