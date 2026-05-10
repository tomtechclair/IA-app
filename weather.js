// Weather API functionality
class WeatherApp {
    constructor() {
        this.apiKey = 'YOUR_API_KEY'; // You'll need to get a free API key from OpenWeatherMap
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.config = this.loadConfig();
        this.cities = [
            'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg',
            'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne',
            'Toulon', 'Grenoble', 'Dijon', 'Angers', 'Nîmes', 'Villeurbanne',
            'London', 'New York', 'Tokyo', 'Berlin', 'Madrid', 'Rome', 'Amsterdam',
            'Brussels', 'Vienna', 'Zurich', 'Stockholm', 'Copenhagen', 'Oslo',
            'Helsinki', 'Warsaw', 'Prague', 'Budapest', 'Bucharest', 'Sofia',
            'Belgrade', 'Zagreb', 'Ljubljana', 'Bratislava', 'Athens', 'Istanbul'
        ];
        this.init();
    }

    loadConfig() {
        // Load Rork Companion weather configuration
        try {
            const response = fetch('rork-weather-config.json')
                .then(response => response.json())
                .then(data => data.weather_integration)
                .catch(() => this.getDefaultConfig());
            return this.getDefaultConfig(); // Fallback for now
        } catch (error) {
            return this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            app_name: "Rork Companion",
            features: {
                real_time_weather: true,
                location_tracking: true,
                auto_update: true,
                multi_city_support: true
            },
            supported_cities: ["Paris", "Lyon", "Marseille", "London"],
            update_interval: 600,
            ui_settings: {
                theme: "dark",
                animations: true,
                responsive: true
            }
        };
    }

