const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    console.log("Welcome to my server!");
});






app.listen(3000, function(){
    console.log("Listening on port 3000");
});