require("dotenv").config();


var moment = require('moment');
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

var action = process.argv[2];
var parameter = process.argv.slice(3).join(' ');

//Switch statement in a function where you can pass in an action and it will take care of rest. We pass in action and parameter, the varibles are defined above. 
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

    // if user does not input any command, default instructions will run
    default: console.log(
      "\n" + "please type one of the following commands:" + "\n" + "\n" + "concert-this: 'any band'" + "\n" +
      "spotify-this-song: 'any song'" + "\n" +
      "movie-this: 'any movie'" + "\n" +
      "do-what-it-says");
      break;

  };
}

//'venue' is causing issue
function concertThis(parameter) {


  var URL = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";

  request(URL, function (err, response, body) {
    console.log(body);

    if (!err && response.statusCode === 200) {

      var data = JSON.parse(body);
 

      var output =
        `
      \n---------------Search Result---------------\n\n
      Venue Name: ${data[0].venue.name}
      Location: ${data[0].venue.city}
      Date: ${moment(data[0].datetime).format('L')}
      \n------------------------------------------\n\n
      `

      fs.appendFile("log.txt", output, function (err) {
        if (err) throw err;
        console.log(output);
      });
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
      
    }

    else {

      trackdata = data.tracks.items[0];

      var output =
      `
      \n---------------Search Result---------------\n\n
      Song Name: ${trackdata.name}
      Artist: ${trackdata.album.artists[0].name}
      Song Preview Link: ${trackdata.preview_url}
      Album: ${trackdata.album.name}
      \n------------------------------------------\n\n
      `

      fs.appendFile("log.txt", output, function (err) {
        if (err) throw err;
        console.log(output);
      });

    }
  }
  )
}

function handleRequest(body) {

          var data = JSON.parse(body);
    
          var output =
          
          `
          \n---------------Search Result---------------\n\n
          Movie Title: ${data.Title}
          Release Year: ${data.Year}
          IMDB Rating: ${data.Ratings[0].Value}
          Rotten Tomatoes Rating: ${data.Ratings[1].Value}
          Country: ${data.Country}
          Language: ${data.Language}
          Plot: ${data.Plot}
          Actors: ${data.Actors}
          \n------------------------------------------\n\n
          `
    
          fs.appendFile("log.txt", output, function (err) {
            if (err) throw err;
            console.log(output);
          });
}

function movieThis(parameter) {

console.log(parameter);
  var defaultMovie = "Mr.Nobody";

  var findMovie = parameter;

  if (findMovie) {

  var URL = "http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy";
} else {
  var URL = "http://www.omdbapi.com/?t=" + defaultMovie + "&y=&plot=short&apikey=trilogy";
}


  request(URL, function (err, response, body) {
    console.log(body);

    if (!err && response.statusCode === 200 && !body.Error) {
      
      handleRequest(body)

      // var data = JSON.parse(body);

      // var output =
      
      // `
      // \n---------------Search Result---------------\n\n
      // Movie Title: ${data.Title}
      // Release Year: ${data.Year}
      // IMDB Rating: ${data.Ratings[0].Value}
      // Rotten Tomatoes Rating: ${data.Ratings[1].Value}
      // Country: ${data.Country}
      // Language: ${data.Language}
      // Plot: ${data.Plot}
      // Actors: ${data.Actors}
      // \n------------------------------------------\n\n
      // `

      // fs.appendFile("log.txt", output, function (err) {
      //   if (err) throw err;
      //   console.log(output);
      // });
    } else {
      
      var URL = "http://www.omdbapi.com/?t=" + defaultMovie + "&y=&plot=short&apikey=trilogy";

      request(URL, function (err, response, body){
        handleRequest(body);
      });
    }

  
  });
}

function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      console.error("Sorry, there's an error: " + err);
    }
    else {
   
      // var array = data.replace(`""`, "");
      // array = data.replace(`,`, "");

    var array = data.split(',');
    console.log(array);
    action = array[0];
    parameter = array[1];
    whatAreWeDoing(action, parameter);
      

    }
  });
}