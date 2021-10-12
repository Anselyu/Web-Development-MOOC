const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

//const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var items = [];
var newItem = "";

app.get("/", function(req, res){

    var today = new Date();

    var options = {
        day: "numeric",
        weekday: "long",
        month: "long"
    }

    var currentDay = today.toLocaleDateString("en-US", options);

    res.render('list', {currentDay: currentDay, newItems: items});
});

app.post("/",function(req,res){
    newItem = req.body.newItem;
    items.push(newItem);
    res.redirect("/");
})





app.listen(3000, function(){
    console.log("Listening on port 3000");
});