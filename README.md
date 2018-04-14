# News-Scraper-MongoDB

MongoDB News Scraper Application

# Overview

This is a web app that lets users view and leave comments on the latest news scraped from the NY Times news api.

 1. Whenever a user visits the site, the app should scrapes stories from the api and displays them for the user. Each scraped article is saved to a application database using MongoDB. The app scrapes and displays the following information for each article:

     * Headline - the title of the article

     * URL - the url to the original article

  2. Users are able to leave comments on the articles displayed and revisit them later. The comments are saved to the database and associated with their articles. Users are able to delete comments left on articles. All stored comments are visible to every user.

# Dependencies used to build the app
  
  1. express

  2. express-handlebars

  3. mongoose

  4. body-parser

  5. cheerio

  6. request
