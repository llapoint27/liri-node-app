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
var spotify = require("spotify");
var spotify = new Spotify(keys.spotify);

//processes the input from the command line
var action = process.argv[2];
var parameter = process.argv[3];

switch (action) {
  case "concert-this":
    concertThis();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;


  default: console.log("\n" + "please type one of the following commands:" + "\n" + "\n" + "oncert-this: 'any band'" + "\n" + "spotify-this-song: 'any song'" + "\n" + "movie-this: 'any movie'" + "\n" + "do-what-it-says");

}



function concertThis() {

}







