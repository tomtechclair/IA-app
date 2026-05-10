// Configuration
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

const WEATHER_CODES = {
    0: 'Ensoleillé', 1: 'Partiellement nuageux', 2: 'Nuageux', 3: 'Couvert',
    45: 'Brouillard', 48: 'Brouillard givrant',
    51: 'Bruine', 53: 'Bruine modérée', 55: 'Bruine forte',
    61: 'Pluie légère', 63: 'Pluie modérée', 65: 'Pluie forte',
    71: 'Neige légère', 73: 'Neige modérée', 75: 'Neige forte',
    80: 'Averses légères', 81: 'Averses modérées', 82: 'Averses violentes',
    95: 'Orage', 96: 'Orage grêle', 99: 'Orage violent'
};

function getCondition(code) {
    return WEATHER_CODES[code] || 'Inconnu';
}

function getBgClass(code) {
    if (code === 0) return 'bg-sunny';
    if (code === 1) return 'bg-partly-cloudy';
    if (code >= 2 && code <= 3) return 'bg-cloudy';
    if (code >= 45 && code <= 48) return 'bg-fog';
    if (code >= 51 && code <= 67) return 'bg-rain';
    if (code >= 71 && code <= 77) return 'bg-snow';
    if (code >= 80 && code <= 82) return 'bg-rain';
    if (code >= 95) return 'bg-thunder';
    return 'bg-sunny';
}

function $(sel) { return document.querySelector(sel); }

