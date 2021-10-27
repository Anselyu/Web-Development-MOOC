require('dotenv').config()
// var md5 = require('md5');
const express = require("express");
const app = express();
//const encrypt = require('mongoose-encryption');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

//userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("home");
})
app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", passport.authenticate("local"), function(req,res){ 
    res.redirect("/secrets");
});
    
//     Updated to use password.js instead
//     const email = req.body.username; 
//     const password = req.body.password;
    
//     User.findOne({email: email}, function(err, foundResult){
//         if (err){
//             console.log(err);
//         } else {
//             if (foundResult){
//                 bcrypt.compare(password, foundResult.password, function(err, result) {
//                     if (result == true){
//                         res.render("secrets");
//                     } else {
//                         res.send("Incorrect password");
//                     }
//                 });
//             } else {
//                 res.send("Incorrect password or username");
//             }
//         }
//     })

app.get("/register", function(req, res){
    res.render("register");
})

app.get("/secrets", function(req,res){
    if(req.isAuthenticated()){
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.post("/register", function(req, res){

    User.register({username: req.body.username}, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            })
        }
    })

    // Updated to use password.js 
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash
    //     });
        
    //     newUser.save(function(err){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             res.render("secrets");
    //         }
    //     });
    // });

})

app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
