import axios from 'axios';

const WEATHERBIT_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const WEATHERBIT_KEY = "16e0dbec1a964a2fa96cbee12686a3a8";

export const getForecast = async (lat, long) => {
    const response = await axios(WEATHERBIT_URL, {
        params: {
            key: WEATHERBIT_KEY,
            lat: lat,
            lon: long,
            days: 5,
            lang: 'fr',
        }
    });
    console.log(response.data);
    return response.data;
};