const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true})); 

app.get("/",function(require,response){

    response.sendFile(__dirname + "/index.html");
    // response.send("Server is running");
});

app.post("/",function(request,response){
    // response.send("Post recieved");
    // console.log();

    const location = request.body.cityName ;
    const apiKey = "6335fb2717888ffd43fb3f3ea703c648";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+ unit +"&q="+ location + "&appid="+ apiKey;
    https.get(url,function(res){
        console.log(res.statusCode);
        res.on('data',function(data) {
            // console.log(data)
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +  "@2x.png"
            // console.log(temperature);
            console.log(weatherData);
            // console.log(weatherDescription);
            // response.send('<h1> Temperature in Bhopal is  ' + temperature + '  degree celsius </h1>' + '<h2> The Weather is currently ' + weatherDescription +' </h2>');
// 
            response.write('<h1> Temperature in ' +location +'  is  ' + temperature + '  degree celsius </h1>');
            response.write( '<p> The Weather is currently ' + weatherDescription +' </p>');
            response.write('<img src='+ imageURL+'>')
            response.send();
        })
    })
})



app.listen(3000,function() {
    console.log("Server is running on port 3000...");
})

