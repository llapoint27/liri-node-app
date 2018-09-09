require("dotenv").config();

//bandsintown API date of event format
var moment = require('moment');
// moment().format();

//accessing keys file
var keys = require("./keys.js");
var request = require("request");
//npm module used to read random.txt file
var fs = require("fs");
//npm module to access Spotify API
var spotify = require("node-spotify-api");

// var spotify = new Spotify(keys.spotify);


switch (action) {
  case "concert-this":
    concertThis(parameter);
    break;

  case "spotify-this-song":
    spotify(parameter);
    break;

  case "movie-this":
    movieThis(parameter);
    break;

  case "do-what-it-says":
    doWhatItSays(parameter);
    break;

//if user does not input any command, default instructions will run
  default: console.log(
    "\n" + "please type one of the following commands:" + "\n" + "\n" + "concert-this: 'any band'" + "\n" +
     "spotify-this-song: 'any song'" + "\n" + 
     "movie-this: 'any movie'" + "\n" + 
     "do-what-it-says");

}

var action = process.argv[2];
var parameter = process.argv[3];

function concertThis(parameter) {

  if (action === "concert-this"){

    var bandName = "";

    //does this only work if bandName is an object?
    for (var i = 3; i < parameter.length; i++) {

    bandName =+ parameter[i];

    console.log(bandName);
    }

  } else {bandName = parameter};


var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

console.log(queryURL);

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).venue.name);
  }
});


console.log(URL);

request(URL, function(error, response, body) {

  var jsonData = JSON.parse(body);

  console.log(jsonData);

  var output =
  `
  //data in here
  `

  });











