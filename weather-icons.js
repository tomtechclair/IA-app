// Fonction pour créer un SVG d'icône météo style Apple
function createWeatherIconSVG(code, isDay = true, size = 32) {
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-sun">
            <circle cx="50" cy="50" r="20" fill="#FFD700" class="sun-core"/>
            <g class="sun-rays">
                <line x1="50" y1="15" x2="50" y2="25" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                <line x1="50" y1="75" x2="50" y2="85" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                <line x1="15" y1="50" x2="25" y2="50" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                <line x1="75" y1="50" x2="85" y2="50" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                <line x1="25" y1="25" x2="32" y2="32" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                <line x1="68" y1="68" x2="75" y2="75" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                <line x1="25" y1="75" x2="32" y2="68" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
                <line x1="68" y1="32" x2="75" y2="25" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
            </g>
        </g>
    </svg>`;
    
    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-moon">
            <path d="M60 20 A 30 30 0 1 1 40 80 A 22 22 0 1 0 60 20" fill="#C0C0C0" stroke="none"/>
        </g>
    </svg>`;
    
    const cloudSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-cloud">
            <path class="cloud-shape" d="M25 65 Q15 65 15 55 Q15 45 25 45 Q25 30 40 30 Q50 30 55 38 Q65 38 65 48 Q75 48 75 58 Q75 65 65 65 Z" fill="url(#cloudGrad)" stroke="none"/>
            <defs>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#F0F0F0"/>
                    <stop offset="100%" style="stop-color:#D0D0D0"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;
    
    const cloudSunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-cloud-sun">
            <circle cx="65" cy="35" r="15" fill="#FFD700"/>
            <g stroke="#FFD700" stroke-width="3" stroke-linecap="round">
                <line x1="65" y1="12" x2="65" y2="18"/>
                <line x1="65" y1="52" x2="65" y2="58"/>
                <line x1="42" y1="35" x2="48" y2="35"/>
                <line x1="82" y1="35" x2="88" y2="35"/>
                <line x1="49" y1="19" x2="53" y2="23"/>
                <line x1="77" y1="47" x2="81" y2="51"/>
            </g>
            <path class="cloud-shape" d="M15 70 Q5 70 5 60 Q5 50 15 50 Q15 35 30 35 Q40 35 45 43 Q55 43 55 53 Q65 53 65 63 Q65 70 55 70 Z" fill="url(#cloudGrad2)" stroke="none"/>
            <defs>
                <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#F0F0F0"/>
                    <stop offset="100%" style="stop-color:#D0D0D0"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;
    
    const cloudMoonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-cloud-moon">
            <path d="M70 25 A 20 20 0 1 1 55 55 A 15 15 0 1 0 70 25" fill="#C0C0C0"/>
            <path class="cloud-shape" d="M15 70 Q5 70 5 60 Q5 50 15 50 Q15 35 30 35 Q40 35 45 43 Q55 43 55 53 Q65 53 65 63 Q65 70 55 70 Z" fill="url(#cloudGrad3)" stroke="none"/>
            <defs>
                <linearGradient id="cloudGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#E0E0E0"/>
                    <stop offset="100%" style="stop-color:#B0B0B0"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;
    
    const rainSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-rain">
            <path class="cloud-shape" d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#cloudGrad4)" stroke="none"/>
            <line class="drop-1" x1="30" y1="55" x2="30" y2="65" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round"/>
            <line class="drop-2" x1="45" y1="55" x2="45" y2="68" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round"/>
            <line class="drop-3" x1="55" y1="55" x2="55" y2="62" stroke="#4FC3F7" stroke-width="3" stroke-linecap="round"/>
            <defs>
                <linearGradient id="cloudGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C0C0C0"/>
                    <stop offset="100%" style="stop-color:#A0A0A0"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;
    
    const snowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-snow">
            <path class="cloud-shape" d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#cloudGrad5)" stroke="none"/>
            <circle class="flake-1" cx="30" cy="58" r="3" fill="white"/>
            <circle class="flake-2" cx="45" cy="62" r="3" fill="white"/>
            <circle class="flake-3" cx="55" cy="56" r="3" fill="white"/>
            <defs>
                <linearGradient id="cloudGrad5" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#E0E0E0"/>
                    <stop offset="100%" style="stop-color:#C0C0C0"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;
    
    const thunderSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-thunder">
            <path class="cloud-shape" d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#cloudGrad6)" stroke="none"/>
            <path class="bolt" d="M45 50 L35 70 L48 70 L40 90 L55 65 L42 65 Z" fill="#FFD600" stroke="none"/>
            <defs>
                <linearGradient id="cloudGrad6" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#808080"/>
                    <stop offset="100%" style="stop-color:#606060"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;
    
    const fogSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-fog">
            <path class="cloud-shape" d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#cloudGrad7)" stroke="none"/>
            <line x1="20" y1="55" x2="60" y2="55" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
            <line x1="25" y1="63" x2="55" y2="63" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.4"/>
            <line x1="30" y1="71" x2="50" y2="71" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.2"/>
            <defs>
                <linearGradient id="cloudGrad7" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#D0D0D0"/>
                    <stop offset="100%" style="stop-color:#B0B0B0"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;
    
    const drizzleSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-drizzle">
            <path class="cloud-shape" d="M20 50 Q10 50 10 40 Q10 30 20 30 Q20 15 35 15 Q45 15 50 23 Q60 23 60 33 Q70 33 70 43 Q70 50 60 50 Z" fill="url(#cloudGrad8)" stroke="none"/>
            <line class="drop-1" x1="30" y1="55" x2="30" y2="62" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
            <line class="drop-2" x1="40" y1="55" x2="40" y2="63" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
            <line class="drop-3" x1="50" y1="55" x2="50" y2="61" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
            <line class="drop-1" x1="35" y1="58" x2="35" y2="63" stroke="#81D4FA" stroke-width="2" stroke-linecap="round"/>
            <defs>
                <linearGradient id="cloudGrad8" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#C0C0C0"/>
                    <stop offset="100%" style="stop-color:#A0A0A0"/>
                </linearGradient>
            </defs>
        </g>
    </svg>`;

    // Sélectionner l'icône selon le code WMO
    if (!isDay && (code === 0 || code === 1)) {
        return moonSVG;
    }
    
    switch (code) {
        case 0: // Ensoleillé
            return sunSVG;
        case 1: // Partiellement nuageux
            return isDay ? cloudSunSVG : cloudMoonSVG;
        case 2: // Nuageux
        case 3: // Couvert
            return cloudSVG;
        case 45: // Brouillard
        case 48: // Brouillard givrant
            return fogSVG;
        case 51: // Bruine légère
        case 53: // Bruine modérée
        case 55: // Bruine forte
            return drizzleSVG;
        case 61: // Pluie légère
        case 63: // Pluie modérée
        case 65: // Pluie forte
        case 80: // Averses légères
        case 81: // Averses modérées
            return rainSVG;
        case 82: // Averses violentes
        case 95: // Orage
        case 96: // Orage grêle
        case 99: // Orage violent
            return thunderSVG;
        case 71: // Neige légère
        case 73: // Neige modérée
        case 75: // Neige forte
        case 77: // Grains de neige
        case 85: // Averses de neige
        case 86: // Averses de neige
            return snowSVG;
        default:
            return isDay ? cloudSVG : moonSVG;
    }
}

// Fonction wrapper pour compatibilité
function createWeatherIcon(code, isDay = true, size = 32) {
    return `<div class="weather-icon">${createWeatherIconSVG(code, isDay, size)}</div>`;
}

function createSmallWeatherIcon(code, isDay = true) {
    return createWeatherIcon(code, isDay, 28);
}