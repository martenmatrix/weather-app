function getWeather(id) {
    if (id >= 200 && id <= 232) return 'thunderstorm';
    else if (id >= 300 && id <= 321) return 'drizzle';
    else if (id >= 500 && id <= 531) return 'rain';
    else if (id >= 600 && id <= 622) return 'snow';
    else if (id === 700) return 'mist';
    else if (id === 711) return 'smoke';
    else if (id === 721) return 'haze';
    else if (id === 731 || id === 761) return 'dust';
    else if (id === 741) return 'fog';
    // 751  sand image missing
    // 762 ash image missing
    // 771 squall missing
    else if (id === 781) return 'tornado';
    else if (id === 800) return 'clear';
    else if (id >= 800 && id <= 804) return 'clouds';
    else return 'error';
}

import fog from './videos/fog/fog_forest_drive.webm';
import rain_day from './videos/rain/rain_window_day.webm';
import rain_night from './videos/rain/rain_window_night.webm';
import snow_night from './videos/snow/snow_forest_house.webm';
import snow_day from './videos/snow/snow_lake.webm';
import sun from './videos/sun/sun_beach.webm';
import thunder from './videos/thunder/thunder_nature.webm';

class Video {
    static fog = [fog];
    static rain = [rain_day, rain_night];
    static snow = [snow_night, snow_day];
    static sun = [sun];
    static thunder = [thunder];

    /*Private methods currently only works with Babel */
    static #getRandomIndex(array) {
        const IntegerBetween0and1 = Math.random();
        const removeDecimals = (number) => Math.floor(number);

        const randomIndex = removeDecimals(IntegerBetween0and1 * array.length);
        return randomIndex;
    }

    static #getRandomEntry(array) {
        const randomIndex = this.#getRandomIndex(array);
        return array[randomIndex];
    }

    static #getFogSRC = () => this.#getRandomEntry(this.fog);

    static #getRainSRC = () => this.#getRandomEntry(this.rain);

    static #getSnowSRC = () => this.#getRandomEntry(this.snow);

    static #getSunSRC = () => this.#getRandomEntry(this.sun);

    static #getThunderSRC = () => this.#getRandomEntry(this.thunder);

    static getVideo(id) {
        const weather = getWeather(id);

        if (weather === 'fog' || weather === 'mist' || weather === 'smoke' || weather === 'haze' || weather === 'dust') return this.#getFogSRC();
        else if (weather === 'rain' || weather === 'drizzle' || weather === 'clouds') return this.#getRainSRC();
        else if (weather === 'snow') return this.#getSnowSRC();
        else if (weather === 'sun' || weather === 'clear') return this.#getSunSRC();
        else if (weather === 'thunder' || weather === 'tornado') return this.#getThunderSRC();
        else return this.#getRainSRC();
    }
}


import thunderstormSVG from './svg/weather/thunderstorm.svg';
import drizzleSVG from './svg/weather/drizzle.svg';
import rainSVG from './svg/weather/rain.svg';
import snowSVG from './svg/weather/snow.svg';
import mistSVG from './svg/weather/mist.svg';
import smokeSVG from './svg/weather/smoke.svg';
import hazeSVG from './svg/weather/haze.svg';
import dustSVG from './svg/weather/dust.svg';
import fogSVG from './svg/weather/fog.svg';
import tornadoSVG from './svg/weather/tornado.svg';
import clearSVG from './svg/weather/clear.svg';
import cloudsSVG from './svg/weather/clouds.svg';

class Image extends Video {
    static getSVG(id) {
        const weather = getWeather(id);

        if (weather === 'thunderstorm') return thunderstormSVG;
        else if (weather === 'drizzle') return drizzleSVG;
        else if (weather === 'rain') return rainSVG;
        else if (weather === 'snow') return snowSVG;
        else if (weather === 'mist') return mistSVG;
        else if (weather === 'smoke') return smokeSVG;
        else if (weather === 'haze') return hazeSVG;
        else if (weather === 'dust') return dustSVG;
        else if (weather === 'fog') return fogSVG;
        // 751  sand image missing
        // 762 ash image missing
        // 771 squall missing
        else if (weather === 'tornado') return tornadoSVG;
        else if (weather === 'clear') return clearSVG;
        else if (weather === 'clouds') return cloudsSVG;
        else return cloudsSVG;
    }
}

class Media extends Image {
    static getMedia(id) {
        const correspondingMedia = {
            weather: null,
            video: null,
            image: null,
        };

        const weather = getWeather(id);
        const image = this.getSVG(id);
        const video = this.getVideo.call(Video, id);

        correspondingMedia.weather = weather;
        correspondingMedia.image = image;
        correspondingMedia.video = video;

        return correspondingMedia;
    }
}

export default Media;

