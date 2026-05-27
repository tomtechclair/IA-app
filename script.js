// ============================================================
// Météo App — Apple Weather Edition
// ============================================================

// ---- Constantes ----
const WX_API = 'https://api.open-meteo.com/v1/forecast';
const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search';

// ---- État global ----
let currentCoords = { lat: 48.8566, lon: 2.3522 };
let currentCity = 'Paris';
let weatherRequestSeq = 0;

// ---- Helpers ----
function $(id) { return document.getElementById(id); }

// ---- WMO Codes ----
const WMO_DESC = {
    0: 'Ciel dégagé', 1: 'Principalement dégagé', 2: 'Partiellement nuageux',
    3: 'Nuageux', 45: 'Brumeux', 48: 'Brouillard givrant',
    51: 'Bruine légère', 53: 'Bruine modérée', 55: 'Bruine dense',
    56: 'Verglas léger', 57: 'Verglas dense',
    61: 'Pluie légère', 63: 'Pluie modérée', 65: 'Pluie forte',
    66: 'Pluie verglaçante légère', 67: 'Pluie verglaçante forte',
    71: 'Neige légère', 73: 'Neige modérée', 75: 'Neige forte',
    77: 'Grésil', 80: 'Averses légères', 81: 'Averses modérées',
    82: 'Averses violentes', 85: 'Averses de neige légères',
    86: 'Averses de neige fortes',
    95: 'Orage', 96: 'Orage avec grêle', 99: 'Orage violent'
};

function getWMO(code) { return WMO_DESC[code] || '—'; }

// ---- API Calls ----
async function searchCity(query) {
    const url = `${GEO_API}?name=${encodeURIComponent(query)}&count=5&language=fr&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
}

async function fetchWeather(lat, lon) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,is_day,precipitation',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,uv_index_max,sunrise,sunset',
        hourly: 'temperature_2m,weather_code,precipitation_probability',
        timezone: 'auto',
        forecast_days: 10
    });
    const url = `${WX_API}?${params}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Erreur API');
    return res.json();
}

// ---- Background ----
function setBackground(wCode, isDay) {
    const bg = document.querySelector('.bg-layer');
    if (!bg) return;
    bg.className = 'bg-layer';
    let cls = 'bg-default';
    if (wCode === 0) cls = isDay ? 'bg-clear-day' : 'bg-clear-night';
    else if ([1, 2].includes(wCode)) cls = isDay ? 'bg-partly-cloudy-day' : 'bg-partly-cloudy-night';
    else if ([3, 45, 48].includes(wCode)) cls = 'bg-cloudy';
    else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(wCode)) cls = 'bg-rain';
    else if ([71, 73, 75, 77, 85, 86].includes(wCode)) cls = 'bg-snow';
    else if ([95, 96, 99].includes(wCode)) cls = 'bg-thunderstorm';
    bg.classList.add(cls);
}

// ---- Solar Bar ----
function updateSolarBar(sunrise, sunset) {
    const elRise = $('sunrise-time');
    const elSet = $('sunset-time');
    if (!elRise || !elSet) return;

    // Format times
    const fmt = (iso) => {
        if (!iso) return '--:--';
        const d = new Date(iso);
        return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    };

    elRise.textContent = fmt(sunrise);
    elSet.textContent = fmt(sunset);

    // Calculate solar progress
    const now = new Date();
    const rise = new Date(sunrise);
    const set = new Date(sunset);

    if (isNaN(rise.getTime()) || isNaN(set.getTime())) return;

    const total = set.getTime() - rise.getTime();
    const elapsed = now.getTime() - rise.getTime();
    let progress = 0;
    if (elapsed > 0 && total > 0) {
        progress = Math.min(1, Math.max(0, elapsed / total));
    }

    const pct = progress * 100;
    const progEl = document.querySelector('.solar-progress');
    const dotEl = document.getElementById('solar-dot');
    if (progEl) progEl.style.width = `${pct}%`;
    if (dotEl) dotEl.style.left = `${pct}%`;
}

