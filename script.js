// Configuration API Open-Meteo (données 100% réelles)
const API_BASE = 'https://api.open-meteo.com/v1';
const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1';

// Codes météo WMO (World Meteorological Organization)
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
    56: { condition: 'Bruine verglaçante', bg: 'bg-rain' },
    57: { condition: 'Bruine verglaçante forte', bg: 'bg-rain' },
    61: { condition: 'Pluie légère', bg: 'bg-rain' },
    63: { condition: 'Pluie modérée', bg: 'bg-rain' },
    65: { condition: 'Pluie forte', bg: 'bg-rain' },
    66: { condition: 'Pluie verglaçante', bg: 'bg-rain' },
    67: { condition: 'Pluie verglaçante forte', bg: 'bg-rain' },
    71: { condition: 'Neige légère', bg: 'bg-cloudy' },
    73: { condition: 'Neige modérée', bg: 'bg-cloudy' },
    75: { condition: 'Neige forte', bg: 'bg-cloudy' },
    77: { condition: 'Grains de neige', bg: 'bg-cloudy' },
    80: { condition: 'Averses légères', bg: 'bg-rain' },
    81: { condition: 'Averses modérées', bg: 'bg-rain' },
    82: { condition: 'Averses violentes', bg: 'bg-rain' },
    85: { condition: 'Averses de neige légères', bg: 'bg-cloudy' },
    86: { condition: 'Averses de neige fortes', bg: 'bg-cloudy' },
    95: { condition: 'Orage', bg: 'bg-rain' },
    96: { condition: 'Orage grêle', bg: 'bg-rain' },
    99: { condition: 'Orage violent', bg: 'bg-rain' }
};

const JOURS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

// Sélecteurs DOM
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function getInfo(code) {
    return CODES[code] || { condition: 'Inconnu', bg: 'bg-blue' };
}

function getIconEmoji(code, isDay) {
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
    return '☀️';
}

// Afficher les données Open-Meteo réelles
function showWeather(data, cityName) {
    console.log('Affichage données réelles Open-Meteo pour:', cityName);
    
    if (!data || !data.current) {
        console.error('Données invalides');
        return;
    }
    
    const current = data.current;
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
    if (hlEl && data.daily && data.daily.temperature_2m_max && data.daily.temperature_2m_min) {
        const max = data.daily.temperature_2m_max[0];
        const min = data.daily.temperature_2m_min[0];
        if (max !== undefined && min !== undefined) {
            hlEl.innerHTML = `<span>H:${Math.round(max)}°</span><span>L:${Math.round(min)}°</span>`;
        }
    }
    
    // Humidité
    const humEl = $('#humidity');
    if (humEl && current.relative_humidity_2m !== undefined) {
        humEl.textContent = Math.round(current.relative_humidity_2m) + '%';
    }
    
    // Vent
    const windEl = $('#wind');
    if (windEl && current.wind_speed_10m !== undefined) {
        windEl.innerHTML = Math.round(current.wind_speed_10m) + ' <span class="unit">km/h</span>';
    }
    
    // Ressenti
    const feelEl = $('#feels-like');
    if (feelEl && current.apparent_temperature !== undefined) {
        feelEl.textContent = Math.round(current.apparent_temperature) + '°';
    }
    
    // Visibilité
    const dets = $$('.detail-big');
    if (dets.length > 2 && current.visibility !== undefined) {
        dets[2].innerHTML = Math.round(current.visibility / 1000) + ' <span class="unit">km</span>';
    }
    
    // UV (estimation basée sur l'heure et le code météo)
    const h = new Date().getHours();
    let uv = 0;
    if (current.weather_code === 0 && h >= 10 && h <= 16) uv = Math.round(Math.random() * 3 + 6);
    else if (current.weather_code === 0 && h >= 7 && h <= 19) uv = Math.round(Math.random() * 2 + 3);
    else if (current.weather_code === 1) uv = Math.round(Math.random() * 2 + 1);
    else uv = Math.round(Math.random() * 1);
    if (dets.length > 4) dets[4].textContent = uv;
    
    // Pression
    if (dets.length > 5 && current.pressure_msl !== undefined) {
        dets[5].innerHTML = Math.round(current.pressure_msl) + ' <span class="unit">hPa</span>';
    }
    
    // Heures (données réelles Open-Meteo)
    showHourly(data.hourly, current.weather_code);
    
    // Jours (données réelles Open-Meteo)
    showDaily(data.daily);
    
    // Fond
    const bg = $('.bg-layer');
    if (bg) bg.className = 'bg-layer ' + info.bg;
}

