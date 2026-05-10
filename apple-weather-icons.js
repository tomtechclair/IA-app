/**
 * Apple Weather Style Icons
 * Recréation fidèle des icônes météo iOS/SF Symbols
 */

class AppleWeatherIcons {
    constructor() {
        this.icons = {
            sun: this.createSun(),
            moon: this.createMoon(),
            cloud: this.createCloud(),
            'cloud.sun': this.createCloudSun(),
            'cloud.moon': this.createCloudMoon(),
            rain: this.createRain(),
            'cloud.rain': this.createCloudRain(),
            snow: this.createSnow(),
            'cloud.snow': this.createCloudSnow(),
            thunder: this.createThunder(),
            'cloud.bolt': this.createCloudBolt(),
            'cloud.bolt.rain': this.createCloudBoltRain(),
            fog: this.createFog(),
            'cloud.fog': this.createCloudFog(),
            'sun.dust': this.createSunDust(),
            haze: this.createHaze(),
            'cloud.sun.rain': this.createCloudSunRain(),
            drizzle: this.createDrizzle(),
            sleet: this.createSleet(),
            smoke: this.createSmoke(),
            tornado: this.createTornado(),
            hurricane: this.createHurricane(),
            'thermometer.sun': this.createThermometerSun(),
            'thermometer.snowflake': this.createThermometerSnow(),
            wind: this.createWind(),
            'sun.haze': this.createSunHaze()
        };
    }

