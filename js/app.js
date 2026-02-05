import * as WeatherService from './weatherService.js';
import * as UI from './ui.js';
import * as Storage from './storage.js';

let currentUnit = 'metric'; // 'metric' (C) or 'imperial' (F)
let unitSymbol = '°C';

const init = () => {
    const lastCity = Storage.getLastCity();
    fetchWeather(lastCity);
    UI.renderHistory(Storage.getHistory(), fetchWeather);
};

const fetchWeather = async (city) => {
    UI.toggleLoader(true);
    try {
        const weatherData = await WeatherService.getWeatherData(city, currentUnit);
        const forecastData = await WeatherService.getForecastData(city, currentUnit);
        
        UI.updateCurrentWeather(weatherData, unitSymbol);
        UI.updateForecast(forecastData, unitSymbol);
        
        Storage.saveCity(weatherData.name);
        UI.renderHistory(Storage.getHistory(), fetchWeather);
    } catch (error) {
        UI.showError(error.message);
    } finally {
        UI.toggleLoader(false);
    }
};

// Search Event
document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) fetchWeather(city);
});

// Location Event
document.getElementById('location-btn').addEventListener('click', () => {
    if (navigator.geolocation) {
        UI.toggleLoader(true);
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const data = await WeatherService.getWeatherByCoords(pos.coords.latitude, pos.coords.longitude, currentUnit);
                fetchWeather(data.name);
            } catch (err) {
                UI.showError('Location access denied or failed');
            }
        });
    }
});

// Unit Toggle
document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        currentUnit = e.target.dataset.unit;
        unitSymbol = currentUnit === 'metric' ? '°C' : '°F';
        
        const currentCity = document.getElementById('city-name').textContent.split(',')[0];
        if (currentCity !== '--') fetchWeather(currentCity);
    });
});

init();