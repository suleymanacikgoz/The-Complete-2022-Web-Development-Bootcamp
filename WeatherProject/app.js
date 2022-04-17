const express = require("express")
const https= require("https")
const bodyParser = require("body-parser")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res){
    const query=req.body.cityName
    const apiKey="ded09d2df4eea4c5562c3b99b5ad569b"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units="+unit
    https.get(url,function(response){
        
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription= weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL="http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write("<p>The weather is currently "+ weatherDescription + "<p>")
            res.write("the temperature in "+query+  " is "+temp+" degree celcius")
            res.write("<img src=" + imageURL +">")
            res.send()
            const deneme=weatherData.name
            console.log(deneme)
            console.log(temp)
            console.log(weatherDescription)
        })

    })
    
})



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})