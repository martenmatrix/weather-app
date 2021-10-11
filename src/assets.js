import fog from './videos/fog/fog_forest_drive.webm';
import rainDay from './videos/rain/rain_window_day.webm';
import rainNight from './videos/rain/rain_window_night.webm';
import snowNight from './videos/snow/snow_forest_house.webm';
import snowDay from './videos/snow/snow_lake.webm';
import sun from './videos/sun/sun_beach.webm';
import thunder from './videos/thunder/thunder_nature.webm';

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

function getWeather(id) {
    if (id >= 200 && id <= 232) return 'thunderstorm';
    if (id >= 300 && id <= 321) return 'drizzle';
    if (id >= 500 && id <= 531) return 'rain';
    if (id >= 600 && id <= 622) return 'snow';
    if (id === 700) return 'mist';
    if (id === 711) return 'smoke';
    if (id === 721) return 'haze';
    if (id === 731 || id === 761) return 'dust';
    if (id === 741) return 'fog';
    // 751  sand image missing
    // 762 ash image missing
    // 771 squall missing
    if (id === 781) return 'tornado';
    if (id === 800) return 'clear';
    if (id >= 800 && id <= 804) return 'clouds';
    return 'error';
}

class Video {
    static fog = [fog];

    static rain = [rainDay, rainNight];

    static snow = [snowNight, snowDay];

    static sun = [sun];

    static thunder = [thunder];

    // Private methods currently only works with Babel
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
        if (weather === 'rain' || weather === 'drizzle' || weather === 'clouds') return this.#getRainSRC();
        if (weather === 'snow') return this.#getSnowSRC();
        if (weather === 'sun' || weather === 'clear') return this.#getSunSRC();
        if (weather === 'thunder' || weather === 'tornado') return this.#getThunderSRC();
        return this.#getRainSRC();
    }
}

class Image extends Video {
    static getSVG(id) {
        const weather = getWeather(id);

        if (weather === 'thunderstorm') return thunderstormSVG;
        if (weather === 'drizzle') return drizzleSVG;
        if (weather === 'rain') return rainSVG;
        if (weather === 'snow') return snowSVG;
        if (weather === 'mist') return mistSVG;
        if (weather === 'smoke') return smokeSVG;
        if (weather === 'haze') return hazeSVG;
        if (weather === 'dust') return dustSVG;
        if (weather === 'fog') return fogSVG;
        // 751  sand image missing
        // 762 ash image missing
        // 771 squall missing
        if (weather === 'tornado') return tornadoSVG;
        if (weather === 'clear') return clearSVG;
        if (weather === 'clouds') return cloudsSVG;
        return cloudsSVG;
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