// ===== SVG ICONS =====
function getSVG(code, isDay, size = 48) {
    const s = size;
    
    if (code === 0 && !isDay) {
        // 🌙 Moon
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><filter id="moonGlow${s}"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
            <circle cx="32" cy="32" r="14" fill="#E8E8E8" filter="url(#moonGlow${s})"/>
            <circle cx="32" cy="32" r="14" fill="url(#moonGrad${s})"/>
            <circle cx="26" cy="26" r="2" fill="#C0C0C0" opacity="0.4"/>
            <circle cx="30" cy="28" r="1.5" fill="#C0C0C0" opacity="0.3"/>
            <circle cx="28" cy="34" r="1.8" fill="#C0C0C0" opacity="0.35"/>
            <circle cx="34" cy="30" r="2.2" fill="#C0C0C0" opacity="0.3"/>
            <ellipse cx="27" cy="25" rx="4" ry="5" fill="#FFFFFF" opacity="0.15"/>
            <defs><radialGradient id="moonGrad${s}" cx="35%" cy="35%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#F0F0F0"/><stop offset="100%" stop-color="#D0D0D0"/></radialGradient></defs>
        </svg>`;
    }
    
    if (code === 0) {
        // ☀️ Sun
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><filter id="sunGlow${s}"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
            <circle cx="32" cy="32" r="10" fill="#FFC107" filter="url(#sunGlow${s})" opacity="0.3"/>
            <circle cx="32" cy="32" r="10" fill="url(#sunGrad${s})"/>
            <ellipse cx="28" cy="28" rx="3" ry="2" fill="#FFFFFF" opacity="0.4"/>
            ${[0,45,90,135,180,225,270,315].map(a => {
                const r = a * Math.PI / 180;
                const x1 = 32 + Math.cos(r) * 13;
                const y1 = 32 + Math.sin(r) * 13;
                const x2 = 32 + Math.cos(r) * 18;
                const y2 = 32 + Math.sin(r) * 18;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFC107" stroke-width="2.5" stroke-linecap="round"/>`;
            }).join('')}
            <defs><radialGradient id="sunGrad${s}" cx="35%" cy="35%"><stop offset="0%" stop-color="#FFFDE7"/><stop offset="30%" stop-color="#FFEB3B"/><stop offset="70%" stop-color="#FFC107"/><stop offset="100%" stop-color="#FF9800"/></radialGradient></defs>
        </svg>`;
    }
    
    if (code === 1 || code === 2) {
        // ⛅ Partly cloudy
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><filter id="sunPartGlow${s}"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
            <circle cx="42" cy="22" r="8" fill="#FFC107" opacity="0.8" filter="url(#sunPartGlow${s})"/>
            ${[30,60,90,330].map(a => {
                const r = a * Math.PI / 180;
                const x1 = 42 + Math.cos(r) * 10;
                const y1 = 22 + Math.sin(r) * 10;
                const x2 = 42 + Math.cos(r) * 14;
                const y2 = 22 + Math.sin(r) * 14;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFC107" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`;
            }).join('')}
            <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))">
                <ellipse cx="28" cy="42" rx="12" ry="7" fill="url(#cloudGrad${s})"/>
                <ellipse cx="20" cy="36" rx="8" ry="6" fill="url(#cloudGrad${s})"/>
                <ellipse cx="36" cy="38" rx="7" ry="5" fill="url(#cloudGrad${s})"/>
                <ellipse cx="26" cy="32" rx="6" ry="5" fill="url(#cloudGrad${s})"/>
                <ellipse cx="32" cy="34" rx="5" ry="4" fill="url(#cloudGrad${s})"/>
            </g>
            <ellipse cx="19" cy="33" rx="4" ry="3" fill="#FFFFFF" opacity="0.6"/>
            <defs><radialGradient id="cloudGrad${s}" cx="30%" cy="30%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="100%" stop-color="#E0E0E0"/></radialGradient></defs>
        </svg>`;
    }
    
    if (code === 3) {
        // ☁️ Cloudy
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><filter id="cloudShadow${s}"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.15"/></filter></defs>
            <g filter="url(#cloudShadow${s})">
                <ellipse cx="32" cy="38" rx="14" ry="8" fill="url(#cloudGrad${s})"/>
                <ellipse cx="22" cy="32" rx="10" ry="7" fill="url(#cloudGrad${s})"/>
                <ellipse cx="40" cy="34" rx="9" ry="6" fill="url(#cloudGrad${s})"/>
                <ellipse cx="28" cy="28" rx="8" ry="6" fill="url(#cloudGrad${s})"/>
                <ellipse cx="36" cy="30" rx="7" ry="5" fill="url(#cloudGrad${s})"/>
            </g>
            <ellipse cx="20" cy="28" rx="5" ry="3" fill="#FFFFFF" opacity="0.5"/>
            <ellipse cx="30" cy="25" rx="4" ry="2.5" fill="#FFFFFF" opacity="0.4"/>
            <defs><radialGradient id="cloudGrad${s}" cx="30%" cy="30%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#F5F5F5"/><stop offset="100%" stop-color="#E0E0E0"/></radialGradient></defs>
        </svg>`;
    }
    
    if (code >= 45 && code <= 48) {
        // 🌫️ Fog
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="22" width="52" height="7" rx="3.5" fill="url(#fogGrad${s})" opacity="0.9"/>
            <rect x="10" y="32" width="44" height="6" rx="3" fill="url(#fogGrad${s})" opacity="0.8"/>
            <rect x="14" y="41" width="36" height="5" rx="2.5" fill="url(#fogGrad${s})" opacity="0.7"/>
            <rect x="18" y="49" width="28" height="4" rx="2" fill="url(#fogGrad${s})" opacity="0.6"/>
            <rect x="6" y="21" width="52" height="5" rx="2.5" fill="#FFFFFF" opacity="0.3"/>
            <rect x="10" y="31" width="44" height="4" rx="2" fill="#FFFFFF" opacity="0.25"/>
            <defs><linearGradient id="fogGrad${s}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/><stop offset="100%" stop-color="#E0E0E0" stop-opacity="0.5"/></linearGradient></defs>
        </svg>`;
    }
    
    if (code >= 51 && code <= 67 || code >= 80 && code <= 82) {
        // 🌧️ Rain
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><filter id="rainCloudShadow${s}"><feDropShadow dx="0" dy="3" stdDeviation="2" flood-opacity="0.2"/></filter></defs>
            <g filter="url(#rainCloudShadow${s})">
                <ellipse cx="32" cy="28" rx="13" ry="7" fill="#90A4AE"/>
                <ellipse cx="23" cy="23" rx="9" ry="6" fill="#90A4AE"/>
                <ellipse cx="39" cy="25" rx="8" ry="5" fill="#90A4AE"/>
                <ellipse cx="29" cy="20" rx="7" ry="5" fill="#90A4AE"/>
                <ellipse cx="35" cy="22" rx="6" ry="4" fill="#90A4AE"/>
            </g>
            ${[[20,36],[28,40],[36,38],[44,42],[24,48],[32,52],[40,50]].map(([x,y]) => 
                `<path d="M${x} ${y} Q${x-1} ${y+3} ${x} ${y+6} Q${x+1} ${y+3} ${x} ${y} Z" fill="url(#dropGrad${s})" opacity="0.8"/>`
            ).join('')}
            <defs><linearGradient id="dropGrad${s}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#E3F2FD"/><stop offset="50%" stop-color="#42A5F5"/><stop offset="100%" stop-color="#1976D2"/></linearGradient></defs>
        </svg>`;
    }
    
    if (code >= 71 && code <= 77 || code >= 85 && code <= 86) {
        // ❄️ Snow
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))">
                <ellipse cx="32" cy="28" rx="13" ry="7" fill="url(#snowCloudGrad${s})"/>
                <ellipse cx="23" cy="23" rx="9" ry="6" fill="url(#snowCloudGrad${s})"/>
                <ellipse cx="39" cy="25" rx="8" ry="5" fill="url(#snowCloudGrad${s})"/>
                <ellipse cx="29" cy="20" rx="7" ry="5" fill="url(#snowCloudGrad${s})"/>
            </g>
            ${[[18,36,4],[28,40,5],[38,38,4.5],[48,42,5],[22,48,3.5],[32,52,4],[42,50,3.5]].map(([x,y,r]) => `
                <g transform="translate(${x},${y})">
                    <circle r="${r}" fill="url(#flakeGrad${s})" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"/>
                    <circle cx="${-r*0.2}" cy="${-r*0.2}" r="${r*0.3}" fill="#FFFFFF" opacity="0.8"/>
                    ${[0,60,120,180,240,300].map(a => {
                        const rad = a * Math.PI / 180;
                        return `<line x1="${Math.cos(rad)*r*0.3}" y1="${Math.sin(rad)*r*0.3}" x2="${Math.cos(rad)*r*1.2}" y2="${Math.sin(rad)*r*1.2}" stroke="#E3F2FD" stroke-width="0.8" stroke-linecap="round"/>`;
                    }).join('')}
                </g>
            `).join('')}
            <defs><radialGradient id="snowCloudGrad${s}" cx="30%" cy="30%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#F5F5F5"/><stop offset="100%" stop-color="#E8EAF6"/></radialGradient><radialGradient id="flakeGrad${s}" cx="30%" cy="30%"><stop offset="0%" stop-color="#FFFFFF"/><stop offset="50%" stop-color="#E3F2FD"/><stop offset="100%" stop-color="#BBDEFB"/></radialGradient></defs>
        </svg>`;
    }
    
    if (code >= 95) {
        // ⛈️ Thunder
        return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs><filter id="lightningGlow${s}"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
            <g filter="drop-shadow(0 3px 6px rgba(0,0,0,0.3))">
                <ellipse cx="32" cy="26" rx="14" ry="8" fill="#616161"/>
                <ellipse cx="22" cy="21" rx="10" ry="7" fill="#616161"/>
                <ellipse cx="41" cy="23" rx="9" ry="6" fill="#616161"/>
                <ellipse cx="28" cy="18" rx="8" ry="6" fill="#616161"/>
            </g>
            <path d="M28 34 L22 42 L28 42 L24 50 L36 40 L30 40 L34 34 Z" fill="url(#lightningGrad${s})" filter="url(#lightningGlow${s})"/>
            <path d="M28 34 L22 42 L28 42 L24 50 L36 40 L30 40 L34 34 Z" fill="#FFFFFF" opacity="0.3"/>
            <ellipse cx="28" cy="42" rx="8" ry="10" fill="#FFEE58" opacity="0.1" filter="url(#lightningGlow${s})"/>
            <defs><radialGradient id="lightningGrad${s}" cx="40%" cy="30%"><stop offset="0%" stop-color="#FFF176"/><stop offset="50%" stop-color="#FFEE58"/><stop offset="100%" stop-color="#FDD835"/></radialGradient></defs>
        </svg>`;
    }
    
    return getSVG(3, true, size); // Default to cloudy
}

