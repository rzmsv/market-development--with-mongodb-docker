const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser")
const dotenv = require('dotenv').config();
const pug = require("pug");
const mongodb = require("mongodb")
const mongoose = require("mongoose")
const session = require("express-session")
const MongodbStore = require("connect-mongodb-session")(session)
const User = require("../models/user")
const adminPage = require("../routes/admin/admin")
const homePage = require("../routes/user/products")
const detailePage = require("../routes/user/detaile")
const UserCard = require("../routes/user/products")
const UserPage = require("../routes/user/products")
const error404 = require("../routes/user/errors")


const dbUrl = "mongodb://mongo-db:27017/myproductsDB"

const store = new MongodbStore({
  uri: dbUrl,
  collection: "mySessions",
  expires: 1000 * 60 * 60 * 24 * 30
})

const app = express();
const server = http.createServer(app)

const port = process.env.PORT || 3000;
// SET
app.set("view engine", "pug"),
  app.set("../views", "views")
//Middlewares
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use("/admin", adminPage)
app.use(homePage)
app.use(detailePage)
app.use(UserCard)
app.use(UserPage)

// handler errors
app.use(error404.error404)

// MONGOOSE CONNECT & RUN SERVER
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((result) => {
    User.findOne({email:"rmussavi@gmail.com"})
    .then((user)=>{
        if (!user){
            const user = new User({
                name: "reza",
                lastname: "mousavi",
                user:"rezaaa1989",
                email: "rmussavi@gmail.com",
                password:"admin",
                confirmPassword:"admin",
                admin : true,
                cart:{
                    items:[]
                }
        
            });
            user.save()           
        }
    })
    .catch(err => console.log(err))

    
    server.listen(port, () => {
      console.log(`Connect to port ${port}`)
    })
    console.log("Connect to DB")
  })
  .catch(err => console.log(err))
