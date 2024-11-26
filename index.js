const express=require('express');
const app=express();

let port=3000

app.listen(port,()=>{
    console.log("app is listening ");
})

app.get("/",(req,res)=>{
    res.send("Welcome to the server ");
});

app.get("/:username/:id",(req,res)=>{
    let {username,id}=req.params;
    let htmlstr=`<h1>Welcome to the page of @${username}</h1>`
    // res.send(`Welcome to the page of @${username}`);
    res.send(htmlstr);
});

app.get("/search",(req,res)=>{
    let {q}=req.query;
    if(!q){
        res.send("Nothing Searched");
    }
    console.log(req.query);
    res.send(`search result ${q}`);
})