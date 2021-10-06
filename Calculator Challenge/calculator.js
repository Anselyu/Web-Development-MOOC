const express = require("express");

const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

    num1 = Number(req.body.num1);
    num2 = Number(req.body.num2);


    res.send("Your number is: " + (num1 + num2));
})
app.listen(3000, function(){
    console.log("Server started on port 3000");
})