const express=require("express");
const app=express();
const path=require("path");
const port=5080;
app.listen(port,()=>{
    console.log(`listning at ${port}`);
});

app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.get("/",(req,res)=>{
    console.log("hello");
    res.render("home.ejs");
});
app.get("/home",(req,res)=>{
    console.log("home page");
    res.send("HOme Page");
});

app.get("/ig/:username",(req,res)=>{
    const instadata=require("./data.json");
    console.log(instadata);
    let {username}=req.params;
    const data=instadata[username];
    console.log(data);
    if(data){
        res.render("insta.ejs",{data});
    }else{
        res.render("notfound.ejs");
    }
});