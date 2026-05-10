const weatherDatabase = {};

const API_CONFIG = {
    baseUrl: 'https://api.open-meteo.com/v1',
    geoUrl: 'https://geocoding-api.open-meteo.com/v1'
};

let currentCity = 'Paris';
let currentCoords = { lat: 48.8566, lon: 2.3522 };

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
        const cityData = await searchCityCoords(cityName);
        
        if (!cityData) {
            alert('Ville non trouvée. Essayez un autre nom.');
            if (searchBtn) searchBtn.style.opacity = '1';
            return;
        }
        
        currentCity = cityData.name;
        currentCoords = { lat: cityData.lat, lon: cityData.lon };
        
        const weatherData = await fetchWeatherData(cityData.lat, cityData.lon);
        
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
        
        // Met à jour la condition avec l'icône 3D
        const conditionEl = document.querySelector('.condition');
        if (conditionEl) {
            const heroIconHTML = typeof getWeatherIcon3D === 'function' 
                ? getWeatherIcon3D(current.weather_code, isDay, 48) 
                : '';
            conditionEl.innerHTML = `${heroIconHTML}<span>${weatherInfo.condition}</span>`;
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
    
    updateWeather('Paris');
});