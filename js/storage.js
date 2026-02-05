const STORAGE_KEY = 'weather_history';

export const saveCity = (city) => {
    let cities = getHistory();
    if (!cities.includes(city)) {
        cities.unshift(city); // Add to beginning
        if (cities.length > 5) cities.pop(); // Keep only last 5
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
    }
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const getLastCity = () => {
    const history = getHistory();
    return history.length > 0 ? history[0] : 'London'; // Default to London
};