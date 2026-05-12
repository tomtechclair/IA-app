// Fonction pour créer des icônes météo 4D super stylées avec animations spatiales
function createWeatherIconSVG(code, isDay = true, size = 32) {
    const sunSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <defs>
            <radialGradient id="sunGradient4D">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="30%" style="stop-color:#FFF8DC;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF8C00;stop-opacity:1" />
            </radialGradient>
            <filter id="sunGlow4D">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
                <feSpecularLighting result="specOut" in="blur" specularConstant="2" specularExponent="20" lighting-color="white">
                    <fePointLight x="50" y="50" z="200"/>
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
                <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
            </filter>
            <filter id="sunShadow4D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="3" dy="3" result="offsetblur"/>
                <feFlood flood-color="#FF8C00" flood-opacity="0.4"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-sun-4d" filter="url(#sunShadow4D)">
            <!-- Sphère principale 4D avec effet de profondeur -->
            <circle cx="50" cy="50" r="22" fill="url(#sunGradient4D)" filter="url(#sunGlow4D)">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="20s"
                    repeatCount="indefinite"/>
            </circle>
            <!-- Effet de brillance 4D -->
            <ellipse cx="42" cy="42" rx="15" ry="10" fill="rgba(255,255,255,0.6)" transform="rotate(-25 42 42)">
                <animate attributeName="opacity" values="0.6;0.8;0.6" dur="3s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Rayons solaires 4D animés -->
            <g opacity="0.95">
                <ellipse cx="50" cy="18" rx="4" ry="2.5" fill="#FFD700">
                    <animate attributeName="rx" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.9;1;0.9" dur="1.5s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="82" cy="50" rx="2.5" ry="4" fill="#FFD700">
                    <animate attributeName="ry" values="4;6;4" dur="2.5s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="50" cy="82" rx="4" ry="2.5" fill="#FFD700">
                    <animate attributeName="rx" values="4;6;4" dur="1.8s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="18" cy="50" rx="2.5" ry="4" fill="#FFD700">
                    <animate attributeName="ry" values="4;6;4" dur="2.2s" repeatCount="indefinite"/>
                </ellipse>
                <!-- Rayons diagonaux 4D -->
                <ellipse cx="30" cy="30" rx="2" ry="1.5" fill="#FFA500" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="1.7s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="70" cy="30" rx="2" ry="1.5" fill="#FFA500" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.1s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="30" cy="70" rx="2" ry="1.5" fill="#FFA500" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="1.9s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="70" cy="70" rx="2" ry="1.5" fill="#FFA500" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2.3s" repeatCount="indefinite"/>
                </ellipse>
            </g>
            <!-- Particules solaires 4D -->
            <circle cx="35" cy="25" r="1" fill="#FFF8DC" opacity="0.8">
                <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite"/>
            </circle>
            <circle cx="65" cy="25" r="1" fill="#FFF8DC" opacity="0.8">
                <animate attributeName="opacity" values="0;0.8;0" dur="3.5s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite"/>
            </circle>
            <circle cx="35" cy="75" r="1" fill="#FFF8DC" opacity="0.8">
                <animate attributeName="opacity" values="0;0.8;0" dur="4s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"/>
            </circle>
            <circle cx="65" cy="75" r="1" fill="#FFF8DC" opacity="0.8">
                <animate attributeName="opacity" values="0;0.8;0" dur="3.2s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="9s" repeatCount="indefinite"/>
            </circle>
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
            <linearGradient id="cloudGradient4D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="30%" style="stop-color:#F8F8FF;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#E8E8F0;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#D0D0E0;stop-opacity:1" />
            </linearGradient>
            <filter id="cloudGlow4D">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/>
                <feSpecularLighting result="specOut" in="blur" specularConstant="1.5" specularExponent="15" lighting-color="white">
                    <fePointLight x="50" y="40" z="100"/>
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
                <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
            </filter>
            <filter id="cloudShadow4D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="4" result="offsetblur"/>
                <feFlood flood-color="#A0A0B0" flood-opacity="0.3"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <filter id="cloudDepth4D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                <feOffset dx="1" dy="2" result="offsetblur"/>
                <feFlood flood-color="#C0C0D0" flood-opacity="0.2"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-cloud-4d" filter="url(#cloudShadow4D)">
            <!-- Nuage principal 4D avec effet de profondeur -->
            <ellipse cx="40" cy="55" rx="28" ry="20" fill="url(#cloudGradient4D)" filter="url(#cloudGlow4D)">
                <animate attributeName="rx" values="28;30;28" dur="4s" repeatCount="indefinite"/>
                <animate attributeName="ry" values="20;22;20" dur="3.5s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Deuxième couche de nuage 4D -->
            <ellipse cx="65" cy="48" rx="22" ry="16" fill="url(#cloudGradient4D)" filter="url(#cloudDepth4D)">
                <animate attributeName="rx" values="22;24;22" dur="3.8s" repeatCount="indefinite"/>
                <animate attributeName="ry" values="16;18;16" dur="4.2s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Troisième couche arrière 4D -->
            <ellipse cx="25" cy="60" rx="20" ry="14" fill="url(#cloudGradient4D)" opacity="0.7" filter="url(#cloudDepth4D)">
                <animate attributeName="opacity" values="0.7;0.8;0.7" dur="5s" repeatCount="indefinite"/>
                <animate attributeName="rx" values="20;22;20" dur="4.5s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Ombres et profondeur 4D -->
            <ellipse cx="35" cy="68" rx="20" ry="10" fill="#B0B0C0" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.5;0.4" dur="3s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="60" cy="63" rx="18" ry="8" fill="#A0A0B0" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.4;0.3" dur="3.5s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Effet de brillance 4D -->
            <ellipse cx="38" cy="46" rx="15" ry="8" fill="rgba(255,255,255,0.4)" filter="url(#cloudGlow4D)">
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="2.5s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="62" cy="40" rx="10" ry="5" fill="rgba(255,255,255,0.35)" filter="url(#cloudGlow4D)">
                <animate attributeName="opacity" values="0.35;0.5;0.35" dur="3s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="28" cy="52" rx="8" ry="4" fill="rgba(255,255,255,0.3)" filter="url(#cloudGlow4D)">
                <animate attributeName="opacity" values="0.3;0.45;0.3" dur="2.8s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Particules de vapeur 4D -->
            <circle cx="45" cy="55" r="1.5" fill="rgba(255,255,255,0.6)">
                <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; 3,-2; 0,0" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="55" cy="50" r="1" fill="rgba(255,255,255,0.5)">
                <animate attributeName="opacity" values="0;0.5;0" dur="2.5s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; -2,-3; 0,0" dur="2.5s" repeatCount="indefinite"/>
            </circle>
            <circle cx="35" cy="58" r="1.2" fill="rgba(255,255,255,0.55)">
                <animate attributeName="opacity" values="0;0.55;0" dur="3s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; 4,-1; 0,0" dur="3s" repeatCount="indefinite"/>
            </circle>
            <circle cx="70" cy="45" r="0.8" fill="rgba(255,255,255,0.4)">
                <animate attributeName="opacity" values="0;0.4;0" dur="2.2s" repeatCount="indefinite"/>
                <animateTransform attributeName="transform" type="translate" values="0,0; -3,2; 0,0" dur="2.2s" repeatCount="indefinite"/>
            </circle>
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
            <linearGradient id="rainCloudGradient4D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#808090;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#607080;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#405060;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="rainDropGradient4D" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#4FC3F7;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2196F3;stop-opacity:1" />
            </linearGradient>
            <filter id="rainGlow4D">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur"/>
                <feSpecularLighting result="specOut" in="blur" specularConstant="1" specularExponent="10" lighting-color="#87CEEB">
                    <fePointLight x="50" y="30" z="50"/>
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2"/>
                <feComposite in="SourceGraphic" in2="specOut2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
            </filter>
            <filter id="rainShadow4D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="3" result="offsetblur"/>
                <feFlood flood-color="#305070" flood-opacity="0.4"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g class="icon-rain-4d" filter="url(#rainShadow4D)">
            <!-- Nuage d'orage 4D avec effet de profondeur -->
            <ellipse cx="40" cy="42" rx="30" ry="22" fill="url(#rainCloudGradient4D)" filter="url(#rainGlow4D)">
                <animate attributeName="rx" values="30;32;30" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="ry" values="22;24;22" dur="2.8s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="65" cy="38" rx="24" ry="18" fill="url(#rainCloudGradient4D)" opacity="0.9">
                <animate attributeName="rx" values="24;26;24" dur="3.5s" repeatCount="indefinite"/>
                <animate attributeName="ry" values="18;20;18" dur="3.2s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Ombres profondes 4D -->
            <ellipse cx="35" cy="58" rx="22" ry="12" fill="#405060" opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.6;0.5" dur="2.5s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="60" cy="53" rx="18" ry="10" fill="#304050" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.5;0.4" dur="3s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Gouttes de pluie 4D animées -->
            <g opacity="0.95">
                <ellipse cx="30" cy="75" rx="2.5" ry="6" fill="url(#rainDropGradient4D)" filter="url(#rainGlow4D)" transform="rotate(20 30 75)">
                    <animate attributeName="cy" values="75;85;75" dur="1s" repeatCount="indefinite"/>
                    <animate attributeName="ry" values="6;8;6" dur="1s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="45" cy="78" rx="2" ry="7" fill="url(#rainDropGradient4D)" filter="url(#rainGlow4D)" transform="rotate(-15 45 78)">
                    <animate attributeName="cy" values="78;88;78" dur="1.2s" repeatCount="indefinite"/>
                    <animate attributeName="ry" values="7;9;7" dur="1.2s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="60" cy="76" rx="2.2" ry="6.5" fill="url(#rainDropGradient4D)" filter="url(#rainGlow4D)" transform="rotate(10 60 76)">
                    <animate attributeName="cy" values="76;86;76" dur="1.1s" repeatCount="indefinite"/>
                    <animate attributeName="ry" values="6.5;8.5;6.5" dur="1.1s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="75" cy="82" rx="2" ry="8" fill="url(#rainDropGradient4D)" filter="url(#rainGlow4D)" transform="rotate(-25 75 82)">
                    <animate attributeName="cy" values="82;92;82" dur="1.3s" repeatCount="indefinite"/>
                    <animate attributeName="ry" values="8;10;8" dur="1.3s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="35" cy="85" rx="1.8" ry="7" fill="url(#rainDropGradient4D)" filter="url(#rainGlow4D)" transform="rotate(15 35 85)">
                    <animate attributeName="cy" values="85;95;85" dur="1.4s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="55" cy="83" rx="1.5" ry="6" fill="url(#rainDropGradient4D)" filter="url(#rainGlow4D)" transform="rotate(-20 55 83)">
                    <animate attributeName="cy" values="83;93;83" dur="1.5s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="70" cy="87" rx="1.2" ry="5" fill="url(#rainDropGradient4D)" filter="url(#rainGlow4D)" transform="rotate(25 70 87)">
                    <animate attributeName="cy" values="87;97;87" dur="1.6s" repeatCount="indefinite"/>
                </ellipse>
            </g>
            <!-- Éclaboussures 4D -->
            <ellipse cx="32" cy="90" rx="3" ry="1.5" fill="rgba(135,206,235,0.4)" filter="url(#rainGlow4D)">
                <animate attributeName="rx" values="3;5;3" dur="0.8s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0.6;0.4" dur="0.8s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="50" cy="92" rx="2.5" ry="1.2" fill="rgba(79,195,247,0.35)" filter="url(#rainGlow4D)">
                <animate attributeName="rx" values="2.5;4;2.5" dur="1s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.35;0.55;0.35" dur="1s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="68" cy="88" rx="2" ry="1" fill="rgba(33,150,243,0.3)" filter="url(#rainGlow4D)">
                <animate attributeName="rx" values="2;3.5;2" dur="0.9s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0.5;0.3" dur="0.9s" repeatCount="indefinite"/>
            </ellipse>
            <!-- Brillance du nuage 4D -->
            <ellipse cx="38" cy="40" rx="12" ry="6" fill="rgba(255,255,255,0.15)" filter="url(#rainGlow4D)">
                <animate attributeName="opacity" values="0.15;0.25;0.15" dur="2s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="62" cy="35" rx="8" ry="4" fill="rgba(255,255,255,0.12)" filter="url(#rainGlow4D)">
                <animate attributeName="opacity" values="0.12;0.22;0.12" dur="2.3s" repeatCount="indefinite"/>
            </ellipse>
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
    
    const drizzleSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <g class="icon-drizzle">
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
            <line class="drop-1" x1="35" y1="58" x2="35" y2="63" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
            <defs>
                <linearGradient id="cloudGrad4" x1="0%" y1="0%" x2="0%" y2="100%">
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