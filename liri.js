var dot = require("dotenv").config();
var keys = require("./key.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');



var spot = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);





// client.post('statuses/update', {status: 'Testing 123lir'}, function(error, tweet, response) {
//     if (!error) {
//       console.log(tweet);
//     }
//   });

//twitter mytweets command line
var params = {
    screen_name: 'Jeffrey83236250',
    count: 20,
};
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
var nodeArgs = process.argv;
var address = "";
for (var i = 3; i < nodeArgs.length; i++) {
  address = address + " " + nodeArgs[i];
}


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