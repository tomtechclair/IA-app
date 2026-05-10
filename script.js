const weatherDatabase = {};

const API_CONFIG = {
    baseUrl: 'https://api.open-meteo.com/v1',
    geoUrl: 'https://geocoding-api.open-meteo.com/v1'
};

let currentCity = 'Paris';
let currentCoords = { lat: 48.8566, lon: 2.3522 };
let hasInitialized = false;

// Géolocalisation par IP (sans permission, automatique)
async function getLocationByIP() {
    try {
        // Essayer ipapi.co (sans clé API, gratuit pour usage non commercial)
        const response = await fetch('https://ipapi.co/json/', {
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.latitude && data.longitude) {
                return {
                    lat: data.latitude,
                    lon: data.longitude,
                    city: data.city || data.region || 'Position actuelle'
                };
            }
        }
        
        throw new Error('IP geolocation failed');
    } catch (error) {
        console.warn('IP geolocation failed:', error);
        
        // Fallback vers ipinfo.io
        try {
            const response = await fetch('https://ipinfo.io/json');
            const data = await response.json();
            
            if (data.loc) {
                const [lat, lon] = data.loc.split(',').map(Number);
                return {
                    lat: lat,
                    lon: lon,
                    city: data.city || 'Position actuelle'
                };
            }
            
            throw new Error('ipinfo failed');
        } catch (ipinfoError) {
            console.warn('ipinfo fallback failed:', ipinfoError);
            return null;
        }
    }
}

// Géolocalisation GPS (avec permission - utilisé uniquement si l'utilisateur clique sur le bouton GPS)
async function getLocationByGPS() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('GPS non supporté'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    city: 'Position GPS'
                });
            },
            (error) => {
                console.warn('Erreur GPS:', error.message);
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });
}

