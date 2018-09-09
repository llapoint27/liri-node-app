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



// function concertThis() {
//   if (action === "concert-this"){

//     var bandName = "";

//     for (var i = 3; i < process.argv.length; i++) {

//     bandName =+ process.argv[i];

//     console.log(bandName);
//     }

//   } else {bandName = parameter};
// }

// var URL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

// request(URL, function(err, response, body){

//   if (!err && response.statusCode === 200){

//     var data = JSON.parse(body);

//     console.log(data);

//     var output = 

//     `
//     name:
//     venue:
//     date:

//     `
//   }

// })

var action = process.argv[2];
var parameter = process.argv[3];

var band = new Band();

if (action === 'concert-this') {

  console.log("searching for a band");
  band.concertThis(parameter);

}

this.concertThis = function(bandName) {

var URL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

request(URL, function(err, response, body){

  if (!err && response.statusCode === 200){
    var data = JSON.parse(body);
    console.log(data);

  }

})


}