// ---- Alert Banner ----
function updateAlerts(wCode, windSpeed, tempMax) {
    const banner = $('alert-banner');
    const title = $('alert-title');
    const desc = $('alert-desc');
    if (!banner || !title || !desc) return;

    let alertTitle = '';
    let alertDesc = '';

    if (wCode >= 95) {
        alertTitle = '⚠ Orages';
        alertDesc = 'Orages en cours. Restez à l\'abri.';
    } else if (wCode === 65 || wCode === 82) {
        alertTitle = '⚠ Pluie forte';
        alertDesc = 'Fortes précipitations, soyez prudent.';
    } else if (windSpeed > 60) {
        alertTitle = '⚠ Vent fort';
        alertDesc = windSpeed > 80 ? 'Rafales dangereuses.' : 'Vent fort en cours.';
    } else if (wCode >= 71 && wCode <= 77) {
        alertTitle = '⚠ Neige / Verglas';
        alertDesc = 'Chutes de neige, routes glissantes.';
    } else if (tempMax > 35) {
        alertTitle = '⚠ Canicule';
        alertDesc = 'Températures très élevées. Hydratez-vous.';
    } else if (wCode === 45 || wCode === 48) {
        alertTitle = '⚠ Brouillard';
        alertDesc = 'Visibilité réduite. Prudence sur les routes.';
    }

    if (alertTitle) {
        title.textContent = alertTitle;
        desc.textContent = alertDesc;
        banner.classList.remove('hidden');
    } else {
        banner.classList.add('hidden');
    }
}

// ---- UV Gauge ----
function updateUV(uvIndex) {
    const arc = $('uv-arc');
    const val = $('uv-value');
    const label = $('uv-label');
    if (!arc || !val || !label) return;

    const maxUV = 11;
    const pct = Math.min(uvIndex / maxUV, 1);
    const totalDash = 157;
    const offset = totalDash * (1 - pct);

    arc.style.strokeDashoffset = offset;

    val.textContent = uvIndex != null ? Math.round(uvIndex) : '--';

    // UV level
    let lvl = 'Faible';
    let color = '#30D158';
    if (uvIndex >= 11) { lvl = 'Extrême'; color = '#FF453A'; }
    else if (uvIndex >= 8) { lvl = 'Très élevé'; color = '#FF9F0A'; }
    else if (uvIndex >= 6) { lvl = 'Élevé'; color = '#FF9F0A'; }
    else if (uvIndex >= 3) { lvl = 'Modéré'; color = '#FFD60A'; }

    label.textContent = lvl;
    arc.style.stroke = color;
    val.style.color = color;
}

// ---- Wind Direction ----
function getWindDir(degrees) {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                  'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
    if (degrees == null) return '';
    const idx = Math.round(degrees / 22.5) % 16;
    return dirs[idx] || '';
}

