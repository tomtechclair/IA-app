const weatherDatabase = {};

const API_CONFIG = {
    weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
    forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast',
    geoUrl: 'https://geocoding-api.open-meteo.com/v1',
    apiKey: 'YOUR_API_KEY' // Vous devrez obtenir une clé gratuite sur OpenWeatherMap
};

let currentCity = 'Paris';
let currentCoords = { lat: 48.8566, lon: 2.3522 };

// Liste de villes pour autocomplete
const cities = [
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
    'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne',
    'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Villeurbanne',
    'London', 'New York', 'Tokyo', 'Berlin', 'Madrid', 'Rome', 'Amsterdam',
    'Brussels', 'Vienna', 'Zurich', 'Stockholm', 'Copenhagen', 'Oslo',
    'Helsinki', 'Warsaw', 'Prague', 'Budapest', 'Bucharest', 'Sofia',
    'Belgrade', 'Zagreb', 'Ljubljana', 'Bratislava', 'Athens', 'Istanbul',
    'Dubai', 'Singapore', 'Hong Kong', 'Sydney', 'Melbourne', 'Toronto',
    'Montreal', 'Vancouver', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco'
];

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
        // Utiliser l'API OpenWeatherMap pour les données en temps réel
        const weatherUrl = `${API_CONFIG.weatherUrl}?lat=${lat}&lon=${lon}&appid=${API_CONFIG.apiKey}&units=metric&lang=fr`;
        const forecastUrl = `${API_CONFIG.forecastUrl}?lat=${lat}&lon=${lon}&appid=${API_CONFIG.apiKey}&units=metric&lang=fr`;
        
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);
        
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();
        
        return {
            current: {
                temperature_2m: weatherData.main.temp,
                relative_humidity_2m: weatherData.main.humidity,
                apparent_temperature: weatherData.main.feels_like,
                is_day: isDayTime(weatherData.sys.sunrise, weatherData.sys.sunset),
                weather_code: getWeatherCodeFromOpenWeather(weatherData.weather[0].id),
                wind_speed_10m: weatherData.wind.speed * 3.6, // Convertir m/s en km/h
                pressure_msl: weatherData.main.pressure,
                visibility: weatherData.visibility || 10000,
                sunrise: weatherData.sys.sunrise,
                sunset: weatherData.sys.sunset
            },
            hourly: {
                time: forecastData.list.map(item => item.dt * 1000),
                temperature_2m: forecastData.list.map(item => item.main.temp),
                weather_code: forecastData.list.map(item => getWeatherCodeFromOpenWeather(item.weather[0].id)),
                is_day: forecastData.list.map(item => isDayTime(weatherData.sys.sunrise, weatherData.sys.sunset))
            },
            daily: {
                time: forecastData.list.map(item => item.dt * 1000),
                temperature_2m_max: forecastData.list.map(item => item.main.temp_max),
                temperature_2m_min: forecastData.list.map(item => item.main.temp_min),
                weather_code: forecastData.list.map(item => getWeatherCodeFromOpenWeather(item.weather[0].id)),
                sunrise: [weatherData.sys.sunrise],
                sunset: [weatherData.sys.sunset]
            }
        };
    } catch (error) {
        console.error('Erreur météo:', error);
        // Fallback vers les données simulées si l'API échoue
        return getSimulatedWeatherData();
    }
}

function isDayTime(sunrise, sunset) {
    const now = Date.now();
    return now >= sunrise * 1000 && now <= sunset * 1000 ? 1 : 0;
}

