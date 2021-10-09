const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req , res){
    firstName = req.body.firstName;
    lastName = req.body.lastName;
    email = req.body.email;

    console.log("First Name: " + firstName + " Last Name: " + lastName + " Email: " + email);
});


app.listen(3000, function(){
    console.log("Listening on port 3000");
})