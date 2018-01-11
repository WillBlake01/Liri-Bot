// node requirements
require('dotenv').config()
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var userSearch = process.argv;

var songName = "";

for (i = 2; i < userSearch.length; i++) {

  songName = songName + " " + userSearch[i];

}

// Begin Spotify API call
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  console.log(JSON.stringify(data, null, 2));
});
//End Spotify API call

// Begin Twitter API call
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {totes_gnar: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
// End Twitter API call

// Begin omdb API call
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
// End omdb API call
