var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var players = require("./data/teste.json");

// const request = require('request-promise')

function regex_strip_string(string) {
  const striped_string = string.replace(/[\n\t\r]/g, "").trim();
  return striped_string;
}

function get_player_id(string) {
  let url_player_id = string,
    count_pleyer_id = url_player_id.length;

  if (count_pleyer_id > 0) {

    player_id = url_player_id.split("/")[4];
    return player_id;
  }
}

function get_slug_name(string) {
  let url_player_id = string,
    count_pleyer_id = url_player_id.length;

  if (count_pleyer_id > 0) {

    player_id = url_player_id.split("/")[3];
    return player_id;
  }
}

app.get('/tournaments', function (req, res) {
  // Let's scrape Anchorman 2
  let year = 2017;
  url = 'http://www.atpworldtour.com/en/scores/results-archive/?year=' + year;

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var tourney_id, title, release, date, tournaments;
      var json = [];

      $(".tourney-result").each(function (index, el) {

        // Set tourney ID
        let item_id = $(el).find(".tourney-details .button-border"),
          count_id = item_id.length;

        if (count_id > 0) {

          tourney_id = item_id.attr("href").split("/")[5];
          console.log(tourney_id);
        }

        var data = $(this),
          // monthFormat = data.text().trim().split(" "),
          tourney_location,
          tourney_name,
          tourney_badge;

        tourney_location = $(this).find('.tourney-location').text().trim();
        tourney_dates = $(this).find('.tourney-dates').text().trim();
        tourney_month = tourney_dates.split(".")[1];
        tourney_name = $(this).find('.tourney-title').text().trim();
        tourney_badge_uri = $(this).find(".tourney-badge-wrapper img").attr('src');
        tourney_surface = regex_strip_string($(this).find("div.item-details:contains('Outdoor'), div.item-details:contains('Indoor')").first().text());
        tourney_singles_draw = regex_strip_string($(this).find("div.item-details a").first().text());
        tourney_doubles_draw = regex_strip_string($(this).find("div.item-details a").eq(1).text());

        // Singles winner info
        sgl_winner_name = regex_strip_string($(this).find(".tourney-detail-winner a").first().text());

        // Doubles winners info
        dbl_winner = $(this).find(".tourney-detail-winner:contains('DBL') a");

        var dbl_winner_names = [];
        var doubles_winner_player_id = [];

        dbl_winner.each(function (index, el) {
          let player = regex_strip_string($(el).text());
          dbl_winner_names.push(player);

          // TODO link player
          let player_id = regex_strip_string($(el).attr('href').split("/")[4]);
          doubles_winner_player_id.push(player_id);
          // console.log(player_id);
        });

        tourney_badge = tourney_badge_uri.split("_").pop();
        tourney_category = tourney_badge.replace(/\.[^/.]+$/, "");
        fin_commit = regex_strip_string($(this).find(".fin-commit .item-value").text());

        json.push({
          _id: tourney_id,
          month: tourney_month,
          name: tourney_name,
          location: tourney_location,
          dates: tourney_dates,
          category: tourney_category,
          surface: tourney_surface,
          singles_draw: tourney_singles_draw,
          doubles_draw: tourney_doubles_draw,
          singles_winner_name: sgl_winner_name,
          doubles_winner_1_name: dbl_winner_names[0],
          doubles_winner_2_name: dbl_winner_names[1],
          fin_commit: fin_commit
        });

      });

    }

    fs.writeFile('data/' + year + '_tournaments.json', JSON.stringify(json, null, 4), function (err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('JSON Tournaments is done!')
  })
})
// TODO Players
app.get('/players', function (req, res) {


  var requestList = players;
  for (var i = 0; i < requestList.length; i++) {
    var current = requestList[i].url;
    GetMyResourceData(current)

  }

  function GetMyResourceData(current) {

    request("http://www.atpworldtour.com" + current, function (error, response, html) {
      // do something with the current variable
      var $ = cheerio.load(html);

      console.log({ name: $(".player-profile-hero-name").text() });

    });

  }
  res.send('JSON Players is done!')



  // function getFullInfo(name, id) {
  //   // Get player Overview
  //   overview = `http://www.atpworldtour.com/en/players/${name}/${id}/overview`;

  //   request(overview, function (error, response, html) {
  //     console.log("request");
  //     if (!error) {

  //       var ranking = $(".player-ranking-position .data-number").text();

  //     }
  //     res.send('JSON Players is done!')
  //   });
  // }

  // function getPlayerProfile(name, id) {
  //   overview = `http://www.atpworldtour.com/en/players/${name}/${id}/overview`

  // }

  // const request = require('request-promise')

  // async function getinfo(players) {
  //   var json = [];

  //   for (let i = 0; i < players.length; i++) {

  //     await request(`http://www.atpworldtour.com/en/players/${players[i].slug_name}/${players[i]._id}/overview`, function (error, response, html) {

  //       if (!error) {
  //         let $ = cheerio.load(html);

  //         let player_name = $(".player-profile-hero-name .first-name").text();
  //         console.log(player_name)




  //       }

  //     });


  //   }

  //   json.push(player_name);

  //   fs.writeFile('data/playerskkk.json', JSON.stringify(json, null, 4), function (err) {
  //     console.log('File successfully written! - Check your project directory for the output.json file');
  //   })
  //   res.send('JSON Players is done!')
  // }

  // getinfo(players);
  // foo([/*data*/])

  // url = "http://www.atpworldtour.com/en/rankings/singles?countryCode=all&rankRange=0-1000&sort=player&sortAscending=True";

  // request(url, function (error, response, html) {
  //   if (!error) {
  //     var $ = cheerio.load(html);

  //     var player_id, name, age, country, player_slug_name;
  //     var json = [];

  //     $(".table-rankings-wrapper tbody tr").each(function (index, el) {

  //       var data = $(this),
  //         player_url = data.find(".player-cell a").attr("href"),

  //         player_id = get_player_id(player_url),
  //         player_slug_name = get_slug_name(player_url),

  //         player_name = data.find(".player-cell a").text(),
  //         player_age = regex_strip_string(data.find(".age-cell").text()),
  //         player_country = data.find(".country-cell img").attr("alt");

  //       // console.log(fullInfo);

  //       json.push({
  //         _id: player_id,
  //         // name: player_name,
  //         // age: player_age,
  //         // country: player_country,
  //         slug_name: player_slug_name,
  //         url: player_url
  //       });

  //     });

  //   }

  //   fs.writeFile('data/players.json', JSON.stringify(json, null, 4), function (err) {
  //     console.log('File successfully written! - Check your project directory for the output.json file');
  //   })

  //   res.send('JSON Players is done!')
  // })

})

