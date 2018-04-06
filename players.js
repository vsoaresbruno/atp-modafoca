var request = require('request');
var cheerio = require('cheerio');

var players = require("./data/teste.json");


for (player in players) {
    var url = 'http://www.atpworldtour.com' + players[player].url;

    request(url, (function (player) {
        return function (err, resp, body) {
            if (err)
                throw err;
            $ = cheerio.load(body);
            // console.log(player);
            // TODO: scraping goes here!
            let name = $(".player-profile-hero-dash .first-name").text();
            console.log(name)
        }
    })(player));
}