/**
 * Enhanced Weather Icons - Professional 3D Weather Icons
 * High quality, visually appealing weather icons with animations
 */

const enhancedWeatherIcons = {
    // Helper to create SVG
    createSVG: function(content, viewBox = '0 0 100 100') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet">${content}</svg>`;
    },

    // Sunny - Bright yellow sun with rays
    sunny: function() {
        return this.createSVG(`
            <defs>
                <radialGradient id="sunGrad" cx="40%" cy="40%">
                    <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#FFD700;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                </radialGradient>
                <filter id="sunShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
                </filter>
            </defs>
            <!-- Main sun circle -->
            <circle cx="50" cy="50" r="28" fill="url(#sunGrad)" filter="url(#sunShadow)"/>
            <!-- Outer glow -->
            <circle cx="50" cy="50" r="32" fill="none" stroke="#FFD700" stroke-width="1.5" opacity="0.4"/>
            <!-- Sun rays -->
            <line x1="50" y1="8" x2="50" y2="18" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="50" y1="82" x2="50" y2="92" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="8" y1="50" x2="18" y2="50" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="82" y1="50" x2="92" y2="50" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Diagonal rays -->
            <line x1="18" y1="18" x2="25" y2="25" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="75" y1="75" x2="82" y2="82" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="82" y1="18" x2="75" y2="25" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="25" y1="75" x2="18" y2="82" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
        `, '0 0 100 100');
    },

    // Partly Cloudy
    partlyCloudy: function() {
        return this.createSVG(`
            <defs>
                <radialGradient id="sunGrad2" cx="35%" cy="35%">
                    <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
                </radialGradient>
                <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#F5F5F5;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />
                </linearGradient>
                <filter id="cloudShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
                </filter>
            </defs>
            <!-- Sun -->
            <circle cx="32" cy="32" r="18" fill="url(#sunGrad2)"/>
            <!-- Cloud -->
            <path d="M 50 55 Q 42 48 58 48 Q 68 48 72 55 Q 75 55 75 60 Q 75 70 65 75 L 45 75 Q 35 75 35 65 Q 35 55 50 55 Z" 
                  fill="url(#cloudGrad2)" stroke="#C0C0C0" stroke-width="1.5" filter="url(#cloudShadow)"/>
            <!-- Cloud highlight -->
            <ellipse cx="60" cy="62" rx="10" ry="6" fill="#FFFFFF" opacity="0.5"/>
        `, '0 0 100 100');
    },

    // Cloudy
    cloudy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="cloudGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
                </linearGradient>
                <filter id="cloudShadow2">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.25"/>
                </filter>
            </defs>
            <!-- First cloud -->
            <path d="M 25 50 Q 18 45 28 40 Q 35 35 45 40 Q 50 38 55 42 Q 65 40 68 48 Q 70 48 70 52 Q 70 60 62 65 L 25 65 Q 18 65 18 55 Z" 
                  fill="url(#cloudGrad3)" stroke="#A9A9A9" stroke-width="1.5" filter="url(#cloudShadow2)"/>
            <!-- Second cloud (overlay) -->
            <path d="M 35 60 Q 30 56 42 52 Q 48 50 56 54 Q 62 52 65 58 Q 67 58 67 62 Q 67 70 58 75 L 35 75 Q 28 75 28 68 Z" 
                  fill="url(#cloudGrad3)" stroke="#A9A9A9" stroke-width="1.5" filter="url(#cloudShadow2)" opacity="0.9"/>
        `, '0 0 100 100');
    },

    // Rainy
    rainy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="rainCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#808080;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#505050;stop-opacity:1" />
                </linearGradient>
                <filter id="rainShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                </filter>
            </defs>
            <!-- Dark cloud -->
            <path d="M 25 45 Q 15 40 25 32 Q 32 28 42 32 Q 48 28 56 32 Q 68 30 72 40 Q 75 40 75 47 Q 75 58 65 65 L 25 65 Q 15 65 15 55 Z" 
                  fill="url(#rainCloudGrad)" stroke="#404040" stroke-width="1.5" filter="url(#rainShadow)"/>
            <!-- Rain drops -->
            <line x1="25" y1="68" x2="22" y2="80" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="42" y1="68" x2="39" y2="80" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="59" y1="68" x2="56" y2="80" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round"/>
            <!-- Second row of drops -->
            <line x1="33" y1="75" x2="30" y2="87" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="50" y1="75" x2="47" y2="87" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
            <line x1="67" y1="75" x2="64" y2="87" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
        `, '0 0 100 100');
    },

    // Snowy
    snowy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="snowCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#E8F4F8;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#B8D8E8;stop-opacity:1" />
                </linearGradient>
                <filter id="snowShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
                </filter>
            </defs>
            <!-- Light cloud -->
            <path d="M 25 45 Q 15 40 25 32 Q 32 28 42 32 Q 48 28 56 32 Q 68 30 72 40 Q 75 40 75 47 Q 75 58 65 65 L 25 65 Q 15 65 15 55 Z" 
                  fill="url(#snowCloudGrad)" stroke="#87CEEB" stroke-width="1.5" filter="url(#snowShadow)"/>
            <!-- Snowflakes -->
            <g fill="none" stroke="#E0FFFF" stroke-width="1.8" stroke-linecap="round">
                <!-- Snowflake 1 -->
                <line x1="25" y1="70" x2="25" y2="85"/>
                <line x1="20" y1="77" x2="30" y2="77"/>
                <line x1="22" y1="74" x2="28" y2="80"/>
                <line x1="28" y1="74" x2="22" y2="80"/>
                <!-- Snowflake 2 -->
                <line x1="50" y1="70" x2="50" y2="85"/>
                <line x1="45" y1="77" x2="55" y2="77"/>
                <line x1="47" y1="74" x2="53" y2="80"/>
                <line x1="53" y1="74" x2="47" y2="80"/>
                <!-- Snowflake 3 -->
                <line x1="75" y1="70" x2="75" y2="85"/>
                <line x1="70" y1="77" x2="80" y2="77"/>
                <line x1="72" y1="74" x2="78" y2="80"/>
                <line x1="78" y1="74" x2="72" y2="80"/>
            </g>
        `, '0 0 100 100');
    },

    // Thunderstorm
    thunderstorm: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="stormCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#404040;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
                </linearGradient>
                <filter id="stormShadow">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.4"/>
                </filter>
            </defs>
            <!-- Dark cloud -->
            <path d="M 20 45 Q 10 40 20 32 Q 27 28 37 32 Q 43 28 51 32 Q 63 30 67 40 Q 70 40 70 47 Q 70 58 60 65 L 20 65 Q 10 65 10 55 Z" 
                  fill="url(#stormCloudGrad)" stroke="#1a1a1a" stroke-width="1.5" filter="url(#stormShadow)"/>
            <!-- Lightning bolt -->
            <polygon points="45,68 40,75 48,75 42,88 55,70 48,70 52,60" fill="#FFFF00" stroke="#FFD700" stroke-width="1"/>
            <!-- Lightning glow -->
            <circle cx="48" cy="75" r="8" fill="#FFFF00" opacity="0.2"/>
        `, '0 0 100 100');
    },

    // Foggy
    foggy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="fogGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#D3D3D3;stop-opacity:0" />
                    <stop offset="50%" style="stop-color:#B0B0B0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#D3D3D3;stop-opacity:0" />
                </linearGradient>
                <linearGradient id="fogGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#C0C0C0;stop-opacity:0" />
                    <stop offset="50%" style="stop-color:#A0A0A0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:0" />
                </linearGradient>
            </defs>
            <!-- Fog layers -->
            <rect x="5" y="30" width="90" height="10" fill="url(#fogGrad1)" opacity="0.9"/>
            <rect x="5" y="45" width="90" height="10" fill="url(#fogGrad2)" opacity="0.8"/>
            <rect x="5" y="60" width="90" height="10" fill="url(#fogGrad1)" opacity="0.7"/>
            <rect x="5" y="75" width="90" height="8" fill="url(#fogGrad2)" opacity="0.6"/>
        `, '0 0 100 100');
    },

    // Night/Clear
    night: function() {
        return this.createSVG(`
            <defs>
                <radialGradient id="moonGrad" cx="35%" cy="35%">
                    <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#F0E68C;stop-opacity:1" />
                </radialGradient>
                <filter id="moonGlow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <!-- Moon -->
            <circle cx="50" cy="40" r="26" fill="url(#moonGrad)" filter="url(#moonGlow)"/>
            <!-- Moon glow -->
            <circle cx="50" cy="40" r="30" fill="none" stroke="#FFFACD" stroke-width="1" opacity="0.3"/>
            <!-- Stars -->
            <circle cx="20" cy="25" r="2" fill="#FFD700"/>
            <circle cx="80" cy="30" r="1.5" fill="#FFD700"/>
            <circle cx="15" cy="60" r="1.5" fill="#FFD700"/>
            <circle cx="85" cy="70" r="2" fill="#FFD700"/>
            <circle cx="75" cy="20" r="1" fill="#FFD700"/>
            <circle cx="30" cy="75" r="1.5" fill="#FFD700"/>
        `, '0 0 100 100');
    },

    // Get icon by weather code
    getIcon: function(code, isDay = true, size = 32) {
        let iconFunc;
        
        if (!isDay) {
            iconFunc = this.night;
        } else {
            switch(code) {
                case 0: iconFunc = this.sunny; break;
                case 1: iconFunc = this.partlyCloudy; break;
                case 2: iconFunc = this.cloudy; break;
                case 3: iconFunc = this.cloudy; break;
                case 45:
                case 48: iconFunc = this.foggy; break;
                case 51:
                case 53:
                case 55:
                case 61:
                case 63:
                case 65:
                case 80:
                case 81:
                case 82: iconFunc = this.rainy; break;
                case 71:
                case 73:
                case 75:
                case 77:
                case 85:
                case 86: iconFunc = this.snowy; break;
                case 95:
                case 96:
                case 99: iconFunc = this.thunderstorm; break;
                default: iconFunc = this.sunny;
            }
        }
        
        const svg = iconFunc.call(this);
        const styledSvg = svg.replace('<svg', `<svg style="width: ${size}px; height: ${size}px; display: inline-block;"`);
        return `<div class="weather-icon-container" style="width: ${size}px; height: ${size}px; display: inline-flex; align-items: center; justify-content: center;">${styledSvg}</div>`;
    }
};

/**
 * Override getEnhancedWeatherIcon to use enhanced icons
 */
function getEnhancedWeatherIcon(code, isDay = true, size = 32) {
    if (typeof enhancedWeatherIcons !== 'undefined' && enhancedWeatherIcons.getIcon) {
        return enhancedWeatherIcons.getIcon(code, isDay, size);
    }
    return '';
}
