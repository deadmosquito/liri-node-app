require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs"); 
var path = require("path"); 
var axios = require("axios");
var moment = require("moment");
var action = process.argv[2];
var parameter = process.argv.splice(3).join("+");

if (action === "movie-this" && parameter) {
    
    axios.get("http://www.omdbapi.com/?t=" + parameter + "&y=&plot=short&apikey=trilogy")
        .then(
            function (response) {
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("iMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Produced in: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
        .catch(function (error) {
            if (error.response) {
            }
        });

} else {
    axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy")
    .then(
        function (response) {
            console.log("You didn't enter anything! If you haven't watched Mr. Nobody, then you should! It's on Netflix!")
                console.log("Title: " + response.data.Title);
                console.log("Year Released: " + response.data.Year);
                console.log("iMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Produced in: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            })
        .catch(function (error) {
            if (error.response) {
            }
        });
}