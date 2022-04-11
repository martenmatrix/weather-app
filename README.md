# Weather App

This application uses the [OpenWeatherMap API](https://openweathermap.org/api) to display the current weather for an entered location. The provided information consists of the temperature and a vague and a detailed description of the weather. The temperate can be displayed in °C or °F.

Based on the weather, it chooses a video as a background and an icon, which resemble the weather.

> :warning: If you are using FireFox, please visit `about:config` and set `layout.css.backdrop-filter.enabled` and `gfx.webrender.all` both to true. **This is optional**, and a polyfill is included, if you refuse to do this. 
> 
> The page just looks better with the CSS property `backdrop-filter` properly rendered/enabled.

## Table of Contents
- [Deployed links](#globe_with_meridians-deployed-links)
- [Usage](#grey_exclamation-usage)
- [Features](#sparkles-features)
- [Installation](#wrench-installation)
- [Technology stack](#blue_book-technology-stack)
- [License](#scroll-license)

## :globe_with_meridians: Deployed links

The application is hosted at the following address:

- https://martenmatrix.github.io/weather-app/

## :grey_exclamation: Usage
1. Enter a city name, state code or/and country code divided by comma, Please, refer to [ISO 3166](https://www.iso.org/obp/ui/#search) for the state codes or country codes.
2. If everything went fine, you should now be able to see the current weather in your location with a  nice little background video representing it. :tada:
If not, please [create an issue](https://github.com/martenmatrix/weather-app/issues/new).
3. If you want to switch between °C or °F, use the switch in the top right corner.

## :sparkles: Features
- display current weather for a location
- display video representing the weather
- provide a vague and detailed description about the weather
- able to switch between °C or °F for displaying the temperature

##  :wrench: Installation

If you want to run the application on your local pc or just want to contribute, do the following steps:

1. Clone the repository.
	`git clone https://github.com/martenmatrix/capital-gains-trading-calculator`

2. Install the dependencies.
	`npm install`

3. If you want to run the website on your localhost type: 
	`npm run start`

## :blue_book: Technology Stack
- **Webpack** v5.53
- **Babel** v.7.15.5
- **PostCSS** v.8.3.9
- **ESLint** v.7.32
## :scroll: License
[MIT](https://github.com/martenmatrix/capital-gains-trading-calculator/blob/master/LICENSE)
