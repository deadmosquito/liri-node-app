require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var action = process.argv[2];
var parameter = process.argv.splice(3).join(" ");

if (action === "spotify-this-song") {
    spotify.search({ type: "track", query: parameter }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        } else {

            for (i = 0; i < 3; i++) {
                var artist = data.tracks.items[i].artists[0].name;
                var song = data.tracks.items[i].name;
                var demo = data.tracks.items[i].preview_url;
                var album = data.tracks.items[i].album.name

                console.log("Artist: " + artist);
                console.log("Song Name: " + song);
                console.log("30 Second Clip: " + demo);
                console.log("Album: " + album);
                console.log("--------")
            }
        }
    })
}

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
                console.log("-------")
            })
        .catch(function (err) {
            if (err.response) {
            }
        });

} else if (parameter === undefined) {
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
                console.log("-------")
            })
        .catch(function (err) {
            if (err.response) {
            }
        });
}
if (action === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var results = response.data
            if (results.length === 0) {
                console.log("Sorry, " + parameter + " doesn't have any upcoming shows. Try another band.")
            } else {
                console.log("Upcoming Shows For: " + parameter);
                for (var result of results) {
                    var date = moment(result.datetime).format("MMM Do YY");
                    console.log("Venue: " + result.venue.name);
                    console.log("Venue Location: " + result.venue.city + ", " + result.venue.region);
                    console.log("Event Date: " + date);
                    console.log("-------")
                }
            }
        })
        .catch(function (err) {
            if (err.response) {
            }
        });
}
if (action === "do-what-it-says") {
    // directs it to my file and in its format with the parameters i give
    fs.readFile("./random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        } else {
            //split that information so its clean on the txt file
            var inputArr = data.split(",");
            if (inputArr[0] === "spotify-this-song") {
                spotify.search({ type: "track", query: inputArr[1] }, function (err, data) {
                    if (err) {
                        return console.log("Error occurred: " + err);
                    } else {
                        for (i = 0; i < 5; i++) {
                            var artist = data.tracks.items[i].artists[0].name;
                            var song = data.tracks.items[i].name;
                            var demo = data.tracks.items[i].preview_url;
                            var album = data.tracks.items[i].album.name

                            console.log("Artist: " + artist);
                            console.log("Song Name: " + song);
                            console.log("Preview Link: " + demo);
                            console.log("Album: " + album);
                            console.log("-------")
                        }
                    }
                });
            }
        }
    });
}
