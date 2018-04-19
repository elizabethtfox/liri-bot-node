// Environment variables
require("dotenv").config();

// Twitter npm package
var Twitter = require('twitter');

// node-spotify-api npm package
var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);

// request npm package
var request = require('request');

// fs package for read/write
var fs = require('fs');

// Import the API keys
var keys = require('./keys');

// variable for user input
var input = process.argv;
var userInput = process.argv[2];
var movieName = process.argv[3];
var songName = process.argv[3];

// call theOutput function
theOutput();
//getMovie();

// Switch case statment for possible user inputs
function theOutput(){
    console.log("In the output function");

    switch(userInput){
        case "my-tweets":
            console.log("My Tweets: ");
            getTweets();
            break;
        case 'spotify-this-song':
            console.log("Your song info: ");
            getSpotify();
            break;
        case 'movie-this':
            console.log("Your movie info: ");
            getMovie();
            break;
        case 'do-what-it-says':
            console.log("Random: ");
            getRandom();
            break;
        default:
            console.log("Didn't work. Try one of these commands, 'my-tweets','spotify-this-song','movie-this','do-what-it-says'");
    }
}


// Twitter Function
function getTweets(){
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'gtcbcElizabeth'
    };
    client.get('statuses/user_timeline', params, function(error, tweets){
        if(error){
            return console.log("error: " + JSON.stringify(error));
        }
        if(tweets){
            for (var i=0; i < tweets.length; i++){
                console.log("===================");
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            };
        }
    });
};

// Spotify Function
// Links to Spotify and Twitter keys
function getSpotify() {
    spotify.search({
        type: 'track',
        query: songName,
        limit: 1
    },
        function(err,data){
        if(err){
            return console.log('Error occured: ' + err);
        } else{
            console.log(data);
            var songArtist = data.tracks.artists;
            var songAlbum = data.tracks.album;
            var songTitle = data.track.name;

            console.log("===========================")
            console.log("Artists: " + JSON.stringify(songArtist));
            console.log("Album: " + songAlbum);
            console.log("Title: " + songTitle);
        }
    });
}

// OMDB Function
function getMovie(){
    var omdb =
        {
            method: 'GET',
            url: "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=ec4631d7"
        };

    request(omdb, function (error, response, body) {
        body = JSON.parse(body);
        console.log("=========================");
        console.log("Title: " + body.Title);
        console.log("Year: " + body.Year);
        console.log("IMDB Rating: " + body.imdbRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
        console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
    });

};

// Do what it says Function
function getRandom(){
    fs.readFile('random.txt','utf8',function(err,data){
        if(err){
            console.log("error");
        } else {
            input = data.split(",");
            userInput = input[0];
            songName = input[1];
            theOutput();
            console.log(data);
        }
    })
}