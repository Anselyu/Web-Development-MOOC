// Initialize Express
const express = require("express");
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Initialize Mongoose
const mongoose = require('mongoose');
const { MongoServerClosedError } = require('mongoose/node_modules/mongodb');
mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function(req, res){ //Find all articles
    Article.find(function(err, foundArticles){ 
        if (!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
        
    });
    
})
.post(function(req, res){ //Add new article
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
.delete(function(req, res){ //Delete all articles
    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});
app.route("/articles/:articleTitle")
.get(function(req, res){ //Get one article
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if (foundArticle){
            res.send(foundArticle);
        } else {
            res.send("No articles found");
        }
    })
})
.put(function(req,res){ //Replace one article
    Article.replaceOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, function(err){
        if (!err){
            res.send("Successfully updated document");
        } else {
            res.send(err);
        }
    })
})
.patch(function(req,res){ //Update one article
    Article.updateOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, function(err){
        if (!err){
            res.send("Successfully updated document");
        } else {
            res.send(err);
        }
    })
})
.delete(function(req, res){ //Delete one article
    Article.deleteOne({title: req.params.articleTitle}, function(err){
        if (!err){
            res.send("Successfuly deleted article");
        } else {
            res.send(err);
        }
    });
});

app.listen(3000, function(){
    console.log("App listening on port 3000");
})
