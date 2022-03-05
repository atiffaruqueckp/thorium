const express = require('express');
const moment = require("moment");
const requestIp = require("request-Ip")
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(requestIp.mw({ attributeName: 'customIp' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next) {
    let date = moment().format("MMMM Do YYYY, h:mm:ss")
    let ip = req.customIp
    let url = req.url
    console.log(date, ip, url)
    next()
    

});

mongoose.connect("mongodb+srv://taabish:lkmgsyjhwbQYgkvX@cluster0.cp3ka.mongodb.net/atif1234?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

/*<!-- ASSIGNMENT:- -->
Write a middleware that logs (console.log) some data everytime any API is hit
Data to be logged:-the current timestamp(as date time) , the IP of the 
user and the route being requested).
For this first figure out how to get the route location being requested, how to
 get current timestamp and how to get the IP.
NOTE: ip of local computer will come as ::1 so dont get disturbed by seeing this)

e.g: you should be logging something like this on each line:
time , IP, Route should be printed on each line in terminal( every time an api is hit)
2010-08-19 14:00:00 , 123.459.898.734 , /createUser
2010-08-19 14:00:00 , 123.459.898.734 , /basicAPi
2010-08-19 14:00:00 , 123.459.898.734 , /falanaAPI */