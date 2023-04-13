const dotenv = require('dotenv').config()
const path = require('path')
require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const db = require("./config/mongoose");


app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    secret: 'secretdb',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create( {
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600 
     }) }));

app.use(express.urlencoded());

app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static("./assets"));

app.use("/", require("./routes"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  
  console.log(`Server is running on port: ${port}`);
});