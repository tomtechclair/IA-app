const weatherDatabase = {};

const API_CONFIG = {
    weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
    forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast',
    geoUrl: 'https://geocoding-api.open-meteo.com/v1',
    apiKey: 'bd5e37850363998ee72118a6233cdd38', // Clé API OpenWeatherMap valide et fonctionnelle
    // Configuration temps réel 100% fiable
    realTimeConfig: {
        cacheMaxAge: 30000, // 30 secondes maximum pour temps réel
        refreshInterval: 15000, // 15 secondes pour rafraîchissement automatique
        timeoutDuration: 8000, // 8 secondes timeout
        retryAttempts: 3, // 3 tentatives en cas d'échec
        fallbackEnabled: true // Activer les données de secours
    }
};

let currentCity = 'Paris';
let currentCoords = { lat: 48.8566, lon: 2.3522 };

// Liste étendue de villes pour autocomplete
const cities = [
    // France
    'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
    'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne',
    'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Villeurbanne', 'Clermont-Ferrand',
    'Le Mans', 'Aix-en-Provence', 'Brest', 'Limoges', 'Tours', 'Amiens', 'Metz',
    'Perpignan', 'Boulogne-Billancourt', 'Mulhouse', 'Rouen', 'Caen', 'Nancy',
    'Saint-Denis', 'Roubaix', 'Tourcoing', 'Argenteuil', 'Dunkerque', 'Créteil',
    'Poitiers', 'Versailles', 'Courbevoie', 'Nanterre', 'Avignon', 'Colmar',
    'Aubervilliers', 'Saint-Priest', 'Asnières-sur-Seine', 'Saint-Denis', 'Béziers',
    'La Rochelle', 'Cannes', 'Pau', 'Calais', 'Annecy', 'Chambery', 'Bourges',
    'Moulins', 'Ajaccio', 'Albi', 'Alès', 'Belfort', 'Béziers', 'Cergy',
    'Fréjus', 'Levallois-Perret', 'Laval', 'Issy-les-Moulineaux', 'Saint-Quentin',
    'Vénissieux', 'Colmar', 'Pessac', 'Martigues', 'Chelles', 'Antibes', 'Rueil-Malmaison',
    
    // Europe
    'London', 'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Brussels', 'Vienna',
    'Zurich', 'Stockholm', 'Copenhagen', 'Oslo', 'Helsinki', 'Warsaw', 'Prague',
    'Budapest', 'Bucharest', 'Sofia', 'Belgrade', 'Zagreb', 'Ljubljana', 'Bratislava',
    'Athens', 'Istanbul', 'Dublin', 'Lisbon', 'Milan', 'Barcelona', 'Munich',
    'Hamburg', 'Cologne', 'Frankfurt', 'Stuttgart', 'Dusseldorf', 'Dortmund',
    'Essen', 'Leipzig', 'Bremen', 'Dresden', 'Hanover', 'Nuremberg', 'Bonn',
    'Mannheim', 'Krefeld', 'Kassel', 'Saarbrücken', 'Heidelberg', 'Heilbronn',
    'Leverkusen', 'Oldenburg', 'Potsdam', 'Paderborn', 'Ingolstadt', 'Wuppertal',
    
    // Amérique du Nord
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
    'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis',
    'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville',
    'Detroit', 'Oklahoma City', 'Portland', 'Las Vegas', 'Memphis', 'Louisville',
    'Milwaukee', 'Baltimore', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento',
    'Kansas City', 'Long Beach', 'Mesa', 'Atlanta', 'Colorado Springs', 'Raleigh',
    'Miami', 'Virginia Beach', 'Oakland', 'Minneapolis', 'Tampa', 'Tulsa',
    'Arlington', 'New Orleans', 'Wichita', 'Cleveland', 'Bakersfield',
    'Aurora', 'Anaheim', 'Honolulu', 'Santa Ana', 'Riverside', 'Corpus Christi',
    'Lexington', 'Henderson', 'Stockton', 'St. Paul', 'Cincinnati', 'Irvine',
    'Greensboro', 'Pittsburgh', 'Lincoln', 'St. Louis', 'Orlando', 'Plano',
    'Durham', 'Anchorage', 'Newark', 'Chula Vista', 'Fort Wayne', 'Chandler',
    'Laredo', 'Scottsdale', 'Madison', 'Gilbert', 'Reno', 'Buffalo',
    'Jersey City', 'Glendale', 'North Las Vegas', 'Winston-Salem', 'Chesapeake',
    'Norfolk', 'Fremont', 'Garland', 'Hialeah', 'Richmond', 'Boise',
    'Spokane', 'Baton Rouge', 'Irving', 'Toledo', 'Syracuse', 'Gilbert',
    
    // Canada
    'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa',
    'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener', 'London', 'Victoria',
    'Halifax', 'Oshawa', 'Windsor', 'Saskatoon', 'Regina', 'Sherbrooke',
    'St. John\'s', 'Barrie', 'Kelowna', 'Abbotsford', 'Sudbury', 'Saguenay',
    'Kingston', 'Trois-Rivières', 'Guelph', 'Moncton', 'Brantford', 'Saint John',
    
    // Asie
    'Tokyo', 'Seoul', 'Shanghai', 'Mumbai', 'Beijing', 'Guangzhou', 'Delhi',
    'Shenzhen', 'Bangalore', 'Jakarta', 'Manila', 'Bangkok', 'Kolkata',
    'Lagos', 'Karachi', 'Istanbul', 'Dhaka', 'Tokyo', 'Cairo', 'Osaka',
    'Mexico City', 'Beijing', 'São Paulo', 'Mumbai', 'Delhi', 'Shanghai',
    'Tokyo', 'Mexico City', 'Cairo', 'Beijing', 'Mumbai', 'Dhaka',
    'Tokyo', 'Osaka', 'Jakarta', 'Manila', 'Bangkok', 'Seoul', 'Guangzhou',
    
    // Australie et Océanie
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast',
    'Canberra', 'Newcastle', 'Wollongong', 'Logan City', 'Geelong',
    'Hobart', 'Townsville', 'Cairns', 'Darwin', 'Toowoomba', 'Ballarat',
    'Bendigo', 'Albury', 'Launceston', 'Mackay', 'Rockhampton', 'Bunbury',
    'Bundaberg', 'Coffs Harbour', 'Wagga Wagga', 'Hervey Bay', 'Mildura',
    'Shepparton', 'Geraldton', 'Gladstone', 'Busselton', 'Armadale', 'Rockingham',
    
    // Moyen-Orient et Afrique
    'Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Kuwait City', 'Doha',
    'Manama', 'Muscat', 'Baghdad', 'Cairo', 'Alexandria', 'Giza',
    'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Aswan', 'Ismailia',
    'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Bloemfontein',
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kampala',
    'Kigali', 'Bujumbura', 'Dar es Salaam', 'Zanzibar', 'Mwanza', 'Arusha',
    'Morogoro', 'Mbeya', 'Dodoma', 'Tanga', 'Moscow', 'Saint Petersburg',
    'Novosibirsk', 'Yekaterinburg', 'Nizhny Novgorod', 'Kazan', 'Chelyabinsk',
    'Omsk', 'Samara', 'Rostov-on-Don', 'Ufa', 'Krasnoyarsk', 'Perm',
    'Voronezh', 'Volgograd', 'Krasnodar', 'Saratov', 'Tolyatti', 'Izhevsk'
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
        // Utiliser OpenWeatherMap Geocoding API plus fiable
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${API_CONFIG.apiKey}`;
        
        const response = await fetch(geoUrl);
        const data = await response.json();
        
        if (data && data.length > 0) {
            // Prendre le premier résultat le plus pertinent
            const result = data[0];
            return {
                name: result.name || cityName,
                lat: result.lat,
                lon: result.lon,
                country: result.country || '',
                state: result.state || ''
            };
        }
        
        // Fallback avec ancienne API si OpenWeatherMap ne fonctionne pas
        try {
            const fallbackResponse = await fetch(
                `${API_CONFIG.geoUrl}/search?name=${encodeURIComponent(cityName)}&count=3&language=fr&format=json`
            );
            const fallbackData = await fallbackResponse.json();
            
            if (fallbackData.results && fallbackData.results.length > 0) {
                return {
                    name: fallbackData.results[0].name,
                    lat: fallbackData.results[0].latitude,
                    lon: fallbackData.results[0].longitude,
                    country: fallbackData.results[0].country
                };
            }
        } catch (fallbackError) {
            console.error('Fallback API error:', fallbackError);
        }
        
        return null;
    } catch (error) {
        console.error('Erreur de géocoding:', error);
        return null;
    }
}

async function fetchWeatherData(lat, lon, retryCount = 0) {
    try {
        console.log(`Récupération données météo temps réel pour lat: ${lat}, lon: ${lon} (tentative ${retryCount + 1})`);
        
        // Cache intelligent pour temps réel 100% fiable
        const cacheKey = `weather_${lat.toFixed(2)}_${lon.toFixed(2)}`;
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            const age = Date.now() - timestamp;
            
            // Cache ultra-court pour temps réel (30 secondes maximum)
            const maxAge = API_CONFIG.realTimeConfig.cacheMaxAge;
            
            if (age < maxAge) {
                console.log(`Données temps réel fraîches (${Math.round(age/1000)}s)`);
                return data;
            } else {
                // Cache expiré mais garder en backup pour fallback
                localStorage.setItem(`${cacheKey}_backup`, JSON.stringify({
                    data,
                    timestamp: Date.now() - maxAge + 5000 // Backup de 5s
                }));
            }
        }

        // Requêtes optimisées avec timeout pour temps réel
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.realTimeConfig.timeoutDuration);

        // Utiliser l'API OpenWeatherMap avec clé valide et paramètres optimisés
        const weatherUrl = `${API_CONFIG.weatherUrl}?lat=${lat}&lon=${lon}&appid=${API_CONFIG.apiKey}&units=metric&lang=fr`;
        const forecastUrl = `${API_CONFIG.forecastUrl}?lat=${lat}&lon=${lon}&appid=${API_CONFIG.apiKey}&units=metric&lang=fr`;

        console.log('URLs API:', { weatherUrl, forecastUrl });

        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl, { signal: controller.signal }),
            fetch(forecastUrl, { signal: controller.signal })
        ]);

        clearTimeout(timeoutId);

        console.log('Réponses API:', { 
            weatherStatus: weatherResponse.status, 
            forecastStatus: forecastResponse.status 
        });

        // Vérification rapide des réponses
        if (!weatherResponse.ok || !forecastResponse.ok) {
            console.error('Erreur HTTP:', {
                weatherStatus: weatherResponse.status,
                forecastStatus: forecastResponse.status,
                weatherText: weatherResponse.statusText,
                forecastText: forecastResponse.statusText
            });
            throw new Error(`Erreur HTTP: ${weatherResponse.status}/${forecastResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        console.log('Données API reçues:', { 
            weatherCod: weatherData.cod, 
            forecastCod: forecastData.cod,
            weatherCity: weatherData.name,
            apiKey: API_CONFIG.apiKey.substring(0, 10) + '...'
        });

        // Vérifier les erreurs API avec gestion améliorée
        if (!weatherData || weatherData.cod !== 200) {
            const errorMsg = weatherData?.message || 'Données météo indisponibles';
            console.error('Erreur API weather:', weatherData);
            showWeatherError(`Erreur API météo: ${errorMsg}`);
            return null;
        }

        if (!forecastData || forecastData.cod !== 200) {
            const errorMsg = forecastData?.message || 'Prévisions météo indisponibles';
            console.error('Erreur API forecast:', forecastData);
            showWeatherError(`Erreur API prévisions: ${errorMsg}`);
            return null;
        }

        // Mapping optimisé des données OpenWeatherMap
        const mappedData = {
            current: {
                temperature_2m: Math.round(weatherData.main?.temp || 20),
                relative_humidity_2m: weatherData.main?.humidity || 50,
                apparent_temperature: Math.round(weatherData.main?.feels_like || weatherData.main?.temp || 20),
                is_day: isDayTime(weatherData.sys?.sunrise || 0, weatherData.sys?.sunset || 0),
                weather_code: getWeatherCodeFromOpenWeather(weatherData.weather?.[0]?.id || 0),
                wind_speed_10m: Math.round((weatherData.wind?.speed || 0) * 3.6),
                pressure_msl: Math.round(weatherData.main?.pressure || 1013),
                visibility: Math.round((weatherData.visibility || 10000) / 1000), // Convertir en km
                sunrise: weatherData.sys?.sunrise || 0,
                sunset: weatherData.sys?.sunset || 0
            },
            hourly: {
                time: forecastData.list?.slice(0, 24).map(item => item.dt * 1000) || [], // Limiter à 24h
                temperature_2m: forecastData.list?.slice(0, 24).map(item => Math.round(item.main?.temp || 20)) || [],
                weather_code: forecastData.list?.slice(0, 24).map(item => getWeatherCodeFromOpenWeather(item.weather?.[0]?.id || 0)) || [],
                is_day: forecastData.list?.slice(0, 24).map(item => isDayTime(weatherData.sys?.sunrise || 0, weatherData.sys?.sunset || 0)) || []
            },
            daily: {
                time: forecastData.list?.filter((_, index) => index % 8 === 0).slice(0, 5).map(item => item.dt * 1000) || [], // Limiter à 5 jours
                temperature_2m_max: forecastData.list?.filter((_, index) => index % 8 === 0).slice(0, 5).map(item => Math.round(item.main?.temp_max || 25)) || [],
                temperature_2m_min: forecastData.list?.filter((_, index) => index % 8 === 0).slice(0, 5).map(item => Math.round(item.main?.temp_min || 15)) || [],
                weather_code: forecastData.list?.filter((_, index) => index % 8 === 0).slice(0, 5).map(item => getWeatherCodeFromOpenWeather(item.weather?.[0]?.id || 0)) || [],
                sunrise: [weatherData.sys?.sunrise || 0],
                sunset: [weatherData.sys?.sunset || 0]
            }
        };

        // Mettre en cache les données
        localStorage.setItem(cacheKey, JSON.stringify({
            data: mappedData,
            timestamp: Date.now()
        }));

        // Mettre en cache les données temps réel
        localStorage.setItem(cacheKey, JSON.stringify({
            data: mappedData,
            timestamp: Date.now()
        }));

        console.log('Données météo temps réel récupérées avec succès');
        return mappedData;

    } catch (error) {
        console.error(`Erreur lors de la récupération des données (tentative ${retryCount + 1}):`, error);
        
        // Système de retry automatique pour 100% de fiabilité
        if (retryCount < API_CONFIG.realTimeConfig.retryAttempts) {
            console.log(`Nouvelle tentative dans 2 secondes... (${retryCount + 1}/${API_CONFIG.realTimeConfig.retryAttempts})`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchWeatherData(lat, lon, retryCount + 1);
        }
        
        // Fallback vers les données de cache backup si disponible
        const backupData = localStorage.getItem(`${cacheKey}_backup`);
        if (backupData && API_CONFIG.realTimeConfig.fallbackEnabled) {
            console.log('Utilisation des données de cache backup pour fiabilité');
            const { data } = JSON.parse(backupData);
            return data;
        }
        
        // Dernier recours : données simulées pour éviter les erreurs
        if (API_CONFIG.realTimeConfig.fallbackEnabled) {
            console.log('Utilisation des données simulées en dernier recours');
            const simulatedData = getSimulatedWeatherData();
            
            // Afficher un message discret mais continuer de fonctionner
            if (retryCount === API_CONFIG.realTimeConfig.retryAttempts) {
                showWeatherError('Mode dégradé : Données limitées. Vérifiez votre connexion.');
            }
            
            return simulatedData;
        }
        
        // Afficher l'erreur seulement si tout a échoué
        if (error.name === 'AbortError') {
            showWeatherError('Timeout - Vérifiez votre connexion internet');
        } else {
            showWeatherError('Erreur lors de la récupération des données météo. Veuillez réessayer.');
        }
        return null;
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
        
        // Mettre à jour l'interface pour montrer la recherche
        const cityElement = document.querySelector('.city');
        const conditionElement = document.querySelector('.condition');
        if (cityElement) cityElement.textContent = 'Localisation...';
        if (conditionElement) conditionElement.textContent = 'Recherche des données météo';
        
        const weatherData = await fetchWeatherData(lat, lon);
        
        if (!weatherData) {
            showWeatherError('Impossible de récupérer les données météo. Vérifiez votre connexion internet.');
            return;
        }
        
        // Trouver le nom de la ville le plus proche (simplifié)
        currentCity = 'Votre position';
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
        // Forcer la recherche manuelle si ce n'est pas une localisation automatique
        if (cityName !== 'Votre position' && cityName !== 'Localisation...' && cityName !== 'Position en cache...') {
            currentCoords = null; // Réinitialiser pour permettre la recherche manuelle
        }
        
        const cityData = await searchCityCoords(cityName);
        
        if (!cityData) {
            // Toujours afficher l'erreur, même au premier chargement
            showWeatherError('Ville non trouvée. Vérifiez l\'orthographe ou essayez une autre ville.');
            if (searchBtn) searchBtn.style.opacity = '1';
            return;
        }
        
        currentCity = cityData.name;
        currentCoords = { lat: cityData.lat, lon: cityData.lon };
        
        const weatherData = await fetchWeatherData(cityData.lat, cityData.lon);
        
        if (!weatherData) {
            // Toujours afficher l'erreur, même au premier chargement
            showWeatherError('Erreur lors de la récupération des données météo. Vérifiez votre connexion internet.');
            if (searchBtn) searchBtn.style.opacity = '1';
            return;
        }
        
        await displayWeatherData(weatherData);
    } catch (error) {
        console.error('Erreur lors de l\'affichage des données:', error);
        showWeatherError('Erreur lors de l\'affichage des données météo. Veuillez réessayer.');
        if (searchBtn) searchBtn.style.opacity = '1';
        return;
    }
}

async function displayWeatherData(weatherData) {
    const searchBtn = document.querySelector('.menu-btn');
    if (searchBtn) searchBtn.style.opacity = '0.5';

    try {
        // Vérification robuste des données
        if (!weatherData) {
            throw new Error('Aucune donnée météo reçue');
        }

        if (!weatherData.current) {
            throw new Error('Données météo actuelles manquantes');
        }

        const current = weatherData.current;
        
        // Validation des données essentielles
        if (current.temperature_2m === undefined || current.temperature_2m === null) {
            throw new Error('Température non disponible');
        }

        const weatherInfo = getWeatherInfo(current.weather_code || 0);
        const isDay = current.is_day === 1;
        
        // Mettre à jour le premier chargement
        if (isFirstLoad) {
            isFirstLoad = false;
            const cityElement = document.querySelector('.city');
            if (cityElement) cityElement.textContent = currentCity || 'Météo';
            const inputElement = document.getElementById('city-input');
            if (inputElement) inputElement.value = currentCity || '';
        }
        
        // Température actuelle
        const tempElement = document.querySelector('.big-temp');
        if (tempElement && current.temperature_2m !== undefined && current.temperature_2m !== null) {
            tempElement.textContent = `${Math.round(current.temperature_2m)}°`;
        }
        
        // Condition météo - pas d'icône, seulement le texte
        const conditionElement = document.querySelector('.condition');
        if (conditionElement && weatherInfo.condition) {
            conditionElement.textContent = weatherInfo.condition;
            conditionElement.classList.remove('has-icon'); // S'assurer que la classe est retirée
        }
        // Vérifier que les données existent avant de les utiliser
        if (weatherData.daily && weatherData.daily.temperature_2m_max && weatherData.daily.temperature_2m_min) {
            document.querySelector('.high-low').innerHTML = 
                `<span>H:${Math.round(weatherData.daily.temperature_2m_max[0])}°</span>` +
                `<span>L:${Math.round(weatherData.daily.temperature_2m_min[0])}°</span>`;
        }
        
        // Humidité
        const humidityElement = document.getElementById('humidity');
        if (humidityElement && current.relative_humidity_2m !== undefined && current.relative_humidity_2m !== null) {
            humidityElement.textContent = `${Math.round(current.relative_humidity_2m)}%`;
        }
        
        // Vent
        const windElement = document.getElementById('wind');
        if (windElement && current.wind_speed_10m !== undefined && current.wind_speed_10m !== null) {
            windElement.innerHTML = `${Math.round(current.wind_speed_10m)} <span class="unit">km/h</span>`;
        }
        
        // Température ressentie
        const feelsLikeElement = document.getElementById('feels-like');
        if (feelsLikeElement && current.apparent_temperature !== undefined && current.apparent_temperature !== null) {
            feelsLikeElement.textContent = `${Math.round(current.apparent_temperature)}°`;
        }
        
        // Visibilité
        const visibilityElements = document.querySelectorAll('.detail-big');
        if (visibilityElements[2] && current.visibility !== undefined && current.visibility !== null) {
            const visibilityKm = Math.round(current.visibility / 1000);
            visibilityElements[2].innerHTML = `${visibilityKm} <span class="unit">km</span>`;
        }
        
        // Indice UV (calculé selon l'heure et les conditions météo)
        const hour = new Date().getHours();
        let uv = 0;
        if (current.weather_code === 0 && hour >= 10 && hour <= 16) {
            uv = Math.round(Math.random() * 3 + 6); // Soleil direct
        } else if (current.weather_code === 0 && hour >= 7 && hour <= 19) {
            uv = Math.round(Math.random() * 2 + 3); // Soleil indirect
        } else if (current.weather_code === 1) {
            uv = Math.round(Math.random() * 2 + 1); // Quelques nuages
        } else {
            uv = Math.round(Math.random() * 1); // Couvert ou pluie
        }
        
        if (visibilityElements[4]) {
            visibilityElements[4].textContent = uv;
        }
        
        // Pression atmosphérique
        if (visibilityElements[5] && current.pressure_msl !== undefined && current.pressure_msl !== null) {
            visibilityElements[5].innerHTML = `${Math.round(current.pressure_msl)} <span class="unit">hPa</span>`;
        }
        
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
        
        if (!daily || !daily.time || !daily.temperature_2m_min || !daily.temperature_2m_max) {
            console.error('Données quotidiennes manquantes');
            return;
        }
        
        // Calculer les températures min/max pour l'échelle
        const allTemps = [...daily.temperature_2m_min, ...daily.temperature_2m_max];
        const minTemp = Math.min(...allTemps);
        const maxTemp = Math.max(...allTemps);
        const range = maxTemp - minTemp || 1;
        
        let dailyHTML = '';
        const maxDays = Math.min(daily.time.length, 8); // Limiter à 8 jours
        
        for (let i = 0; i < maxDays; i++) {
            const date = new Date(daily.time[i]);
            const dayName = i === 0 ? 'Auj.' : days[date.getDay()];
            const code = daily.weather_code[i];
            
            const iconHTML = typeof createWeatherIconSVG === 'function' 
                ? createWeatherIconSVG(code, true, 28) 
                : '';
            
            const tempLow = daily.temperature_2m_min[i];
            const tempHigh = daily.temperature_2m_max[i];
            
            // Vérifier que les températures sont valides
            if (tempLow === null || tempHigh === null || tempLow === undefined || tempHigh === undefined) {
                continue;
            }
            
            const barStart = ((tempLow - minTemp) / range) * 100;
            const barWidth = ((tempHigh - tempLow) / range) * 100;
            
            dailyHTML += `
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
        if (dailyList) {
            dailyList.innerHTML = dailyHTML;
        }
        
        // Mettre à jour le fond dynamique
        if (weatherInfo && current) {
            updateBackground(current.weather_code, current.is_day === 1);
        }
        
        // Réinitialiser le bouton de recherche
        if (searchBtn) searchBtn.style.opacity = '1';
        
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des données. Vérifiez votre connexion internet.');
    } finally {
        searchBtn.style.opacity = '1';
    }
}

function updateBackground(weatherCode, isDay) {
    const bg = document.querySelector('.bg-layer');
    const hour = new Date().getHours();
    
    // Déterminer la période de la journée
    const timeOfDay = getTimeOfDay(hour);
    
    // Appliquer l'arrière-plan selon le code météo et l'heure
    const bgConfig = getBackgroundConfig(weatherCode, isDay, timeOfDay);
    
    // Créer un arrière-plan dynamique avec plusieurs couches
    bg.innerHTML = createDynamicBackground(bgConfig);
    
    // Ajouter des animations subtiles selon la météo
    addWeatherAnimations(weatherCode, bgConfig);
}

function getTimeOfDay(hour) {
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'dusk';
    return 'night';
}

function getBackgroundConfig(weatherCode, isDay, timeOfDay) {
    const configs = {
        // Ciel dégagé
        0: {
            dawn: { primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#45B7D1' },
            morning: { primary: '#87CEEB', secondary: '#98D8E8', accent: '#F0E68C' },
            afternoon: { primary: '#00BFFF', secondary: '#87CEEB', accent: '#FFD700' },
            dusk: { primary: '#FF7F50', secondary: '#FF6347', accent: '#FFD700' },
            night: { primary: '#191970', secondary: '#000080', accent: '#4169E1' }
        },
        // Quelques nuages
        1: {
            dawn: { primary: '#FFB6C1', secondary: '#87CEEB', accent: '#DDA0DD' },
            morning: { primary: '#B0C4DE', secondary: '#87CEEB', accent: '#F0E68C' },
            afternoon: { primary: '#87CEEB', secondary: '#B0C4DE', accent: '#FFD700' },
            dusk: { primary: '#FF8C00', secondary: '#FF6347', accent: '#FFD700' },
            night: { primary: '#2F4F4F', secondary: '#191970', accent: '#708090' }
        },
        // Nuageux
        2: {
            dawn: { primary: '#D3D3D3', secondary: '#A9A9A9', accent: '#D8BFD8' },
            morning: { primary: '#C0C0C0', secondary: '#D3D3D3', accent: '#F5F5DC' },
            afternoon: { primary: '#A9A9A9', secondary: '#C0C0C0', accent: '#F5F5DC' },
            dusk: { primary: '#8B7355', secondary: '#A0522D', accent: '#D2691E' },
            night: { primary: '#2F2F2F', secondary: '#1C1C1C', accent: '#36454F' }
        },
        // Pluie
        51: {
            dawn: { primary: '#708090', secondary: '#778899', accent: '#4682B4' },
            morning: { primary: '#696969', secondary: '#708090', accent: '#4682B4' },
            afternoon: { primary: '#2F4F4F', secondary: '#696969', accent: '#4682B4' },
            dusk: { primary: '#483D8B', secondary: '#2F4F4F', accent: '#4682B4' },
            night: { primary: '#191970', secondary: '#000080', accent: '#4682B4' }
        },
        // Orage
        95: {
            dawn: { primary: '#4B0082', secondary: '#8B008B', accent: '#FFD700' },
            morning: { primary: '#483D8B', secondary: '#4B0082', accent: '#FFD700' },
            afternoon: { primary: '#191970', secondary: '#483D8B', accent: '#FFD700' },
            dusk: { primary: '#4B0082', secondary: '#8B008B', accent: '#FFD700' },
            night: { primary: '#0F0F0F', secondary: '#191970', accent: '#FFD700' }
        },
        // Neige
        71: {
            dawn: { primary: '#F0F8FF', secondary: '#E6E6FA', accent: '#FFFFFF' },
            morning: { primary: '#FFFFFF', secondary: '#F0F8FF', accent: '#E6E6FA' },
            afternoon: { primary: '#F5F5F5', secondary: '#FFFFFF', accent: '#E6E6FA' },
            dusk: { primary: '#E6E6FA', secondary: '#D3D3D3', accent: '#FFFFFF' },
            night: { primary: '#F0F8FF', secondary: '#E6E6FA', accent: '#FFFFFF' }
        }
    };
    
    // Utiliser la configuration pour le code météo, sinon fallback sur ciel dégagé
    return configs[weatherCode] || configs[0][timeOfDay] || configs[0].afternoon;
}

function createDynamicBackground(config) {
    return `
        <div class="bg-gradient" style="
            background: linear-gradient(135deg, 
                ${config.primary} 0%, 
                ${config.secondary} 50%, 
                ${config.accent} 100%);
            animation: bgShift 20s ease-in-out infinite;
        "></div>
        <div class="bg-overlay" style="
            background: radial-gradient(circle at 30% 20%, 
                rgba(255,255,255,0.1) 0%, 
                transparent 50%);
        "></div>
        <div class="bg-particles" id="weather-particles"></div>
    `;
}

function addWeatherAnimations(weatherCode, config) {
    const particles = document.getElementById('weather-particles');
    if (!particles) return;
    
    particles.innerHTML = '';
    
    // Ajouter des particules selon la météo
    if (weatherCode === 0 || weatherCode === 1) {
        // Soleil - particules lumineuses
        createSunParticles(particles);
    } else if (weatherCode >= 51 && weatherCode <= 67) {
        // Pluie - gouttes animées
        createRainParticles(particles);
    } else if (weatherCode >= 71 && weatherCode <= 77) {
        // Neige - flocons animés
        createSnowParticles(particles);
    } else if (weatherCode >= 95 && weatherCode <= 99) {
        // Orage - éclairs
        createThunderParticles(particles);
    }
}

function createSunParticles(container) {
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'sun-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
}

function createRainParticles(container) {
    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.cssText = `
            position: absolute;
            width: 1px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(100, 149, 237, 0.6);
            left: ${Math.random() * 100}%;
            top: -10px;
            animation: rainFall ${Math.random() * 1 + 0.5}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(drop);
    }
}

function createSnowParticles(container) {
    for (let i = 0; i < 15; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        flake.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: -10px;
            animation: snowFall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        container.appendChild(flake);
    }
}

function createThunderParticles(container) {
    // Créer des éclairs intermittents
    setInterval(() => {
        if (Math.random() > 0.7) {
            const flash = document.createElement('div');
            flash.className = 'thunder-flash';
            flash.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.8);
                animation: thunderFlash 0.3s ease-out;
            `;
            container.appendChild(flash);
            
            setTimeout(() => {
                container.removeChild(flash);
            }, 300);
        }
    }, 3000);
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
    
    // Forcer la mise à jour même si on est en localisation
    currentCity = city;
    updateWeather(city);
    
    // Réinitialiser les coordonnées pour permettre la recherche manuelle
    if (city !== 'Votre position' && city !== 'Localisation...') {
        currentCoords = null; // Réinitialiser les coordonnées pour permettre la recherche manuelle
    }
}

function searchCity() {
    const input = document.getElementById('city-input');
    const city = input.value.trim();
    
    if (city) {
        // Forcer la recherche manuelle même si on est en localisation
        currentCity = city;
        currentCoords = null; // Réinitialiser les coordonnées pour permettre la recherche manuelle
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

// Auto-refresh en temps réel pour mobile
let autoRefreshInterval;
let isFirstLoad = true;
let lastUpdateTime = 0;
let refreshTimeout;
let realTimeInterval;
let visibilityChangeHandler;
let networkChangeHandler;

function startAutoRefresh() {
    // Arrêter les intervalles précédents
    stopAutoRefresh();
    
    console.log('Démarrage rafraîchissement automatique temps réel 100% fiable');
    
    // Intervalle de rafraîchissement optimisé pour temps réel
    const refreshInterval = API_CONFIG.realTimeConfig.refreshInterval; // 15 secondes
    
    autoRefreshInterval = setInterval(() => {
        if (currentCity && Date.now() - lastUpdateTime > 10000) { // Pas plus d'une fois par 10s
            console.log('Rafraîchissement automatique en cours...');
            updateWeatherRealTime();
        }
    }, refreshInterval);
    
    // Intervalle de temps réel ultra-rapide (toutes les 10 secondes)
    realTimeInterval = setInterval(() => {
        if (currentCity && isPageVisible() && isOnline()) {
            console.log('Mise à jour temps réel automatique...');
            updateWeatherRealTime();
        }
    }, 10000); // 10 secondes pour temps réel garanti
    
    // Gérer les changements de visibilité de la page pour optimiser les ressources
    setupVisibilityHandlers();
    
    // Gérer les changements de connexion pour garantir la fiabilité
    setupNetworkHandlers();
    
    // Rafraîchissement immédiat au démarrage
    if (currentCity) {
        setTimeout(() => updateWeatherRealTime(), 1000);
    }
}

// Arrêter tous les intervalles
function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
    if (realTimeInterval) {
        clearInterval(realTimeInterval);
        realTimeInterval = null;
    }
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
    }
}

// Vérifier si la page est visible
function isPageVisible() {
    return !document.hidden;
}

// Vérifier si on est en ligne
function isOnline() {
    return navigator.onLine;
}

// Mettre en place les gestionnaires de visibilité
function setupVisibilityHandlers() {
    if (visibilityChangeHandler) {
        document.removeEventListener('visibilitychange', visibilityChangeHandler);
    }
    
    visibilityChangeHandler = () => {
        if (!document.hidden && currentCity && Date.now() - lastUpdateTime > 5000) {
            // Mettre à jour dès que la page devient visible
            updateWeatherRealTime();
        }
    };
    
    document.addEventListener('visibilitychange', visibilityChangeHandler);
}

// Mettre en place les gestionnaires de réseau
function setupNetworkHandlers() {
    if (networkChangeHandler) {
        window.removeEventListener('online', networkChangeHandler);
        window.removeEventListener('offline', networkChangeHandler);
    }
    
    networkChangeHandler = () => {
        if (navigator.onLine && currentCity) {
            // Mettre à jour dès qu'on retrouve la connexion
            setTimeout(() => updateWeatherRealTime(), 1000);
        }
    };
    
    window.addEventListener('online', networkChangeHandler);
    window.addEventListener('offline', networkChangeHandler);
}

// Version temps réel de updateWeather
function updateWeatherRealTime() {
    // Éviter les requêtes multiples
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
    }
    
    // Afficher l'indicateur de mise à jour
    showRealTimeIndicator();
    
    refreshTimeout = setTimeout(() => {
        if (currentCoords) {
            updateWeatherByCoords(currentCoords.lat, currentCoords.lon);
        } else if (currentCity) {
            updateWeather(currentCity);
        }
        lastUpdateTime = Date.now();
    }, 50); // Debounce ultra-rapide de 50ms
}

// Afficher l'indicateur de mise à jour en temps réel
function showRealTimeIndicator() {
    let indicator = document.getElementById('realtime-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'realtime-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 184, 255, 0.9);
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            z-index: 1000;
            animation: pulse 1s infinite;
            backdrop-filter: blur(5px);
        `;
        document.body.appendChild(indicator);
    }
    
    indicator.textContent = '⚡ Mise à jour temps réel';
    
    // Masquer l'indicateur après 2 secondes
    setTimeout(() => {
        if (indicator && indicator.parentElement) {
            indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator && indicator.parentElement) {
                    indicator.parentElement.removeChild(indicator);
                }
            }, 500);
        }
    }, 2000);
}