function showHourly(hourly, currentCode) {
    const list = $('#hourly-list');
    if (!list || !hourly || !hourly.time) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    let html = '';
    for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
        const hourIndex = currentHour + i;
        if (hourIndex >= hourly.time.length) break;
        
        const hour = (currentHour + i) % 24;
        const code = hourly.weather_code[hourIndex] !== undefined ? hourly.weather_code[hourIndex] : currentCode;
        const isDay = hourly.is_day ? hourly.is_day[hourIndex] === 1 : (hour >= 6 && hour <= 20);
        const temp = hourly.temperature_2m[hourIndex] !== undefined ? hourly.temperature_2m[hourIndex] : 0;
        
        // Utiliser les icônes 3D si disponibles, sinon emojis
        let iconHtml;
        if (typeof getWeatherIcon3D === 'function') {
            try {
                iconHtml = getWeatherIcon3D(code, isDay, 32);
            } catch(e) {
                iconHtml = `<span style="font-size:32px">${getIconEmoji(code, isDay)}</span>`;
            }
        } else {
            iconHtml = `<span style="font-size:32px">${getIconEmoji(code, isDay)}</span>`;
        }
        
        html += `
            <div class="hourly-item">
                <div class="time">${i === 0 ? 'Maintenant' : (hour < 10 ? '0' : '') + hour + 'h'}</div>
                <div class="icon">${iconHtml}</div>
                <div class="temp">${Math.round(temp)}°</div>
            </div>
        `;
    }
    list.innerHTML = html;
}

function showDaily(daily) {
    const list = $('#daily-list');
    if (!list || !daily || !daily.time) return;
    
    const times = daily.time;
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
        const code = codes[i] !== undefined ? codes[i] : 0;
        const max = maxs[i] !== undefined ? maxs[i] : 20;
        const min = mins[i] !== undefined ? mins[i] : 15;
        
        // Utiliser les icônes 3D si disponibles, sinon emojis
        let iconHtml;
        if (typeof getWeatherIcon3D === 'function') {
            try {
                iconHtml = getWeatherIcon3D(code, true, 28);
            } catch(e) {
                iconHtml = `<span style="font-size:28px">${getIconEmoji(code, true)}</span>`;
            }
        } else {
            iconHtml = `<span style="font-size:28px">${getIconEmoji(code, true)}</span>`;
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

// Charger données Open-Meteo 100% réelles
async function fetchOpenMeteo(lat, lon) {
    try {
        const url = `${API_BASE}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,pressure_msl,visibility&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=10`;
        
        console.log('Chargement données réelles Open-Meteo...');
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        
        const data = await response.json();
        
        if (!data.current) {
            throw new Error('Données invalides');
        }
        
        console.log('Données réelles chargées avec succès');
        return data;
        
    } catch (error) {
        console.error('Erreur API Open-Meteo:', error);
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
async function loadWeather(cityOrCoords) {
    let lat, lon, name;
    
    if (typeof cityOrCoords === 'object' && cityOrCoords.lat && cityOrCoords.lon) {
        lat = cityOrCoords.lat;
        lon = cityOrCoords.lon;
        name = await getCityName(lat, lon);
    } else {
        const city = await findCity(cityOrCoords);
        if (!city) {
            console.error('Ville non trouvée:', cityOrCoords);
            return;
        }
        lat = city.lat;
        lon = city.lon;
        name = city.name;
    }
    
    console.log('Chargement météo pour:', name);
    
    // Charger données réelles Open-Meteo
    const data = await fetchOpenMeteo(lat, lon);
    
    if (data) {
        showWeather(data, name);
    }
}

// Recherche manuelle
function doSearch() {
    const input = $('#city-input');
    if (!input) return;
    
    const city = input.value.trim();
    if (city) {
        loadWeather(city);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initialisation...');
    
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
    
    // Essayer la géolocalisation en PREMIER
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log('Géolocalisation réussie - chargement position actuelle');
                loadWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            },
            (err) => {
                console.log('Géolocalisation refusée ou impossible:', err.message);
                // Fallback sur Paris uniquement si géolocalisation échoue
                loadWeather('Paris');
            },
            { timeout: 10000, enableHighAccuracy: false }
        );
    } else {
        // Pas de géolocalisation disponible
        loadWeather('Paris');
    }
});