// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
var request = require("request");
var cheerio = require("cheerio");
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

mongoose.Promise = Promise;

var PORT = process.env.PORT || 8080;

var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/newsScraper_controller.js");

app.use("/", routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NYTimesdb";
mongoose.connect(MONGODB_URI);
var db = mongoose.connection;

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});