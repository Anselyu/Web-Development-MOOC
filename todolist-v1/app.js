const express = require("express");
const date = require(__dirname + "/date.js")
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const mongoose = require('mongoose');
const { MongoServerClosedError } = require('mongoose/node_modules/mongodb');
mongoose.connect("mongodb://localhost:27017/listDB");

const itemsSchema = new mongoose.Schema({
    content: String
});

const Item = mongoose.model("Item", itemsSchema);

const workItem = mongoose.model("WorkItem", itemsSchema);

const items = ["Eat", "Sleep"];
const workItems = [];

//function updateDatabase()

// const c = new Item({
//     content: "Eat"
// })
// const a = new Item({
//     content: "Eat"
// })
// const b = new Item({
//     content: "Eat"
// })

// Item.insertMany([a, b, c], function(err){
    
// })




app.get("/", function(req, res){
    Item.find({}, function(err, foundItems){
        res.render('list', {listTitle: date.getDate(), newItems: foundItems});
    });
});

app.post("/",function(req,res){
    newItem = req.body.newItem;

    if (req.body.listType == "Work"){
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
    
})

app.get("/work", function(req,res){
    res.render('list', {listTitle: "Work Day", newItems: workItems})
})

app.get("/about", function(req,res){
    res.render('about');
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
});