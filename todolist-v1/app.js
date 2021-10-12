const express = require("express");
const app = express();

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
app.get("/", function(req, res){

    var today = new Date();
    var currentDay = daysOfWeek[today.getDay()];

    res.render('list', {currentDay: currentDay});
});






app.listen(3000, function(){
    console.log("Listening on port 3000");
});