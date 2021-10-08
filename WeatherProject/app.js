const express = require("express");
const https = require("https");


const app = express();

app.get("/", function(req, res){

    url = "https://api.openweathermap.org/data/2.5/weather?q=Markham&id=524901&appid=dd1c9c5f8d67c7fc5dd9ab250b2b6e6b";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
        })
    });


    res.sendFile(__dirname + "/index.html");
})


app.listen(3000, function(){
    console.log("Listening on port 3000.");
})
