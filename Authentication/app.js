const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
port =8080;

app.use(cookieParser());

app.get("/",(req,res)=>{
    let pass='';
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("sonu", salt, function(err, hash) {
            console.log(hash);
            pass = hash;
        });
    });
    bcrypt.compare("sonu", '$2b$10$1UaAAsnMetPO7Ckq65SbbuCESFYmZYdaMqtlCwm2LGnvVLcNNE/ha', function(err, result) {
        console.log(result);
    });
    res.send(pass);
})

app.listen(port,()=>{
    console.log("app is listening");
})