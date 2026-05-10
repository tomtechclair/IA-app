// Données météo simulées (fallback)
const DEMO_DATA = {
    current: {
        temperature_2m: 22,
        relative_humidity_2m: 45,
        apparent_temperature: 24,
        is_day: 1,
        weather_code: 1,
        wind_speed_10m: 12,
        pressure_msl: 1015,
        visibility: 10000
    },
    hourly: {
        time: Array.from({length: 24}, (_, i) => new Date().getTime() + i * 3600000),
        temperature_2m: Array.from({length: 24}, (_, i) => 20 + Math.sin((i - 6) * Math.PI / 12) * 5),
        weather_code: Array.from({length: 24}, () => [0,1,2,3,61,80,95][Math.floor(Math.random() * 7)]),
        is_day: Array.from({length: 24}, (_, i) => (i + new Date().getHours()) % 24 >= 6 && (i + new Date().getHours()) % 24 <= 20 ? 1 : 0)
    },
    daily: {
        time: Array.from({length: 10}, (_, i) => new Date().getTime() + i * 86400000),
        temperature_2m_max: Array.from({length: 10}, () => 22 + Math.random() * 6),
        temperature_2m_min: Array.from({length: 10}, () => 15 + Math.random() * 4),
        weather_code: Array.from({length: 10}, () => [0,1,2,3,61,80][Math.floor(Math.random() * 6)])
    }
};

// Configuration API
const API_BASE = 'https://api.open-meteo.com/v1';
const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1';

