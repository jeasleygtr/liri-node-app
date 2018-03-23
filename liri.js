require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var keys1 = require("./keys.js").twitter;
var twitter = require("twitter");
var keys = new twitter ({
    consumer_key: keys1.consumer_key,
    consumer_secret: keys1.consumer_secret,
    access_token_key: keys1.access_token_key,
    access_token_secret: keys1.access_token_secret
});

var keys2 = require(".keys.js").spotify;
var spotify1 = require("node-spotify-api");
var spotify = new spotify1 ({
    id: keys2.id,
    secret: keys2.secret
});

var inquirer = require("inquirer");
var request = require("request");
var fs = require("fs");
//----------------moment require???

var greetingwords = ["hey, whats up?"];






var options = ["tweet something from jeff's account"];




function greeting() {
    var index = Math.floor(Math.random()* greetingwords.length);
    console.log("\n------------------------------------");
    console.log("\n" + greetingwords[index]);
    console.log("\n------------------------------------\n");
    fs.appendFile("log.txt", moment().format("MM/DD/YYYY HH:mm:ss") + " " + + "Liri launch" + "\n", function(err) {
        if(err){
            return console.log(err);
        }
    });
    inquirer.prompt([
        {
            type: "list",
            message: "Pick your poison\n",
            choices: options,
            name: "choice"
        }
        ]).then(function(res) {
            switch(res.choice) {
                case options[0]:
                    tweet();
                    logtxt(options[0]);
                    break;

                case options[1]:
                    tweets();
                    logtxt(options[1]);
                    break;

                case options[2]:
                    spotifyasong();
                    logtxt(options[2]);
                    break;

                case options[3]:
                    moviethis();
                    logtxt(options[3]);
                    break;

                case options[4]:
                    dowhat();
                    logtxt(options[4]);
                    break;

                case options[5]:
                    randomgreet();
                    logtxt(options[5]);
                    break;

                case options[6]:
                    console.log("\n-------------------------------");
                    console.log("\nThanks for using Liri.");
                    console.log("\m-------------------------------\n");
                    logtxt(options[6]);
                    break;

                default:
                    console.log("The is not Burger king, you do not get it your way.  Pick one of the options I have offered you.");
            }                    
        })
};

function whatelse() {
    console.log("\n-------------------------------------------\n");
    inquirer.prompt([
        {
            type: "list",
            message: "What else can I do for you today?\n",
            choices: options,
            name: "choice"
        }
    ]).then(function(res) {
        switch(res.choice) {
            case options[0]:
                tweet();
                logtxt(options[0]);
                break;

            case options [1]:
                tweets();
                logtxt(options[1]);
                break;

            case options[2]:
                spotifyasong();
                logtxt(options[2]);
                break;

            case options[3]:
                moviethis();
                logtxt(options[3]);
                break;

            case options[4]:
                dowhat();
                logtxt(options[4]);
                break;

            case options[5]:
                randomgreet();
                logtxt(options[5]);
                break;

            case options [6]:
                console.log("\n----------------------------------------------------");
                console.log("\nThank you, come again");
                console.log("\n----------------------------------------------------");
                logtxt(options[6]);
                break;

            default:
                console.log("I am not capable of this.");
        }
    })
};

//features

//tweet in terminal
function tweet() {
    inquirer.prompt([
        {
            type: "input",
            message: "Tweet something on Jeff's twitter account.\nPlease use common sense when tweeting.\nIf you tweet something pro-Trump under my name, I will hunt you down.\n",
            name: "post"
        }
    ]).then(function(res) {
        keys.post('statuses/update', {status: res.post + "---sent from the Liri command line app"}, function(error, tweets, response) {
            if (error) {
                console.log(error);
            }
            console.log("\n-------------------------------------------------\n");
            console.log("Tweet \"" + res.post + "\" has been posted already");
            console.log("Go to https://twitter.com/jeasleygtr or select \"View Jeff's tweets\" below to check it.\n")
            whatelse();
        })
    })
};

// show tweets
function tweets() {
    keys.get("statuses/user_timeline", {screen_name: 'jeasleygtr'}, function(error, tweets, response) {
        if (!error) {
            for (i = tweets.length -1; i >= tweets.length - 21; i--) {
                if (i < 0) {
                    break; //if account has <20 tweets
                }
                //moment



                var month = moment().format("YYYYMM");
                var a = tweets[i].created_at.substring(0, tweets[i].created_at.indexOf("+")).trim();
                var array = a.split(" ");
                var format = month.substring(0, 4) + "-" + month.substring(4) + "-" + array[2] + "T" + array[3] + ".000";
                var realtime = moment(format).subtract(4, "hours").format("MMMM Do YYYY, HH:mm:ss");

                if (tweets[i].retweeted) {
                    console.log("\n-----------------------------------------------");
                    console.log("\n" + realtime);
                    console.log("This tweet is retweeted\n");
                    console.log(tweets[i].text);
                }
                else {
                    console.log("\n------------------------------------------------");
                    console.log("\n" + realtime);
                    console.log(tweets[i].text + "\n");
                }
            }
        }
        whatelse();
    })
};

function spotifyasong() {
	inquirer.prompt([
		{
			type: "input",
			message: "Please enter the title of the song you want me to spotify.\n",
			name: "song"
		}
	]).then(function(res) {
			if (res.song === "") {
				spotify.search({type: "track", query: "The Sign"}, function(err, data) {
					console.log("\n-------------------------------------------------\n");
					console.log("You did not input anything valid, but I have a recommendation for you");
					console.log("\n-------------------------------------------------\n");
					console.log("Artist(s): " + data.tracks.items[5].artists[0].name);
					console.log("Title: " + data.tracks.items[5].name);
					console.log("Preview link: " + data.tracks.items[5].preview_url);
					console.log("Album: " + data.tracks.items[5].album.name);
					whatelse();
				})
			}
			else {
				spotify.search({type: "track", query: res.song}, function(err, data) {
					if (data !== null) {
						var random = Math.floor(Math.random() * 20);
						console.log("\n-------------------------------------------------\n");
						console.log("Dear user, this is the song you want to spotify.")
						console.log("\n-------------------------------------------------\n");
						console.log("Artist(s): " + data.tracks.items[random].artists[0].name);
						console.log("Title: " + data.tracks.items[random].name);
						if (data.tracks.items[random].preview_url !== null) {
							console.log("Preview link: " + data.tracks.items[random].preview_url);
						}
						else {
							console.log("Preview link: not available");
						}
						console.log("Album: " + data.tracks.items[random].album.name);
						whatelse();
					}
					else {
						console.log("Wait, it looks like this song is beyound the power of spotify...")
						whatelse();
					}
				})
			}
		})
};


//main
greeting();