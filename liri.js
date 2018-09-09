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
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

// var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var parameter = process.argv.slice(3).join(' ');
console.log(parameter);
//Switch statement in a functoin where you can pass in an action and it will take care of rest.
whatAreWeDoing(action, parameter);
function whatAreWeDoing(action, parameter) {
switch (action) {
  case "concert-this":
    concertThis(parameter);
    break;

  case "spotify-this-song":
    spotifyThis(parameter);
    break;

  case "movie-this":
    movieThis(parameter);
    break;

  case "do-what-it-says":
    doWhatItSays(parameter);
    break;
    default: 
    console.log('Command not supported');
    break;

};
}

//if user does not input any command, default instructions will run
//   default: console.log(
//     "\n" + "please type one of the following commands:" + "\n" + "\n" + "concert-this: 'any band'" + "\n" +
//     "spotify-this-song: 'any song'" + "\n" +
//     "movie-this: 'any movie'" + "\n" +
//     "do-what-it-says");

// }




function concertThis(parameter) {
  

  var URL = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";

  console.log(URL);
  
  request(URL, function (err, response, body) {

    if (!err && response.statusCode === 200) {

      var data = JSON.parse(body);

      console.log(data);

      // var output =

      //   `
      // name:
      // venue:
      // date:
      // `
    }

  });
}

function spotifyThis(searchSong) {


 

  spotify.search({
    type: "track",
    query: searchSong || "I Saw The Sign",
    limit: 1
  }, function (err, data) {
    if (err) {
      return console.log("Sorry, something went wrong: " + err);
    } else {

      console.log(data.tracks.items[0]);
    }
  }
  )








}

function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if(err) {
      console.error(err);
    }
    else {
      console.log(data);
      console.log(data.split(',')[0]);
      var song = data.split(',')[1];
      console.log(song);
      console.log(song.split().pop());
      console.log(song.split().unShift());

    }
  });
}