// ===== WEATHER FUNCTIONS =====
function displayWeather(data, cityName) {
    const current = data.current || {};
    const hourly = data.hourly || {};
    const daily = data.daily || {};
    
    const code = current.weather_code || 0;
    
    // Ville
    const cityEl = $('.city');
    if (cityEl) cityEl.textContent = cityName;
    
    const inputEl = $('#city-input');
    if (inputEl) inputEl.value = cityName;
    
    // Température
    const tempEl = $('.big-temp');
    if (tempEl) tempEl.textContent = Math.round(current.temperature_2m || 20) + '°';
    
    // Condition avec icône SVG
    const condEl = $('.condition');
    if (condEl) {
        condEl.innerHTML = getSVG(code, true, 48) + '<span>' + getCondition(code) + '</span>';
    }
    
    // Min/Max
    const hlEl = $('.high-low');
    if (hlEl && daily.temperature_2m_max) {
        hlEl.innerHTML = `<span>H:${Math.round(daily.temperature_2m_max[0])}°</span><span>L:${Math.round(daily.temperature_2m_min[0])}°</span>`;
    }
    
    // Détails
    const humEl = $('#humidity');
    if (humEl) humEl.textContent = Math.round(current.relative_humidity_2m || 60) + '%';
    
    const windEl = $('#wind');
    if (windEl) windEl.innerHTML = Math.round(current.wind_speed_10m || 10) + ' <span class="unit">km/h</span>';
    
    const feelEl = $('#feels-like');
    if (feelEl) feelEl.textContent = Math.round(current.apparent_temperature || 20) + '°';
    
    // Visibilité
    const dets = document.querySelectorAll('.detail-big');
    if (dets.length > 2 && current.visibility) {
        dets[2].innerHTML = Math.round(current.visibility / 1000) + ' <span class="unit">km</span>';
    }
    
    // UV
    const h = new Date().getHours();
    let uv = 0;
    if (code === 0 && h >= 10 && h <= 16) uv = 6 + Math.floor(Math.random() * 3);
    else if (code === 0 && h >= 7 && h <= 19) uv = 3 + Math.floor(Math.random() * 3);
    else if (code === 1) uv = 2 + Math.floor(Math.random() * 2);
    
    if (dets.length > 4) dets[4].textContent = uv;
    if (dets.length > 5 && current.pressure_msl) dets[5].innerHTML = Math.round(current.pressure_msl) + ' <span class="unit">hPa</span>';
    
    // Heures
    const hourlyList = $('#hourly-list');
    if (hourlyList && hourly.time) {
        let html = '';
        const now = new Date();
        const currentHour = now.getHours();
        
        for (let i = 0; i < Math.min(24, hourly.time.length); i++) {
            const hour = (currentHour + i) % 24;
            const hc = hourly.weather_code[i] || 0;
            const temp = hourly.temperature_2m[i] || 20;
            
            html += `
                <div class="hourly-item">
                    <div class="time">${i === 0 ? 'Maint' : (hour < 10 ? '0' : '') + hour + 'h'}</div>
                    <div class="icon">${getSVG(hc, true, 36)}</div>
                    <div class="temp">${Math.round(temp)}°</div>
                </div>
            `;
        }
        hourlyList.innerHTML = html;
    }
    
    // Jours
    const dailyList = $('#daily-list');
    if (dailyList && daily.time) {
        let html = '';
        const jours = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        
        for (let i = 0; i < Math.min(7, daily.time.length); i++) {
            const date = new Date(daily.time[i]);
            const dayName = i === 0 ? 'Auj.' : jours[date.getDay()];
            const dc = daily.weather_code[i] || 0;
            const max = daily.temperature_2m_max[i] || 20;
            const min = daily.temperature_2m_min[i] || 15;
            
            html += `
                <div class="daily-item">
                    <div class="day">${dayName}</div>
                    <div class="icon">${getSVG(dc, true, 32)}</div>
                    <div class="temp-low">${Math.round(min)}°</div>
                    <div class="temp-high">${Math.round(max)}°</div>
                </div>
            `;
        }
        dailyList.innerHTML = html;
    }
    
    // Fond
    updateBackground(code);
}

