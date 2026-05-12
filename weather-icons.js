// Icônes météo modernes style Apple Weather
// Design épuré avec dégradés doux et animations subtiles

function createWeatherIconSVG(code, isDay = true, size = 32) {
    // ======================== DÉFINITIONS SVG PARTAGÉES ========================
    const defs = `
        <defs>
            <!-- Dégradé Soleil -->
            <radialGradient id="sg${size}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFF5CC" />
                <stop offset="60%" stop-color="#FFD60A" />
                <stop offset="100%" stop-color="#FF9500" />
            </radialGradient>
            <!-- Dégradé Lune -->
            <radialGradient id="mg${size}" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="80%" stop-color="#E8E8F0" />
                <stop offset="100%" stop-color="#C8C8D0" />
            </radialGradient>
            <!-- Dégradé Nuage -->
            <linearGradient id="cg${size}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="100%" stop-color="#D8D8E0" />
            </linearGradient>
            <!-- Dégradé Nuage pluie -->
            <linearGradient id="crg${size}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#A0A8B8" />
                <stop offset="100%" stop-color="#687080" />
            </linearGradient>
            <!-- Dégradé Goutte -->
            <linearGradient id="dg${size}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#87CEEB" />
                <stop offset="100%" stop-color="#4A90D9" />
            </linearGradient>
            <!-- Dégradé Nuage orage -->
            <linearGradient id="ctg${size}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#505868" />
                <stop offset="100%" stop-color="#282E38" />
            </linearGradient>
            <!-- Dégradé Brouillard -->
            <linearGradient id="fg${size}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#E8E8F0" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#B8B8C8" stop-opacity="0.5" />
            </linearGradient>
            <!-- Filtre lueur douce -->
            <filter id="glow${size}">
                <feGaussianBlur stdDeviation="2" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>`;

    // ======================== ICÔNES ========================

    // ☀️ Soleil
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <circle cx="50" cy="50" r="18" fill="url(#sg${size})"/>
            <g stroke="#FFD60A" stroke-width="3.5" stroke-linecap="round">
                <line x1="50" y1="16" x2="50" y2="24"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
                <line x1="84" y1="50" x2="76" y2="50"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
                <line x1="50" y1="84" x2="50" y2="76"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
                <line x1="16" y1="50" x2="24" y2="50"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
                <line x1="74" y1="26" x2="68.5" y2="31.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
                <line x1="26" y1="74" x2="31.5" y2="68.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
                <line x1="74" y1="74" x2="68.5" y2="68.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
                <line x1="26" y1="26" x2="31.5" y2="31.5"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/></line>
            </g>
            <circle cx="44" cy="44" r="5" fill="rgba(255,255,255,0.5)"/>
        </g>
    </svg>`;

    // 🌙 Lune
    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <path d="M58 22 A 22 22 0 1 1 50 78 A 18 18 0 1 0 58 22" fill="url(#mg${size})"/>
            <circle cx="46" cy="42" r="3" fill="rgba(160,160,180,0.3)"/>
            <circle cx="56" cy="52" r="2.5" fill="rgba(160,160,180,0.25)"/>
            <circle cx="48" cy="62" r="2" fill="rgba(160,160,180,0.2)"/>
        </g>
    </svg>`;

    // ☁️ Nuage
    const cloudSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <ellipse cx="46" cy="62" rx="32" ry="20" fill="url(#cg${size})"/>
            <ellipse cx="32" cy="60" rx="20" ry="14" fill="url(#cg${size})"/>
            <ellipse cx="65" cy="55" rx="22" ry="16" fill="url(#cg${size})"/>
            <ellipse cx="50" cy="50" rx="18" ry="13" fill="url(#cg${size})"/>
        </g>
    </svg>`;

    // ⛅ Soleil + Nuage
    const cloudSunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <circle cx="68" cy="32" r="16" fill="url(#sg${size})"/>
            <g stroke="#FFD60A" stroke-width="2.5" stroke-linecap="round" opacity="0.7">
                <line x1="68" y1="10" x2="68" y2="16"/>
                <line x1="90" y1="32" x2="84" y2="32"/>
                <line x1="68" y1="54" x2="68" y2="48"/>
                <line x1="46" y1="32" x2="52" y2="32"/>
                <line x1="82" y1="18" x2="77.5" y2="22.5"/>
                <line x1="54" y1="46" x2="58.5" y2="41.5"/>
            </g>
            <ellipse cx="40" cy="65" rx="30" ry="18" fill="url(#cg${size})"/>
            <ellipse cx="28" cy="63" rx="18" ry="12" fill="url(#cg${size})"/>
            <ellipse cx="58" cy="58" rx="20" ry="14" fill="url(#cg${size})"/>
            <ellipse cx="44" cy="54" rx="16" ry="11" fill="url(#cg${size})"/>
        </g>
    </svg>`;

    // ☁️🌙 Nuage + Lune (nuit partiellement nuageuse)
    const cloudMoonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <path d="M68 24 A 16 16 0 1 1 62 52 A 12 12 0 1 0 68 24" fill="url(#mg${size})"/>
            <ellipse cx="40" cy="65" rx="30" ry="18" fill="url(#cg${size})"/>
            <ellipse cx="28" cy="63" rx="18" ry="12" fill="url(#cg${size})"/>
            <ellipse cx="58" cy="58" rx="20" ry="14" fill="url(#cg${size})"/>
            <ellipse cx="44" cy="54" rx="16" ry="11" fill="url(#cg${size})"/>
        </g>
    </svg>`;

    // 🌤️ Soleil + Nuage (jour partiellement nuageux)
    const cloudSunFewSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <circle cx="50" cy="50" r="20" fill="url(#sg${size})"/>
            <g stroke="#FFD60A" stroke-width="2.5" stroke-linecap="round" opacity="0.6">
                <line x1="50" y1="24" x2="50" y2="28"/>
                <line x1="76" y1="50" x2="72" y2="50"/>
                <line x1="50" y1="76" x2="50" y2="72"/>
                <line x1="24" y1="50" x2="28" y2="50"/>
            </g>
            <ellipse cx="44" cy="68" rx="28" ry="16" fill="url(#cg${size})" opacity="0.5"/>
        </g>
    </svg>`;

    // 🌧️ Pluie
    const rainSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <ellipse cx="48" cy="42" rx="30" ry="18" fill="url(#crg${size})"/>
            <ellipse cx="32" cy="40" rx="18" ry="12" fill="url(#crg${size})"/>
            <ellipse cx="66" cy="36" rx="20" ry="14" fill="url(#crg${size})"/>
            <!-- Gouttes -->
            <g fill="url(#dg${size})">
                <path d="M30 65 Q32 72 30 78 Q28 72 30 65">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,8; 0,0" dur="1.2s" repeatCount="indefinite"/>
                </path>
                <path d="M50 68 Q52 75 50 81 Q48 75 50 68">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,8; 0,0" dur="1.4s" repeatCount="indefinite"/>
                </path>
                <path d="M68 65 Q70 72 68 78 Q66 72 68 65">
                    <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,8; 0,0" dur="1s" repeatCount="indefinite"/>
                </path>
                <path d="M40 70 Q42 77 40 83 Q38 77 40 70">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.6s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,7; 0,0" dur="1.6s" repeatCount="indefinite"/>
                </path>
                <path d="M58 72 Q60 79 58 85 Q56 79 58 72">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,7; 0,0" dur="1.3s" repeatCount="indefinite"/>
                </path>
            </g>
        </g>
    </svg>`;

    // ❄️ Neige
    const snowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <ellipse cx="48" cy="40" rx="28" ry="16" fill="url(#cg${size})"/>
            <ellipse cx="32" cy="38" rx="16" ry="10" fill="url(#cg${size})"/>
            <ellipse cx="65" cy="35" rx="18" ry="12" fill="url(#cg${size})"/>
            <!-- Flocons -->
            <g fill="#FFFFFF">
                <circle cx="30" cy="66" r="3.5">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 3,10; 0,0" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50" cy="70" r="3">
                    <animate attributeName="opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; -3,12; 0,0" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="68" cy="64" r="2.5">
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 2,10; 0,0" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="40" cy="74" r="2">
                    <animate attributeName="opacity" values="1;0.4;1" dur="3s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 4,8; 0,0" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="60" cy="76" r="2.5">
                    <animate attributeName="opacity" values="1;0.4;1" dur="2.2s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; -2,9; 0,0" dur="2.2s" repeatCount="indefinite"/>
                </circle>
            </g>
        </g>
    </svg>`;

    // ⛈️ Orage
    const thunderSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g filter="url(#glow${size})">
            <ellipse cx="48" cy="38" rx="32" ry="18" fill="url(#ctg${size})"/>
            <ellipse cx="30" cy="36" rx="18" ry="12" fill="url(#ctg${size})"/>
            <ellipse cx="68" cy="33" rx="20" ry="14" fill="url(#ctg${size})"/>
            <!-- Éclair -->
            <g filter="url(#glow${size})">
                <path d="M55 42 L48 58 L55 58 L48 74 L65 56 L56 56 Z" fill="#FFD60A">
                    <animate attributeName="opacity" values="1;0.3;1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
                </path>
            </g>
        </g>
    </svg>`;

    // 🌫️ Brouillard
    const fogSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        ${defs}
        <g>
            <ellipse cx="50" cy="40" rx="36" ry="7" fill="url(#fg${size})">
                <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; -3,0; 0,0" dur="6s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="45" cy="52" rx="32" ry="8" fill="url(#fg${size})">
                <animate attributeName="opacity" values="0.6;0.8;0.6" dur="4s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; 4,0; 0,0" dur="7s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="55" cy="63" rx="34" ry="7" fill="url(#fg${size})">
                <animate attributeName="opacity" values="0.5;0.7;0.5" dur="3.5s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; -3,0; 0,0" dur="5s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="48" cy="72" rx="28" ry="5" fill="url(#fg${size})">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="4.5s" repeatCount="indefinite"/>
            </ellipse>
        </g>
    </svg>`;

    // ======================== MAPPING ========================
    // Codes WMO (Open-Meteo) → icône

    switch(code) {
        // ☀️ Ensoleillé / Ciel clair
        case 0: return isDay ? sunSVG : moonSVG;
        // ⛅ Partiellement nuageux
        case 1: return isDay ? cloudSunSVG : cloudMoonSVG;
        // ☁️ Nuageux à très nuageux
        case 2: return cloudSVG;
        case 3: return cloudSVG;
        // 🌫️ Brouillard / brume
        case 45: return fogSVG;
        case 48: return fogSVG;
        // 🌧️ Bruine
        case 51: return rainSVG;
        case 53: return rainSVG;
        case 55: return rainSVG;
        case 56: return rainSVG;
        case 57: return rainSVG;
        // 🌧️ Pluie (FIX: c'était snowSVG - bug corrigé!)
        case 61: return rainSVG;
        case 63: return rainSVG;
        case 65: return rainSVG;
        case 66: return rainSVG;
        case 67: return rainSVG;
        // ❄️ Neige
        case 71: return snowSVG;
        case 73: return snowSVG;
        case 75: return snowSVG;
        case 77: return snowSVG;
        // 🌧️ Averses
        case 80: return rainSVG;
        case 81: return rainSVG;
        case 82: return rainSVG;
        // ❄️ Averses de neige
        case 85: return snowSVG;
        case 86: return snowSVG;
        // ⛈️ Orage
        case 95: return thunderSVG;
        case 96: return thunderSVG;
        case 99: return thunderSVG;
        default: return isDay ? sunSVG : moonSVG;
    }
}

// Fonction wrapper pour compatibilité
function createWeatherIcon(code, isDay = true, size = 32) {
    return `<div class="weather-icon">${createWeatherIconSVG(code, isDay, size)}</div>`;
}

function createSmallWeatherIcon(code, isDay = true) {
    return createWeatherIcon(code, isDay, 28);
}
