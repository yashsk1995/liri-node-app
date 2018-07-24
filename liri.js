
// key 
var keys = require("./keys.js");
// request npm package 
var request = require("request");
// twitter npm package
var Twitter = require('twitter');
// fs npm package
var fs= require('fs');

// npm package of node spotify api
var Spotify = require('node-spotify-api');

// dotenv npm package
var donenv = require('dotenv');
require('dotenv').config();

// storing argv value in variables
var action= process.argv[2];
var search=process.argv[3];

// checking if action is my- tweets then displays 20 last tweets 
if(action=== "my-tweets")
{
    twit();
}
// checking if action spotify this song then dispalys song details but if song is null then displays default song details
else if(action === "spotify-this-song")
{
    if(search === undefined)
{
    search = "The sign ace of base";
}
// adding + in space of argv so you can put multiple words of name 
search = search.split(' ').join('+');
// calling funtcion to display dtails   
spotifysong(search);

}
// checking if action is movie-this then displays all dtails of movies
else if(action === "movie-this")
{
// if movie is null then displays defualt movie details
    if(search === undefined)
{
    search = "Mr. Nobody.";
}
// adding + in space of argv so you can put multiple words of name
search = search.split(' ').join('+');
// calling funtcion that display all info of movie
moviesearch(search);
}
else if (action === "do-what-it-says")
{
    says();
}
// displays all msg if action is null
else if(action === undefined)
{
    console.log(" LIRI does not recognize that command ");
}

// function that displays all twits
function twit(){
    var client = new Twitter(keys.twitter);

//     var client = new Twitter({
//   consumer_key: 'RX22fGSVYCkOHPdQxOJ3w4XmT',
//   consumer_secret: 'yPZes4fDqGgjic1HlCpK2SPtXK9t2gs6NtHtRCEwRXvK86GBME',
//   access_token_key: '1020288637345456128-8lZJ2lU5UsgRMvLMLF1lWZIlUxVDdP',
//   access_token_secret: 'EqzNbYhXkINGds0MeF4R6wIcNU2cuPe87rXud07sm1T8l'
// });
 
// query of npm package
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //   lopping thorgh last 20 tweets and displaying text and created time
    for (var i = 0; i < tweets.length; i++) {
        console.log("Generated On : " + tweets[i].created_at + "\n" + 
                    "Tweet Text : " + tweets[i].text + "\n" +"\n"); 
    }
  }
  else {
    //   displays error
        console.log("Error : "+error);
    
  }
});

}

// displays song details
function spotifysong(song){

  var spotify = new Spotify(keys.spotify);
 
// var spotify = new Spotify({
//   id: "d1a97a841ded41ceb07288601cf27dac",
//   secret: "12df6cea336d4147bff130787ce85153"
// });
//  query of npm package spotify
spotify.search({ type: 'track', query: song}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
// display details of song
   var songdetails= data.tracks.items[0];
console.log('Song Name: ' + songdetails.name + '\n'+ 
            'Album: ' + songdetails.album.name + '\n' + 
			'Preview Here: ' + songdetails.preview_url + '\n'+
			'Artist: ' + songdetails.artists[0].name + '\n' 
								
);


});
}
// function that displas details of movie name
function moviesearch(movieName){
    // query to get details of movie
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";


// displays daya of mocie if there no error 
request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
var data = JSON.parse(body);
// console.log(data);
// displays all data of movie
console.log('Movie Information:\n' + 
'------------------------\n\n' +
'Movie Title: ' + data.Title + '\n' + 
'Year Released: ' + data.Released + '\n' +
'IMBD Rating: ' + data.imdbRating + '\n' +
'Rotten Tomatoes Rating: ' + data.tomatoRating + '\n' +
'Country Produced: ' + data.Country + '\n' +
'Language: ' + data.Language + '\n' +
'Plot: ' + data.Plot + '\n' +
'Actors: ' + data.Actors + '\n') ; 

  }
});
}
// display defauls details of song
function says() {
    // reading input form file
    fs.readFile('random.txt', "utf8", function (error, data) {
// splitting a text by ,
        var text = data.split(',');
         
var spotify = new Spotify({
  id: "d1a97a841ded41ceb07288601cf27dac",
  secret: "12df6cea336d4147bff130787ce85153"
});
// query for spotify
        spotify.search({ type: 'track', query: text[1] }, function (err, data) {
            if (!err) {
                // looping thorugh details of songs and displays data of song
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    //artist
                    console.log("Artist: " + songData.artists[0].name);
                    //song name
                    console.log("Song: " + songData.name);
                    //spotify preview link
                    console.log("Preview URL: " + songData.preview_url);
                    //album name
                    console.log("Album: " + songData.album.name);
                    console.log("-----------------------");


                }
            }
        });
    });
}