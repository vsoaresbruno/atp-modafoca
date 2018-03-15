var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {
  // Let's scrape Anchorman 2
  url = 'http://www.atpworldtour.com/en/tournaments';

  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var title, release, date, tournaments;
      var json = [];

      $(".accordion-label").each(function (index) {

        var data = $(this),
          tournament = $('.tourney-result'),
          monthFormat = data.text().trim().split(" "),
          tournament_city,
          tournament_name,
          tournament_badge;

        data.siblings('.centered-content-wrapper').find('.tourney-result.tourney-result').each(function (index) {

          tournament_city = $(this).find('.tourney-location').text().trim();
          tournament_name = $(this).find('.tourney-title').text().trim();
          tournament_badge_uri = $(this).find(".tourney-badge-wrapper img").attr('src');

          //TODO
          tournament_badge = tournament_badge_uri.split("_").pop();
          tournament_category = tournament_badge.replace(/\.[^/.]+$/, "");

          json.push({ month: monthFormat[0], name: tournament_name, city: tournament_city, category: tournament_category });
        });


        // var monthName = monthFormat[0],
        // month = {};
        // month[monthName] = { tournament_name, tournamentCity };

        // json.tournaments.months.push(month);

      });

      // $('.player-profile-hero-name').filter(function () {
      //   var data = $(this);

      //   title = data.children().first().text().trim();
      //   json.title = title;
      //   // json.release = release;
      // });

      // $('.hero-date-range').filter(function () {
      //   var data = $(this);
      //   date = data.text().trim();

      //   json.date = date;
      // });


    }

    fs.writeFile('data/tournaments.json', JSON.stringify(json, null, 4), function (err) {
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.get('/tournaments', (req, resp) => {
  const id = req.params.id;
  const data = require('./tournaments.json'); // or whatever path
  resp.send(data)
});

app.listen('3000')
console.log('Magic happens on port 3000');
exports = module.exports = app;