// Rankings
app.get('/rankings', function (req, res) {

  rankings = "http://www.atpworldtour.com/en/rankings/singles?rankRange=1-5000";

  request(rankings, function (error, response, html) {

    const json = [];
    if (!error) {
      const $ = cheerio.load(html);

      $(".table-rankings-wrapper tbody tr").each(function (index, el) {
        let data = $(this)
        let player_ranking = regex_strip_string(data.find(".rank-cell").text());
        let player_move = regex_strip_string(data.find(".move-cell").text());
        let player_country = data.find(".country-cell .country-item img").attr("alt");
        let player_name = data.find(".player-cell a").text();
        let player_age = regex_strip_string(data.find(".age-cell").text());
        let player_points = data.find(".points-cell a").text();
        let player_tourn_played = data.find(".tourn-cell a").text();

        json.push({
          ranking: player_ranking,
          move: player_move,
          country: player_country,
          name: player_name,
          age: player_age,
          points: player_points,
          tourn_played: player_tourn_played,
        });
        console.log(json)

      });

    }

    fs.writeFile('data/rankings.json', JSON.stringify(json, null, 4), function (err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    })
    res.send('JSON Players is done!')
  });

})

app.get('/get-tournaments', (req, resp) => {
  const id = req.params.id;
  const data = require('./' + year + '_tournaments.json'); // or whatever path
  resp.send(data)
});

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