// ---- Weekly Forecast ----
function renderWeekly(daily, currentCode) {
    const container = $('weekly-list');
    if (!container || !daily) return;

    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const times = daily.time || [];
    const maxs = daily.temperature_2m_max || [];
    const mins = daily.temperature_2m_min || [];
    const codes = daily.weather_code || [];
    const precips = daily.precipitation_sum || [];

    let html = '';
    for (let i = 0; i < Math.min(10, times.length); i++) {
        const date = new Date(times[i] + 'T12:00:00');
        const dayName = i === 0 ? "Aujourd'hui" : i === 1 ? 'Demain' : days[date.getDay()] || '';
        const wmoCode = i === 0 && currentCode != null ? currentCode : codes[i];
        const icon = createWeatherIconSVG ? createWeatherIconSVG(wmoCode, true, 28) : '';
        const precip = precips[i] ? `${precips[i]}mm` : '';

        html += `
            <div class="weekly-item">
                <div class="weekly-day">${dayName}</div>
                <div class="weekly-icon">${icon}</div>
                <div class="weekly-precip">${precip}</div>
                <div class="weekly-temps">
                    <span class="weekly-temp-high">${Math.round(maxs[i])}°</span>
                    <span class="weekly-temp-low">${Math.round(mins[i])}°</span>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

// ---- Pressure Trend ----
function getPressureTrend(current, yesterday) {
    if (!current) return '';
    if (yesterday != null) {
        const diff = current - yesterday;
        if (diff > 3) return '↑ En hausse';
        if (diff < -3) return '↓ En baisse';
    }
    return '→ Stable';
}

// ---- Main Render ----
function renderWeather(data) {
    if (!data || !data.current) return;

    const c = data.current;
    const d = data.daily;
    const isDay = c.is_day !== 0;

    // Background
    setBackground(c.weather_code, isDay);

    // Hero
    const cityEl = $('city-name');
    const tempEl = $('current-temp');
    const condEl = $('condition');
    const hlEl = $('high-low');
    if (cityEl) cityEl.textContent = currentCity;
    if (tempEl) tempEl.textContent = `${Math.round(c.temperature_2m)}°`;
    if (condEl) condEl.textContent = getWMO(c.weather_code);
    if (hlEl && d) {
        hlEl.textContent = `H:${Math.round(d.temperature_2m_max[0])}°  L:${Math.round(d.temperature_2m_min[0])}°`;
    }

    // Solar Bar
    if (d && d.sunrise && d.sunset) {
        updateSolarBar(d.sunrise[0], d.sunset[0]);
    }

    // Alert Banner
    const wind = c.wind_speed_10m || 0;
    const maxTemp = d ? d.temperature_2m_max[0] : 0;
    updateAlerts(c.weather_code, wind, maxTemp);

    // Data tiles
    const humEl = $('humidity');
    if (humEl) humEl.textContent = `${c.relative_humidity_2m}%`;

    const windEl = $('wind');
    const windDirEl = $('wind-dir');
    if (windEl) windEl.innerHTML = `${Math.round(wind)} <span class="unit">km/h</span>`;
    if (windDirEl) windDirEl.textContent = getWindDir(c.wind_direction_10m);

    // UV
    if (d && d.uv_index_max) {
        updateUV(d.uv_index_max[0]);
    }

    // Pressure
    const pressEl = $('pressure');
    const pressTrendEl = $('pressure-trend');
    if (pressEl && c.pressure_msl != null) {
        pressEl.innerHTML = `${Math.round(c.pressure_msl)} <span class="unit">hPa</span>`;
    }
    if (pressTrendEl && c.pressure_msl != null) {
        pressTrendEl.textContent = getPressureTrend(c.pressure_msl);
    }

    // Weekly
    renderWeekly(d, c.weather_code);

    // Hero icon
    const hero = document.querySelector('.weather-hero');
    let iconWrap = hero ? hero.querySelector('.weather-icon-container') : null;
    if (!iconWrap && hero && typeof createWeatherIconSVG === 'function') {
        iconWrap = document.createElement('div');
        iconWrap.className = 'weather-icon-container';
        iconWrap.style.cssText = 'display:flex;justify-content:center;margin-bottom:6px';
        const bigTemp = hero.querySelector('.big-temp');
        if (bigTemp) hero.insertBefore(iconWrap, bigTemp);
        else hero.prepend(iconWrap);
    }
    if (iconWrap && typeof createWeatherIconSVG === 'function') {
        iconWrap.innerHTML = createWeatherIconSVG(c.weather_code, isDay, 80);
    }
}

// ---- Weather Loading ----
async function updateWeather(cityName) {
    const requestId = ++weatherRequestSeq;

    const cityEl = $('city-name');
    const tempEl = $('current-temp');
    const condEl = $('condition');
    if (cityEl) cityEl.textContent = cityName;
    if (tempEl) tempEl.textContent = '...';
    if (condEl) condEl.textContent = 'Recherche…';

    const results = await searchCity(cityName);
    if (requestId !== weatherRequestSeq) return;

    if (!results || results.length === 0) {
        if (condEl) condEl.textContent = 'Ville non trouvée';
        return;
    }

    const r = results[0];
    currentCity = r.name;
    currentCoords = { lat: r.latitude, lon: r.longitude };
    if (cityEl) cityEl.textContent = currentCity;
    if (condEl) condEl.textContent = 'Chargement…';

    try {
        const data = await fetchWeather(r.latitude, r.longitude);
        if (requestId !== weatherRequestSeq) return;
        renderWeather(data);
    } catch (err) {
        console.error(err);
        if (condEl) condEl.textContent = 'Erreur de connexion';
    }
}

async function updateWeatherByCoords(lat, lon) {
    const requestId = ++weatherRequestSeq;
    let cityName = 'Ma position';

    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=fr`,
            { headers: { 'User-Agent': 'MeteoApp/1.0' } }
        );
        const geo = await res.json();
        if (geo && geo.address) {
            cityName = geo.address.city || geo.address.town || geo.address.village || geo.address.county || 'Ma position';
        }
    } catch (_) {}

    if (requestId !== weatherRequestSeq) return;
    currentCoords = { lat, lon };
    currentCity = cityName;

    const cityEl = $('city-name');
    const tempEl = $('current-temp');
    const condEl = $('condition');
    if (cityEl) cityEl.textContent = cityName;
    if (tempEl) tempEl.textContent = '...';
    if (condEl) condEl.textContent = 'Chargement…';

    try {
        const data = await fetchWeather(lat, lon);
        if (requestId !== weatherRequestSeq) return;
        renderWeather(data);
    } catch (err) {
        console.error(err);
        if (condEl) condEl.textContent = 'Erreur de connexion';
    }
}

