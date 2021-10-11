import css from './style.css';
import Media from './assets';

// do i really need to have the runtime-generator installed as dependency?

class WeatherInfo {
    static OpenWeatherAPIKEY = 'd6ba7bd5f4bb9861d8b78c0e508d31eb';

    static units = 'metric';

    static async getDataForCity(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.units}&appid=${this.OpenWeatherAPIKEY}`;
        const response = await fetch(url, { mode: 'cors' });
        const data = await response.json();

        return data;
    }

    static convertDegrees(degrees, currentUnit, useUnit) {
        const round = (number) => Math.round(number);
        const convertCelsiusToFahrenheit = (celsius) => (celsius * (9 / 5)) + 32;
        const convertFahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * (5 / 9);

        if (currentUnit === 'fahrenheit' && useUnit === 'celsius') {
            const celsius = convertFahrenheitToCelsius(degrees);
            const roundedCelsius = round(celsius);
            return roundedCelsius;
        }
        if (currentUnit === 'celsius' && useUnit === 'fahrenheit') {
            const fahrenheit = convertCelsiusToFahrenheit(degrees);
            const roundedFahrenheit = round(fahrenheit);
            return roundedFahrenheit;
        }

        return round(degrees);
    }
}

class DOM {
// weather codes https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// sand has no icon//ash has no icon//squall has no icon
    static setBackgroundVideoURL(src) {
        const videoElement = document.querySelector('video');
        const sourceElement = document.querySelector('video source');
        sourceElement.src = src;
        videoElement.load();
        videoElement.play();
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
        const unitInput = document.querySelector('input[name="isFahrenheit"]');
        const isFahrenheit = unitInput.checked;
        if (isFahrenheit) return 'fahrenheit';
        return 'celsius';
    }
}

async function getWeatherObjectFromInput() {
    const input = DOM.getInput();
    const weatherInfo = await WeatherInfo.getDataForCity(input);
    if (!(weatherInfo.cod === 200)) return 'error';
    return weatherInfo;
}

function getAssets(weatherObject) {
    const { id } = weatherObject.weather[0];
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
    const selectedUnit = DOM.getSelectedUnit();
    const convertedDegrees = WeatherInfo.convertDegrees(currentDegrees, 'celsius', selectedUnit);

    DOM.setWeatherTitle(title);
    DOM.setWeatherDetails(details);
    DOM.setWeatherTemperature(convertedDegrees);
}

async function getInputAndDisplayData() {
    DOM.moveSearchToTop();
    DOM.setInfoInvisible();
    DOM.toggleLoadingState();
    const weatherObject = await getWeatherObjectFromInput();

    if (weatherObject === 'error') {
        DOM.toggleLoadingState();
        DOM.setInfoVisible();
        throw new Error('ERROR. Does the city exist, which you entered?');
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
const searchButton = document.querySelector('.search-container img');
searchButton.addEventListener('click', getInputAndDisplayData);

const switchUnit = document.querySelector('.celsius-fahrenheit-switch input');
switchUnit.addEventListener('click', () => {
    const currentTemperatureDIV = document.querySelector('.temp-number');
    const currentTemperature = currentTemperatureDIV.textContent;

    const newUnit = DOM.getSelectedUnit();
    const oldUnit = newUnit === 'fahrenheit' ? 'celsius' : 'fahrenheit';

    const convertedTemperature = WeatherInfo.convertDegrees(currentTemperature, oldUnit, newUnit);
    currentTemperatureDIV.textContent = convertedTemperature;
});
