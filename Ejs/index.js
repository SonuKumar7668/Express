const express=require("express");
const app=express();
const port=5080;
app.listen(port,()=>{
    console.log(`listning at ${port}`);
});

app.get("/",(req,res)=>{
    res.send("Welcome to the EJS server ");
});