// Codes météo
const CODES = {
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

const JOURS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// Éléments DOM
function getInfo(code) {
    return CODES[code] || { condition: 'Inconnu', bg: 'bg-blue' };
}

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

// Afficher les données
function showWeather(data, cityName) {
    console.log('Affichage météo pour:', cityName);
    
    const current = data.current || DEMO_DATA.current;
    const info = getInfo(current.weather_code || 0);
    
    // Ville
    const cityEl = $('.city');
    if (cityEl) cityEl.textContent = cityName || 'Météo';
    
    const inputEl = $('#city-input');
    if (inputEl) inputEl.value = cityName || '';
    
    // Température
    const tempEl = $('.big-temp');
    if (tempEl && current.temperature_2m !== undefined) {
        tempEl.textContent = Math.round(current.temperature_2m) + '°';
    }
    
    // Condition
    const condEl = $('.condition');
    if (condEl) condEl.textContent = info.condition;
    
    // Min/Max
    const hlEl = $('.high-low');
    if (hlEl && data.daily) {
        const max = data.daily.temperature_2m_max?.[0];
        const min = data.daily.temperature_2m_min?.[0];
        if (max !== undefined && min !== undefined) {
            hlEl.innerHTML = `<span>H:${Math.round(max)}°</span><span>L:${Math.round(min)}°</span>`;
        }
    }
    
    // Détails
    const humEl = $('#humidity');
    if (humEl && current.relative_humidity_2m !== undefined) {
        humEl.textContent = Math.round(current.relative_humidity_2m) + '%';
    }
    
    const windEl = $('#wind');
    if (windEl && current.wind_speed_10m !== undefined) {
        windEl.innerHTML = Math.round(current.wind_speed_10m) + ' <span class="unit">km/h</span>';
    }
    
    const feelEl = $('#feels-like');
    if (feelEl && current.apparent_temperature !== undefined) {
        feelEl.textContent = Math.round(current.apparent_temperature) + '°';
    }
    
    // Visibilité
    const dets = $$('.detail-big');
    if (dets.length > 2 && current.visibility !== undefined) {
        dets[2].innerHTML = Math.round(current.visibility / 1000) + ' <span class="unit">km</span>';
    }
    
    // UV
    const h = new Date().getHours();
    let uv = 0;
    if (h >= 10 && h <= 16) uv = Math.round(Math.random() * 5 + 3);
    else if (h >= 7 && h <= 19) uv = Math.round(Math.random() * 3 + 1);
    if (dets.length > 4) dets[4].textContent = uv;
    
    // Pression
    if (dets.length > 5 && current.pressure_msl !== undefined) {
        dets[5].innerHTML = Math.round(current.pressure_msl) + ' <span class="unit">hPa</span>';
    }
    
    // Heures
    showHourly(data.hourly || DEMO_DATA.hourly, current.weather_code);
    
    // Jours
    showDaily(data.daily || DEMO_DATA.daily);
    
    // Fond
    const bg = $('.bg-layer');
    if (bg) bg.className = 'bg-layer ' + info.bg;
    
    console.log('Météo affichée avec succès');
}

function showHourly(hourly, currentCode) {
    const list = $('#hourly-list');
    if (!list) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    const temps = hourly.temperature_2m || [];
    const codes = hourly.weather_code || [];
    const dayNight = hourly.is_day || [];
    
    let html = '';
    for (let i = 0; i < Math.min(24, temps.length); i++) {
        const hour = (currentHour + i) % 24;
        const code = codes[i] || currentCode || 0;
        const isDay = dayNight[i] !== undefined ? dayNight[i] === 1 : (hour >= 6 && hour <= 20);
        const temp = temps[i] !== undefined ? Math.round(temps[i]) : 20;
        
        // Emoji simple comme fallback
        let emoji = '☀️';
        if (!isDay && code === 0) emoji = '🌙';
        else if (code >= 51 && code <= 67) emoji = '🌧️';
        else if (code >= 71 && code <= 77) emoji = '❄️';
        else if (code >= 80 && code <= 82) emoji = '🌦️';
        else if (code >= 95) emoji = '⛈️';
        else if (code === 1 || code === 2) emoji = '⛅';
        else if (code === 3) emoji = '☁️';
        
        // Essayer les icônes 3D si disponibles
        let iconHtml = `<span style="font-size:32px">${emoji}</span>`;
        if (typeof getWeatherIcon3D === 'function') {
            try {
                iconHtml = getWeatherIcon3D(code, isDay, 32);
            } catch(e) {
                // Fallback emoji
            }
        }
        
        html += `
            <div class="hourly-item">
                <div class="time">${i === 0 ? 'Maintenant' : (hour < 10 ? '0' : '') + hour + 'h'}</div>
                <div class="icon">${iconHtml}</div>
                <div class="temp">${temp}°</div>
            </div>
        `;
    }
    list.innerHTML = html;
}

function showDaily(daily) {
    const list = $('#daily-list');
    if (!list) return;
    
    const times = daily.time || [];
    const maxs = daily.temperature_2m_max || [];
    const mins = daily.temperature_2m_min || [];
    const codes = daily.weather_code || [];
    
    if (!times.length) return;
    
    const minTemp = Math.min(...mins.filter(x => x !== undefined));
    const maxTemp = Math.max(...maxs.filter(x => x !== undefined));
    const range = maxTemp - minTemp || 1;
    
    let html = '';
    const maxDays = Math.min(times.length, 8);
    
    for (let i = 0; i < maxDays; i++) {
        const date = new Date(times[i]);
        const dayName = i === 0 ? 'Auj.' : JOURS[date.getDay()];
        const code = codes[i] || 0;
        const max = maxs[i] !== undefined ? maxs[i] : 20;
        const min = mins[i] !== undefined ? mins[i] : 15;
        
        // Emoji simple
        let emoji = '☀️';
        if (code >= 51 && code <= 67) emoji = '🌧️';
        else if (code >= 71 && code <= 77) emoji = '❄️';
        else if (code >= 80 && code <= 82) emoji = '🌦️';
        else if (code >= 95) emoji = '⛈️';
        else if (code === 1 || code === 2) emoji = '⛅';
        else if (code === 3) emoji = '☁️';
        
        let iconHtml = `<span style="font-size:28px">${emoji}</span>`;
        if (typeof getWeatherIcon3D === 'function') {
            try {
                iconHtml = getWeatherIcon3D(code, true, 28);
            } catch(e) {
                // Fallback emoji
            }
        }
        
        const barStart = ((min - minTemp) / range) * 100;
        const barWidth = ((max - min) / range) * 100;
        
        html += `
            <div class="daily-item">
                <div class="day">${dayName}</div>
                <div class="icon">${iconHtml}</div>
                <div class="temp-low">${Math.round(min)}°</div>
                <div class="temp-bar-container">
                    <div class="temp-bar" style="left: ${Math.max(0, barStart)}%; width: ${Math.max(5, barWidth)}%"></div>
                </div>
                <div class="temp-high">${Math.round(max)}°</div>
            </div>
        `;
    }
    list.innerHTML = html;
}

// Charger météo depuis API
async function fetchWeather(lat, lon, cityName) {
    try {
        const url = `${API_BASE}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,pressure_msl,visibility&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=10`;
        
        console.log('Chargement météo:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            console.warn('API erreur:', response.status);
            return null;
        }
        
        const data = await response.json();
        console.log('Données reçues:', data);
        
        if (!data.current) {
            console.warn('Données invalides');
            return null;
        }
        
        return data;
    } catch (error) {
        console.error('Erreur fetch:', error);
        return null;
    }
}

// Rechercher ville
async function findCity(name) {
    try {
        const response = await fetch(`${GEO_BASE}/search?name=${encodeURIComponent(name)}&count=1&language=fr&format=json`);
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
        console.error('Erreur recherche ville:', error);
        return null;
    }
}

// Nom depuis coordonnées
async function getCityName(lat, lon) {
    try {
        const response = await fetch(`${GEO_BASE}/get?latitude=${lat}&longitude=${lon}&language=fr&format=json`);
        const data = await response.json();
        if (data.name) return data.name;
    } catch (e) {}
    
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=fr`);
        const data = await response.json();
        if (data.address) {
            return data.address.city || data.address.town || data.address.village || data.address.suburb || 'Position actuelle';
        }
    } catch (e) {}
    
    return 'Position actuelle';
}

// Charger et afficher
async function loadAndShow(cityOrCoords) {
    let lat, lon, name;
    
    if (typeof cityOrCoords === 'object' && cityOrCoords.lat && cityOrCoords.lon) {
        // Coordonnées GPS
        lat = cityOrCoords.lat;
        lon = cityOrCoords.lon;
        name = await getCityName(lat, lon);
    } else {
        // Nom de ville
        const city = await findCity(cityOrCoords);
        if (!city) {
            console.warn('Ville non trouvée:', cityOrCoords);
            return;
        }
        lat = city.lat;
        lon = city.lon;
        name = city.name;
    }
    
    console.log('Chargement pour:', name, lat, lon);
    
    // Essayer l'API
    const data = await fetchWeather(lat, lon, name);
    
    if (data) {
        showWeather(data, name);
    } else {
        // Fallback données démo avec le nom de la ville
        console.log('Utilisation données démo');
        showWeather(DEMO_DATA, name);
    }
}

// Recherche manuelle
function doSearch() {
    const input = $('#city-input');
    if (!input) return;
    
    const city = input.value.trim();
    if (city && city !== ($('.city')?.textContent || '')) {
        loadAndShow(city);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM chargé, initialisation...');
    
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
    
    // Charger Paris immédiatement pour que quelque chose s'affiche
    loadAndShow('Paris');
    
    // Essayer la géolocalisation en arrière-plan (remplace si succès)
    if (navigator.geolocation) {
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    console.log('GPS trouvé');
                    loadAndShow({ lat: pos.coords.latitude, lon: pos.coords.longitude });
                },
                (err) => {
                    console.log('GPS non disponible:', err.message);
                },
                { timeout: 10000 }
            );
        }, 1000);
    }
});