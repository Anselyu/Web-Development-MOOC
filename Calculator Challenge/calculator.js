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


app.get("/bmiCalculator",function(req,res){
    res.sendFile(__dirname + "/bmiCalculator.html");
})
app.post("/bmiCalculator",function(req,res){
    weight = parseFloat(req.body.weight);
    height = parseFloat(req.body.height);

    var BMI = weight / (height * height);
    res.send("Your BMI is: " + BMI);
})


app.listen(3000, function(){
    console.log("Server started on port 3000");
})