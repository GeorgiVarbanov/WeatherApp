import { getCoordinates, getForecast } from './apiCalls.js'



const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener(`click`, async () => {
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    const coordinates = await getCoordinates(city);
    
    if (coordinates === false){
        container.style.height = `400px`;
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add(`fadeIn`);
        return;
    }

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');


    const forecast = await getForecast(coordinates);

    const imageName = forecast.weather[0].main

    switch(imageName){
        case `Clear`:
            image.src = 'images/clear.png';
        break;
        case `Rain`:
            image.src = 'images/rain.png';
        break;
        case `Snow`:
            image.src = 'images/snow.png';
        break;
        case `Clouds`:
            image.src = 'images/cloud.png';
        break;
        case `Haze`:
            image.src = 'images/mist.png';
        break;

        default:
            image.src = '';
        break;
    }

    const tempAsDegrees = forecast.main.temp - 273.15;

    temperature.innerHTML = `${parseInt(tempAsDegrees)}<span>°C</span>`;
    description.innerHTML = `${forecast.weather[0].description}`;
    humidity.innerHTML = `${forecast.main.humidity}%`;
    wind.innerHTML = `${parseInt(forecast.wind.speed)}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
});

