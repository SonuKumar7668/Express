const express = require('express');
const app = express();
const port = 3000;
const ExpressErrors = require('./ExpressErrors');

// app.use((req,res,next)=>{
//     console.log("hi i'm first middleware");
//     next();
// });
// app.use((req,res,next)=>{
//     console.log("hi i'm second middleware");
//     return next();
// });
const checkTocken =(req,res,next)=>{
    let {token}=req.query;
    if(token==="12"){
        next();
    }
    throw new ExpressErrors(401,"Access denied");
}

// app.use("/random",(req,res,next)=>{
//     req.time = Date.now();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// })

app.get("/random",(req,res)=>{
    res.send("random page");
})

app.get("/",(req,res)=>{
    res.send("server is running");
});

app.get("/api",checkTocken,(req,res)=>{
    res.send("sdlkf");
});

app.get("/err",checkTocken,(req,res)=>{
    res.send("sdlkf");
});

app.get("/admin",(req,res)=>{
    throw new ExpressErrors(403,"Access to Admin is forbidden");
})

app.use((err,req,res,next)=>{
    let {status=500,message="Some error occured "}= err;
    console.log(message," ->",status);
    res.status(status).send("not allowed");
    next();
})

app.use((err,req,res)=>{
    res.status(404).send("page not found");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});