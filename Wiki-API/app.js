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

//app.route("/articles").get().post.delete

app.route("/articles").
get(function(req, res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
        
    });
    
})
.post(function(req, res){
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(err){
            res.send(err);
        } else {
            res.send("Successfully added a new article.")
        }
    });
})
.delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

app.route("/articles/:articleTitle")
.get(function(req, res){
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if (foundArticle){
            res.send(foundArticle);
        } else {
            res.send("No articles found");
        }
    })
});

app.listen(3000, function(){
    console.log("App listening on port 3000");
})
