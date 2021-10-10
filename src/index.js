import css from './style.css';
import Media from './assets.js';

// do i really need to have the runtime-generator installed as dependency?

class WeatherInfo {
    static OpenWeatherAPIKEY = 'd6ba7bd5f4bb9861d8b78c0e508d31eb';
    static units = 'metric';

    static async getDataForCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.units}&appid=${this.OpenWeatherAPIKEY}`;
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();

        return data;
    }

    static convertDegrees(degrees) {
        console.log('hey')
    }
}

class DOM {
// weather codes https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
//sand has no icon//ash has no icon//squall has no icon
    static #setBackgroundVideo(src) {
        const sourceElement = document.querySelector('video source')
        sourceElement.src = src;
    }

    static moveSearchToTop() {
        const searchbar = document.querySelector('.search-container');
        searchbar.classList.add('active');
    }

    static setInfoVisible() {
        const weatherInfo = document.querySelector('.weather-container');
        weatherInfo.classList.add('active');
    }

    static setInfoInvisible() {
        const weatherInfo = document.querySelector('.weather-container');
        weatherInfo.classList.remove('active');
    }

    static setBackgroundVideoURL(src) {
        const backgroundVideoSource = document.querySelector('.backgroundvideo source');
        backgroundVideoSource.src = src;
    }

    static setWeatherSVG(src) {
        const currenWeatherSVG = document.querySelector('.weather-container .weather-icon');
        currenWeatherSVG.src = src;
    }

    static setWeatherTitle(title) {
        const mainTitle = document.querySelector('.weather-description .main');
        mainTitle.textContent = title;
    }

    static setWeatherDetails(description) {
        const weatherDescription = document.querySelector('.weather-description .details');
        weatherDescription.textContent = description;
    }

    static setWeatherTemperature(number) {
        const weatherTempTextDiv = document.querySelector('.weather-container .temp-number');
        weatherTempTextDiv.textContent = number;
    }

    static toggleLoadingState() {
        const loadingCircle = document.querySelector('.loading');
        loadingCircle.classList.toggle('active');
    }

    static getInput() {
        const input = document.querySelector('.search-container input');
        return input.value;
    }

    static getSelectedUnit() {
        const unitInput = document.querySelector('input[name="isCelsius"]');
        const isCelsius = unitInput.checked;
        return isCelsius;
    }
}

async function getWeatherObjectFromInput() {
    const input = DOM.getInput();
    const weatherInfo = await WeatherInfo.getDataForCity(input);
    if (!(weatherInfo.cod === 200)) return 'error';
    return weatherInfo;
}

function getAssets(weatherObject) {
    const id = weatherObject.weather[0].id;
    const mediaObject = Media.getMedia(id);
    return mediaObject;
}

function displayAssets(mediaObject) {
    const svgurl = mediaObject.image;
    const videourl = mediaObject.video;

    DOM.setWeatherSVG(svgurl);
    DOM.setBackgroundVideoURL(videourl);
}

function displayInformation(weatherObject) {
    const title = weatherObject.weather[0].main;
    const details = weatherObject.weather[0].description;
    const currentDegrees = weatherObject.main.temp;
    const convertedDegrees = convertDegrees(currentDegrees);

    DOM.setWeatherTitle(title);
    DOM.setWeatherDetails(details);
    DOM.setWeatherTemperature(convertDegrees);
}

async function getInputAndDisplayData() {
    DOM.moveSearchToTop();
    DOM.setInfoInvisible();
    DOM.toggleLoadingState();
    const weatherObject = await getWeatherObjectFromInput();
    
    if (weatherObject === 'error') {
        DOM.toggleLoadingState();
        DOM.setInfoVisible();
        console.error('ERROR. Does the city exist, which you entered?');
        return;
    }
    const assets = getAssets(weatherObject);
    displayAssets(assets);
    displayInformation(weatherObject);
    DOM.toggleLoadingState();
    DOM.setInfoVisible();
}

document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') getInputAndDisplayData();
    });