    init() {
        this.loadWeatherData();
        this.setupEventListeners();
        this.startAutoUpdate();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('city-search');
        const searchBtn = document.getElementById('search-btn');
        const suggestionsContainer = document.getElementById('search-suggestions');
        const refreshBtn = document.getElementById('refresh-btn');
        const quickCities = document.querySelectorAll('.quick-city');

        if (searchInput && searchBtn) {
            // Search on button click
            searchBtn.addEventListener('click', () => {
                this.handleSearch(searchInput.value.trim());
            });

            // Search on Enter key
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(searchInput.value.trim());
                }
            });

            // Show suggestions on input
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length >= 2) {
                    this.showSuggestions(query);
                } else {
                    this.hideSuggestions();
                }
            });

            // Hide suggestions on click outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-box')) {
                    this.hideSuggestions();
                }
            });
        }

        // Quick city buttons
        quickCities.forEach(cityBtn => {
            cityBtn.addEventListener('click', () => {
                const city = cityBtn.getAttribute('data-city');
                this.handleSearch(city);
                searchInput.value = city;
            });
        });

        // Refresh button
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshWeather();
            });
        }

        // Legacy location click support
        const locationElement = document.getElementById('location');
        if (locationElement) {
            locationElement.style.cursor = 'pointer';
            locationElement.addEventListener('click', () => {
                const newLocation = prompt('Entrez une ville:', 'Paris');
                if (newLocation) {
                    this.handleSearch(newLocation);
                    searchInput.value = newLocation;
                }
            });
        }
    }

    async loadWeatherData() {
        // Default to Paris if no location stored
        const location = localStorage.getItem('weatherLocation') || 'Paris';
        await this.fetchWeatherData(location);
        
        // Set the search input value
        const searchInput = document.getElementById('city-search');
        if (searchInput) {
            searchInput.value = location;
        }
    }

    async fetchWeatherData(location) {
        try {
            // For demo purposes, using mock data since we don't have a real API key
            // In production, replace this with actual API call
            const mockData = this.getMockWeatherData(location);
            this.updateWeatherDisplay(mockData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError();
        }
    }

    getMockWeatherData(location) {
        const weatherData = {
            'Paris': {
                temp: 22,
                description: 'Ensoleillé',
                humidity: 65,
                wind: 15,
                pressure: 1013,
                visibility: 10,
                icon: 'fa-sun',
                feels_like: 24,
                uv_index: 6,
                sunrise: '06:45',
                sunset: '20:30',
                cloudiness: 10
            },
            'Lyon': {
                temp: 18,
                description: 'Partiellement nuageux',
                humidity: 70,
                wind: 12,
                pressure: 1015,
                visibility: 8,
                icon: 'fa-cloud-sun',
                feels_like: 17,
                uv_index: 4,
                sunrise: '06:30',
                sunset: '20:45',
                cloudiness: 40
            },
            'Marseille': {
                temp: 25,
                description: 'Très ensoleillé',
                humidity: 55,
                wind: 20,
                pressure: 1010,
                visibility: 15,
                icon: 'fa-sun',
                feels_like: 26,
                uv_index: 8,
                sunrise: '06:15',
                sunset: '21:00',
                cloudiness: 5
            },
            'London': {
                temp: 15,
                description: 'Pluvieux',
                humidity: 80,
                wind: 25,
                pressure: 1008,
                visibility: 5,
                icon: 'fa-cloud-rain',
                feels_like: 13,
                uv_index: 2,
                sunrise: '05:30',
                sunset: '19:15',
                cloudiness: 85
            },
            'Toulouse': {
                temp: 20,
                description: 'Nuageux',
                humidity: 68,
                wind: 18,
                pressure: 1012,
                visibility: 12,
                icon: 'fa-cloud',
                feels_like: 19,
                uv_index: 3,
                sunrise: '06:40',
                sunset: '20:40',
                cloudiness: 70
            },
            'Nice': {
                temp: 23,
                description: 'Ensoleillé',
                humidity: 60,
                wind: 22,
                pressure: 1011,
                visibility: 20,
                icon: 'fa-sun',
                feels_like: 24,
                uv_index: 7,
                sunrise: '06:20',
                sunset: '20:50',
                cloudiness: 15
            },
            'Bordeaux': {
                temp: 19,
                description: 'Brumeux',
                humidity: 75,
                wind: 14,
                pressure: 1014,
                visibility: 6,
                icon: 'fa-smog',
                feels_like: 18,
                uv_index: 3,
                sunrise: '06:35',
                sunset: '20:35',
                cloudiness: 60
            },
            'Lille': {
                temp: 16,
                description: 'Orageux',
                humidity: 85,
                wind: 30,
                pressure: 1006,
                visibility: 4,
                icon: 'fa-bolt',
                feels_like: 14,
                uv_index: 1,
                sunrise: '06:25',
                sunset: '20:25',
                cloudiness: 90
            },
            'Strasbourg': {
                temp: 17,
                description: 'Neigeux',
                humidity: 78,
                wind: 16,
                pressure: 1009,
                visibility: 7,
                icon: 'fa-snowflake',
                feels_like: 15,
                uv_index: 2,
                sunrise: '06:45',
                sunset: '20:20',
                cloudiness: 80
            },
            'Nantes': {
                temp: 21,
                description: 'Partiellement nuageux',
                humidity: 62,
                wind: 20,
                pressure: 1013,
                visibility: 14,
                icon: 'fa-cloud-sun',
                feels_like: 22,
                uv_index: 5,
                sunrise: '06:40',
                sunset: '20:45',
                cloudiness: 35
            }
        };

        return weatherData[location] || weatherData['Paris'];
    }

    updateWeatherDisplay(data) {
        // Update location
        const locationElement = document.getElementById('location');
        if (locationElement) {
            const currentLocation = localStorage.getItem('weatherLocation') || 'Paris';
            locationElement.textContent = `${currentLocation}, France`;
        }

        // Update temperature
        const tempElement = document.getElementById('temperature');
        if (tempElement) {
            tempElement.textContent = data.temp;
        }

        // Update weather icon
        const iconElement = document.getElementById('weather-icon');
        if (iconElement) {
            iconElement.className = `fas ${data.icon}`;
        }

        // Update description
        const descElement = document.getElementById('description');
        if (descElement) {
            descElement.textContent = data.description;
        }

        // Update details
        this.updateDetail('humidity', `${data.humidity}%`);
        this.updateDetail('wind', `${data.wind} km/h`);
        this.updateDetail('pressure', `${data.pressure} hPa`);
        this.updateDetail('visibility', `${data.visibility} km`);

        // Update additional details if elements exist
        if (data.feels_like !== undefined) {
            this.updateDetail('feels_like', `${data.feels_like}°C`);
        }
        if (data.uv_index !== undefined) {
            this.updateDetail('uv_index', data.uv_index);
        }
        if (data.sunrise !== undefined) {
            this.updateDetail('sunrise', data.sunrise);
        }
        if (data.sunset !== undefined) {
            this.updateDetail('sunset', data.sunset);
        }
        if (data.cloudiness !== undefined) {
            this.updateDetail('cloudiness', `${data.cloudiness}%`);
        }
    }

    updateDetail(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    handleSearch(query) {
        if (!query) return;
        
        this.hideSuggestions();
        this.updateLocation(query);
        
        // Update search input value
        const searchInput = document.getElementById('city-search');
        if (searchInput) {
            searchInput.value = query;
        }
    }

    showSuggestions(query) {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (!suggestionsContainer) return;

        const filteredCities = this.cities.filter(city => 
            city.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

        if (filteredCities.length === 0) {
            this.hideSuggestions();
            return;
        }

        suggestionsContainer.innerHTML = '';
        filteredCities.forEach(city => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.textContent = city;
            suggestionItem.addEventListener('click', () => {
                this.handleSearch(city);
            });
            suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.classList.add('active');
    }

    hideSuggestions() {
        const suggestionsContainer = document.getElementById('search-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.classList.remove('active');
            suggestionsContainer.innerHTML = '';
        }
    }

    updateLocation(newLocation) {
        localStorage.setItem('weatherLocation', newLocation);
        this.fetchWeatherData(newLocation);
    }

    showError() {
        const descElement = document.getElementById('description');
        if (descElement) {
            descElement.textContent = 'Données non disponibles';
        }
    }

    startAutoUpdate() {
        // Update weather every 10 minutes
        setInterval(() => {
            this.loadWeatherData();
        }, 600000);
    }

    // Real API call method (commented out - needs API key)
    /*
    async fetchWeatherDataReal(location) {
        const response = await fetch(`${this.baseUrl}/weather?q=${location}&appid=${this.apiKey}&units=metric&lang=fr`);
        const data = await response.json();
        
        return {
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            humidity: data.main.humidity,
            wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            pressure: data.main.pressure,
            visibility: data.visibility / 1000, // Convert m to km
            icon: this.getWeatherIcon(data.weather[0].main)
        };
    }

    getWeatherIcon(weatherMain) {
        const iconMap = {
            'Clear': 'fa-sun',
            'Clouds': 'fa-cloud',
            'Rain': 'fa-cloud-rain',
            'Snow': 'fa-snowflake',
            'Thunderstorm': 'fa-bolt',
            'Drizzle': 'fa-cloud-rain',
            'Mist': 'fa-smog',
            'Fog': 'fa-smog'
        };
        return iconMap[weatherMain] || 'fa-sun';
    }
    */

    refreshWeather() {
        this.loadWeatherData();
        this.showRefreshAnimation();
    }

    changeLocation() {
        const newLocation = prompt('Entrez une ville:', 'Paris');
        if (newLocation) {
            this.updateLocation(newLocation);
        }
    }

    showRefreshAnimation() {
        const icon = document.getElementById('weather-icon');
        if (icon) {
            icon.style.animation = 'spin 1s ease-in-out';
            setTimeout(() => {
                icon.style.animation = 'float 3s ease-in-out infinite';
            }, 1000);
        }
    }
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize weather app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});
