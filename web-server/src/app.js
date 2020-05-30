const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./weather-app/forecast');
const geocode = require('./weather-app/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const pathDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialPath = path.join(__dirname, '../template/partials');

// Setup static directory to serve
app.use(express.static(pathDirectory));

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.get('/', (req, res) => {
  res.render('index', { title: 'Homepage', name: 'Kenny' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', name: 'Kenny' });
});
app.get('/contact/*', (req, res) => {
  res.send('Subcontact link');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide a location',
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({
        error: error,
      });
    } else {
      forecast(
        latitude,
        longitude,
        (
          err,
          { temperature, weather_descriptions, precip, observation_time }
        ) => {
          if (err) {
            res.send({
              error: err,
            });
          } else {
            res.send({
              temperature,
              weather_descriptions: weather_descriptions[0],
              observation_time,
              precip,
              location: location,
            });
          }
        }
      );
    }
  });
});

app.get('*', (req, res) => {
  res.render('404', { title: '404 PAGE NOT FOUND', name: 'Kenny' });
});
// app.get("/", (req, res) => {
//   res.send();
//   //   res.end(() => {
//   //     console.log("Done");
//   //   });
// });

app.listen(port);
console.log('Listening on port' + port);
