const express = require("express");
const app=express();
const port=3000;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverride =require("method-override")
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let posts=[
    {
        id: uuidv4(),
        username: "Yash",
        content: "Be the game changer"
    },
    {
        id: uuidv4(),
        username: "sonu",
        content: "Winter is comming"        
    },
    {
        id: uuidv4(),
        username: "ujjwal",
        content: "I don't know what the fuck I am doing"
    },
    {
        id: uuidv4(),
        username: "shubham",
        content: "JAVA for life"
    },
    {
        id: uuidv4(),
        username: "naruto",
        content: "Dattebayoooo!!!!!"
    }

]

app.use(methodoverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log("port is listening at 3000");
});

app.get("/",(req,res)=>{
    res.send("server working well");
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    // console.log(req.body);
    let id=uuidv4()
    posts.push({id,username,content});
    console.log(username,content);
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id=== p.id);
    console.log(post);
    res.render("post.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    console.log("----");
    let {id}=req.params;
    console.log("body ",req.body.content);
    // console.log("id ",id);
    let post=posts.find((p)=> id=== p.id);
    let newContent = req.body.content;
    res.redirect("/posts");
    post.content=newContent;
    console.log("new content ",newContent);
    console.log("----");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id=== p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});