function updateBackground(code) {
    const bg = $('.bg-layer') || document.querySelector('.app');
    if (bg) {
        // Remove all bg classes
        bg.classList.remove('bg-sunny', 'bg-partly-cloudy', 'bg-cloudy', 'bg-fog', 'bg-rain', 'bg-snow', 'bg-thunder');
        // Add new bg class
        bg.classList.add(getBgClass(code));
    }
}

// ===== API FUNCTIONS =====
async function loadWeather(lat, lon, cityName) {
    try {
        const params = new URLSearchParams({
            latitude: lat, longitude: lon,
            current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility',
            hourly: 'temperature_2m,weather_code',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min',
            timezone: 'auto', forecast_days: '7'
        });
        
        const response = await fetch(`${WEATHER_URL}?${params}`);
        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        displayWeather(data, cityName);
        
    } catch (error) {
        console.log('Erreur API, utilisation données de secours');
        displayWeather(getFallbackData(), cityName);
    }
}

function getFallbackData() {
    const now = new Date();
    return {
        current: { temperature_2m: 20, relative_humidity_2m: 60, apparent_temperature: 20, weather_code: 1, wind_speed_10m: 10, pressure_msl: 1013, visibility: 10000 },
        hourly: {
            time: Array.from({length: 24}, (_, i) => new Date(now.getTime() + i * 3600000).toISOString()),
            temperature_2m: Array.from({length: 24}, () => 18 + Math.random() * 8),
            weather_code: Array.from({length: 24}, () => Math.random() > 0.7 ? 0 : (Math.random() > 0.5 ? 1 : 3))
        },
        daily: {
            time: Array.from({length: 7}, (_, i) => new Date(now.getTime() + i * 86400000).toISOString().split('T')[0]),
            weather_code: Array.from({length: 7}, () => Math.random() > 0.5 ? 0 : 3),
            temperature_2m_max: Array.from({length: 7}, () => 20 + Math.random() * 5),
            temperature_2m_min: Array.from({length: 7}, () => 12 + Math.random() * 5)
        }
    };
}

