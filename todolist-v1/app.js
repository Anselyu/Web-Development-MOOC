const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

var items = [];
var newItem = "";

app.get("/", function(req, res){

    let today = new Date();

    let options = {
        day: "numeric",
        weekday: "long",
        month: "long"
    }

    let currentDay = today.toLocaleDateString("en-US", options);

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