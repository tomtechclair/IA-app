// Configuration - Utilise uniquement Open-Meteo (gratuit, sans clé API)
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Codes météo WMO
const WEATHER_CODES = {
    0: 'Ensoleillé',
    1: 'Partiellement nuageux',
    2: 'Nuageux',
    3: 'Couvert',
    45: 'Brouillard',
    48: 'Brouillard givrant',
    51: 'Bruine légère',
    53: 'Bruine modérée',
    55: 'Bruine forte',
    56: 'Bruine verglaçante',
    57: 'Bruine verglaçante forte',
    61: 'Pluie légère',
    63: 'Pluie modérée',
    65: 'Pluie forte',
    66: 'Pluie verglaçante',
    67: 'Pluie verglaçante forte',
    71: 'Neige légère',
    73: 'Neige modérée',
    75: 'Neige forte',
    77: 'Grains de neige',
    80: 'Averses légères',
    81: 'Averses modérées',
    82: 'Averses violentes',
    85: 'Averses de neige légères',
    86: 'Averses de neige fortes',
    95: 'Orage',
    96: 'Orage grêle',
    99: 'Orage violent'
};

function getCondition(code) {
    return WEATHER_CODES[code] || 'Inconnu';
}

function getIcon(code, isDay) {
    if (!isDay && code === 0) return '🌙';
    if (code === 0) return '☀️';
    if (code === 1 || code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 57) return '🌧️';
    if (code >= 61 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 85 && code <= 86) return '🌨️';
    if (code >= 95) return '⛈️';
    return '☁️';
}

function $(sel) { return document.querySelector(sel); }

// Données de secours (Paris)
function getFallbackData() {
    const now = new Date();
    return {
        current: {
            temperature_2m: 20,
            relative_humidity_2m: 60,
            apparent_temperature: 20,
            is_day: 1,
            weather_code: 1,
            wind_speed_10m: 10,
            pressure_msl: 1013,
            visibility: 10000
        },
        hourly: {
            time: Array.from({length: 24}, (_, i) => new Date(now.getTime() + i * 3600000).toISOString()),
            temperature_2m: Array.from({length: 24}, (_, i) => 18 + Math.sin((now.getHours() + i - 6) * Math.PI / 12) * 5),
            weather_code: Array.from({length: 24}, () => Math.random() > 0.7 ? 0 : (Math.random() > 0.5 ? 1 : 3)),
            is_day: Array.from({length: 24}, (_, i) => {
                const h = (now.getHours() + i) % 24;
                return h >= 6 && h <= 20 ? 1 : 0;
            })
        },
        daily: {
            time: Array.from({length: 7}, (_, i) => new Date(now.getTime() + i * 86400000).toISOString().split('T')[0]),
            weather_code: Array.from({length: 7}, () => Math.random() > 0.5 ? 0 : (Math.random() > 0.5 ? 1 : 3)),
            temperature_2m_max: Array.from({length: 7}, () => 20 + Math.random() * 5),
            temperature_2m_min: Array.from({length: 7}, () => 12 + Math.random() * 5)
        }
    };
}

