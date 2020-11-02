const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoute = require("./routes/posts");
const userRoute = require("./routes/user");

//connectiong to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//creating app with express
const app = express();

//giving access to images folder
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

//parsing the incoming data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }));

//setting the CORS policy of headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH,OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoute);
app.use("/api/user", userRoute);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
