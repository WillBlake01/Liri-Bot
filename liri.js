// node requirements
require('dotenv').config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('file-system');

var userCommand = process.argv[2];
var userQuery = process.argv[3];

switch (userCommand) {
  case ('spotify-this-song'):
    var trackSearch = userQuery;

    var songName = '';

    for (i = 0; i < trackSearch.length; i++) {

      songName = songName + trackSearch[i];

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

      console.log(JSON.stringify('Artist: ' + data.tracks.items[0].artists[0].name, null, 2) +
      '\nTrack: ' + JSON.stringify(data.tracks.items[0].name, null, 2) +
      '\nPreview Link: ' + JSON.stringify(data.tracks.items[0].preview_url, null, 2) +
      '\nAlbum: ' + JSON.stringify(data.tracks.items[0].album.name, null, 2)) +
      console.log('\n-------------\n');
    });

    //End Spotify API call
    break;

  case ('my-tweets'):

    // Begin Twitter API call
    var client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = { totes_gnar: 'nodejs' };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      if (!error) {
        console.log(tweets[0].text);
        console.log(tweets[1].created_at);
      }
    });

    // End Twitter API call
    break;

  case ('movie-this'):
    var movieSearch = userQuery;

    var movieName = '';

    for (i = 0; i < movieSearch.length; i++) {

      movieName = movieName + movieSearch[i];

    }

    // Begin omdb API call
    request('http://www.omdbapi.com/?t=' + movieSearch + '&y=&plot=short&apikey=trilogy',
    function (error, response, body) {

      if (!error && response.statusCode === 200) {

        console.log('Title: ' + JSON.parse(body).Title + '\nYear: ' + JSON.parse(body).Year +
        '\nimdb Rating: ' + JSON.parse(body).imdbRating + '\nRotten Tomatoe Score: ' +
        JSON.parse(body).Ratings[1].Value + '\nCountry Produced: ' + JSON.parse(body).Country +
        '\nLanguage: ' + JSON.parse(body).Language + 'Plot: ' + JSON.parse(body).Plot +
        '\nActors: ' + JSON.parse(body).Actors);
        console.log('\n-------------\n');
      }
    });

    // End omdb API call
    break;

  case ('do-what-it-says'):
    fs.readFile('random.txt', 'utf-8', function (err, data) {
      if (err) {
        return console.log(error);
      }

      var dataArr = data.split(',');

      for (item of dataArr) {

        console.log(item.trim());
      }
    });

    break;
  default:
    console.log('failure');
    break;
}
