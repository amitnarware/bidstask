const {connection} = require("./module/dbconfig")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

    //Admin ROUTE 
const {AdminViewBids_Route} = require('./Routes/AdminViewBids');
app.use('/api',AdminViewBids_Route)
       //   Chat Route
const {chat_Route} = require('./Routes/chatRoute');
app.use('/api',chat_Route)
        // Project Route
const {Project_Route} = require('./Routes/ProjectRoute');
app.use('/api',Project_Route)
       //  User registeration route
const {UserRegis_Route} = require('./Routes/UserRegisRoute');
app.use('/api',UserRegis_Route)
        
app.get("/",function(req,res)  {
    res.send("hii i am amit ")
})
app.listen(3000,() => {
    console.log("server is running on 3000")
})