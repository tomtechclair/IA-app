const API_CONFIG = {
    baseUrl: 'https://api.open-meteo.com/v1',
    geoUrl: 'https://geocoding-api.open-meteo.com/v1'
};

let currentCity = 'Paris';
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

async function loadWeather(cityName, lat, lon) {
    try {
        const url = `${API_CONFIG.baseUrl}/forecast?` +
            `latitude=${lat}&longitude=${lon}&` +
            `current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,pressure_msl,visibility&` +
            `hourly=temperature_2m,weather_code,is_day&` +
            `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
            `timezone=auto&forecast_days=10`;
        
        const response = await fetch(url);
        if (!response.ok) {
            console.error('API error:', response.status);
            return false;
        }
        
        const data = await response.json();
        if (!data || !data.current) {
            console.error('Invalid data');
            return false;
        }
        
        displayWeather(data, cityName);
        return true;
        
    } catch (error) {
        console.error('Load weather error:', error);
        return false;
    }
}

function displayWeather(data, cityName) {
    const current = data.current;
    const weatherInfo = getWeatherInfo(current.weather_code || 0);
    
    // Ville
    const cityEl = document.querySelector('.city');
    if (cityEl) cityEl.textContent = cityName;
    
    const inputEl = document.getElementById('city-input');
    if (inputEl) inputEl.value = cityName;
    
    // Temperature
    const tempEl = document.querySelector('.big-temp');
    if (tempEl && current.temperature_2m !== undefined) {
        tempEl.textContent = `${Math.round(current.temperature_2m)}°`;
    }
    
    // Condition
    const condEl = document.querySelector('.condition');
    if (condEl) condEl.textContent = weatherInfo.condition;
    
    // High/Low
    const highLowEl = document.querySelector('.high-low');
    if (highLowEl && data.daily) {
        const max = data.daily.temperature_2m_max ? data.daily.temperature_2m_max[0] : null;
        const min = data.daily.temperature_2m_min ? data.daily.temperature_2m_min[0] : null;
        if (max !== null && min !== null) {
            highLowEl.innerHTML = `<span>H:${Math.round(max)}°</span><span>L:${Math.round(min)}°</span>`;
        }
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
    
    const feelsEl = document.getElementById('feels-like');
    if (feelsEl && current.apparent_temperature !== undefined) {
        feelsEl.textContent = `${Math.round(current.apparent_temperature)}°`;
    }
    
    const detailBigs = document.querySelectorAll('.detail-big');
    if (detailBigs.length > 2 && current.visibility !== undefined) {
        detailBigs[2].innerHTML = `${Math.round(current.visibility / 1000)} <span class="unit">km</span>`;
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
    displayHourly(data.hourly, current.weather_code);
    
    // Daily
    displayDaily(data.daily);
    
    // Background
    const bg = document.querySelector('.bg-layer');
    if (bg) bg.className = `bg-layer ${weatherInfo.bg}`;
}

function displayHourly(hourly, currentCode) {
    const list = document.getElementById('hourly-list');
    if (!list || !hourly || !hourly.time) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    let html = '';
    for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
        const hourIndex = currentHour + i;
        if (hourIndex >= hourly.time.length) break;
        
        const hour = (currentHour + i) % 24;
        const code = hourly.weather_code[hourIndex] || currentCode;
        const isDay = hourly.is_day ? hourly.is_day[hourIndex] === 1 : (hour >= 6 && hour <= 20);
        
        const iconHTML = typeof getWeatherIcon3D === 'function' 
            ? getWeatherIcon3D(code, isDay, 36) 
            : '';
        
        html += `
            <div class="hourly-item">
                <div class="time">${i === 0 ? 'Maintenant' : `${hour.toString().padStart(2, '0')}h`}</div>
                <div class="icon">${iconHTML}</div>
                <div class="temp">${Math.round(hourly.temperature_2m[hourIndex] || 0)}°</div>
            </div>
        `;
    }
    list.innerHTML = html;
}

function displayDaily(daily) {
    const list = document.getElementById('daily-list');
    if (!list || !daily || !daily.time) return;
    
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
    list.innerHTML = html;
}

// Reverse geocoding pour obtenir le nom de la ville depuis les coordonnées
async function getCityNameFromCoords(lat, lon) {
    try {
        const response = await fetch(
            `${API_CONFIG.geoUrl}/get?latitude=${lat}&longitude=${lon}&language=fr&format=json`
        );
        const data = await response.json();
        
        if (data.name) {
            return data.name;
        }
        
        // Fallback via Nominatim
        const nominatimResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=fr`
        );
        const nominatimData = await nominatimResponse.json();
        
        if (nominatimData.address) {
            const addr = nominatimData.address;
            return addr.city || addr.town || addr.village || addr.suburb || addr.county || 'Position actuelle';
        }
        
        return 'Position actuelle';
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return 'Position actuelle';
    }
}

// Search and geolocation
async function searchCity(name) {
    try {
        const response = await fetch(
            `${API_CONFIG.geoUrl}/search?name=${encodeURIComponent(name)}&count=1&language=fr&format=json`
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
        console.error('Search error:', error);
        return null;
    }
}

async function loadCity(cityName) {
    isFirstLoad = false;
    
    if (typeof cityName === 'object' && cityName.lat && cityName.lon) {
        // Obtenir le vrai nom de la ville depuis les coordonnées
        const realCityName = await getCityNameFromCoords(cityName.lat, cityName.lon);
        
        const success = await loadWeather(realCityName, cityName.lat, cityName.lon);
        if (success) {
            currentCity = realCityName;
        }
        return;
    }
    
    const cityData = await searchCity(cityName);
    if (cityData) {
        const success = await loadWeather(cityData.name, cityData.lat, cityData.lon);
        if (success) {
            currentCity = cityData.name;
        }
    }
}

function handleSearch() {
    const input = document.getElementById('city-input');
    const city = input ? input.value.trim() : '';
    if (city && city !== currentCity) {
        loadCity(city);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Input events
    const input = document.getElementById('city-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
                input.blur();
            }
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() !== currentCity) {
                handleSearch();
            }
        });
    }
    
    // Try geolocation, fallback to Paris
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                loadCity({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude
                });
            },
            () => {
                // Fallback to Paris on error
                loadCity('Paris');
            },
            { timeout: 8000 }
        );
    } else {
        loadCity('Paris');
    }
});