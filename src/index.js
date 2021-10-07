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
        console.log(data);

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

    static toggleLoadingState() {
        const loadingCircle = document.querySelector('.loading');
        loadingCircle.classList.toggle('active');
    }

    static getInput() {
        const searchBar = document.querySelector('.search-container .locationinput');
        return searchBar.value;
    }
}

WeatherInfo.getDataForCity('hamburg');



document.addEventListener('click', function() {
    DOM.moveSearchToTop();
    DOM.toggleLoadingState();
})