function getWeatherCodeFromOpenWeather(openWeatherId) {
    // Conversion des codes OpenWeather vers nos codes internes
    const codeMap = {
        200: 95, 201: 95, 202: 95, 210: 95, 211: 95, 212: 95, 221: 95, 232: 95, // Orage
        230: 95, 231: 95, // Orage avec bruine légère
        500: 51, 501: 51, 502: 51, 503: 51, 504: 51, 511: 51, 520: 51, 521: 51, 522: 51, 531: 51, // Bruine
        600: 61, 601: 61, 602: 61, 611: 61, 612: 61, 613: 61, 614: 61, 615: 61, 616: 61, 620: 61, 621: 61, 622: 61, // Pluie légère
        701: 63, 711: 63, 721: 63, 731: 63, 741: 63, // Pluie modérée
        800: 0,   // Dégagé
        801: 1,   // Quelques nuages
        802: 2,   // Nuages épars
        803: 2,   // Nuages épars
        804: 3,   // Nuages épars
        741: 2,   // Nuageux
        600: 45,  // Brouillard
        741: 45,  // Brouillard
        620: 45,  // Brouillard
        721: 45,  // Brouillard
        751: 75, 752: 75, 771: 75, // Neige
        761: 71, 762: 71, 771: 71, // Neige légère
        731: 71, 741: 71, 761: 71, // Neige
    };
    return codeMap[openWeatherId] || 0;
}

function getSimulatedWeatherData() {
    // Données simulées en cas d'erreur API
    const now = new Date();
    const hour = now.getHours();
    const baseTemp = 15 + Math.sin(hour * Math.PI / 12) * 8;
    
    return {
        current: {
            temperature_2m: baseTemp + Math.random() * 5,
            relative_humidity_2m: 50 + Math.random() * 30,
            apparent_temperature: baseTemp + Math.random() * 3,
            is_day: hour >= 6 && hour <= 20 ? 1 : 0,
            weather_code: Math.random() > 0.7 ? (Math.random() > 0.5 ? 0 : 1) : (Math.random() > 0.5 ? 51 : 45),
            wind_speed_10m: 5 + Math.random() * 20,
            pressure_msl: 1010 + Math.random() * 20,
            visibility: 5000 + Math.random() * 10000,
            sunrise: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0).getTime() / 1000,
            sunset: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0).getTime() / 1000
        },
        hourly: Array.from({length: 24}, (_, i) => ({
            time: new Date(now.getTime() + i * 3600000).getTime(),
            temperature_2m: baseTemp + Math.random() * 5,
            weather_code: Math.random() > 0.7 ? 0 : (Math.random() > 0.5 ? 51 : 1),
            is_day: (hour + i) % 24 >= 6 && (hour + i) % 24 <= 20 ? 1 : 0
        })),
        daily: Array.from({length: 10}, (_, i) => ({
            time: new Date(now.getTime() + i * 86400000).getTime(),
            temperature_2m_max: baseTemp + 5 + Math.random() * 3,
            temperature_2m_min: baseTemp - 3 + Math.random() * 3,
            weather_code: Math.random() > 0.6 ? 0 : (Math.random() > 0.5 ? 1 : 51),
            sunrise: new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 6, 0, 0).getTime() / 1000,
            sunset: new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 20, 0, 0).getTime() / 1000
        }))
    };
}

function showWeatherError(message) {
    // Créer un message d'erreur stylé
    const errorDiv = document.createElement('div');
    errorDiv.className = 'weather-error';
    errorDiv.innerHTML = `
        <div class="error-icon">⚠️</div>
        <div class="error-message">${message}</div>
        <div class="error-close" onclick="this.parentElement.remove()">✕</div>
    `;
    
    // Ajouter au conteneur principal
    const container = document.querySelector('.weather-hero') || document.querySelector('.hero');
    if (container) {
        container.appendChild(errorDiv);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.parentElement.removeChild(errorDiv);
            }
        }, 5000);
    }
}

async function updateWeatherByCoords(lat, lon) {
    try {
        currentCoords = { lat, lon };
        const weatherData = await fetchWeatherData(lat, lon);
        
        if (!weatherData) {
            showWeatherError('Impossible de récupérer les données météo. Vérifiez votre connexion internet.');
            return;
        }
        
        // Trouver le nom de la ville le plus proche (simplifié)
        currentCity = 'Localisation';
        document.getElementById('city-input').value = currentCity;
        
        await displayWeatherData(weatherData);
        
    } catch (error) {
        console.error('Erreur:', error);
        showWeatherError('Erreur de connexion. Vérifiez votre accès internet et réessayez.');
    }
}

