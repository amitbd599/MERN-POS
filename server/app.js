const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotENV = require("dotenv");
dotENV.config();

let URL =
  "mongodb+srv://amitbd591:<password>@cluster0.4kz14t4.mongodb.net/mern-pos?retryWrites=true&w=majority&appName=Cluster0";
let option = { user: process.env.DB_USER, pass: process.env.DB_PASS, autoIndex: true };
mongoose
  .connect(URL, option)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    // origin: [process.env.Origin_HOST_Site, process.env.Origin_HOST_dashboard],
    origin: process.env.Origin_HOST_Site,
  })
);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);




router.get('/uploads/:filename', (req, res) => {
  res.sendFile(__dirname + '/uploads/' + req.params.filename);
});

// File Upload
app.use("/uploads", express.static("uploads"));




app.use("/api/v1", router);

// Add React Front End Routing
app.get("*", function (req, res) {
  res.status(200).json("Not Found");
});

module.exports = app;
