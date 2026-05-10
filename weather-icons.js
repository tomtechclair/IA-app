// Fonction pour créer des icônes météo propres et stylées
function createWeatherIconSVG(code, isDay = true, size = 32) {
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-sun">
            <circle cx="50" cy="50" r="18" fill="#FFD700" opacity="0.9"/>
            <g opacity="0.8">
                <circle cx="50" cy="25" r="3" fill="#FFD700"/>
                <circle cx="75" cy="50" r="3" fill="#FFD700"/>
                <circle cx="50" cy="75" r="3" fill="#FFD700"/>
                <circle cx="25" cy="50" r="3" fill="#FFD700"/>
                <circle cx="35" cy="35" r="2" fill="#FFD700"/>
                <circle cx="65" cy="35" r="2" fill="#FFD700"/>
                <circle cx="35" cy="65" r="2" fill="#FFD700"/>
                <circle cx="65" cy="65" r="2" fill="#FFD700"/>
            </g>
        </g>
    </svg>`;
    
    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-moon">
            <path d="M55 25 A 20 20 0 1 1 55 75 A 15 15 0 1 0 55 25" fill="#E0E0E0" opacity="0.9"/>
            <circle cx="45" cy="45" r="3" fill="#C0C0C0" opacity="0.3"/>
            <circle cx="60" cy="55" r="2" fill="#C0C0C0" opacity="0.3"/>
        </g>
    </svg>`;
    
    const cloudSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-cloud">
            <path d="M30 65 Q20 65 20 55 Q20 45 30 45 Q30 35 45 35 Q55 35 60 42 Q70 42 70 52 Q70 62 60 65 Q50 65 40 65 Q35 65 30 65 Z" 
                  fill="#F5F5F5" opacity="0.9"/>
            <path d="M25 60 Q18 60 18 52 Q18 45 25 45 Q25 38 35 38 Q42 38 46 43 Q52 43 56 50 Q56 57 48 60 Q40 60 32 60 Q28 60 25 60 Z" 
                  fill="#E8E8E8" opacity="0.7"/>
        </g>
    </svg>`;
    
    const cloudSunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-cloud-sun">
            <circle cx="70" cy="30" r="12" fill="#FFD700" opacity="0.9"/>
            <g opacity="0.7">
                <circle cx="70" cy="15" r="2" fill="#FFD700"/>
                <circle cx="85" cy="30" r="2" fill="#FFD700"/>
                <circle cx="70" cy="45" r="2" fill="#FFD700"/>
                <circle cx="55" cy="30" r="2" fill="#FFD700"/>
            </g>
            <path d="M25 65 Q15 65 15 55 Q15 45 25 45 Q25 35 40 35 Q50 35 55 43 Q65 43 65 53 Q65 63 55 65 Q45 65 35 65 Q30 65 25 65 Z" 
                  fill="#F5F5F5" opacity="0.9"/>
            <path d="M20 60 Q13 60 13 52 Q13 45 20 45 Q20 38 30 38 Q37 38 41 43 Q47 43 51 50 Q51 57 43 60 Q35 60 27 60 Q23 60 20 60 Z" 
                  fill="#E8E8E8" opacity="0.7"/>
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
            <path d="M30 65 Q20 65 20 55 Q20 45 30 45 Q30 35 45 35 Q55 35 60 42 Q70 42 70 52 Q70 62 60 65 Q50 65 40 65 Q35 65 30 65 Z" 
                  fill="#F5F5F5" opacity="0.9"/>
            <g opacity="0.8">
                <line x1="35" y1="70" x2="33" y2="80" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
                <line x1="45" y1="70" x2="43" y2="80" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
                <line x1="55" y1="70" x2="53" y2="80" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
                <line x1="65" y1="70" x2="63" y2="80" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            </g>
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
    
    switch(code) {
        case 0: return isDay ? sunSVG : moonSVG;
        case 1: return cloudSunSVG;
        case 2: return cloudSVG;
        case 3: return cloudSVG;
        case 45: return fogSVG;
        case 48: return fogSVG;
        case 51: return rainSVG;
        case 53: return rainSVG;
        case 55: return rainSVG;
        case 56: return rainSVG;
        case 57: return rainSVG;
        case 61: return snowSVG;
        case 63: return snowSVG;
        case 65: return snowSVG;
        case 66: return snowSVG;
        case 67: return snowSVG;
        case 71: return snowSVG;
        case 73: return snowSVG;
        case 75: return snowSVG;
        case 77: return snowSVG;
        case 80: return rainSVG;
        case 81: return rainSVG;
        case 82: return rainSVG;
        case 85: return snowSVG;
        case 86: return snowSVG;
        case 95: return thunderSVG;
        case 96: return thunderSVG;
        case 99: return thunderSVG;
        default: return sunSVG;
    }
}

// Fonction wrapper pour compatibilité
function createWeatherIcon(code, isDay = true, size = 32) {
    return `<div class="weather-icon">${createWeatherIconSVG(code, isDay, size)}</div>`;
}

function createSmallWeatherIcon(code, isDay = true) {
    return createWeatherIcon(code, isDay, 28);
}