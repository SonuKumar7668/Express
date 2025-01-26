const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js')
const port = 3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,"public")))

main().then(()=>{console.log("connection sucessfull")}).catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const chat1 = new Chat ({
    from : "John",
    to : "jane",
    message : "Send Notes",
    created_at : new Date()
});

// chat1.save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

//all chats
app.get('/chats',async (req,res)=>{
    let Chats =await Chat.find()
    res.render("home.ejs",{Chats});
})

app.get("/",(req,res)=>{
    res.send("hello")
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

