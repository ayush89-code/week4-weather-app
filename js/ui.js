import { ICON_URL } from './config.js';

export const updateCurrentWeather = (data, unitSymbol) => {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}${unitSymbol}`;
    document.getElementById('weather-desc').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `${data.wind.speed} ${unitSymbol === '°C' ? 'm/s' : 'mph'}`;
    document.getElementById('weather-icon').src = `${ICON_URL}${data.weather[0].icon}@2x.png`;
    
    document.getElementById('weather-display').classList.remove('hidden');
};

export const updateForecast = (data, unitSymbol) => {
    const container = document.getElementById('forecast-container');
    container.innerHTML = '';
    
    // Filter to get 1 forecast per day (around noon)
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyData.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <p class="day">${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img src="${ICON_URL}${day.weather[0].icon}.png" alt="icon">
            <p class="temp">${Math.round(day.main.temp)}${unitSymbol}</p>
        `;
        container.appendChild(card);
    });
};

export const renderHistory = (cities, callback) => {
    const container = document.getElementById('recent-cities');
    container.innerHTML = '';
    cities.forEach(city => {
        const btn = document.createElement('button');
        btn.textContent = city;
        btn.className = 'history-btn';
        btn.onclick = () => callback(city);
        container.appendChild(btn);
    });
};

export const toggleLoader = (state) => {
    document.getElementById('loader').classList.toggle('hidden', !state);
};

export const showError = (msg) => {
    const el = document.getElementById('error-msg');
    el.textContent = msg;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 3000);
};