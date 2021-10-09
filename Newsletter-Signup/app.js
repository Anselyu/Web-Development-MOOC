const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({extended: true}));


app.listen(3000, function(){
    console.log("Listening on port 3000");
})