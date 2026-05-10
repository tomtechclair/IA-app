const API_CONFIG = {
    baseUrl: 'https://api.open-meteo.com/v1',
    geoUrl: 'https://geocoding-api.open-meteo.com/v1'
};

let currentCity = 'Paris';
let currentCoords = { lat: 48.8566, lon: 2.3522 };
let isFirstLoad = true;

const weatherCodes = {
    0: { condition: 'Ensoleillé', bg: 'bg-blue' },
    1: { condition: 'Partiellement nuageux', bg: 'bg-blue' },
    2: { condition: 'Nuageux', bg: 'bg-cloudy' },
    3: { condition: 'Couvert', bg: 'bg-cloudy' },
    45: { condition: 'Brouillard', bg: 'bg-cloudy' },
    48: { condition: 'Brouillard givrant', bg: 'bg-cloudy' },
    51: { condition: 'Bruine légère', bg: 'bg-rain' },
    53: { condition: 'Bruine modérée', bg: 'bg-rain' },
    55: { condition: 'Bruine forte', bg: 'bg-rain' },
    61: { condition: 'Pluie légère', bg: 'bg-rain' },
    63: { condition: 'Pluie modérée', bg: 'bg-rain' },
    65: { condition: 'Pluie forte', bg: 'bg-rain' },
    71: { condition: 'Neige légère', bg: 'bg-cloudy' },
    73: { condition: 'Neige modérée', bg: 'bg-cloudy' },
    75: { condition: 'Neige forte', bg: 'bg-cloudy' },
    77: { condition: 'Grains de neige', bg: 'bg-cloudy' },
    80: { condition: 'Averses légères', bg: 'bg-rain' },
    81: { condition: 'Averses modérées', bg: 'bg-rain' },
    82: { condition: 'Averses violentes', bg: 'bg-rain' },
    85: { condition: 'Averses de neige', bg: 'bg-cloudy' },
    86: { condition: 'Averses de neige', bg: 'bg-cloudy' },
    95: { condition: 'Orage', bg: 'bg-rain' },
    96: { condition: 'Orage grêle', bg: 'bg-rain' },
    99: { condition: 'Orage violent', bg: 'bg-rain' }
};

const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

function getWeatherInfo(code) {
    return weatherCodes[code] || { condition: 'Inconnu', bg: 'bg-blue' };
}

async function searchCityCoords(cityName) {
    try {
        const response = await fetch(
            `${API_CONFIG.geoUrl}/search?name=${encodeURIComponent(cityName)}&count=1&language=fr&format=json`
        );
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            return {
                name: data.results[0].name,
                lat: data.results[0].latitude,
                lon: data.results[0].longitude
            };
        }
        return null;
    } catch (error) {
        console.error('Erreur geocoding:', error);
        return null;
    }
}

async function fetchWeatherData(lat, lon) {
    try {
        const url = `${API_CONFIG.baseUrl}/forecast?` +
            `latitude=${lat}&longitude=${lon}&` +
            `current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,pressure_msl,visibility&` +
            `hourly=temperature_2m,weather_code,is_day&` +
            `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
            `timezone=auto&forecast_days=10`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur API meteo:', error);
        return null;
    }
}

function displayWeather(data, cityName) {
    if (!data || !data.current) {
        console.error('Donnees invalides');
        return;
    }
    
    const current = data.current;
    const isDay = current.is_day === 1;
    const weatherInfo = getWeatherInfo(current.weather_code);
    
    // Ville
    document.querySelector('.city').textContent = cityName;
    const cityInput = document.getElementById('city-input');
    if (cityInput) cityInput.value = cityName;
    
    // Temperature
    document.querySelector('.big-temp').textContent = `${Math.round(current.temperature_2m)}°`;
    
    // Condition
    const conditionEl = document.querySelector('.condition');
    if (conditionEl) {
        conditionEl.textContent = weatherInfo.condition;
    }
    
    // High/Low
    if (data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_min) {
        document.querySelector('.high-low').innerHTML = 
            `<span>H:${Math.round(data.daily.temperature_2m_max[0])}°</span>` +
            `<span>L:${Math.round(data.daily.temperature_2m_min[0])}°</span>`;
    }
    
    // Details
    const humidityEl = document.getElementById('humidity');
    if (humidityEl && current.relative_humidity_2m !== undefined) {
        humidityEl.textContent = `${Math.round(current.relative_humidity_2m)}%`;
    }
    
    const windEl = document.getElementById('wind');
    if (windEl && current.wind_speed_10m !== undefined) {
        windEl.innerHTML = `${Math.round(current.wind_speed_10m)} <span class="unit">km/h</span>`;
    }
    
    const feelsLikeEl = document.getElementById('feels-like');
    if (feelsLikeEl && current.apparent_temperature !== undefined) {
        feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)}°`;
    }
    
    const visibilityKm = current.visibility ? Math.round(current.visibility / 1000) : 10;
    const detailBigs = document.querySelectorAll('.detail-big');
    if (detailBigs.length > 2) {
        detailBigs[2].innerHTML = `${visibilityKm} <span class="unit">km</span>`;
    }
    
    // UV
    const hour = new Date().getHours();
    let uv = 0;
    if (hour >= 10 && hour <= 16) uv = Math.round(Math.random() * 5 + 3);
    else if (hour >= 7 && hour <= 19) uv = Math.round(Math.random() * 3 + 1);
    if (detailBigs.length > 4) detailBigs[4].textContent = uv;
    
    // Pression
    if (detailBigs.length > 5 && current.pressure_msl !== undefined) {
        detailBigs[5].innerHTML = `${Math.round(current.pressure_msl)} <span class="unit">hPa</span>`;
    }
    
    // Hourly
    displayHourly(data.hourly, current.weather_code, isDay);
    
    // Daily
    displayDaily(data.daily);
    
    // Background
    updateBackground(weatherInfo.bg);
}