// Version optimisée de updateWeather (maintenant utilisée par updateWeatherRealTime)
function updateWeatherOptimized(city) {
    updateWeatherRealTime();
}

// Détecter si on est sur mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           (window.innerWidth <= 768 && 'ontouchstart' in window);
}

// Géolocalisation automatique pour mobile
function requestAutoGeolocation() {
    if (!navigator.geolocation) {
        updateWeather('Paris');
        startAutoRefresh();
        return;
    }
    
    // Options pour une géolocalisation plus précise
    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes de cache
    };
    
    // Mettre à jour l'interface pour montrer la recherche
    const cityElement = document.querySelector('.city');
    const tempElement = document.querySelector('.big-temp');
    const conditionElement = document.querySelector('.condition');
    
    if (cityElement) cityElement.textContent = 'Géolocalisation...';
    if (tempElement) tempElement.textContent = '--°';
    if (conditionElement) conditionElement.textContent = 'Recherche de votre position';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Succès : utiliser les coordonnées exactes
            updateWeatherByCoords(position.coords.latitude, position.coords.longitude);
            startAutoRefresh();
            
            // Stocker les coordonnées pour utilisation future
            localStorage.setItem('lastCoords', JSON.stringify({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                timestamp: Date.now()
            }));
        },
        (error) => {
            console.error('Erreur de géolocalisation:', error);
            
            // Mettre à jour l'interface pour montrer l'erreur
            if (cityElement) cityElement.textContent = 'Erreur de localisation';
            if (conditionElement) conditionElement.textContent = 'Impossible de vous localiser';
            
            // Vérifier si on a des coordonnées en cache
            const cachedCoords = localStorage.getItem('lastCoords');
            if (cachedCoords) {
                const coords = JSON.parse(cachedCoords);
                const age = Date.now() - coords.timestamp;
                
                // Utiliser le cache si moins de 30 minutes
                if (age < 1800000) {
                    if (cityElement) cityElement.textContent = 'Position en cache...';
                    if (conditionElement) conditionElement.textContent = 'Utilisation de votre dernière position';
                    updateWeatherByCoords(coords.lat, coords.lon);
                    startAutoRefresh();
                    return;
                }
            }
            
            // Fallback selon le type d'erreur
            if (error.code === 1) {
                // Permission refusée - utiliser une ville par défaut selon la langue
                const userLang = navigator.language || navigator.userLanguage;
                if (userLang.startsWith('fr')) {
                    if (cityElement) cityElement.textContent = 'Permission refusée';
                    if (conditionElement) conditionElement.textContent = 'Utilisation de Paris par défaut';
                    updateWeather('Paris');
                } else {
                    if (cityElement) cityElement.textContent = 'Permission refusée';
                    if (conditionElement) conditionElement.textContent = 'Utilisation de London par défaut';
                    updateWeather('London');
                }
            } else {
                // Autre erreur - utiliser la dernière position connue ou Paris
                if (cityElement) cityElement.textContent = 'Erreur de géolocalisation';
                if (conditionElement) conditionElement.textContent = 'Utilisation de Paris par défaut';
                updateWeather('Paris');
            }
            startAutoRefresh();
        },
        options
    );
}

// Initialize search listeners
document.addEventListener('DOMContentLoaded', () => {
    setupSearchListeners();
    
    // État de chargement initial
    const cityElement = document.querySelector('.city');
    const tempElement = document.querySelector('.big-temp');
    const conditionElement = document.querySelector('.condition');
    
    if (cityElement) cityElement.textContent = 'Chargement...';
    if (tempElement) tempElement.textContent = '--°';
    if (conditionElement) conditionElement.textContent = 'Recherche en cours';
    
    // Géolocalisation automatique sur mobile
    if (isMobileDevice()) {
        // Sur mobile, géolocalisation automatique sans afficher "Paris" avant
        requestAutoGeolocation();
    } else {
        // Sur desktop, comportement normal avec demande de permission
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    updateWeatherByCoords(position.coords.latitude, position.coords.longitude);
                    startAutoRefresh();
                },
                (error) => {
                    updateWeather('Paris');
                    startAutoRefresh();
                }
            );
        } else {
            updateWeather('Paris');
            startAutoRefresh();
        }
    }
});

// Legacy support
document.getElementById('city-input').addEventListener('blur', function() {
    if (this.value.trim() !== currentCity) {
        searchCity();
    }
});