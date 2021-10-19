const express = require("express");
const date = require(__dirname + "/date.js")
const app = express();
const _ = require("lodash");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

const mongoose = require('mongoose');
const { MongoServerClosedError } = require('mongoose/node_modules/mongodb');
mongoose.connect("mongodb://localhost:27017/listDB");

const itemsSchema = new mongoose.Schema({
    content: String
});

const customListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    items: [itemsSchema]
})

const Item = mongoose.model("Item", itemsSchema);

const CustomList = mongoose.model("CustomList", customListSchema);

const c = new Item({
    content: "Eat"
})
const a = new Item({
    content: "Sleep"
})
const b = new Item({
    content: "Play"
})
const defaultItems = [a,b,c];

app.get("/", function(req, res){
    Item.find({}, function(err, foundItems){
        if (foundItems.length == 0){
            Item.insertMany(defaultItems, function(err){
                if (err){
                    console.log(err);
                } else {
                    console.log("default items successfuly saved");
                    
                }
            })
            res.redirect("/")
        } else {
            res.render('list', {listTitle: date.getDate(), newItems: foundItems});
        }
    });
});

app.post("/",function(req,res){
    const itemText = req.body.newItem;

    if (req.body.listType == date.getDate()){
        const item = new Item({
            content: itemText
        });
        item.save();
        res.redirect("/");
    } else { // If the list is not the default list
        CustomList.findOne({name: req.body.listType}, function(err, foundItem){ // Find current list that is being used
            foundItem.items.push({content: itemText});
            foundItem.save();
        })
        res.redirect("/" + req.body.listType);
    }
})
app.post("/delete", function(req,res){
    const itemToDelete = req.body.itemID;

    if (req.body.listType == date.getDate()){ // If the list is the default list
        Item.findByIdAndDelete(itemToDelete, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully deleted");
            }
        });
        res.redirect("/")
    } else { // If the list is not the default list
        CustomList.findOne({name: req.body.listType}, function(err, foundItem){ 
            foundItem.items.id(itemToDelete).remove();
            foundItem.save();
        })
        res.redirect("/" + req.body.listType);
    }
});

app.get("/:listURL", function(req, res){
    
    const listURL = _.lowerCase(req.params.listURL);

    CustomList.findOne({name: listURL}, function(err, foundItem){
        if (!foundItem){ //If the list currently does not exist, adds list item with URL as its name
            const list = new CustomList({
                name: listURL,
                items: defaultItems
                })
            console.log("Successfully added " + listURL + " to the custom list.");
            list.save();
            res.redirect("/" + listURL);
        } else {
            res.render('list', {listTitle: listURL, newItems: foundItem.items});
        }
    })
    
})

app.get("/about", function(req,res){
    res.render('about');
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
});