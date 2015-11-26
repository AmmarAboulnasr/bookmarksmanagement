'use strict';

var PORT = process.env.PORT || 3000;
var mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost/bookmarksmanagement";

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");

mongoose.connect(mongoUrl, function(err) {
  if(err) return console.log("Error connecting to MongoDB: ", err);
  console.log("Connected to MongoDB: ", mongoUrl);
});

var app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

app.use("/tags", require("./routes/tags"));
app.use("/links", require("./routes/links"));

app.listen(PORT, function() {
  console.log("Listening on port: ", PORT);
});
