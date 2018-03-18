var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {
  // Let's scrape Anchorman 2
  let year = 2017;
  url = 'http://www.atpworldtour.com/en/scores/results-archive/?year=' + year;

  function regex_strip_string(string) {
    const striped_string = string.replace(/[\n\t\r]/g, "").trim();
    return striped_string;
  }

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

      $('.player-profile-hero-name').filter(function () {
        var data = $(this);

        title = data.children().first().text().trim();
        json.title = title;
        // json.release = release;
      });

      // $('.hero-date-range').filter(function () {
      //   var data = $(this);
      //   date = data.text().trim();

      //   json.date = date;
      // });


    }

    fs.writeFile('data/' + year + '_tournaments.json', JSON.stringify(json, null, 4), function (err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.get('/tournaments', (req, resp) => {
  const id = req.params.id;
  const data = require('./' + year + '_tournaments.json'); // or whatever path
  resp.send(data)
});

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
