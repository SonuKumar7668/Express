const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodoverride= require("method-override");
const { v4: uuidv4 } = require('uuid');

app.use(methodoverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta',
    password: 'Sonu@7668'
});

let createRandomUser= () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// let data=[];
// for (let i=1;i<=10;i++){
//   data.push(createRandomUser());
// }
// console.log(data);

let q="INSERT INTO user (id,username,email,password) VALUES ?"

app.get("/",(req,res)=>{
  let q='select count(*) from user';
  try{
connection.query(q, (err,result)=>{
    if(err) console.log(err);
    let count= result[0]["count(*)"];
    res.render("home.ejs",{count});
})
}catch(err){
    res.send("some error in DB");
}
});

app.get("/user",(req,res)=>{
  let q="SELECT * FROM user";
  try{
    connection.query(q, (err,users)=>{
        if(err) console.log(err);
        // let count= result;
        res.render("users.ejs",{users});
    })
    }catch(err){
        res.send("some error in DB");
    }
});

//edit username
app.get("/user/:id/edit",(req,res)=>{
  let {id}=req.params;
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err,result)=>{
        if(err) console.log(err);
        let user=result[0];
        res.render("edituser.ejs",{user});
    })
    }catch(err){
        res.send("some error in DB");
    }
  // console.log(q);
});

app.patch("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {username: newusername,password: newpassword}=req.body;
  console.log(id);
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err,result)=>{
        if(err) console.log(err);
        let user=result[0];
        if(newpassword != user.password){
          res.send("wrond password");
        }else{
          let q2=`UPDATE user SET username='${newusername}' WHERE id='${id}'`
          try{
            connection.query(q2, (err,result)=>{
                if(err) console.log(err);
                res.redirect("/user");
            })
            }catch(err){
                res.send("some error in DB");
            }
        }
    })
    }catch(err){
        res.send("some error in DB");
    }
});

app.get("/user/:id/delete",(req,res)=>{
  let {id}=req.params;
  console.log(id);
  let q=`SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err,result)=>{
        if(err) console.log(err);
        let user=result[0];
        console.log(user);
        res.render("deleteuser.ejs",{user});
  })
  }catch(err){
        res.send("some error in DB");
  }
});

app.delete("/user/:id",(req,res)=>{
  let {id}=req.params;
  let {password: password}=req.body;
  let q=`SELECT * FROM user WHERE id='${id}'`;
  let q2=`DELETE FROM user WHERE id='${id}'`;
  try{
    connection.query(q, (err,result)=>{
        if(err) console.log(err);
        let user=result[0];
        if(user.password !=password){
          res.send("wrong password");
        }else{
          try{
            connection.query(q2, (err,result)=>{
                if(err) console.log(err);
                res.redirect("/user");
          })
          }catch(err){
                res.send("some error in DB");
          }
        }
  })
  }catch(err){
        res.send("some error in DB");
  }
});

//new user
app.get("/user/new",(req,res)=>{
  res.render("newuser.ejs");
});

app.post("/user/new",(req,res)=>{
  let {username:username, email: email, password: password, confirm: confirm}=req.body;
  let id= uuidv4();
  let q="INSERT INTO user (id,username,email,password) VALUES (?,?,?,?)";
  let value=[id,username,email,password];
  if(password!=confirm){
    res.send("password not matched");
  }else{
    try{
      connection.query(q,value, (err,result)=>{
          if(err) console.log(err);
          res.redirect("/user");
    })
    }catch(err){
          res.send("some error in DB");
    }
  }
})

app.listen(3000,()=>{
  console.log('server is running on port 3000');
});