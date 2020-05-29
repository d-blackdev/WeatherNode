// const muscles = [
//     'shoulders', 'chest', 'arms', 'back','legs'
// ]

//  const exercises = [
//     {
//         id:"overhead-press",
//         title:'Overhead Press',
//         description:'Delts exercise',
//         muscles:'shoulders'
//     },
//     {

//         id:"dips",
//         title:'Dips',
//         description:'Triceps exercise',
//         muscles:'arms'
//     },
//     {

//         id:"barbell-curls",
//         title:'Barbell-curls',
//         description:'Biceps exercise',
//         muscles:'arms'
//     },
//     {

//         id:"bench-press",
//         title:'Bench Press',
//         description:'Chest exercise',
//         muscles:'chest'
//     },
//     {

//         id:'pull-ups',
//         title:'Pull Ups',
//         description:'Back and biceps exercise',
//         muscles:'back'
//     },
//     {

//         id:"deadlifts",
//         title:'DeadLifts',
//         description:'Back and Legs exercise',
//         muscles:'back'
//     },
//     {

//         id:"squats",
//         title:'Squats',
//         description:'Legs exercise',
//         muscles:'legs'
//     },
// ]
// module.exports.exercises = exercises;
// module.exports.muscles = muscles;

// var request = require("request");

// var options = {
//   method: "GET",
//   url: "https://community-open-weather-map.p.rapidapi.com/forecast",
//   qs: { q: "san francisco%2Cus" },
//   headers: {
//     "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
//     "x-rapidapi-key": "a5f2e159a5mshe67d50cc064059fp160142jsnbf598eb1ed95",
//     useQueryString: true,
//   },
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(response.body);
// });
const request = require('request');

const forecast = (latitude, longitutde, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=757741c2b2382b4bd3ae079cdf78d805&query=${latitude},${longitutde}`;

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback('Unable to conect to location services!', undefined);
    } else if (!response.body.location) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, response.body.current);
    }
  });
};

// forecast(40.7831, -73.9712, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// console.log(response.body.current);
module.exports = forecast;
