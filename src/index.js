import css from './style.css';

class WeatherInfo {
    static OpenWeatherAPIKEY = 'd6ba7bd5f4bb9861d8b78c0e508d31eb';
    static units = 'metric';

    static getDataForCity(city) {
        const url = `api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${this.OpenWeatherAPIKEY}`;
    }
}

class DOM {
// weather codes https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
//sand has no icon//ash has no icon//squall has no icon
}