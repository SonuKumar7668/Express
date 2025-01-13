const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta',
    password: 'Sonu@7668'
});

try{
connection.query("SHOW TABLES",(err,result)=>{
    if(err) console.log(err);
    console.log(result);
})
}catch(err){
    console.log(err);
}
connection.end();

let createRandomUser= () => {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(), // before version 9.1.0, use userName()
      email: faker.internet.email(),
    //   avatar: faker.image.avatar(),
      password: faker.internet.password(),
    //   birthdate: faker.date.birthdate(),
    //   registeredAt: faker.date.past(),
    };
  }

console.log(createRandomUser());