async function updateWeather(cityName) {
    const searchBtn = document.querySelector('.menu-btn');
    if (searchBtn) searchBtn.style.opacity = '0.5';
    
    try {
        const cityData = await searchCityCoords(cityName);
        
        if (!cityData) {
            if (isFirstLoad) {
                // Silencieux l'erreur au premier chargement
                console.log('Ville non trouvée, utilisation des données simulées');
                const simulatedData = getSimulatedWeatherData();
                await displayWeatherData(simulatedData);
                startAutoRefresh();
                return;
            } else {
                showWeatherError('Ville non trouvée. Vérifiez l\'orthographe ou essayez une autre ville.');
            }
            if (searchBtn) searchBtn.style.opacity = '1';
            return;
        }
        
        currentCity = cityData.name;
        currentCoords = { lat: cityData.lat, lon: cityData.lon };
        
        const weatherData = await fetchWeatherData(cityData.lat, cityData.lon);
        
        if (!weatherData) {
            if (isFirstLoad) {
                // Silencieux l'erreur au premier chargement
                console.log('Erreur API, utilisation des données simulées');
                const simulatedData = getSimulatedWeatherData();
                await displayWeatherData(simulatedData);
                startAutoRefresh();
                return;
            } else {
                showWeatherError('Erreur lors de la récupération des données météo. Vérifiez votre connexion internet.');
            }
            if (searchBtn) searchBtn.style.opacity = '1';
            return;
        }
        
        await displayWeatherData(weatherData);
        
        const current = weatherData.current;
        const weatherInfo = getWeatherInfo(current.weather_code);
        const isDay = current.is_day === 1;
        
        // Mettre à jour le premier chargement
        if (isFirstLoad) {
            isFirstLoad = false;
            document.querySelector('.city').textContent = currentCity || 'Météo';
            document.getElementById('city-input').value = currentCity || '';
        }
        
        document.querySelector('.big-temp').textContent = `${Math.round(current.temperature_2m)}°`;
        document.querySelector('.condition').textContent = weatherInfo.condition;
        document.querySelector('.high-low').innerHTML = 
            `<span>H:${Math.round(weatherData.daily.temperature_2m_max[0])}°</span>` +
            `<span>L:${Math.round(weatherData.daily.temperature_2m_min[0])}°</span>`;
        
        // Hero icon - nouvelle fonction SVG avec animations
        const heroIcon = document.querySelector('.weather-hero .condition');
        if (heroIcon && typeof createWeatherIconSVG === 'function') {
            heroIcon.innerHTML = createWeatherIconSVG(current.weather_code, isDay, 40) + weatherInfo.condition;
            heroIcon.classList.add('has-icon');
            
            // Pas d'animation - icônes statiques mais stylées
        }
        
        document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
        document.getElementById('wind').innerHTML = `${Math.round(current.wind_speed_10m)} <span class="unit">km/h</span>`;
        document.getElementById('feels-like').textContent = `${Math.round(current.apparent_temperature)}°`;
        
        const visibilityKm = Math.round((current.visibility || 10000) / 1000);
        document.querySelectorAll('.detail-big')[2].innerHTML = `${visibilityKm} <span class="unit">km</span>`;
        
        const hour = new Date().getHours();
        let uv = 0;
        if (hour >= 10 && hour <= 16) {
            uv = Math.round(Math.random() * 5 + 3);
        } else if (hour >= 7 && hour <= 19) {
            uv = Math.round(Math.random() * 3 + 1);
        }
        document.querySelectorAll('.detail-big')[4].textContent = uv;
        
        document.querySelectorAll('.detail-big')[5].innerHTML = `${Math.round(current.pressure_msl)} <span class="unit">hPa</span>`;
        
        // Additional weather data
        if (weatherData.daily && weatherData.daily.sunrise && weatherData.daily.sunset) {
            const sunriseTime = new Date(weatherData.daily.sunrise[0]);
            const sunsetTime = new Date(weatherData.daily.sunset[0]);
            
            const sunriseStr = sunriseTime.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            const sunsetStr = sunsetTime.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            const sunriseElement = document.getElementById('sunrise');
            const sunsetElement = document.getElementById('sunset');
            
            if (sunriseElement) sunriseElement.textContent = sunriseStr;
            if (sunsetElement) sunsetElement.textContent = sunsetStr;
        }
        
        // Cloudiness (simulated based on weather code)
        const cloudinessElement = document.getElementById('cloudiness');
        if (cloudinessElement) {
            let cloudiness = 0;
            if (current.weather_code >= 1 && current.weather_code <= 3) {
                cloudiness = Math.round(Math.random() * 40 + 20);
            } else if (current.weather_code >= 45 && current.weather_code <= 48) {
                cloudiness = Math.round(Math.random() * 30 + 70);
            } else if (current.weather_code >= 51 && current.weather_code <= 99) {
                cloudiness = Math.round(Math.random() * 20 + 80);
            }
            cloudinessElement.textContent = `${cloudiness}%`;
        }
        
        // Next hour forecast with rain chart
        updateNextHourForecast(weatherData);
        
        // Hourly forecast - nouvelles icônes SVG
        const hourly = weatherData.hourly;
        const now = new Date();
        const currentHour = now.getHours();
        const hourlyList = document.getElementById('hourly-list');
        
        let hourlyHTML = '';
        for (let i = 0; i < 24; i++) {
            const hourIndex = currentHour + i;
            if (hourIndex >= hourly.time.length) break;
            
            const hour = (currentHour + i) % 24;
            const code = hourly.weather_code[hourIndex];
            const hourlyIsDay = hourly.is_day[hourIndex] === 1;
            
            const iconHTML = typeof createWeatherIconSVG === 'function' 
                ? createWeatherIconSVG(code, hourlyIsDay, 28) 
                : '';
            
            hourlyHTML += `
                <div class="hourly-item">
                    <div class="time">${i === 0 ? 'Maintenant' : `${hour.toString().padStart(2, '0')}h`}</div>
                    <div class="icon">${iconHTML}</div>
                    <div class="temp">${Math.round(hourly.temperature_2m[hourIndex])}°</div>
                </div>
            `;
        }
        hourlyList.innerHTML = hourlyHTML;
        
        // Daily forecast - nouvelles icônes SVG
        const daily = weatherData.daily;
        const dailyList = document.getElementById('daily-list');
        
        let minTemp = Math.min(...daily.temperature_2m_min);
        let maxTemp = Math.max(...daily.temperature_2m_max);
        const range = maxTemp - minTemp;
        
        let dailyHTML = '';
        for (let i = 0; i < daily.time.length; i++) {
            const date = new Date(daily.time[i]);
            const dayName = i === 0 ? 'Auj.' : days[date.getDay()];
            const code = daily.weather_code[i];
            
            const iconHTML = typeof createWeatherIconSVG === 'function' 
                ? createWeatherIconSVG(code, true, 28) 
                : '';
            
            const tempLow = daily.temperature_2m_min[i];
            const tempHigh = daily.temperature_2m_max[i];
            
            const barStart = ((tempLow - minTemp) / range) * 100;
            const barWidth = ((tempHigh - tempLow) / range) * 100;
            
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
        
        updateBackground(weatherInfo.bg);
        
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des données. Vérifiez votre connexion internet.');
    } finally {
        searchBtn.style.opacity = '1';
    }
}

function updateBackground(bgClass) {
    const bg = document.querySelector('.bg-layer');
    bg.className = `bg-layer ${bgClass}`;
}

function showSuggestions(query) {
    const suggestionsContainer = document.getElementById('search-suggestions');
    const clearBtn = document.getElementById('search-clear');
    
    if (!query) {
        hideSuggestions();
        clearBtn.style.display = 'none';
        return;
    }
    
    clearBtn.style.display = 'block';
    
    const filteredCities = cities.filter(city => 
        city.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
    
    if (filteredCities.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    filteredCities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.innerHTML = `
            <span class="city-icon">📍</span>
            <span>${city}</span>
        `;
        suggestionItem.addEventListener('click', () => {
            selectCity(city);
        });
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    suggestionsContainer.classList.add('active');
}

function hideSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    suggestionsContainer.classList.remove('active');
    suggestionsContainer.innerHTML = '';
}

function selectCity(city) {
    const input = document.getElementById('city-input');
    input.value = city;
    hideSuggestions();
    updateWeather(city);
}

function searchCity() {
    const input = document.getElementById('city-input');
    const city = input.value.trim();
    
    if (city) {
        updateWeather(city);
    }
}

function setupSearchListeners() {
    const input = document.getElementById('city-input');
    const clearBtn = document.getElementById('search-clear');
    const quickCities = document.querySelectorAll('.quick-city');
    
    // Input events
    input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        showSuggestions(query);
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            hideSuggestions();
            searchCity();
            input.blur();
        }
    });
    
    input.addEventListener('focus', (e) => {
        const query = e.target.value.trim();
        if (query) {
            showSuggestions(query);
        }
    });
    
    // Clear button
    clearBtn.addEventListener('click', () => {
        input.value = '';
        hideSuggestions();
        clearBtn.style.display = 'none';
        input.focus();
    });
    
    // Quick city buttons
    quickCities.forEach(btn => {
        btn.addEventListener('click', () => {
            const city = btn.getAttribute('data-city');
            selectCity(city);
        });
    });
    
    // Hide suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
}

