const { response } = require("express");
const express = require("express");
const app = express();
// const _ = require("lodash");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const mongoose = require('mongoose');
const { MongoServerClosedError } = require('mongoose/node_modules/mongodb');
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

// app.get("/", function(req, res){
//     res.send("hello world");
// })


app.get("/articles", function(req, res){
   
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
        
    });
    
});



app.listen(3000, function(){
    console.log("App listening on port 3000");
})
