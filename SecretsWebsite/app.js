require('dotenv').config()
var md5 = require('md5');
const express = require("express");
const app = express();
//const encrypt = require('mongoose-encryption');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/userDB");



const userSchema = new mongoose.Schema({
    email: String,
    password: String
});


//userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res){
    res.render("home");
})
app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", function(req,res){
    const email = req.body.username;
    const password = req.body.password;
    
    User.findOne({email: email}, function(err, foundResult){
        if (err){
            console.log(err);
        } else {
            if (foundResult){
                bcrypt.compare(password, foundResult.password, function(err, result) {
                    if (result == true){
                        res.render("secrets");
                    } else {
                        res.send("Incorrect password");
                    }
                });
            } else {
                res.send("Incorrect password or username");
            }
        }
    })
})

app.get("/register", function(req, res){
    res.render("register");
})


app.post("/register", function(req, res){

    
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
        
        newUser.save(function(err){
            if(err){
                console.log(err);
            } else {
                res.render("secrets");
            }
        });
    });


   
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
