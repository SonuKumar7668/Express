const express=require("express");
const app=express();
const path=require("path");
const port =5090;

app.listen(port,()=>{
    console.log("dice is listening");
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    // console.log("check");
    let dice=Math.floor(Math.random()*6+1)
    res.render("rolldice.ejs",{rolldice:dice});
});