    createSVG(content, viewBox = '0 0 100 100', className = '') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="apple-weather-icon ${className}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;
    }

    createSun() {
        return this.createSVG(`
            <circle cx="50" cy="50" r="18" fill="#FFD60A" stroke="#FFD60A" stroke-width="2"/>
            <line x1="50" y1="14" x2="50" y2="22" stroke="#FFD60A"/>
            <line x1="50" y1="78" x2="50" y2="86" stroke="#FFD60A"/>
            <line x1="14" y1="50" x2="22" y2="50" stroke="#FFD60A"/>
            <line x1="78" y1="50" x2="86" y2="50" stroke="#FFD60A"/>
            <line x1="24.5" y1="24.5" x2="30" y2="30" stroke="#FFD60A"/>
            <line x1="70" y1="70" x2="75.5" y2="75.5" stroke="#FFD60A"/>
            <line x1="24.5" y1="75.5" x2="30" y2="70" stroke="#FFD60A"/>
            <line x1="70" y1="30" x2="75.5" y2="24.5" stroke="#FFD60A"/>
        `);
    }

    createMoon() {
        return this.createSVG(`
            <path d="M65 25 A 25 25 0 1 1 45 75 A 20 20 0 1 0 65 25 Z" fill="#E0E0E0" stroke="#E0E0E0" stroke-width="2"/>
            <circle cx="35" cy="40" r="3" fill="#C0C0C0" opacity="0.3"/>
            <circle cx="45" cy="55" r="2" fill="#C0C0C0" opacity="0.3"/>
        `);
    }

    createCloud() {
        return this.createSVG(`
            <path d="M25 65 Q15 65 15 55 Q15 45 25 45 Q25 30 40 30 Q50 30 55 38 Q65 38 65 48 Q75 48 75 58 Q75 65 65 65 Z" fill="url(#cloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <defs>
                <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#F2F2F7"/>
                    <stop offset="100%" style="stop-color:#C7C7CC"/>
                </linearGradient>
            </defs>
        `);
    }

    createCloudSun() {
        return this.createSVG(`
            <circle cx="72" cy="28" r="14" fill="#FFD60A" stroke="#FFD60A" stroke-width="1.5"/>
            <line x1="72" y1="8" x2="72" y2="14" stroke="#FFD60A" stroke-width="2"/>
            <line x1="72" y1="42" x2="72" y2="48" stroke="#FFD60A" stroke-width="2"/>
            <line x1="52" y1="28" x2="58" y2="28" stroke="#FFD60A" stroke-width="2"/>
            <line x1="86" y1="28" x2="92" y2="28" stroke="#FFD60A" stroke-width="2"/>
            <path d="M15 70 Q5 70 5 60 Q5 50 15 50 Q15 35 30 35 Q40 35 45 43 Q55 43 55 53 Q65 53 65 63 Q65 70 55 70 Z" fill="url(#cloudSunGradient)" stroke="#8E8E93" stroke-width="2"/>
            <defs>
                <linearGradient id="cloudSunGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#F2F2F7"/>
                    <stop offset="100%" style="stop-color:#C7C7CC"/>
                </linearGradient>
            </defs>
        `);
    }

    createCloudMoon() {
        return this.createSVG(`
            <path d="M78 22 A 16 16 0 1 1 64 46 A 12 12 0 1 0 78 22 Z" fill="#E0E0E0" stroke="#E0E0E0" stroke-width="1.5"/>
            <path d="M15 70 Q5 70 5 60 Q5 50 15 50 Q15 35 30 35 Q40 35 45 43 Q55 43 55 53 Q65 53 65 63 Q65 70 55 70 Z" fill="url(#cloudMoonGradient)" stroke="#8E8E93" stroke-width="2"/>
            <defs>
                <linearGradient id="cloudMoonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#F2F2F7"/>
                    <stop offset="100%" style="stop-color:#C7C7CC"/>
                </linearGradient>
            </defs>
        `);
    }

    createRain() {
        return this.createSVG(`
            <path d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#rainCloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <line x1="25" y1="55" x2="25" y2="72" stroke="#007AFF" stroke-width="3" stroke-linecap="round"/>
            <line x1="40" y1="55" x2="40" y2="75" stroke="#007AFF" stroke-width="3" stroke-linecap="round"/>
            <line x1="55" y1="55" x2="55" y2="68" stroke="#007AFF" stroke-width="3" stroke-linecap="round"/>
            <defs>
                <linearGradient id="rainCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C7C7CC"/>
                    <stop offset="100%" style="stop-color:#8E8E93"/>
                </linearGradient>
            </defs>
        `);
    }

    createCloudRain() {
        return this.createRain();
    }

    createSnow() {
        return this.createSVG(`
            <path d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#snowCloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <circle cx="25" cy="60" r="3" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/>
            <circle cx="40" cy="65" r="3" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/>
            <circle cx="55" cy="58" r="3" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/>
            <defs>
                <linearGradient id="snowCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C7C7CC"/>
                    <stop offset="100%" style="stop-color:#8E8E93"/>
                </linearGradient>
            </defs>
        `);
    }

    createCloudSnow() {
        return this.createSnow();
    }

    createThunder() {
        return this.createSVG(`
            <path d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#thunderCloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <path d="M42 52 L32 72 L45 72 L38 90 L55 68 L42 68 Z" fill="#FFD60A" stroke="#FFD60A" stroke-width="2" stroke-linejoin="round"/>
            <defs>
                <linearGradient id="thunderCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#8E8E93"/>
                    <stop offset="100%" style="stop-color:#636366"/>
                </linearGradient>
            </defs>
        `);
    }

    createCloudBolt() {
        return this.createThunder();
    }

    createCloudBoltRain() {
        return this.createSVG(`
            <path d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#thunderRainCloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <path d="M42 52 L32 68 L42 68 L38 82 L48 66 L38 66 Z" fill="#FFD60A" stroke="#FFD60A" stroke-width="1.5" stroke-linejoin="round"/>
            <line x1="25" y1="55" x2="25" y2="62" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="55" y1="55" x2="55" y2="62" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
                <linearGradient id="thunderRainCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#8E8E93"/>
                    <stop offset="100%" style="stop-color:#636366"/>
                </linearGradient>
            </defs>
        `);
    }

    createFog() {
        return this.createSVG(`
            <line x1="15" y1="35" x2="85" y2="35" stroke="#C7C7CC" stroke-width="3" stroke-linecap="round"/>
            <line x1="20" y1="48" x2="80" y2="48" stroke="#C7C7CC" stroke-width="3" stroke-linecap="round"/>
            <line x1="25" y1="61" x2="75" y2="61" stroke="#C7C7CC" stroke-width="3" stroke-linecap="round"/>
            <line x1="30" y1="74" x2="70" y2="74" stroke="#C7C7CC" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        `);
    }

    createCloudFog() {
        return this.createSVG(`
            <path d="M25 45 Q15 45 15 35 Q15 25 25 25 Q25 10 40 10 Q50 10 55 18 Q65 18 65 28 Q75 28 75 38 Q75 45 65 45 Z" fill="url(#fogCloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <line x1="20" y1="52" x2="70" y2="52" stroke="#C7C7CC" stroke-width="3" stroke-linecap="round"/>
            <line x1="25" y1="64" x2="65" y2="64" stroke="#C7C7CC" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
            <defs>
                <linearGradient id="fogCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C7C7CC"/>
                    <stop offset="100%" style="stop-color:#8E8E93"/>
                </linearGradient>
            </defs>
        `);
    }

    createSunDust() {
        return this.createSVG(`
            <circle cx="50" cy="50" r="18" fill="#FFD60A" stroke="#FFD60A" stroke-width="2"/>
            <line x1="50" y1="14" x2="50" y2="22" stroke="#FFD60A"/>
            <line x1="50" y1="78" x2="50" y2="86" stroke="#FFD60A"/>
            <line x1="14" y1="50" x2="22" y2="50" stroke="#FFD60A"/>
            <line x1="78" y1="50" x2="86" y2="50" stroke="#FFD60A"/>
            <circle cx="30" cy="30" r="2" fill="#C7C7CC" opacity="0.6"/>
            <circle cx="70" cy="25" r="1.5" fill="#C7C7CC" opacity="0.5"/>
            <circle cx="75" cy="70" r="2" fill="#C7C7CC" opacity="0.4"/>
        `);
    }

    createHaze() {
        return this.createSunDust();
    }

    createCloudSunRain() {
        return this.createSVG(`
            <circle cx="72" cy="22" r="12" fill="#FFD60A" stroke="#FFD60A" stroke-width="1.5"/>
            <path d="M15 70 Q5 70 5 60 Q5 50 15 50 Q15 35 30 35 Q40 35 45 43 Q55 43 55 53 Q65 53 65 63 Q65 70 55 70 Z" fill="url(#cloudSunRainGradient)" stroke="#8E8E93" stroke-width="2"/>
            <line x1="25" y1="75" x2="25" y2="88" stroke="#007AFF" stroke-width="3" stroke-linecap="round"/>
            <line x1="40" y1="75" x2="40" y2="90" stroke="#007AFF" stroke-width="3" stroke-linecap="round"/>
            <line x1="55" y1="75" x2="55" y2="82" stroke="#007AFF" stroke-width="3" stroke-linecap="round"/>
            <defs>
                <linearGradient id="cloudSunRainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C7C7CC"/>
                    <stop offset="100%" style="stop-color:#8E8E93"/>
                </linearGradient>
            </defs>
        `);
    }

    createDrizzle() {
        return this.createSVG(`
            <path d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#drizzleCloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <line x1="25" y1="55" x2="25" y2="62" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="35" y1="55" x2="35" y2="65" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="45" y1="55" x2="45" y2="60" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="55" y1="55" x2="55" y2="63" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <defs>
                <linearGradient id="drizzleCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C7C7CC"/>
                    <stop offset="100%" style="stop-color:#8E8E93"/>
                </linearGradient>
            </defs>
        `);
    }

    createSleet() {
        return this.createSVG(`
            <path d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#sleetCloudGradient)" stroke="#8E8E93" stroke-width="2"/>
            <line x1="25" y1="55" x2="25" y2="68" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="35" cy="62" r="2.5" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/>
            <line x1="45" y1="55" x2="45" y2="65" stroke="#007AFF" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="55" cy="60" r="2.5" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/>
            <defs>
                <linearGradient id="sleetCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C7C7CC"/>
                    <stop offset="100%" style="stop-color:#8E8E93"/>
                </linearGradient>
            </defs>
        `);
    }

    createSmoke() {
        return this.createSVG(`
            <path d="M25 50 Q15 50 15 40 Q15 30 25 30 Q25 15 40 15 Q50 15 55 23 Q65 23 65 33 Q75 33 75 43 Q75 50 65 50 Z" fill="url(#smokeCloudGradient)" stroke="#8E8E93" stroke-width="2" opacity="0.8"/>
            <circle cx="30" cy="60" r="8" fill="#C7C7CC" opacity="0.3"/>
            <circle cx="55" cy="65" r="10" fill="#C7C7CC" opacity="0.25"/>
            <circle cx="45" cy="75" r="6" fill="#C7C7CC" opacity="0.2"/>
            <defs>
                <linearGradient id="smokeCloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C7C7CC"/>
                    <stop offset="100%" style="stop-color:#8E8E93"/>
                </linearGradient>
            </defs>
        `);
    }

    createTornado() {
        return this.createSVG(`
            <path d="M60 15 Q75 15 80 25 Q85 35 70 40 Q55 45 50 55 Q45 65 55 70" stroke="#8E8E93" stroke-width="3" fill="none"/>
            <path d="M55 70 Q50 75 55 80" stroke="#8E8E93" stroke-width="3" fill="none"/>
            <path d="M45 30 Q55 30 60 35" stroke="#C7C7CC" stroke-width="2" fill="none"/>
            <path d="M50 50 Q60 50 65 55" stroke="#C7C7CC" stroke-width="2" fill="none"/>
        `);
    }

    createHurricane() {
        return this.createSVG(`
            <circle cx="50" cy="50" r="30" stroke="#007AFF" stroke-width="3" fill="none"/>
            <circle cx="50" cy="50" r="15" stroke="#007AFF" stroke-width="3" fill="none"/>
            <path d="M50 20 Q60 35 50 50 Q40 35 50 20" fill="#007AFF" stroke="#007AFF" stroke-width="2"/>
            <path d="M50 80 Q40 65 50 50 Q60 65 50 80" fill="#007AFF" stroke="#007AFF" stroke-width="2"/>
        `);
    }

    createThermometerSun() {
        return this.createSVG(`
            <rect x="42" y="25" width="16" height="50" rx="8" stroke="#8E8E93" stroke-width="2.5" fill="none"/>
            <circle cx="50" cy="65" r="10" fill="#FF3B30" stroke="#FF3B30" stroke-width="2"/>
            <rect x="46" y="35" width="8" height="22" rx="4" fill="#FF3B30"/>
            <circle cx="72" cy="25" r="8" fill="#FFD60A" stroke="#FFD60A" stroke-width="1.5"/>
            <line x1="72" y1="12" x2="72" y2="16" stroke="#FFD60A" stroke-width="2"/>
            <line x1="72" y1="34" x2="72" y2="38" stroke="#FFD60A" stroke-width="2"/>
            <line x1="59" y1="25" x2="63" y2="25" stroke="#FFD60A" stroke-width="2"/>
            <line x1="81" y1="25" x2="85" y2="25" stroke="#FFD60A" stroke-width="2"/>
        `);
    }

    createThermometerSnow() {
        return this.createSVG(`
            <rect x="42" y="25" width="16" height="50" rx="8" stroke="#8E8E93" stroke-width="2.5" fill="none"/>
            <circle cx="50" cy="65" r="10" fill="#0EA5E9" stroke="#0EA5E9" stroke-width="2"/>
            <rect x="46" y="45" width="8" height="12" rx="4" fill="#0EA5E9"/>
            <circle cx="72" cy="25" r="6" fill="none" stroke="#0EA5E9" stroke-width="2"/>
            <line x1="72" y1="16" x2="72" y2="13" stroke="#0EA5E9" stroke-width="2"/>
            <line x1="65" y1="25" x2="62" y2="25" stroke="#0EA5E9" stroke-width="2"/>
            <line x1="79" y1="25" x2="82" y2="25" stroke="#0EA5E9" stroke-width="2"/>
        `);
    }

    createWind() {
        return this.createSVG(`
            <path d="M15 30 Q25 20 40 30 Q50 40 60 30" stroke="#007AFF" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M10 50 Q25 40 45 50 Q60 60 75 50" stroke="#007AFF" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path d="M20 70 Q35 60 50 70 Q65 80 80 70" stroke="#007AFF" stroke-width="3" fill="none" stroke-linecap="round"/>
        `);
    }

    createSunHaze() {
        return this.createSVG(`
            <circle cx="50" cy="45" r="16" fill="#FFD60A" stroke="#FFD60A" stroke-width="2"/>
            <line x1="50" y1="15" x2="50" y2="22" stroke="#FFD60A"/>
            <line x1="50" y1="68" x2="50" y2="75" stroke="#FFD60A"/>
            <line x1="20" y1="45" x2="27" y2="45" stroke="#FFD60A"/>
            <line x1="73" y1="45" x2="80" y2="45" stroke="#FFD60A"/>
            <line x1="28" y1="23" x2="33" y2="28" stroke="#FFD60A"/>
            <line x1="67" y1="62" x2="72" y2="67" stroke="#FFD60A"/>
            <line x1="28" y1="67" x2="33" y2="62" stroke="#FFD60A"/>
            <line x1="67" y1="28" x2="72" y2="23" stroke="#FFD60A"/>
            <line x1="10" y1="82" x2="90" y2="82" stroke="#C7C7CC" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        `);
    }

    getIcon(code, isDay = true) {
        // Mapping WMO weather codes to Apple-style icons
        const iconMap = {
            0: isDay ? 'sun' : 'moon',                    // Clear sky
            1: isDay ? 'cloud.sun' : 'cloud.moon',        // Mainly clear
            2: isDay ? 'cloud.sun' : 'cloud.moon',        // Partly cloudy
            3: 'cloud',                                    // Overcast
            45: 'cloud.fog',                               // Fog
            48: 'cloud.fog',                               // Depositing rime fog
            51: 'drizzle',                                 // Light drizzle
            53: 'drizzle',                                 // Moderate drizzle
            55: 'drizzle',                                 // Dense drizzle
            56: 'sleet',                                   // Light freezing drizzle
            57: 'sleet',                                   // Dense freezing drizzle
            61: 'rain',                                    // Slight rain
            63: 'rain',                                    // Moderate rain
            65: 'rain',                                    // Heavy rain
            66: 'sleet',                                   // Light freezing rain
            67: 'sleet',                                   // Heavy freezing rain
            71: 'snow',                                    // Slight snow fall
            73: 'snow',                                    // Moderate snow fall
            75: 'snow',                                    // Heavy snow fall
            77: 'snow',                                    // Snow grains
            80: 'rain',                                    // Slight rain showers
            81: 'rain',                                    // Moderate rain showers
            82: 'thunder',                                 // Violent rain showers
            85: 'snow',                                    // Slight snow showers
            86: 'snow',                                    // Heavy snow showers
            95: 'cloud.bolt',                              // Thunderstorm
            96: 'cloud.bolt.rain',                         // Thunderstorm with slight hail
            99: 'cloud.bolt.rain'                          // Thunderstorm with heavy hail
        };

        const iconName = iconMap[code] || (isDay ? 'sun' : 'moon');
        return this.icons[iconName] || this.icons.sun;
    }
}

// Create global instance
const appleWeatherIcons = new AppleWeatherIcons();

// Helper function to get weather icon
function getWeatherIcon(code, isDay = true, size = 48) {
    const svg = appleWeatherIcons.getIcon(code, isDay);
    return `<div class="apple-weather-icon-container" style="width: ${size}px; height: ${size}px;">${svg}</div>`;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AppleWeatherIcons, getWeatherIcon };
}