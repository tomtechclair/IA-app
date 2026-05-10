/**
 * Ultra Realistic 3D Weather Icons
 * Professional quality SVG icons with realistic shading, gradients, and depth
 */

const RealisticIcons = {
    
    // ☀️ SUN - Ultra realistic with volumetric rays
    sun: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 4px 8px rgba(255,193,7,0.4))">
        <defs>
            <radialGradient id="sunBody${size}" cx="40%" cy="35%" r="65%">
                <stop offset="0%" style="stop-color:#FFFDE7"/>
                <stop offset="20%" style="stop-color:#FFEB3B"/>
                <stop offset="50%" style="stop-color:#FFC107"/>
                <stop offset="80%" style="stop-color:#FF9800"/>
                <stop offset="100%" style="stop-color:#F57C00"/>
            </radialGradient>
            <radialGradient id="sunInner${size}" cx="30%" cy="30%" r="50%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.9"/>
                <stop offset="30%" style="stop-color:#FFF9C4;stop-opacity:0.6"/>
                <stop offset="100%" style="stop-color:#FFC107;stop-opacity:0"/>
            </radialGradient>
            <filter id="sunGlow${size}">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Outer glow -->
        <circle cx="50" cy="50" r="35" fill="#FFC107" opacity="0.15" filter="url(#sunGlow${size})"/>
        
        <!-- Main sun body -->
        <circle cx="50" cy="50" r="22" fill="url(#sunBody${size})"/>
        <circle cx="50" cy="50" r="22" fill="url(#sunInner${size})"/>
        
        <!-- Sun rays with realistic shading -->
        ${[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
            const rad = angle * Math.PI / 180;
            const x1 = 50 + Math.cos(rad) * 28;
            const y1 = 50 + Math.sin(rad) * 28;
            const x2 = 50 + Math.cos(rad) * 38;
            const y2 = 50 + Math.sin(rad) * 38;
            const x3 = 50 + Math.cos(rad + 0.12) * 36;
            const y3 = 50 + Math.sin(rad + 0.12) * 36;
            const x4 = 50 + Math.cos(rad - 0.12) * 36;
            const y4 = 50 + Math.sin(rad - 0.12) * 36;
            return `<polygon points="${x1},${y1} ${x3},${y3} ${x2},${y2} ${x4},${y4}" fill="#FFC107" opacity="0.9"/>`;
        }).join('')}
        
        <!-- Highlight reflection -->
        <ellipse cx="43" cy="43" rx="8" ry="6" fill="#FFFFFF" opacity="0.4" transform="rotate(-45 43 43)"/>
    </svg>`,

    // 🌙 MOON - Realistic with craters
    moon: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 4px 8px rgba(200,200,220,0.3))">
        <defs>
            <radialGradient id="moonBody${size}" cx="35%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:#F5F5F5"/>
                <stop offset="30%" style="stop-color:#E0E0E0"/>
                <stop offset="70%" style="stop-color:#BDBDBD"/>
                <stop offset="100%" style="stop-color:#9E9E9E"/>
            </radialGradient>
            <radialGradient id="craterGrad${size}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style="stop-color:#BDBDBD"/>
                <stop offset="70%" style="stop-color:#9E9E9E"/>
                <stop offset="100%" style="stop-color:#757575"/>
            </radialGradient>
        </defs>
        
        <!-- Moon body -->
        <circle cx="50" cy="50" r="22" fill="url(#moonBody${size})"/>
        
        <!-- Craters with realistic depth -->
        <circle cx="38" cy="42" r="5" fill="url(#craterGrad${size})" opacity="0.6"/>
        <ellipse cx="36" cy="40" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.3"/>
        
        <circle cx="58" cy="55" r="4" fill="url(#craterGrad${size})" opacity="0.5"/>
        <ellipse cx="56" cy="53" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.25"/>
        
        <circle cx="45" cy="58" r="3" fill="url(#craterGrad${size})" opacity="0.4"/>
        
        <circle cx="55" cy="38" r="3.5" fill="url(#craterGrad${size})" opacity="0.35"/>
        
        <!-- Surface texture -->
        <circle cx="48" cy="48" r="1.5" fill="#9E9E9E" opacity="0.3"/>
        <circle cx="52" cy="44" r="1" fill="#9E9E9E" opacity="0.25"/>
        <circle cx="42" cy="52" r="1.2" fill="#9E9E9E" opacity="0.2"/>
        
        <!-- Highlight -->
        <ellipse cx="42" cy="38" rx="10" ry="12" fill="#FFFFFF" opacity="0.15"/>
        <ellipse cx="44" cy="40" rx="5" ry="6" fill="#FFFFFF" opacity="0.2"/>
    </svg>`,

    // ☁️ CLOUD - Fluffy 3D cloud
    cloud: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15))">
        <defs>
            <radialGradient id="cloudTop${size}" cx="30%" cy="25%" r="75%">
                <stop offset="0%" style="stop-color:#FFFFFF"/>
                <stop offset="40%" style="stop-color:#F5F5F5"/>
                <stop offset="80%" style="stop-color:#EEEEEE"/>
                <stop offset="100%" style="stop-color:#E0E0E0"/>
            </radialGradient>
            <radialGradient id="cloudBottom${size}" cx="50%" cy="75%" r="60%">
                <stop offset="0%" style="stop-color:#E0E0E0"/>
                <stop offset="100%" style="stop-color:#BDBDBD"/>
            </radialGradient>
            <filter id="cloudShadow${size}">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="0" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Cloud shadow/depth layer -->
        <g filter="url(#cloudShadow${size})">
            <ellipse cx="50" cy="60" rx="32" ry="18" fill="url(#cloudBottom${size})"/>
            <ellipse cx="32" cy="48" rx="22" ry="16" fill="url(#cloudBottom${size})"/>
            <ellipse cx="68" cy="50" rx="20" ry="14" fill="url(#cloudBottom${size})"/>
            <ellipse cx="42" cy="40" rx="18" ry="14" fill="url(#cloudBottom${size})"/>
            <ellipse cx="58" cy="42" rx="16" ry="12" fill="url(#cloudBottom${size})"/>
        </g>
        
        <!-- Main cloud body -->
        <g filter="url(#cloudShadow${size})">
            <ellipse cx="50" cy="58" rx="30" ry="16" fill="url(#cloudTop${size})"/>
            <ellipse cx="32" cy="46" rx="20" ry="14" fill="url(#cloudTop${size})"/>
            <ellipse cx="68" cy="48" rx="18" ry="12" fill="url(#cloudTop${size})"/>
            <ellipse cx="42" cy="38" rx="16" ry="12" fill="url(#cloudTop${size})"/>
            <ellipse cx="58" cy="40" rx="14" ry="10" fill="url(#cloudTop${size})"/>
        </g>
        
        <!-- Top highlights -->
        <ellipse cx="30" cy="40" rx="12" ry="6" fill="#FFFFFF" opacity="0.7"/>
        <ellipse cx="42" cy="34" rx="8" ry="5" fill="#FFFFFF" opacity="0.6"/>
        <ellipse cx="52" cy="44" rx="14" ry="6" fill="#FFFFFF" opacity="0.5"/>
    </svg>`,

    // ⛅ PARTLY CLOUDY - Sun behind cloud
    partlyCloudy: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1))">
        <defs>
            <radialGradient id="sunPart${size}" cx="40%" cy="35%" r="65%">
                <stop offset="0%" style="stop-color:#FFFDE7"/>
                <stop offset="30%" style="stop-color:#FFEB3B"/>
                <stop offset="70%" style="stop-color:#FFC107"/>
                <stop offset="100%" style="stop-color:#FF9800"/>
            </radialGradient>
            <radialGradient id="cloudPart${size}" cx="30%" cy="25%" r="75%">
                <stop offset="0%" style="stop-color:#FFFFFF"/>
                <stop offset="50%" style="stop-color:#F5F5F5"/>
                <stop offset="100%" style="stop-color:#E0E0E0"/>
            </radialGradient>
        </defs>
        
        <!-- Sun peeking from behind -->
        <circle cx="68" cy="32" r="16" fill="url(#sunPart${size})" opacity="0.9"/>
        <circle cx="68" cy="32" r="16" fill="#FFC107" opacity="0.2"/>
        
        <!-- Sun rays visible -->
        ${[30, 60, 90, 330, 0].map(angle => {
            const rad = angle * Math.PI / 180;
            const x1 = 68 + Math.cos(rad) * 18;
            const y1 = 32 + Math.sin(rad) * 18;
            const x2 = 68 + Math.cos(rad) * 26;
            const y2 = 32 + Math.sin(rad) * 26;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFC107" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`;
        }).join('')}
        
        <!-- Cloud in front -->
        <g style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.12))">
            <ellipse cx="42" cy="62" rx="26" ry="14" fill="url(#cloudPart${size})"/>
            <ellipse cx="26" cy="52" rx="16" ry="12" fill="url(#cloudPart${size})"/>
            <ellipse cx="58" cy="54" rx="14" ry="10" fill="url(#cloudPart${size})"/>
            <ellipse cx="36" cy="44" rx="12" ry="9" fill="url(#cloudPart${size})"/>
            <ellipse cx="50" cy="46" rx="10" ry="8" fill="url(#cloudPart${size})"/>
        </g>
        
        <!-- Cloud highlights -->
        <ellipse cx="24" cy="46" rx="8" ry="5" fill="#FFFFFF" opacity="0.7"/>
        <ellipse cx="38" cy="40" rx="6" ry="4" fill="#FFFFFF" opacity="0.6"/>
    </svg>`,

    // 🌧️ RAIN - Realistic rain drops
    rain: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 4px 8px rgba(66,133,244,0.3))">
        <defs>
            <radialGradient id="rainCloud${size}" cx="30%" cy="25%" r="75%">
                <stop offset="0%" style="stop-color:#E0E0E0"/>
                <stop offset="50%" style="stop-color:#BDBDBD"/>
                <stop offset="100%" style="stop-color:#9E9E9E"/>
            </radialGradient>
            <radialGradient id="dropGrad${size}" cx="30%" cy="25%" r="70%">
                <stop offset="0%" style="stop-color:#E3F2FD"/>
                <stop offset="30%" style="stop-color:#42A5F5"/>
                <stop offset="70%" style="stop-color:#1976D2"/>
                <stop offset="100%" style="stop-color:#0D47A1"/>
            </radialGradient>
            <filter id="dropShadow${size}">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                <feOffset dx="1" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Dark cloud -->
        <g style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2))">
            <ellipse cx="50" cy="42" rx="28" ry="16" fill="url(#rainCloud${size})"/>
            <ellipse cx="34" cy="34" rx="18" ry="13" fill="url(#rainCloud${size})"/>
            <ellipse cx="66" cy="36" rx="16" ry="11" fill="url(#rainCloud${size})"/>
            <ellipse cx="44" cy="28" rx="14" ry="11" fill="url(#rainCloud${size})"/>
            <ellipse cx="58" cy="30" rx="12" ry="9" fill="url(#rainCloud${size})"/>
        </g>
        
        <!-- Rain drops with 3D effect -->
        ${[
            {x: 25, y: 58, h: 14},
            {x: 38, y: 62, h: 16},
            {x: 50, y: 58, h: 15},
            {x: 62, y: 64, h: 17},
            {x: 73, y: 60, h: 15},
            {x: 32, y: 72, h: 14},
            {x: 45, y: 76, h: 16},
            {x: 57, y: 74, h: 14},
            {x: 68, y: 78, h: 15}
        ].map(drop => `
            <g filter="url(#dropShadow${size})">
                <path d="M${drop.x} ${drop.y} Q${drop.x-2} ${drop.y+drop.h*0.5} ${drop.x} ${drop.y+drop.h} Q${drop.x+2} ${drop.y+drop.h*0.5} ${drop.x} ${drop.y} Z" fill="url(#dropGrad${size})"/>
                <ellipse cx="${drop.x-1}" cy="${drop.y+2}" rx="1" ry="2" fill="#FFFFFF" opacity="0.5"/>
            </g>
        `).join('')}
    </svg>`,

    // ❄️ SNOW - Realistic snowflakes
    snow: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 4px 8px rgba(200,220,255,0.3))">
        <defs>
            <radialGradient id="snowCloud${size}" cx="30%" cy="25%" r="75%">
                <stop offset="0%" style="stop-color:#FFFFFF"/>
                <stop offset="50%" style="stop-color:#E8EAF6"/>
                <stop offset="100%" style="stop-color:#C5CAE9"/>
            </radialGradient>
            <radialGradient id="flakeGrad${size}" cx="35%" cy="35%" r="65%">
                <stop offset="0%" style="stop-color:#FFFFFF"/>
                <stop offset="50%" style="stop-color:#E3F2FD"/>
                <stop offset="100%" style="stop-color:#BBDEFB"/>
            </radialGradient>
        </defs>
        
        <!-- Cloud -->
        <g style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15))">
            <ellipse cx="50" cy="42" rx="28" ry="16" fill="url(#snowCloud${size})"/>
            <ellipse cx="34" cy="34" rx="18" ry="13" fill="url(#snowCloud${size})"/>
            <ellipse cx="66" cy="36" rx="16" ry="11" fill="url(#snowCloud${size})"/>
            <ellipse cx="44" cy="28" rx="14" ry="11" fill="url(#snowCloud${size})"/>
            <ellipse cx="58" cy="30" rx="12" ry="9" fill="url(#snowCloud${size})"/>
        </g>
        
        <!-- Detailed snowflakes -->
        ${[
            {x: 22, y: 60, r: 5},
            {x: 38, y: 66, r: 6},
            {x: 55, y: 62, r: 5.5},
            {x: 70, y: 68, r: 5},
            {x: 30, y: 78, r: 4.5},
            {x: 47, y: 82, r: 5},
            {x: 63, y: 80, r: 4.5}
        ].map(flake => `
            <g transform="translate(${flake.x}, ${flake.y})">
                <circle r="${flake.r}" fill="url(#flakeGrad${size})" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
                <circle r="${flake.r*0.7}" fill="#FFFFFF" opacity="0.4"/>
                <circle cx="${-flake.r*0.2}" cy="${-flake.r*0.2}" r="${flake.r*0.25}" fill="#FFFFFF" opacity="0.8"/>
                <!-- Snowflake arms -->
                ${[0, 60, 120, 180, 240, 300].map(angle => {
                    const rad = angle * Math.PI / 180;
                    const x1 = Math.cos(rad) * flake.r * 0.3;
                    const y1 = Math.sin(rad) * flake.r * 0.3;
                    const x2 = Math.cos(rad) * flake.r * 1.3;
                    const y2 = Math.sin(rad) * flake.r * 1.3;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E3F2FD" stroke-width="1.2" stroke-linecap="round"/>`;
                }).join('')}
            </g>
        `).join('')}
    </svg>`,

    // ⛈️ THUNDERSTORM - Lightning with storm clouds
    thunderstorm: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 6px 12px rgba(0,0,0,0.4))">
        <defs>
            <radialGradient id="stormCloud${size}" cx="40%" cy="35%" r="65%">
                <stop offset="0%" style="stop-color:#616161"/>
                <stop offset="50%" style="stop-color:#424242"/>
                <stop offset="100%" style="stop-color:#212121"/>
            </radialGradient>
            <radialGradient id="lightningGrad${size}" cx="50%" cy="20%" r="80%">
                <stop offset="0%" style="stop-color:#FFF176"/>
                <stop offset="40%" style="stop-color:#FFEE58"/>
                <stop offset="100%" style="stop-color:#FDD835"/>
            </radialGradient>
            <filter id="lightningGlow${size}">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Dark storm clouds -->
        <g style="filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3))">
            <ellipse cx="50" cy="38" rx="30" ry="17" fill="url(#stormCloud${size})"/>
            <ellipse cx="32" cy="30" rx="20" ry="14" fill="url(#stormCloud${size})"/>
            <ellipse cx="68" cy="32" rx="18" ry="12" fill="url(#stormCloud${size})"/>
            <ellipse cx="42" cy="24" rx="16" ry="12" fill="url(#stormCloud${size})"/>
            <ellipse cx="58" cy="26" rx="14" ry="10" fill="url(#stormCloud${size})"/>
            <ellipse cx="26" cy="34" rx="12" ry="8" fill="url(#stormCloud${size})"/>
            <ellipse cx="74" cy="36" rx="10" ry="7" fill="url(#stormCloud${size})"/>
        </g>
        
        <!-- Lightning bolt -->
        <g filter="url(#lightningGlow${size})">
            <path d="M46 48 L38 62 L46 62 L40 78 L56 58 L48 58 L54 48 Z" fill="url(#lightningGrad${size})"/>
            <path d="M46 48 L38 62 L46 62 L40 78 L56 58 L48 58 L54 48 Z" fill="#FFFFFF" opacity="0.3"/>
        </g>
        
        <!-- Lightning glow -->
        <ellipse cx="46" cy="62" rx="18" ry="22" fill="#FFEE58" opacity="0.1" filter="url(#lightningGlow${size})"/>
    </svg>`,

    // 🌫️ FOG - Layered mist effect
    fog: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 3px 6px rgba(200,200,200,0.2))">
        <defs>
            <linearGradient id="fogGrad${size}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.9"/>
                <stop offset="50%" style="stop-color:#F5F5F5;stop-opacity:0.7"/>
                <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:0.5"/>
            </linearGradient>
        </defs>
        
        <!-- Layered fog with different opacities -->
        <rect x="8" y="22" width="84" height="14" rx="7" fill="url(#fogGrad${size})" opacity="0.8"/>
        <rect x="12" y="38" width="76" height="13" rx="6.5" fill="url(#fogGrad${size})" opacity="0.7"/>
        <rect x="16" y="52" width="68" height="12" rx="6" fill="url(#fogGrad${size})" opacity="0.6"/>
        <rect x="20" y="66" width="60" height="11" rx="5.5" fill="url(#fogGrad${size})" opacity="0.5"/>
        <rect x="24" y="78" width="52" height="10" rx="5" fill="url(#fogGrad${size})" opacity="0.4"/>
        
        <!-- Top highlights -->
        <rect x="8" y="20" width="84" height="8" rx="4" fill="#FFFFFF" opacity="0.3"/>
        <rect x="12" y="36" width="76" height="7" rx="3.5" fill="#FFFFFF" opacity="0.25"/>
        <rect x="16" y="50" width="68" height="6" rx="3" fill="#FFFFFF" opacity="0.2"/>
    </svg>`,

    // 🌨️ SLEET - Mix of rain and snow
    sleet: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 4px 8px rgba(100,150,200,0.3))">
        <defs>
            <radialGradient id="sleetCloud${size}" cx="30%" cy="25%" r="75%">
                <stop offset="0%" style="stop-color:#E0E0E0"/>
                <stop offset="50%" style="stop-color:#BDBDBD"/>
                <stop offset="100%" style="stop-color:#9E9E9E"/>
            </radialGradient>
            <radialGradient id="sleetDrop${size}" cx="30%" cy="25%" r="70%">
                <stop offset="0%" style="stop-color:#E3F2FD"/>
                <stop offset="50%" style="stop-color:#90CAF9"/>
                <stop offset="100%" style="stop-color:#42A5F5"/>
            </radialGradient>
        </defs>
        
        <!-- Cloud -->
        <g style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2))">
            <ellipse cx="50" cy="42" rx="28" ry="16" fill="url(#sleetCloud${size})"/>
            <ellipse cx="34" cy="34" rx="18" ry="13" fill="url(#sleetCloud${size})"/>
            <ellipse cx="66" cy="36" rx="16" ry="11" fill="url(#sleetCloud${size})"/>
        </g>
        
        <!-- Rain drops -->
        <path d="M25 58 Q23 66 25 72 Q27 66 25 58 Z" fill="url(#sleetDrop${size})" opacity="0.8"/>
        <path d="M45 62 Q43 70 45 76 Q47 70 45 62 Z" fill="url(#sleetDrop${size})" opacity="0.8"/>
        <path d="M65 60 Q63 68 65 74 Q67 68 65 60 Z" fill="url(#sleetDrop${size})" opacity="0.8"/>
        
        <!-- Snowflakes mixed in -->
        <g transform="translate(35, 68)">
            <circle r="3.5" fill="#E3F2FD" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1))"/>
            <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" opacity="0.8"/>
        </g>
        <g transform="translate(55, 72)">
            <circle r="3" fill="#E3F2FD" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1))"/>
            <circle cx="-0.8" cy="-0.8" r="0.8" fill="#FFFFFF" opacity="0.8"/>
        </g>
        <g transform="translate(72, 70)">
            <circle r="3.5" fill="#E3F2FD" style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1))"/>
            <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" opacity="0.8"/>
        </g>
    </svg>`,

    // 💨 WIND - Swirling wind effect
    wind: (size = 64) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" style="filter: drop-shadow(0 4px 8px rgba(100,180,220,0.3))">
        <defs>
            <linearGradient id="windGrad${size}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#E1F5FE;stop-opacity:0.8"/>
                <stop offset="50%" style="stop-color:#81D4FA;stop-opacity:0.9"/>
                <stop offset="100%" style="stop-color:#29B6F6;stop-opacity:0.8"/>
            </linearGradient>
        </defs>
        
        <!-- Swirling wind lines -->
        <path d="M15 30 Q35 22 50 30 Q65 38 85 30" stroke="url(#windGrad${size})" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/>
        <path d="M15 30 Q35 22 50 30 Q65 38 85 30" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
        
        <path d="M10 50 Q30 42 48 50 Q66 58 90 50" stroke="url(#windGrad${size})" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.85"/>
        <path d="M10 50 Q30 42 48 50 Q66 58 90 50" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.4"/>
        
        <path d="M15 70 Q35 62 52 70 Q68 78 85 70" stroke="url(#windGrad${size})" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.75"/>
        <path d="M15 70 Q35 62 52 70 Q68 78 85 70" stroke="#FFFFFF" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.35"/>
        
        <!-- Wind particles -->
        <circle cx="22" cy="36" r="2" fill="#81D4FA" opacity="0.6"/>
        <circle cx="78" cy="44" r="1.8" fill="#29B6F6" opacity="0.5"/>
        <circle cx="28" cy="64" r="2.2" fill="#81D4FA" opacity="0.55"/>
        <circle cx="82" cy="56" r="1.5" fill="#29B6F6" opacity="0.45"/>
    </svg>`,

    // Generic function to get icon by weather code
    getIcon: function(code, isDay = true, size = 48) {
        let iconKey;
        
        // Map WMO codes to icon keys
        if (code === 0) iconKey = isDay ? 'sun' : 'moon';
        else if (code === 1 || code === 2) iconKey = 'partlyCloudy';
        else if (code === 3) iconKey = 'cloud';
        else if (code >= 45 && code <= 48) iconKey = 'fog';
        else if (code >= 51 && code <= 67) iconKey = 'rain';
        else if (code >= 71 && code <= 77) iconKey = 'snow';
        else if (code >= 80 && code <= 82) iconKey = 'rain';
        else if (code >= 85 && code <= 86) iconKey = 'snow';
        else if (code >= 95) iconKey = 'thunderstorm';
        else iconKey = 'cloud';
        
        if (this[iconKey]) {
            return `<div style="display:inline-flex;width:${size}px;height:${size}px;align-items:center;justify-content:center;vertical-align:middle">${this[iconKey](size)}</div>`;
        }
        
        // Fallback emoji
        const emojis = {
            sun: '☀️', moon: '🌙', partlyCloudy: '⛅', cloud: '☁️',
            rain: '🌧️', snow: '❄️', thunderstorm: '⛈️', fog: '🌫️',
            sleet: '🌨️', wind: '💨'
        };
        return `<span style="font-size:${size*0.75}px">${emojis[iconKey] || '☁️'}</span>`;
    }
};

// Override the global getWeatherIcon3D function
if (typeof getWeatherIcon3D === 'function') {
    getWeatherIcon3D = function(code, isDay = true, size = 48) {
        return RealisticIcons.getIcon(code, isDay, size);
    };
} else {
    window.getWeatherIcon3D = function(code, isDay = true, size = 48) {
        return RealisticIcons.getIcon(code, isDay, size);
    };
}

// Also override getWeatherIcon if it exists
if (typeof getWeatherIcon === 'function') {
    getWeatherIcon = function(code, isDay = true, size = 48) {
        return RealisticIcons.getIcon(code, isDay, size);
    };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RealisticIcons };
}