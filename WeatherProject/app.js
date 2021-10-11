const express = require("express");
const https = require("https");


const app = express();


app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){

   


res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    const location = req.body.city;
    const unitType = req.body.unitType;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&id=524901&appid=dd1c9c5f8d67c7fc5dd9ab250b2b6e6b&units=" + unitType;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data" , function(data){
        
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"; 
            
            
            
          
            res.write("<h1>The temperature in " + location + " is " + temp + " degrees.</h1>");
            res.write("<p>The weather is currently: " + description + ".</p>");
            res.write("<img src=" + icon +">");
            res.send();
        })
    });
})


app.listen(3000, function(){
    console.log("Listening on port 3000.");
})
