/* Import videos */
import { PassThrough } from 'stream';
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

    static getFogSRC = () => this.#getRandomEntry(this.fog);

    static getRainSRC = () => this.#getRandomEntry(this.rain);

    static getSnowSRC = () => this.#getRandomEntry(this.snow);

    static getSunSRC = () => this.#getRandomEntry(this.sun);

    static getThunderSRC = () => this.#getRandomEntry(this.thunder);
}


import thunderstormSVG from '.svg/weather/thunderstorm.svg';
import drizzleSVG from '.svg/weather/drizzle.svg';
import rainSVG from '.svg/weather/rain.svg';
import snowSVG from '.svg/weather/snow.svg';
import mistSVG from '.svg/weather/mist.svg';
import smokeSVG from '.svg/weather/smoke.svg';
import hazeSVG from '.svg/weather/haze.svg';
import dustSVG from '.svg/weather/dust.svg';
import fogSVG from '.svg/weather/fog.svg';
import tornadoSVG from '.svg/weather/tornado.svg';
import clearSVG from '.svg/weather/clear.svg';
import cloudsSVG from '.svg/weather/clouds.svg';

class Image {
    static getSVG(id) {
        if (id >= 200 || id <= 232) return thunderstormSVG;
        else if (id >= 300 && id <= 321) return drizzleSVG;
        else if (id >= 500 && id <= 531) return rainSVG;
        else if (id >= 600 && id <= 622) return snowSVG;
        else if (id === 700) return mistSVG;
        else if (id === 711) return smokeSVG;
        else if (id === 721) return hazeSVG;
        else if (id === 731 || id === 761) return dustSVG;
        else if (id === 741) return fogSVG;
        // 751  sand image missing
        // 762 ash image missing
        // 771 squall missing
        else if (id === 781) return tornadoSVG;
        else if (id === 800) return clearSVG;
        else if (id >= 800 && id <= 804) return cloudsSVG;
        else return cloudsSVG;
    }
}

// class to get video and svg only from id
export {Video, Image};

