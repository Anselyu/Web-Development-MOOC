const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var items = [];
var workItems = [];
var newItem = "";

app.get("/", function(req, res){

    let today = new Date();

    let options = {
        day: "numeric",
        weekday: "long",
        month: "long"
    }

    let currentDay = today.toLocaleDateString("en-US", options);

    res.render('list', {listTitle: currentDay, newItems: items});
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


app.listen(3000, function(){
    console.log("Listening on port 3000");
});