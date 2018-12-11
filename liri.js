require("dotenv").config();
var keys = require("./key");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment")

var axios = require("axios");

if (process.argv[2] == 'concert-this' ) {
   
    var artist = process.argv.slice(3).join(" ")
    console.log(artist);
   
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(function (response) {

        var response  = response.data[0]
        console.log("Venue name: " + response.venue.name);
        console.log("Venue location: " + response.venue.city);
        console.log("Date of Event: " +  moment(response.datetime).format("MM/DD/YYYY"));
       
    });
} else if (process.argv[2] === "spotify-this-song"){
    var songName = process.argv.slice(3).join(" ");

    if (songName === undefined){
        songName = "The sign by Ace of Base"
    }

    spotify.search({ type: "track", query: songName, limit: 1 }, function(err, response){
        if (err) {
            return console.log("Error occurred: " + err);
        }
		for (var j = 0; j < response.tracks.items[0].album.artists.length; j++) {
			console.log("Artist(s): " + response.tracks.items[0].album.artists[j].name);
			console.log("Song: " + response.tracks.items[0].name);
			console.log("Song Link: " + response.tracks.items[0].external_urls.spotify);
			console.log("Album: " + response.tracks.items[0].album.name);
		}
    })

} else if (process.argv[2]=== "movie-this"){
    var movieName = process.argv.slice(3).join(" ");

    var URL = "http://www.omdbapi.com/?t="+ movieName +"&apikey=trilogy"

    if (movieName === undefined){
        movieName = "Mr. Nobody"
    }

    axios.get(URL).then(function(response){
        var response = response.data

        var movieInfo = [
            "Title: " +response.Title,
            "Year: " + response.Released,
            "IMDB Rating: " + response.imdbRating,
            "Rotten Tomatoes: " + response.Ratings[1].Value,
            "Country: " + response.Country,
            "Language: "+ response.Language,
            "Movie Plot: "+ response.Plot,
            "Actors: "+ response.Actors,
        ].join("\n\n");

        console.log(movieInfo)

    })
}
