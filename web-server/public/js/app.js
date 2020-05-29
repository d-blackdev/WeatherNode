// const data = fetch('http://localhost:3000/weather?address=Ibadan')
//   .then((response) => {
//     response.json().then((data) => {
//       console.log(data);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// data();

// const axios = require('axios');

// axios
//   .get('https://localhost:3000/weather?address=Boston')
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorPara = document.querySelector('.error-message');
const messagePara = document.querySelector('.message');
// const p = document.createElement(p);
const dats = `<div class="spinner-border mx-auto text-primary" role="status">
<span class="sr-only">Loading...</span>
</div>`;

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;
  localStorage.getItem(location);
  localStorage.setItem('location', location);
  if (!location) {
    alert('You must provide a location to search for');
  } else {
    messagePara.innerHTML = dats;
    errorPara.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
      res.json().then((data) => {
        if (data.error) {
          errorPara.textContent = data.error;
          //   console.log(data.error);
        } else {
          //   if (!data.location) {
          //   } else {
          errorPara.textContent = `It is going to be a ${data.weather_descriptions} day, with a temprature of ${data.temperature} deg celcius`;
          messagePara.textContent = data.location;
          //   p.textContent = data.temperature;
          //   messagePara.appendChild(p);
          //   }

          //   console.log(data.temperature);
        }
      });
    });
  }
});
