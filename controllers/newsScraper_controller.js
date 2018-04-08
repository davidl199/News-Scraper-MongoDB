//Dependensies
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();

mongoose.Promise = Promise;
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

router.get("/", function(req, res) {
  res.render("index");
});

// Get the saved scraped articles in the database.
router.get("/savedarticles", function(req, res) {

  Article.find({}, function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      var hbsArticleObj = {
        articles: doc
      };

      res.render("savedarticles", hbsArticleObj);
    }
  });
});

// scrape the NYTimes website
router.post("/scrape", function(req, res) {

  request("http://www.nytimes.com/", function(error, response, html) {

    var $ = cheerio.load(html);
    var scrapedArticles = {};

    $("article h2").each(function(i, element) {
      var result = {};
      result.title = $(this).children("a").text();     
      result.link = $(this).children("a").attr("href");
      scrapedArticles[i] = result;
    });

    var hbsArticleObj = {
        articles: scrapedArticles
    };
    res.render("index", hbsArticleObj);
  });
});

router.post("/save", function(req, res) {

  var newArticleObj = {};
  newArticleObj.title = req.body.title;
  newArticleObj.link = req.body.link;
  var entry = new Article(newArticleObj);

  entry.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    // Or log the doc
    //else {
      //console.log(doc);
    //}
  });
  res.redirect("/savedarticles");
});

router.get("/delete/:id", function(req, res) {

  Article.findOneAndRemove({"_id": req.params.id}, function (err, offer) {
    if (err) {
      console.log("Unable to delete:" + err);
    } 
    //else {
    //   //console.log("Able to delete, Yay");
    // }
    res.redirect("/savedarticles");
  });
});

router.get("/notes/:id", function(req, res) {

  Note.findOneAndRemove({"_id": req.params.id}, function (err, doc) {
    if (err) {
      console.log("Unable able to delete:" + err);
    } 
    // else {
    //   console.log("Able to delete, Yay");
    // }
    res.send(doc);
  });
});

router.get("/articles/:id", function(req, res) {

  Article.findOne({"_id": req.params.id})

  .populate('notes')

  .exec(function(err, doc) {
    if (err) {
      console.log("Unable to find article");
    }
    else {
      //console.log("We are getting article and maybe notes? " + doc);
      res.json(doc);
    }
  });
});

router.post("/articles/:id", function(req, res) {

  var newNote = new Note(req.body);
  newNote.save(function(error, doc) {
    if (error) {
      console.log(error);
    } 
    else {
      Article.findOneAndUpdate({ "_id": req.params.id }, {$push: {notes: doc._id}}, {new: true, upsert: true})

      .populate('notes')

      .exec(function (err, doc) {
        if (err) {
          console.log("Unable to find article");
        } else {
          res.send(doc);
        }
      });
    }
  });
});

module.exports = router;