// ---- Search ----
function setupSearch() {
    const input = $('city-input');
    const suggestions = $('search-suggestions');
    if (!input) return;

    let timer;

    const doSearch = async () => {
        const q = input.value.trim();
        if (q.length < 2) {
            suggestions.classList.remove('active');
            return;
        }
        try {
            const results = await searchCity(q);
            if (input.value.trim().length < 2) return;
            suggestions.innerHTML = '';
            if (!results || results.length === 0) {
                suggestions.classList.remove('active');
                return;
            }
            results.forEach(r => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}${r.country ? ', ' + r.country : ''}`;
                div.dataset.city = r.name;
                div.dataset.lat = r.latitude;
                div.dataset.lon = r.longitude;
                div.addEventListener('click', () => {
                    input.value = '';
                    suggestions.classList.remove('active');
                    currentCoords = { lat: r.latitude, lon: r.longitude };
                    updateWeather(r.name);
                });
                suggestions.appendChild(div);
            });
            suggestions.classList.add('active');
        } catch (_) {
            suggestions.classList.remove('active');
        }
    };

    input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(doSearch, 300);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(timer);
            const q = input.value.trim();
            if (q) {
                suggestions.classList.remove('active');
                updateWeather(q);
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            suggestions.classList.remove('active');
        }
    });
}

// ---- Initialization ----
document.addEventListener('DOMContentLoaded', () => {
    setupSearch();

    // Location button
    const locBtn = $('locate-btn');
    if (locBtn) {
        locBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                $('city-name').textContent = 'Recherche…';
                navigator.geolocation.getCurrentPosition(
                    pos => updateWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
                    () => updateWeather('Paris'),
                    { timeout: 10000, maximumAge: 300000 }
                );
            }
        });
    }

    // Load default
    updateWeather('Paris');

    // Geolocation on load
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                updateWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
            },
            () => {},
            { timeout: 5000, maximumAge: 300000 }
        );
    }
});
