require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs"); 
var path = require("path"); 
var axios = require("axios");
var moment = require("moment");
var action = process.argv[2];
var parameter = process.argv.splice(3).join(" ");