require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine","ejs" );
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
res.render("home");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
        const units = "metric";
        const url = (`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.APIKEY}&units=${units}`);

        https.get(url,function(response){

        response.on("data",function(data){
             const weatherData =  JSON.parse(data);
             if(weatherData.cod==="404"){
                const message=weatherData.message;
                const temp = "";
                 const desc = "";
                 const img = "";
                 const query="";
                res.render("weather",{message,desc,temp,img,query});
            }else{
                const message="";
                const temp = `${weatherData.main.temp} &deg; C`;
                 const desc = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                 const img = "https://openweathermap.org/img/wn/" + icon +"@2x.png";
         res.render("weather",{desc,temp,img,query,message});
            }    
        });
        }); 
});

        
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
});
