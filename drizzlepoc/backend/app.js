const express = require('express')
const jwt = require("jsonwebtoken");
const app = express()
const cors = require('cors')
const { parseUser, sendResponse } = require('./utility/Middleware');
const { crossOriginResource } = require('./utility/Middleware');
const dbConfig = require('./database/DatabaseConfig');
const { pgTable, serial, text, varchar } = require ("drizzle-orm/pg-core");
const { drizzle } = require ("drizzle-orm/node-postgres");
const { Client } = require ("pg");










const {User} = require('./models/User');

const port = 3000
app.use(express.json())
app.use(cors())



// dbConfig.initializeDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(crossOriginResource);



// app.use('/v1/notifcation', NotificationRoute, sendResponse);
// app.use('/v1/user',UsersRoute, sendResponse);
// const reult =   db.select().from(User);
// console.log("resultsdf: : ",reult);


// console.log("resuslt: ",resutl);


const dbconnn = async ()=>{

  const client = new Client({
    host: "db",
    port: 5432,
    user: "postgres",
    password: "example",
    database: "drizz",
  });
  await client.connect();
  const db = drizzle(client);
  console.log("db  : : : ",db);
  try{
  const resutl = await db.insert(User).values({ first_name: 'Andrew', last_name:'zubair',email:'ddssadas',deleted:false});
  }
  catch(error){
    console.log(error);
  }
  
  const resul22 = await db.select().from(User);
  console.log("user: : : : ",resul22);


}
dbconnn();

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })