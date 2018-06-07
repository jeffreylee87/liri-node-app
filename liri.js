var dot = require("dotenv").config();
var keys = require("./key.js");
//constructors position matters
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
//new objects made, position matters
var spot = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var fs = require("fs");
var request = require("request");
var movieSearch = "";
var nodeArgs = process.argv;
var address = "";
var params = {
    screen_name: 'Jeffrey83236250',
    count: 20,
};

for (var i = 3; i < nodeArgs.length; i++) {
  movieSearch = movieSearch + " " + nodeArgs[i];
//   movieSearch.replace(' ', '+');
}

for (var i = 3; i < nodeArgs.length; i++) {
    address = address + " " + nodeArgs[i];
  }

// client.post('statuses/update', {status: 'Testing 123lir'}, function(error, tweet, response) {
//     if (!error) {
//       console.log(tweet);
//     }
//   });

//twitter mytweets command line
if(process.argv[2] === "my-tweets"){
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log("Houston we have a problem!!!!");
      }
      console.log("------------------------------------------------------");
      for(var i in tweets){
        console.log(parseInt(i)+1 + ": "+ tweets[i].text + `\n` + tweets[i].user.created_at);
      }
});
}
//spotify stuff

if (process.argv[2]==="spotify-this-song" && process.argv.length > 2){
    
spot.search({ type: 'track', query: address, limit: 1, offset: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("------------------------------------------------------");
    console.log(`${data.tracks.items[0].artists[0].name}\n${data.tracks.items[0].name}\n${data.tracks.items[0].href}\n${data.tracks.items[0].album.name}`); 
});
}
// else {
//     spot.search({ type: 'track', query: "the sign"}, function(err, data) {
//         if (err) {
//           return console.log('Error occurred: ' + err);
//         }
       
//         console.log(data); 
//     });
// }

//Movie Stuff



if(process.argv[2]=== "movie-this")
request("http://www.omdbapi.com/?t="+ movieSearch +"&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {
    console.log(`${JSON.parse(body).Title}\n${JSON.parse(body).Year}\n${JSON.parse(body).imdbRating}\n${JSON.parse(body).Ratings}\n${JSON.parse(body).Country}\n${JSON.parse(body).Language}\n${JSON.parse(body).Plot}\n${JSON.parse(body).Actors}`);
  }
});


//read me portion
if(process.argv[2] === "do-what-it-says"){
   
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");
  for (var i = 0; i < dataArr.length; i++) {
    dataArr[i] = dataArr[i].trim();
  }

  console.log(dataArr);
  // We will then re-display the content as an array for later use.
  console.log( dataArr[0]);
    console.log(dataArr[1]);
  process.argv[0] = "node";
  process.argv[]

});
}
function convert(){
    
}