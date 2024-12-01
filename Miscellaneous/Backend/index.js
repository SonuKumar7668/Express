const express=require("express");
const app=express();
const port =8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port,()=>{
    console.log("listening at ",port);
});

app.get("/register",(req,res)=>{
    let {user,password}=req.query;
    console.log(user);
    res.send(`standerd GET response, Welcome ${user}`);
});

app.post("/register",(req,res)=>{
    let {user,password}=req.body;
    console.log(req.body);
    res.send(`standerd POST response, Welcome ${user}`);
});