// Afficher les données météo
function displayWeather(data, cityName) {
    const current = data.current || getFallbackData().current;
    const hourly = data.hourly || getFallbackData().hourly;
    const daily = data.daily || getFallbackData().daily;
    
    // Ville
    const cityEl = $('.city');
    if (cityEl) cityEl.textContent = cityName;
    
    const inputEl = $('#city-input');
    if (inputEl) inputEl.value = cityName;
    
    // Température
    const tempEl = $('.big-temp');
    if (tempEl) tempEl.textContent = Math.round(current.temperature_2m || 20) + '°';
    
    // Condition
    const condEl = $('.condition');
    if (condEl) condEl.textContent = getCondition(current.weather_code || 0);
    
    // Min/Max
    const hlEl = $('.high-low');
    if (hlEl && daily.temperature_2m_max && daily.temperature_2m_min) {
        hlEl.innerHTML = `<span>H:${Math.round(daily.temperature_2m_max[0])}°</span><span>L:${Math.round(daily.temperature_2m_min[0])}°</span>`;
    }
    
    // Détails
    const humEl = $('#humidity');
    if (humEl) humEl.textContent = Math.round(current.relative_humidity_2m || 60) + '%';
    
    const windEl = $('#wind');
    if (windEl) windEl.innerHTML = Math.round(current.wind_speed_10m || 10) + ' <span class="unit">km/h</span>';
    
    const feelEl = $('#feels-like');
    if (feelEl) feelEl.textContent = Math.round(current.apparent_temperature || 20) + '°';
    
    const visEl = $('.detail-big');
    if (visEl && current.visibility) {
        visEl.innerHTML = Math.round(current.visibility / 1000) + ' <span class="unit">km</span>';
    }
    
    // UV
    const h = new Date().getHours();
    let uv = 0;
    if (current.weather_code === 0 && h >= 10 && h <= 16) uv = 6 + Math.floor(Math.random() * 3);
    else if (current.weather_code === 0 && h >= 7 && h <= 19) uv = 3 + Math.floor(Math.random() * 3);
    else if (current.weather_code === 1) uv = 2 + Math.floor(Math.random() * 2);
    
    const uvEls = document.querySelectorAll('.detail-big');
    if (uvEls.length > 4) uvEls[4].textContent = uv;
    
    // Pression
    if (uvEls.length > 5 && current.pressure_msl) {
        uvEls[5].innerHTML = Math.round(current.pressure_msl) + ' <span class="unit">hPa</span>';
    }
    
    // Prévisions horaires
    const hourlyList = $('#hourly-list');
    if (hourlyList && hourly.time) {
        let html = '';
        const now = new Date();
        const currentHour = now.getHours();
        
        for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
            const hour = (currentHour + i) % 24;
            const code = hourly.weather_code[i] || 0;
            const isDay = hourly.is_day ? hourly.is_day[i] === 1 : (hour >= 6 && hour <= 20);
            const temp = hourly.temperature_2m[i] !== undefined ? hourly.temperature_2m[i] : 20;
            
            html += `
                <div class="hourly-item">
                    <div class="time">${i === 0 ? 'Maint' : (hour < 10 ? '0' : '') + hour + 'h'}</div>
                    <div class="icon"><span style="font-size:28px">${getIcon(code, isDay)}</span></div>
                    <div class="temp">${Math.round(temp)}°</div>
                </div>
            `;
        }
        hourlyList.innerHTML = html;
    }
    
    // Prévisions journalières
    const dailyList = $('#daily-list');
    if (dailyList && daily.time) {
        let html = '';
        const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        const now = new Date();
        
        for (let i = 0; i < Math.min(7, daily.time.length); i++) {
            const date = new Date(daily.time[i]);
            const dayName = i === 0 ? 'Auj.' : jours[date.getDay()];
            const code = daily.weather_code[i] || 0;
            const max = daily.temperature_2m_max[i] || 20;
            const min = daily.temperature_2m_min[i] || 15;
            
            html += `
                <div class="daily-item">
                    <div class="day">${dayName}</div>
                    <div class="icon"><span style="font-size:24px">${getIcon(code, true)}</span></div>
                    <div class="temp-low">${Math.round(min)}°</div>
                    <div class="temp-high">${Math.round(max)}°</div>
                </div>
            `;
        }
        dailyList.innerHTML = html;
    }
    
    // Fond
    const code = current.weather_code || 0;
    let bgClass = 'bg-blue';
    if (code === 0 || code === 1) bgClass = 'bg-blue';
    else if (code === 2 || code === 3) bgClass = 'bg-cloudy';
    else if (code >= 45) bgClass = 'bg-rain';
    
    const bg = $('.bg-layer');
    if (bg) bg.className = 'bg-layer ' + bgClass;
}

// Charger les données météo depuis Open-Meteo
async function loadWeather(lat, lon, cityName) {
    try {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,pressure_msl,visibility',
            hourly: 'temperature_2m,weather_code,is_day',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min',
            timezone: 'auto',
            forecast_days: '7'
        });
        
        const response = await fetch(`${WEATHER_URL}?${params}`);
        
        if (!response.ok) {
            throw new Error('API Error');
        }
        
        const data = await response.json();
        displayWeather(data, cityName);
        return true;
        
    } catch (error) {
        console.log('API indisponible, utilisation données locales');
        displayWeather(getFallbackData(), cityName);
        return false;
    }
}

// Rechercher une ville
async function searchCity(name) {
    try {
        const response = await fetch(`${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=fr&format=json`);
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
        return null;
    }
}

// Obtenir le nom de ville depuis les coordonnées
async function getCityName(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=fr`);
        const data = await response.json();
        if (data.address) {
            return data.address.city || data.address.town || data.address.village || 'Position actuelle';
        }
    } catch (e) {}
    return 'Position actuelle';
}

// Charger pour une ville
async function loadCity(cityOrCoords) {
    let lat, lon, name;
    
    if (typeof cityOrCoords === 'object' && cityOrCoords.lat) {
        // Coordonnées GPS
        lat = cityOrCoords.lat;
        lon = cityOrCoords.lon;
        name = await getCityName(lat, lon);
    } else {
        // Nom de ville
        const city = await searchCity(cityOrCoords);
        if (!city) {
            // Ville non trouvée, utiliser Paris par défaut
            loadWeather(48.8566, 2.3522, 'Paris');
            return;
        }
        lat = city.lat;
        lon = city.lon;
        name = city.name;
    }
    
    await loadWeather(lat, lon, name);
}

// Recherche manuelle
function doSearch() {
    const input = $('#city-input');
    if (!input) return;
    
    const city = input.value.trim();
    if (city && city !== ($('.city')?.textContent || '')) {
        loadCity(city);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Input events
    const input = $('#city-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                doSearch();
                input.blur();
            }
        });
        
        input.addEventListener('blur', () => {
            doSearch();
        });
    }
    
    // Charger Paris par défaut
    loadCity('Paris');
    
    // Essayer la géolocalisation en arrière-plan
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                loadCity({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            },
            () => {
                // Échec silencieux, Paris est déjà chargé
            },
            { timeout: 10000 }
        );
    }
});