function displayHourly(hourly, currentCode, isDayNow) {
    if (!hourly || !hourly.time) return;
    
    const hourlyList = document.getElementById('hourly-list');
    if (!hourlyList) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    let html = '';
    for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
        const hourIndex = currentHour + i;
        if (hourIndex >= hourly.time.length) break;
        
        const hour = (currentHour + i) % 24;
        const code = hourly.weather_code[hourIndex];
        const isDay = hourly.is_day ? hourly.is_day[hourIndex] === 1 : (hour >= 6 && hour <= 20);
        
        const iconHTML = typeof getWeatherIcon3D === 'function' 
            ? getWeatherIcon3D(code || currentCode, isDay, 36) 
            : '';
        
        html += `
            <div class="hourly-item">
                <div class="time">${i === 0 ? 'Maintenant' : `${hour.toString().padStart(2, '0')}h`}</div>
                <div class="icon">${iconHTML}</div>
                <div class="temp">${Math.round(hourly.temperature_2m[hourIndex] || 0)}°</div>
            </div>
        `;
    }
    hourlyList.innerHTML = html;
}

function displayDaily(daily) {
    if (!daily || !daily.time) return;
    
    const dailyList = document.getElementById('daily-list');
    if (!dailyList) return;
    
    const minTemp = Math.min(...(daily.temperature_2m_min || [0]));
    const maxTemp = Math.max(...(daily.temperature_2m_max || [30]));
    const range = maxTemp - minTemp || 1;
    
    let html = '';
    const maxDays = Math.min(daily.time.length, 8);
    
    for (let i = 0; i < maxDays; i++) {
        const date = new Date(daily.time[i]);
        const dayName = i === 0 ? 'Auj.' : days[date.getDay()];
        const code = daily.weather_code[i] || 0;
        
        const iconHTML = typeof getWeatherIcon3D === 'function' 
            ? getWeatherIcon3D(code, true, 30) 
            : '';
        
        const tempLow = daily.temperature_2m_min[i] || 0;
        const tempHigh = daily.temperature_2m_max[i] || 0;
        
        const barStart = ((tempLow - minTemp) / range) * 100;
        const barWidth = ((tempHigh - tempLow) / range) * 100;
        
        html += `
            <div class="daily-item">
                <div class="day">${dayName}</div>
                <div class="icon">${iconHTML}</div>
                <div class="temp-low">${Math.round(tempLow)}°</div>
                <div class="temp-bar-container">
                    <div class="temp-bar" style="left: ${Math.max(0, barStart)}%; width: ${Math.max(0, barWidth)}%"></div>
                </div>
                <div class="temp-high">${Math.round(tempHigh)}°</div>
            </div>
        `;
    }
    dailyList.innerHTML = html;
}

function updateBackground(bgClass) {
    const bg = document.querySelector('.bg-layer');
    if (bg) bg.className = `bg-layer ${bgClass}`;
}

async function updateWeather(cityName) {
    try {
        let lat, lon, name;
        
        if (typeof cityName === 'object' && cityName.lat && cityName.lon) {
            lat = cityName.lat;
            lon = cityName.lon;
            name = cityName.name || 'Position actuelle';
        } else {
            const cityData = await searchCityCoords(cityName);
            if (!cityData) {
                if (!isFirstLoad) alert('Ville non trouvee');
                return;
            }
            lat = cityData.lat;
            lon = cityData.lon;
            name = cityData.name;
        }
        
        currentCity = name;
        currentCoords = { lat, lon };
        
        const weatherData = await fetchWeatherData(lat, lon);
        
        if (weatherData) {
            displayWeather(weatherData, name);
        } else if (!isFirstLoad) {
            alert('Erreur lors du chargement des donnees meteo');
        }
        
    } catch (error) {
        console.error('Erreur:', error);
        if (!isFirstLoad) alert('Erreur de connexion');
    }
}

function searchCity() {
    const input = document.getElementById('city-input');
    const city = input ? input.value.trim() : '';
    if (city) {
        isFirstLoad = false;
        updateWeather(city);
    }
}

// Geolocation
function initGeolocation() {
    if (!navigator.geolocation) {
        updateWeather('Paris');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            updateWeather({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                name: 'Position actuelle'
            });
        },
        (error) => {
            console.warn('Geolocation error:', error.message);
            updateWeather('Paris');
        },
        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchCity();
                cityInput.blur();
            }
        });
        
        cityInput.addEventListener('blur', () => {
            if (cityInput.value.trim() !== currentCity) {
                searchCity();
            }
        });
    }
    
    // Init storm background if available
    if (typeof initStormBackground === 'function') {
        initStormBackground();
    }
    
    // Try geolocation first, fallback to Paris
    initGeolocation();
});