const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "63e75f0921462737554f3afa423e5d72",
  server: "us5"
});



app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {

    var userData = {
    members: [{
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
        FNAME: req.body.firstName,
        LNAME: req.body.lastName
      }
    }],};
   
   const run = async () => {
      const response = await mailchimp.lists.batchListMembers("138ef0e7c4", userData );
      console.log(response);
    };
    run();
   
  })

app.listen(3000, function(){
    console.log("Listening on port 3000");
})

