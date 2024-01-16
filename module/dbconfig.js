let mysql = require('mysql')
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Project_Manegement_System" // owastrule security   // android studio must read this topic
});
connection.connect(function(err){
    if(err){
        console.log("Not Connected",err.sqlMessage)}
   else{
    console.log("connected")
   }
})  

module.exports = {connection}; 