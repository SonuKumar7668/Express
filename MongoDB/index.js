const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const Chat = require("./models/chat.js");
const ExpressErrors = require("./ExpressError");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

main()
    .then(() => {
        console.log("connection sucessfull");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const chat1 = new Chat({
    from: "John",
    to: "jane",
    message: "Send Notes",
    created_at: new Date(),
});

// chat1.save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

//all chats

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/chats", async (req, res) => {
    let Chats = await Chat.find();
    res.render("home.ejs", { Chats });
});

app.get("/chat/new", async (req, res, next) => {
    res.render("newchat.ejs");
});

function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}

app.post("/chat", asyncWrap(async (req, res, next) => {
    let { from, to, message } = req.body;
    let newchat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date(),
    });
    await newchat.save();
    res.redirect("/chats");
}));

//new Show route
app.get("/chat/:id", async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        next(new ExpressErrors(404, "Page not Found"));
    }
    res.render("show.ejs", { chat });
});

app.get("/chat/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

app.put("/chat/:id", async (req, res) => {
    let { id } = req.params;
    let { message: newmsg } = req.body;
    console.log(newmsg);
    let updatedchat = await Chat.findByIdAndUpdate(
        id,
        { message: newmsg },
        { runValidators: true, new: true }
    );
    console.log(updatedchat);
    res.redirect("/chats");
    // console.log(id);
});

app.delete("/chat/:id", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});
app.use((err,req,res,next)=>{
    console.error(err.name);
    next(err);
})

app.use("/", (err, req, res, next) => {
    let { status = 500, message = "some error occured" } = err;
    console.log("Error\n", err);
    res.status(status).send(message);
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});