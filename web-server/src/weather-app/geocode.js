const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1Ijoia2Vubml4MTUzIiwiYSI6ImNrYXFhNjg5NjA3Nm4ycW5xbnY5MDZsd3kifQ.aOVYi-2I67tBGvpurCDz6g`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to conect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longititude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

// geocode('Manhattan, Kansas, United States', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
module.exports = geocode;
