const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
  
});

app.post("/", function(req, res){
    const query = req.body.cityName
    const unit = "metric"
    const appkey = "dbfe4c0d436a2e109e73ae6908e4bade"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${appkey}`;

    https.get(url, function(response){
        console.log(response)
        response.on("data", function(data){
            const weatherdata = JSON.parse(data)
            // console.log(weatherdata)
            const temp = weatherdata.main.temp
            // const city = weatherdata.name
            const description = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imageurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            // console.log(`Temperature of ${city} is ${temp} ${description}` )
            res.write(`<h1>Temperature of ${query} is ${temp} celcius </h1>`)
            res.write(`<p>${description}</p>`)
            res.write(`<img src=${imageurl}>`)
            res.send();

        })
    });

})

app.listen(3000, function(){
    console.log("Server started on port 3000")
});