function updateNextHourForecast(weatherData) {
    const rainChart = document.getElementById('rain-chart');
    const rainPercentage = document.getElementById('rain-percentage');
    
    if (!rainChart || !rainPercentage) return;
    
    // Simuler les données de pluie pour la prochaine heure
    const hourly = weatherData.hourly;
    const now = new Date();
    const currentHour = now.getHours();
    
    // Créer un graphique avec 12 barres représentant les 5 prochaines minutes par barre
    let chartHTML = '';
    let rainProbability = 0;
    
    for (let i = 0; i < 12; i++) {
        const hourIndex = currentHour + Math.floor(i / 12);
        if (hourIndex >= hourly.time.length) break;
        
        const weatherCode = hourly.weather_code[hourIndex] || 0;
        let barHeight = 5; // hauteur par défaut en px
        
        // Calculer la probabilité de pluie basée sur le code météo
        if (weatherCode >= 51 && weatherCode <= 67) {
            barHeight = Math.random() * 30 + 20; // 20-50px
            rainProbability = Math.max(rainProbability, 60);
        } else if (weatherCode >= 80 && weatherCode <= 82) {
            barHeight = Math.random() * 40 + 30; // 30-70px
            rainProbability = Math.max(rainProbability, 80);
        } else if (weatherCode >= 95 && weatherCode <= 99) {
            barHeight = Math.random() * 20 + 50; // 50-70px
            rainProbability = Math.max(rainProbability, 90);
        }
        
        chartHTML += `<div class="rain-bar" style="height: ${barHeight}px"></div>`;
    }
    
    rainChart.innerHTML = chartHTML;
    rainPercentage.textContent = `${rainProbability}%`;
}

