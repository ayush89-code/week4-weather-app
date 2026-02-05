import { API_KEY, BASE_URL } from './config.js';

export const getWeatherData = async (city, unit = 'metric') => {
    try {
        const response = await fetch(`${BASE_URL}weather?q=${city}&units=${unit}&appid=${API_KEY}`);
        if (!response.ok) throw new Error('City not found');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getForecastData = async (city, unit = 'metric') => {
    try {
        const response = await fetch(`${BASE_URL}forecast?q=${city}&units=${unit}&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Forecast unavailable');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getWeatherByCoords = async (lat, lon, unit = 'metric') => {
    try {
        const response = await fetch(`${BASE_URL}weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`);
        return await response.json();
    } catch (error) {
        throw error;
    }
};