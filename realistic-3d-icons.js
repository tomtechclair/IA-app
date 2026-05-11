/**
 * Realistic 3D Weather Icons
 * Professional weather icons with 3D effects and realistic styling
 */

const realistic3DWeatherIcons = {
    // Helper to create SVG with proper styling
    createSVG: function(content, viewBox = '0 0 100 100') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">${content}</svg>`;
    },

    // Clear/Sunny - Bright sun with glow
    sunny: function() {
        return this.createSVG(`
            <defs>
                <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                </radialGradient>
                <filter id="sunGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <circle cx="50" cy="50" r="30" fill="url(#sunGradient)" filter="url(#sunGlow)"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#FFD700" stroke-width="2" opacity="0.3"/>
            <line x1="50" y1="5" x2="50" y2="15" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="85" x2="50" y2="95" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
            <line x1="5" y1="50" x2="15" y2="50" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
            <line x1="85" y1="50" x2="95" y2="50" stroke="#FFD700" stroke-width="3" stroke-linecap="round"/>
            <line x1="15" y1="15" x2="22" y2="22" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="78" y1="78" x2="85" y2="85" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="85" y1="15" x2="78" y2="22" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
            <line x1="22" y1="78" x2="15" y2="85" stroke="#FFD700" stroke-width="2" stroke-linecap="round"/>
        `, '0 0 100 100');
    },

    // Partly Cloudy - Sun with cloud
    partlyCloudy: function() {
        return this.createSVG(`
            <defs>
                <radialGradient id="sunGrad2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                </radialGradient>
            </defs>
            <circle cx="35" cy="35" r="20" fill="url(#sunGrad2)"/>
            <path d="M 55 55 Q 45 45 65 45 Q 75 45 78 55 Q 80 55 80 60 Q 80 70 70 75 L 50 75 Q 40 75 40 65 Q 40 55 55 55 Z" fill="#E8E8E8" stroke="#B0B0B0" stroke-width="1.5"/>
            <ellipse cx="60" cy="62" rx="12" ry="8" fill="#F5F5F5" opacity="0.6"/>
        `, '0 0 100 100');
    },

    // Cloudy - Gray clouds
    cloudy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#D3D3D3;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#A9A9A9;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M 30 50 Q 20 50 20 40 Q 20 30 30 30 Q 35 20 45 20 Q 60 20 65 30 Q 75 30 75 40 Q 75 50 65 55 L 30 55 Q 25 55 25 50 Z" fill="url(#cloudGrad)" stroke="#808080" stroke-width="1.5"/>
            <path d="M 35 60 Q 28 60 28 52 Q 28 45 35 45 Q 38 38 45 38 Q 55 38 60 45 Q 68 45 68 52 Q 68 60 60 65 L 35 65 Q 32 65 32 60 Z" fill="#C0C0C0" stroke="#808080" stroke-width="1.5" opacity="0.8"/>
        `, '0 0 100 100');
    },

    // Rainy - Cloud with rain drops
    rainy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="rainCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#696969;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#404040;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M 25 45 Q 15 45 15 35 Q 15 25 25 25 Q 30 15 40 15 Q 55 15 60 25 Q 70 25 70 35 Q 70 45 60 50 L 25 50 Q 20 50 20 45 Z" fill="url(#rainCloudGrad)" stroke="#2F4F4F" stroke-width="1.5"/>
            <line x1="25" y1="55" x2="22" y2="65" stroke="#4169E1" stroke-width="2" stroke-linecap="round"/>
            <line x1="40" y1="55" x2="37" y2="65" stroke="#4169E1" stroke-width="2" stroke-linecap="round"/>
            <line x1="55" y1="55" x2="52" y2="65" stroke="#4169E1" stroke-width="2" stroke-linecap="round"/>
            <line x1="32" y1="60" x2="29" y2="70" stroke="#4169E1" stroke-width="2" stroke-linecap="round"/>
            <line x1="47" y1="60" x2="44" y2="70" stroke="#4169E1" stroke-width="2" stroke-linecap="round"/>
            <line x1="62" y1="60" x2="59" y2="70" stroke="#4169E1" stroke-width="2" stroke-linecap="round"/>
        `, '0 0 100 100');
    },

    // Snowy - Cloud with snowflakes
    snowy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="snowCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#E0E6FF;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#B0C4DE;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M 25 45 Q 15 45 15 35 Q 15 25 25 25 Q 30 15 40 15 Q 55 15 60 25 Q 70 25 70 35 Q 70 45 60 50 L 25 50 Q 20 50 20 45 Z" fill="url(#snowCloudGrad)" stroke="#87CEEB" stroke-width="1.5"/>
            <g fill="none" stroke="#E0FFFF" stroke-width="1.5" stroke-linecap="round">
                <line x1="25" y1="55" x2="25" y2="68"/>
                <line x1="20" y1="61" x2="30" y2="61"/>
                <line x1="40" y1="55" x2="40" y2="68"/>
                <line x1="35" y1="61" x2="45" y2="61"/>
                <line x1="55" y1="55" x2="55" y2="68"/>
                <line x1="50" y1="61" x2="60" y2="61"/>
            </g>
        `, '0 0 100 100');
    },

    // Thunderstorm - Dark cloud with lightning
    thunderstorm: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="stormCloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#2F4F4F;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M 25 45 Q 15 45 15 35 Q 15 25 25 25 Q 30 15 40 15 Q 55 15 60 25 Q 70 25 70 35 Q 70 45 60 50 L 25 50 Q 20 50 20 45 Z" fill="url(#stormCloudGrad)" stroke="#000000" stroke-width="1.5"/>
            <polygon points="42,55 38,68 45,68 40,80 50,68 47,68 52,55" fill="#FFFF00" stroke="#FFD700" stroke-width="1"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="#FFD700" stroke-width="1" opacity="0.2"/>
        `, '0 0 100 100');
    },

    // Foggy - Horizontal lines
    foggy: function() {
        return this.createSVG(`
            <defs>
                <linearGradient id="fogGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#D3D3D3;stop-opacity:0" />
                    <stop offset="50%" style="stop-color:#A9A9A9;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#D3D3D3;stop-opacity:0" />
                </linearGradient>
            </defs>
            <rect x="10" y="30" width="80" height="8" fill="url(#fogGrad)" opacity="0.8"/>
            <rect x="10" y="45" width="80" height="8" fill="url(#fogGrad)" opacity="0.7"/>
            <rect x="10" y="60" width="80" height="8" fill="url(#fogGrad)" opacity="0.6"/>
        `, '0 0 100 100');
    },

    // Night/Clear - Moon with stars
    night: function() {
        return this.createSVG(`
            <defs>
                <radialGradient id="moonGradient" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#F0E68C;stop-opacity:1" />
                </radialGradient>
            </defs>
            <circle cx="50" cy="40" r="25" fill="url(#moonGradient)"/>
            <circle cx="60" cy="30" r="3" fill="#FFD700"/>
            <circle cx="75" cy="50" r="2" fill="#FFD700"/>
            <circle cx="20" cy="25" r="2.5" fill="#FFD700"/>
            <circle cx="80" cy="75" r="2" fill="#FFD700"/>
            <circle cx="25" cy="70" r="2.5" fill="#FFD700"/>
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
        // Add sizing
        const styledSvg = svg.replace('<svg', `<svg style="width: ${size}px; height: ${size}px; display: inline-block;"`);
        return `<div class="weather-icon-container" style="width: ${size}px; height: ${size}px; display: inline-flex; align-items: center; justify-content: center;">${styledSvg}</div>`;
    }
};

/**
 * Override getEnhancedWeatherIcon to use realistic 3D icons
 */
function getEnhancedWeatherIcon(code, isDay = true, size = 32) {
    if (typeof realistic3DWeatherIcons !== 'undefined' && realistic3DWeatherIcons.getIcon) {
        return realistic3DWeatherIcons.getIcon(code, isDay, size);
    }
    // Fallback
    return '';
}
