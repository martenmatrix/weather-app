import css from './style.css';
import Media from './assets.js';

class WeatherInfo {
    static OpenWeatherAPIKEY = 'd6ba7bd5f4bb9861d8b78c0e508d31eb';
    static units = 'metric';

    static async getDataForCity(city) {
        const url = `api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${this.OpenWeatherAPIKEY}`;
        const response = await fetch(url, {mode: 'cors'});
        const data = await response.json();

        return data;
    }
}

class DOM {
// weather codes https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
//sand has no icon//ash has no icon//squall has no icon
    static #setBackgroundVideo(src) {
        const sourceElement = document.querySelector('video source')
        sourceElement.src = src;
    }

    static #moveSearchToTop() {
        const searchbar = document.querySelector('.search-container');
        searchbar.classList.add('active');
    }

    static #setInfoVisible() {
        const weatherInfo = document.querySelector('.weather-container');
        weatherInfo.classList.add('active');
    }

    static #setInfoInvisible() {
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

    static toggleLoadingState() {
        const loadingCircle = document.querySelector('.loading');
        loadingCircle.classList.toggle('active');
    }
}