async function searchCity(name) {
    try {
        const response = await fetch(`${GEO_URL}?name=${encodeURIComponent(name)}&count=1&language=fr&format=json`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return { name: data.results[0].name, lat: data.results[0].latitude, lon: data.results[0].longitude };
        }
        return null;
    } catch (error) { return null; }
}

async function getCityName(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=fr`);
        const data = await response.json();
        if (data.address) return data.address.city || data.address.town || data.address.village || 'Position';
    } catch (e) {}
    return 'Position';
}

async function loadCity(cityOrCoords) {
    let lat, lon, name;
    
    if (typeof cityOrCoords === 'object' && cityOrCoords.lat) {
        lat = cityOrCoords.lat;
        lon = cityOrCoords.lon;
        name = await getCityName(lat, lon);
    } else {
        const city = await searchCity(cityOrCoords);
        if (!city) {
            loadWeather(48.8566, 2.3522, 'Paris');
            return;
        }
        lat = city.lat;
        lon = city.lon;
        name = city.name;
    }
    
    await loadWeather(lat, lon, name);
}

function doSearch() {
    const input = $('#city-input');
    if (!input) return;
    const city = input.value.trim();
    if (city) loadCity(city);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    const input = $('#city-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { doSearch(); input.blur(); }
        });
        input.addEventListener('blur', doSearch);
    }
    
    // Charger Paris par défaut
    loadCity('Paris');
    
    // Essayer géolocalisation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => loadCity({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => {},
            { timeout: 10000 }
        );
    }
});