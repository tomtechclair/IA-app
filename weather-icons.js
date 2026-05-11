// Fonction pour créer des icônes météo 3D ultra-réalistes
function createWeatherIconSVG(code, isDay = true, size = 32) {
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <radialGradient id="sunGradient3D">
                <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
            </radialGradient>
            <filter id="sunShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.3"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-sun-3d" filter="url(#sunShadow3D)">
            <!-- Sphère principale -->
            <circle cx="50" cy="50" r="20" fill="url(#sunGradient3D)"/>
            <!-- Effet de brillance -->
            <ellipse cx="45" cy="45" rx="12" ry="8" fill="rgba(255,255,255,0.4)" transform="rotate(-30 45 45)"/>
            <!-- Rayons solaires 3D -->
            <g opacity="0.9">
                <ellipse cx="50" cy="20" rx="3" ry="2" fill="#FFA500"/>
                <ellipse cx="75" cy="50" rx="2" ry="3" fill="#FFA500"/>
                <ellipse cx="50" cy="80" rx="3" ry="2" fill="#FFA500"/>
                <ellipse cx="25" cy="50" rx="2" ry="3" fill="#FFA500"/>
                <ellipse cx="35" cy="35" rx="2" ry="1.5" fill="#FFD700" opacity="0.7"/>
                <ellipse cx="65" cy="35" rx="2" ry="1.5" fill="#FFD700" opacity="0.7"/>
                <ellipse cx="35" cy="65" rx="2" ry="1.5" fill="#FFD700" opacity="0.7"/>
                <ellipse cx="65" cy="65" rx="2" ry="1.5" fill="#FFD700" opacity="0.7"/>
            </g>
        </g>
    </svg>`;
    
    const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <radialGradient id="moonGradient3D">
                <stop offset="0%" style="stop-color:#F0F0F0;stop-opacity:1" />
                <stop offset="80%" style="stop-color:#E0E0E0;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
            </radialGradient>
            <filter id="moonShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="1" dy="1" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.4"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-moon-3d" filter="url(#moonShadow3D)">
            <!-- Sphère lunaire -->
            <path d="M55 25 A 20 20 0 1 1 55 75 A 15 15 0 1 0 55 25" fill="url(#moonGradient3D)"/>
            <!-- Cratères 3D -->
            <ellipse cx="45" cy="45" rx="4" ry="3" fill="#A0A0A0" opacity="0.3"/>
            <ellipse cx="60" cy="55" rx="3" ry="2" fill="#A0A0A0" opacity="0.2"/>
            <ellipse cx="50" cy="35" rx="2" ry="1.5" fill="#A0A0A0" opacity="0.25"/>
            <!-- Effet de brillance lunaire -->
            <ellipse cx="48" cy="40" rx="8" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-20 48 40)"/>
        </g>
    </svg>`;
    
    const cloudSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="cloudGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#F8F8F8;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E8E8E8;stop-opacity:1" />
            </linearGradient>
            <filter id="cloudShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="3" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.2"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-cloud-3d" filter="url(#cloudShadow3D)">
            <!-- Nuage principal 3D -->
            <ellipse cx="40" cy="55" rx="25" ry="18" fill="url(#cloudGradient3D)"/>
            <ellipse cx="65" cy="50" rx="20" ry="15" fill="url(#cloudGradient3D)"/>
            <!-- Ombres et profondeur -->
            <ellipse cx="35" cy="65" rx="18" ry="8" fill="#D0D0D0" opacity="0.3"/>
            <ellipse cx="60" cy="60" rx="15" ry="6" fill="#D0D0D0" opacity="0.2"/>
            <!-- Effet de brillance -->
            <ellipse cx="38" cy="48" rx="12" ry="6" fill="rgba(255,255,255,0.3)"/>
            <ellipse cx="62" cy="43" rx="8" ry="4" fill="rgba(255,255,255,0.25)"/>
        </g>
    </svg>`;
    
    const cloudSunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <radialGradient id="sunGradientCloud3D">
                <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
            </radialGradient>
            <linearGradient id="cloudGradientSun3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />
            </linearGradient>
            <filter id="cloudSunShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.25"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-cloud-sun-3d" filter="url(#cloudSunShadow3D)">
            <!-- Soleil derrière les nuages -->
            <circle cx="70" cy="30" r="15" fill="url(#sunGradientCloud3D)" opacity="0.95"/>
            <ellipse cx="68" cy="28" rx="8" ry="5" fill="rgba(255,255,255,0.4)" transform="rotate(-25 68 28)"/>
            <!-- Nuages 3D -->
            <ellipse cx="35" cy="60" rx="22" ry="16" fill="url(#cloudGradientSun3D)"/>
            <ellipse cx="55" cy="55" rx="18" ry="12" fill="url(#cloudGradientSun3D)"/>
            <!-- Ombres -->
            <ellipse cx="30" cy="68" rx="15" ry="6" fill="#C0C0C0" opacity="0.3"/>
            <ellipse cx="50" cy="63" rx="12" ry="5" fill="#C0C0C0" opacity="0.2"/>
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
        <defs>
            <linearGradient id="rainCloudGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#A0A0A0;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#708080;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="rainDropGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4FC3F7;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2196F3;stop-opacity:1" />
            </linearGradient>
            <filter id="rainShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="1" dy="2" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.3"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-rain-3d" filter="url(#rainShadow3D)">
            <!-- Nuage d'orage 3D -->
            <ellipse cx="40" cy="45" rx="28" ry="20" fill="url(#rainCloudGradient3D)"/>
            <ellipse cx="65" cy="40" rx="22" ry="16" fill="url(#rainCloudGradient3D)"/>
            <!-- Ombres profondes -->
            <ellipse cx="35" cy="55" rx="20" ry="10" fill="#606060" opacity="0.4"/>
            <ellipse cx="60" cy="50" rx="16" ry="8" fill="#606060" opacity="0.3"/>
            <!-- Gouttes de pluie 3D -->
            <g opacity="0.9">
                <ellipse cx="35" cy="70" rx="2" ry="4" fill="url(#rainDropGradient3D)" transform="rotate(15 35 70)"/>
                <ellipse cx="45" cy="75" rx="1.5" ry="6" fill="url(#rainDropGradient3D)" transform="rotate(-10 45 75)"/>
                <ellipse cx="55" cy="72" rx="1.8" ry="5" fill="url(#rainDropGradient3D)" transform="rotate(5 55 72)"/>
                <ellipse cx="65" cy="78" rx="1.5" ry="7" fill="url(#rainDropGradient3D)" transform="rotate(-20 65 78)"/>
                <ellipse cx="40" cy="80" rx="1.2" ry="5" fill="url(#rainDropGradient3D)" transform="rotate(25 40 80)"/>
                <ellipse cx="60" cy="85" rx="1" ry="6" fill="url(#rainDropGradient3D)" transform="rotate(-15 60 85)"/>
            </g>
            <!-- Éclaboussures -->
            <ellipse cx="38" cy="48" rx="15" ry="8" fill="rgba(255,255,255,0.2)"/>
            <ellipse cx="62" cy="43" rx="10" ry="5" fill="rgba(255,255,255,0.15)"/>
        </g>
    </svg>`;
    
    const drizzleSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="drizzleCloudGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#D8D8D8;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#B8B8B8;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="drizzleDropGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#4A90E2;stop-opacity:1" />
            </linearGradient>
            <filter id="drizzleShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                <feOffset dx="1" dy="1.5" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.2"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-drizzle" filter="url(#drizzleShadow3D)">
            <!-- Nuage léger 3D -->
            <ellipse cx="40" cy="45" rx="24" ry="17" fill="url(#drizzleCloudGradient3D)"/>
            <ellipse cx="62" cy="42" rx="18" ry="13" fill="url(#drizzleCloudGradient3D)"/>
            <!-- Ombres douces -->
            <ellipse cx="35" cy="53" rx="16" ry="7" fill="#A0A0A0" opacity="0.25"/>
            <ellipse cx="58" cy="50" rx="12" ry="5" fill="#A0A0A0" opacity="0.2"/>
            <!-- Petites gouttes de bruine -->
            <g opacity="0.85">
                <ellipse cx="32" cy="68" rx="1.2" ry="3" fill="url(#drizzleDropGradient3D)" transform="rotate(10 32 68)"/>
                <ellipse cx="43" cy="72" rx="1" ry="2.8" fill="url(#drizzleDropGradient3D)" transform="rotate(-8 43 72)"/>
                <ellipse cx="54" cy="70" rx="1.1" ry="3.2" fill="url(#drizzleDropGradient3D)" transform="rotate(5 54 70)"/>
                <ellipse cx="65" cy="75" rx="1" ry="2.8" fill="url(#drizzleDropGradient3D)" transform="rotate(-12 65 75)"/>
            </g>
            <!-- Effet de brillance léger -->
            <ellipse cx="40" cy="48" rx="10" ry="5" fill="rgba(255,255,255,0.2)"/>
            <ellipse cx="60" cy="43" rx="7" ry="3.5" fill="rgba(255,255,255,0.15)"/>
        </g>
    </svg>`;
    
    const snowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="snowCloudGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#F0F8FF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />
            </linearGradient>
            <radialGradient id="snowFlakeGradient3D">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E6F3FF;stop-opacity:0.8" />
            </radialGradient>
            <filter id="snowShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                <feOffset dx="1" dy="1" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.2"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-snow-3d" filter="url(#snowShadow3D)">
            <!-- Nuages de neige 3D -->
            <ellipse cx="40" cy="45" rx="26" ry="18" fill="url(#snowCloudGradient3D)"/>
            <ellipse cx="60" cy="40" rx="20" ry="14" fill="url(#snowCloudGradient3D)"/>
            <!-- Ombres douces -->
            <ellipse cx="35" cy="52" rx="18" ry="8" fill="#D0D0D0" opacity="0.3"/>
            <ellipse cx="55" cy="47" rx="14" ry="6" fill="#D0D0D0" opacity="0.25"/>
            <!-- Flocons de neige 3D -->
            <g opacity="0.95">
                <g transform="translate(30,65)">
                    <ellipse cx="0" cy="0" rx="4" ry="3" fill="url(#snowFlakeGradient3D)"/>
                    <ellipse cx="-2" cy="1" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.8"/>
                    <ellipse cx="2" cy="-1" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.6"/>
                </g>
                <g transform="translate(45,70) rotate(15)">
                    <ellipse cx="0" cy="0" rx="3" ry="2.5" fill="url(#snowFlakeGradient3D)"/>
                    <ellipse cx="-1" cy="0.5" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.7"/>
                </g>
                <g transform="translate(55,68) rotate(-20)">
                    <ellipse cx="0" cy="0" rx="3.5" ry="2.8" fill="url(#snowFlakeGradient3D)"/>
                    <ellipse cx="1" cy="-0.5" rx="1.8" ry="1.2" fill="#FFFFFF" opacity="0.8"/>
                </g>
                <g transform="translate(65,75) rotate(30)">
                    <ellipse cx="0" cy="0" rx="2.8" ry="2.2" fill="url(#snowFlakeGradient3D)"/>
                    <ellipse cx="-0.5" cy="0.8" rx="1.2" ry="0.8" fill="#FFFFFF" opacity="0.6"/>
                </g>
                <g transform="translate(38,78) rotate(-10)">
                    <ellipse cx="0" cy="0" rx="2.2" ry="1.8" fill="url(#snowFlakeGradient3D)"/>
                    <ellipse cx="0.5" cy="-0.3" rx="1" ry="0.6" fill="#FFFFFF" opacity="0.7"/>
                </g>
            </g>
            <!-- Effet de brillance neigeuse -->
            <ellipse cx="42" cy="48" rx="12" ry="6" fill="rgba(255,255,255,0.3)"/>
            <ellipse cx="58" cy="43" rx="8" ry="4" fill="rgba(255,255,255,0.2)"/>
        </g>
    </svg>`;
    
    const thunderSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="thunderCloudGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4B0082;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1C1C1C;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="thunderBoltGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFA500;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF6347;stop-opacity:1" />
            </linearGradient>
            <filter id="thunderShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.5"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <filter id="thunderGlow3D">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-thunder-3d" filter="url(#thunderShadow3D)">
            <!-- Nuages d'orage 3D -->
            <ellipse cx="40" cy="45" rx="30" ry="22" fill="url(#thunderCloudGradient3D)"/>
            <ellipse cx="65" cy="38" rx="25" ry="18" fill="url(#thunderCloudGradient3D)"/>
            <!-- Ombres dramatiques -->
            <ellipse cx="35" cy="55" rx="22" ry="12" fill="#0F0F0F" opacity="0.6"/>
            <ellipse cx="60" cy="48" rx="18" ry="10" fill="#0F0F0F" opacity="0.5"/>
            <!-- Éclair principal 3D -->
            <g filter="url(#thunderGlow3D)">
                <path d="M45 35 L40 55 L50 55 L45 70 L60 50 L48 50 Z" fill="url(#thunderBoltGradient3D)"/>
                <path d="M45 35 L40 55 L50 55 L45 70 L60 50 L48 50 Z" fill="rgba(255,255,255,0.3)" transform="translate(1,1)"/>
            </g>
            <!-- Éclair secondaire -->
            <path d="M65 40 L62 48 L67 48 L64 58 L70 52 L66 52 Z" fill="url(#thunderBoltGradient3D)" opacity="0.7"/>
            <!-- Éclaboussures lumineuses -->
            <ellipse cx="42" cy="48" rx="8" ry="4" fill="rgba(255,215,0,0.4)"/>
            <ellipse cx="58" cy="42" rx="6" ry="3" fill="rgba(255,215,0,0.3)"/>
        </g>
    </svg>`;
    
    const fogSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <linearGradient id="fogGradient3D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#E0E0E0;stop-opacity:0.8" />
                <stop offset="50%" style="stop-color:#D0D0D0;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:0.4" />
            </linearGradient>
            <filter id="fogShadow3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="1" dy="1" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.2"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-fog-3d" filter="url(#fogShadow3D)">
            <!-- Couches de brouillard 3D -->
            <ellipse cx="50" cy="40" rx="35" ry="8" fill="url(#fogGradient3D)" opacity="0.7"/>
            <ellipse cx="45" cy="50" rx="30" ry="10" fill="url(#fogGradient3D)" opacity="0.6"/>
            <ellipse cx="55" cy="60" rx="32" ry="8" fill="url(#fogGradient3D)" opacity="0.5"/>
            <ellipse cx="48" cy="70" rx="28" ry="6" fill="url(#fogGradient3D)" opacity="0.4"/>
            <!-- Effet de profondeur -->
            <ellipse cx="40" cy="45" rx="25" ry="6" fill="#B0B0B0" opacity="0.3"/>
            <ellipse cx="60" cy="55" rx="20" ry="5" fill="#A0A0A0" opacity="0.25"/>
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
        case 51: return drizzleSVG;
        case 53: return drizzleSVG;
        case 55: return drizzleSVG;
        case 56: return drizzleSVG;
        case 57: return drizzleSVG;
        case 61: return rainSVG;
        case 63: return rainSVG;
        case 65: return rainSVG;
        case 66: return rainSVG;
        case 67: return rainSVG;
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

// Fonction pour obtenir la description des conditions météo
function getWeatherIconDescription(code) {
    const descriptions = {
        0: 'Ciel dégagé',
        1: 'Partiellement nuageux',
        2: 'Nuageux',
        3: 'Très nuageux',
        45: 'Brouillard',
        48: 'Brouillard givrant',
        51: 'Bruine légère',
        53: 'Bruine modérée',
        55: 'Bruine dense',
        56: 'Bruine légère verglaçante',
        57: 'Bruine dense verglaçante',
        61: 'Pluie légère',
        63: 'Pluie modérée',
        65: 'Pluie dense',
        66: 'Pluie légère verglaçante',
        67: 'Pluie dense verglaçante',
        71: 'Neige légère',
        73: 'Neige modérée',
        75: 'Neige dense',
        77: 'Grains de neige',
        80: 'Averses de pluie légères',
        81: 'Averses de pluie modérées',
        82: 'Averses de pluie violentes',
        85: 'Averses de neige légères',
        86: 'Averses de neige denses',
        95: 'Orage léger',
        96: 'Orage avec grêle légère',
        99: 'Orage avec grêle dense'
    };
    
    return descriptions[code] || 'Condition inconnue';
}
