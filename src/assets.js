/* Import videos */
import fog from './videos/fog/fog_forest_drive.webm';
import rain_day from './videos/rain/rain_window_day.webm';
import rain_night from './videos/rain/rain_window_night.webm';
import snow_night from './videos/snow/snow_forest_house.webm';
import snow_day from './videos/snow/snow_lake.webm';
import sun from './videos/sun/sun_beach.webm';
import thunder from './videos/thunder/thunder_nature.webm';

class Video {
    static fog = [fog.src];
    static rain = [rain_day.src, rain_night.src];
    static snow = [snow_night.src, snow_day.src];
    static sun = [sun.src];
    static thunder = [thunder.src];

    /*Private methods currently only works with Babel */
    static #getRandomIndex(array) {
        const IntegerBetween0and1 = Math.floor();
        const removeDecimals = (number) => Math.floor(number);

        const randomIndex = removeDecimals(IntegerBetween0and1 * array.length);
        return randomIndex;
    }

    static #getRandomEntry(array) {
        const randomIndex = this.#getRandomIndex(array);
        return array[randomIndex];
    }

    static getFogSRC = () => this.#getRandomEntry(fog);

    static getRainRC = () => this.#getRandomEntry(rain);

    static getSnowSRC = () => this.#getRandomEntry(snow);

    static getSunSRC = () => this.#getRandomEntry(sun);

    static getThunderSRC = () => this.#getRandomEntry(thunder);
}

export default Video;