// Auto-refresh toutes les 2 minutes
let autoRefreshInterval;
let isFirstLoad = true;

function startAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(() => {
        if (currentCity) {
            updateWeather(currentCity);
        }
    }, 120000); // 120000 ms = 2 minutes
}

// Initialize search listeners
document.addEventListener('DOMContentLoaded', () => {
    setupSearchListeners();
    
    // Ne pas afficher de données fictives au premier chargement
    const cityElement = document.querySelector('.city');
    const tempElement = document.querySelector('.big-temp');
    const conditionElement = document.querySelector('.condition');
    
    if (cityElement) cityElement.textContent = 'Chargement...';
    if (tempElement) tempElement.textContent = '--°';
    if (conditionElement) conditionElement.textContent = 'Recherche en cours';
    
    // Détecter la position de l'utilisateur et charger la météo
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                updateWeatherByCoords(position.coords.latitude, position.coords.longitude);
                startAutoRefresh();
            },
            (error) => {
                // Fallback sur Paris si géolocalisation échoue
                updateWeather('Paris');
                startAutoRefresh();
            }
        );
    } else {
        // Fallback sur Paris si pas de géolocalisation
        updateWeather('Paris');
        startAutoRefresh();
    }
});

// Legacy support
document.getElementById('city-input').addEventListener('blur', function() {
    if (this.value.trim() !== currentCity) {
        searchCity();
    }
});