// Reverse geocoding (obtenir le nom de la ville depuis les coordonnées)
async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(
            `${API_CONFIG.geoUrl}/get?latitude=${lat}&longitude=${lon}&language=fr`
        );
        const data = await response.json();
        
        if (data.name) {
            return data.name;
        }
        
        // Fallback vers Nominatim
        const nominatimResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=fr`
        );
        const nominatimData = await nominatimResponse.json();
        
        if (nominatimData.address) {
            const address = nominatimData.address;
            return address.city || address.town || address.village || address.suburb || 'Position actuelle';
        }
        
        return 'Position actuelle';
    } catch (error) {
        console.error('Erreur reverse geocoding:', error);
        return 'Position actuelle';
    }
}

// Initialisation automatique (IP d'abord, sans permission)
async function initializeWeather() {
    if (hasInitialized) return;
    hasInitialized = true;
    
    try {
        // 1. Essayer la géolocalisation par IP (automatique, sans permission)
        const ipLocation = await getLocationByIP();
        
        if (ipLocation) {
            currentCoords = { lat: ipLocation.lat, lon: ipLocation.lon };
            
            // Obtenir le nom de la ville via reverse geocoding pour plus de précision
            const cityName = await reverseGeocode(ipLocation.lat, ipLocation.lon);
            currentCity = cityName;
            
            // Charger la météo
            await updateWeather(cityName);
            
            // Mettre à jour l'input
            const cityInput = document.getElementById('city-input');
            if (cityInput) {
                cityInput.value = cityName;
            }
            
            return;
        }
        
        throw new Error('IP geolocation unavailable');
        
    } catch (error) {
        console.warn('Géolocalisation automatique échouée, utilisation de Paris par défaut:', error);
        // Fallback sur Paris
        await updateWeather('Paris');
    }
}

// Fonction pour activer la géolocalisation GPS précise (bouton)
async function enableGPSLocation() {
    try {
        const gpsPosition = await getLocationByGPS();
        
        if (gpsPosition) {
            currentCoords = { lat: gpsPosition.lat, lon: gpsPosition.lon };
            
            // Obtenir le nom de la ville
            const cityName = await reverseGeocode(gpsPosition.lat, gpsPosition.lon);
            currentCity = cityName;
            
            // Charger la météo
            await updateWeather(cityName);
            
            // Mettre à jour l'input
            const cityInput = document.getElementById('city-input');
            if (cityInput) {
                cityInput.value = cityName;
            }
            
            return true;
        }
    } catch (error) {
        console.error('GPS non disponible:', error);
        alert('GPS non disponible. Veuillez autoriser la géolocalisation dans les paramètres de votre navigateur.');
        return false;
    }
}

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
                lon: data.results[0].longitude,
                country: data.results[0].country
            };
        }
        return null;
    } catch (error) {
        console.error('Erreur de géocoding:', error);
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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur météo:', error);
        return null;
    }
}

async function updateWeather(cityName) {
    const searchBtn = document.querySelector('.menu-btn');
    if (searchBtn) searchBtn.style.opacity = '0.5';
    
    try {
        let cityData;
        let lat, lon;
        
        // Si c'est un objet avec lat/lon (géolocalisation), l'utiliser directement
        if (typeof cityName === 'object' && cityName.lat && cityName.lon) {
            lat = cityName.lat;
            lon = cityName.lon;
            cityData = {
                name: cityName.name || 'Position actuelle',
                lat: lat,
                lon: lon
            };
        } else {
            // Rechercher les coordonnées par nom de ville
            cityData = await searchCityCoords(cityName);
            
            if (!cityData) {
                alert('Ville non trouvée. Essayez un autre nom.');
                if (searchBtn) searchBtn.style.opacity = '1';
                return;
            }
            
            lat = cityData.lat;
            lon = cityData.lon;
        }
        
        currentCity = cityData.name;
        currentCoords = { lat: lat, lon: lon };
        
        const weatherData = await fetchWeatherData(lat, lon);
        
        if (!weatherData) {
            alert('Erreur lors de la récupération des données météo.');
            if (searchBtn) searchBtn.style.opacity = '1';
            return;
        }
        
        const current = weatherData.current;
        const isDay = current.is_day === 1;
        const weatherInfo = getWeatherInfo(current.weather_code);
        
        document.querySelector('.city').textContent = cityData.name;
        const cityInput = document.getElementById('city-input');
        if (cityInput) cityInput.value = cityData.name;
        
        document.querySelector('.big-temp').textContent = `${Math.round(current.temperature_2m)}°`;
        
        // Met à jour la condition (sans icône près de la température)
        const conditionEl = document.querySelector('.condition');
        if (conditionEl) {
            conditionEl.textContent = weatherInfo.condition;
        }
        
        document.querySelector('.high-low').innerHTML = 
            `<span>H:${Math.round(weatherData.daily.temperature_2m_max[0])}°</span>` +
            `<span>L:${Math.round(weatherData.daily.temperature_2m_min[0])}°</span>`;
        
        const humidityEl = document.getElementById('humidity');
        if (humidityEl) humidityEl.textContent = `${current.relative_humidity_2m}%`;
        
        const windEl = document.getElementById('wind');
        if (windEl) windEl.innerHTML = `${Math.round(current.wind_speed_10m)} <span class="unit">km/h</span>`;
        
        const feelsLikeEl = document.getElementById('feels-like');
        if (feelsLikeEl) feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)}°`;
        
        const visibilityKm = Math.round((current.visibility || 10000) / 1000);
        const detailBigs = document.querySelectorAll('.detail-big');
        if (detailBigs.length > 2) detailBigs[2].innerHTML = `${visibilityKm} <span class="unit">km</span>`;
        
        const hour = new Date().getHours();
        let uv = 0;
        if (hour >= 10 && hour <= 16) {
            uv = Math.round(Math.random() * 5 + 3);
        } else if (hour >= 7 && hour <= 19) {
            uv = Math.round(Math.random() * 3 + 1);
        }
        if (detailBigs.length > 4) detailBigs[4].textContent = uv;
        
        if (detailBigs.length > 5) detailBigs[5].innerHTML = `${Math.round(current.pressure_msl)} <span class="unit">hPa</span>`;
        
        // Hourly forecast
        const hourly = weatherData.hourly;
        const now = new Date();
        const currentHour = now.getHours();
        const hourlyList = document.getElementById('hourly-list');
        
        if (hourlyList) {
            let hourlyHTML = '';
            for (let i = 0; i < 24; i++) {
                const hourIndex = currentHour + i;
                if (hourIndex >= hourly.time.length) break;
                
                const hour = (currentHour + i) % 24;
                const code = hourly.weather_code[hourIndex];
                const hourlyIsDay = hourly.is_day[hourIndex] === 1;
                
                const iconHTML = typeof getWeatherIcon3D === 'function' 
                    ? getWeatherIcon3D(code, hourlyIsDay, 36) 
                    : (typeof getWeatherIcon === 'function' ? getWeatherIcon(code, hourlyIsDay, 32) : '');
                
                hourlyHTML += `
                    <div class="hourly-item">
                        <div class="time">${i === 0 ? 'Maintenant' : `${hour.toString().padStart(2, '0')}h`}</div>
                        <div class="icon">${iconHTML}</div>
                        <div class="temp">${Math.round(hourly.temperature_2m[hourIndex])}°</div>
                    </div>
                `;
            }
            hourlyList.innerHTML = hourlyHTML;
        }
        
        // Daily forecast
        const daily = weatherData.daily;
        const dailyList = document.getElementById('daily-list');
        
        if (dailyList) {
            let minTemp = Math.min(...daily.temperature_2m_min);
            let maxTemp = Math.max(...daily.temperature_2m_max);
            const range = maxTemp - minTemp;
            
            let dailyHTML = '';
            for (let i = 0; i < daily.time.length; i++) {
                const date = new Date(daily.time[i]);
                const dayName = i === 0 ? 'Auj.' : days[date.getDay()];
                const code = daily.weather_code[i];
                
                const iconHTML = typeof getWeatherIcon3D === 'function' 
                    ? getWeatherIcon3D(code, true, 30) 
                    : (typeof getWeatherIcon === 'function' ? getWeatherIcon(code, true, 28) : '');
                
                const tempLow = daily.temperature_2m_min[i];
                const tempHigh = daily.temperature_2m_max[i];
                
                const barStart = range > 0 ? ((tempLow - minTemp) / range) * 100 : 0;
                const barWidth = range > 0 ? ((tempHigh - tempLow) / range) * 100 : 50;
                
                dailyHTML += `
                    <div class="daily-item">
                        <div class="day">${dayName}</div>
                        <div class="icon">${iconHTML}</div>
                        <div class="temp-low">${Math.round(tempLow)}°</div>
                        <div class="temp-bar-container">
                            <div class="temp-bar" style="left: ${barStart}%; width: ${barWidth}%"></div>
                        </div>
                        <div class="temp-high">${Math.round(tempHigh)}°</div>
                    </div>
                `;
            }
            dailyList.innerHTML = dailyHTML;
        }
        
        updateBackground(weatherInfo.bg);
        
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des données. Vérifiez votre connexion internet.');
    } finally {
        if (searchBtn) searchBtn.style.opacity = '1';
    }
}

function updateBackground(bgClass) {
    const bg = document.querySelector('.bg-layer');
    if (bg) bg.className = `bg-layer ${bgClass}`;
}

function searchCity() {
    const input = document.getElementById('city-input');
    const city = input ? input.value.trim() : '';
    
    if (city) {
        updateWeather(city);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    if (cityInput) {
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCity();
                this.blur();
            }
        });
        
        cityInput.addEventListener('blur', function() {
            if (this.value.trim() !== currentCity) {
                searchCity();
            }
        });
    }
    
    initializeWeather();
});