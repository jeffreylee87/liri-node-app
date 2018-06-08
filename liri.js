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
  address = address + " " + nodeArgs[i];
}

if (!movieSearch) {
  movieSearch = "American Pie";
  //not going to default to the corny movie they required
}

if (!address) {
  address = "Take on me";
}

//twitter mytweets command line
if (process.argv[2] === "my-tweets") {
  var raceCar = "\n\ō͡≡o˞̶  \ō͡≡o˞̶  \ō͡≡o˞̶  \ō͡≡o˞̶  \ō͡≡o˞̶                ∙،°.  ˘Ô≈ôﺣ   » » »\n";
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(raceCar);
    }
    console.log("°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸");
    var jeffTweet = "";
    for (var i in tweets) {
      jeffTweet = parseInt(i) + 1 + ": \n" + tweets[i].text + `\n` + tweets[i].user.created_at;

      console.log(jeffTweet);
      fs.appendFile("log.txt", jeffTweet, function (err) {
        if (err) throw err;

      });

    }
    console.log("\n`·.¸¸ ><((((º>.·´¯`·><((((º> `·.¸¸ ><((((º>.·´¯`·><((((º> `·.¸¸ ><((((º>.·´¯`·><((((º>      \n");
  });
}

//spotify stuff

if (process.argv[2] === "spotify-this-song") {

  spot.search({
    type: 'track',
    query: address,
    limit: 1,
    offset: 1
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var divider = "\n(=====||:::::::::::::::::::::::::::::>\n";
    var songData = `${data.tracks.items[0].artists[0].name}\n${data.tracks.items[0].name}\n${data.tracks.items[0].href}\n${data.tracks.items[0].album.name}`;
    fs.appendFile("log.txt", songData + divider, function (err) {

      if (err) throw err;
      console.log(divider);
      console.log(songData);
      console.log(divider);
    });
    // console.log(divider);
    // console.log(`${data.tracks.items[0].artists[0].name}\n${data.tracks.items[0].name}\n${data.tracks.items[0].href}\n${data.tracks.items[0].album.name}`);
  });
}

//Movie Stuff

if (process.argv[2] === "movie-this") {
  request("http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {
      var divider = "\nʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ-̫͡-ʔʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ-̫͡-ʔʕ•̫͡•ʕ*̫͡*ʕ•͓͡•ʔ-̫͡-ʕ•̫͡•ʔ*̫͡*ʔ-̫͡-ʔ\n\n";
      var movieData = `${JSON.parse(body).Title}\n${JSON.parse(body).Year}\n${JSON.parse(body).imdbRating}\n${JSON.parse(body).Ratings[1].Source}: ${JSON.parse(body).Ratings[1].Value}\n${JSON.parse(body).Country}\n${JSON.parse(body).Language}\n${JSON.parse(body).Plot}\n${JSON.parse(body).Actors}`;
      fs.appendFile("log.txt", movieData + divider, function (err) {

        if (err) throw err;
        console.log(divider);
        console.log(movieData);
        console.log(divider);
      });
    }
  });
}

//read me portion
if (process.argv[2] === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    for (var i = 0; i < dataArr.length; i++) {
      dataArr[i] = dataArr[i].trim();
    }


    if (dataArr[0] === "spotify-this-song") {
      spot.search({
        type: 'track',
        query: dataArr[1],
        limit: 1,
        offset: 1
      }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("\n[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]\n");
        console.log(`${data.tracks.items[0].artists[0].name}\n${data.tracks.items[0].name}\n${data.tracks.items[0].href}\n${data.tracks.items[0].album.name}`);
        console.log("\n[̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]  [̲̅$̲̅(̲̅ιοο̲̅)̲̅$̲̅]\n");
      });
    }
  });
}