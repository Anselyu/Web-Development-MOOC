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

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    
    async function run() {
        const response = await mailchimp.lists.addListMember("138ef0e7c4", {
            email_address: user.email,
            status: "subscribed",
            merge_fields: {
                FNAME: user.firstName,
                LNAME: user.lastName
            }
        });
            console.log(response);
    };
        run();
        res.send("hello world");
})

app.listen(3000, function(){
    console.log("Listening on port 3000");
})

