/**
 * Final Weather Icons - Simple and Reliable SVG Weather Icons
 * Works with OpenWeatherMap API
 */

function getEnhancedWeatherIcon(code, isDay = true, size = 32) {
    size = parseInt(size) || 32;
    let svg = '';
    
    // Night icons
    if (!isDay) {
        svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
            <circle cx="50" cy="40" r="26" fill="#FFFACD"/>
            <circle cx="20" cy="25" r="2" fill="#FFD700"/>
            <circle cx="80" cy="30" r="1.5" fill="#FFD700"/>
            <circle cx="15" cy="60" r="1.5" fill="#FFD700"/>
        </svg>`;
    } else {
        // Day icons based on weather code
        // OpenWeatherMap codes: 200-299 (thunderstorm), 300-399 (drizzle), 500-599 (rain), 600-699 (snow), 700-799 (atmosphere), 800 (clear), 801-804 (clouds)
        
        const codeStr = String(code);
        const firstDigit = codeStr[0];
        
        if (code === 800) { // Clear
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <circle cx="50" cy="50" r="28" fill="#FFD700"/>
                <line x1="50" y1="8" x2="50" y2="18" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="50" y1="82" x2="50" y2="92" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="8" y1="50" x2="18" y2="50" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="82" y1="50" x2="92" y2="50" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round"/>
            </svg>`;
        } else if (code === 801 || code === 802) { // Few clouds / Scattered clouds
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <circle cx="32" cy="32" r="18" fill="#FFD700"/>
                <path d="M 50 55 Q 42 48 58 48 Q 68 48 72 55 Q 75 55 75 60 Q 75 70 65 75 L 45 75 Q 35 75 35 65 Q 35 55 50 55 Z" fill="#E0E0E0" stroke="#C0C0C0" stroke-width="1.5"/>
            </svg>`;
        } else if (code === 803 || code === 804) { // Broken clouds / Overcast
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <path d="M 25 50 Q 18 45 28 40 Q 35 35 45 40 Q 50 38 55 42 Q 65 40 68 48 Q 70 48 70 52 Q 70 60 62 65 L 25 65 Q 18 65 18 55 Z" fill="#C0C0C0" stroke="#A0A0A0" stroke-width="1.5"/>
                <path d="M 35 60 Q 30 56 42 52 Q 48 50 56 54 Q 62 52 65 58 Q 67 58 67 62 Q 67 70 58 75 L 35 75 Q 28 75 28 68 Z" fill="#A0A0A0" stroke="#808080" stroke-width="1.5" opacity="0.9"/>
            </svg>`;
        } else if (firstDigit === '5' || firstDigit === '3') { // Rain or Drizzle
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <path d="M 25 45 Q 15 40 25 32 Q 32 28 42 32 Q 48 28 56 32 Q 68 30 72 40 Q 75 40 75 47 Q 75 58 65 65 L 25 65 Q 15 65 15 55 Z" fill="#808080" stroke="#505050" stroke-width="1.5"/>
                <line x1="25" y1="68" x2="22" y2="80" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="42" y1="68" x2="39" y2="80" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="59" y1="68" x2="56" y2="80" stroke="#4169E1" stroke-width="2.5" stroke-linecap="round"/>
            </svg>`;
        } else if (firstDigit === '6') { // Snow
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <path d="M 25 45 Q 15 40 25 32 Q 32 28 42 32 Q 48 28 56 32 Q 68 30 72 40 Q 75 40 75 47 Q 75 58 65 65 L 25 65 Q 15 65 15 55 Z" fill="#E8F4F8" stroke="#87CEEB" stroke-width="1.5"/>
                <g fill="none" stroke="#E0FFFF" stroke-width="1.8" stroke-linecap="round">
                    <line x1="25" y1="70" x2="25" y2="85"/>
                    <line x1="20" y1="77" x2="30" y2="77"/>
                    <line x1="50" y1="70" x2="50" y2="85"/>
                    <line x1="45" y1="77" x2="55" y2="77"/>
                    <line x1="75" y1="70" x2="75" y2="85"/>
                    <line x1="70" y1="77" x2="80" y2="77"/>
                </g>
            </svg>`;
        } else if (firstDigit === '2') { // Thunderstorm
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <path d="M 20 45 Q 10 40 20 32 Q 27 28 37 32 Q 43 28 51 32 Q 63 30 67 40 Q 70 40 70 47 Q 70 58 60 65 L 20 65 Q 10 65 10 55 Z" fill="#404040" stroke="#1a1a1a" stroke-width="1.5"/>
                <polygon points="45,68 40,75 48,75 42,88 55,70 48,70 52,60" fill="#FFFF00" stroke="#FFD700" stroke-width="1"/>
            </svg>`;
        } else if (firstDigit === '7') { // Atmosphere (fog, mist, etc.)
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <rect x="5" y="30" width="90" height="10" fill="#B0B0B0" opacity="0.9"/>
                <rect x="5" y="45" width="90" height="10" fill="#A0A0A0" opacity="0.8"/>
                <rect x="5" y="60" width="90" height="10" fill="#909090" opacity="0.7"/>
            </svg>`;
        } else {
            // Default: sun
            svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style="width: ${size}px; height: ${size}px; display: inline-block;">
                <circle cx="50" cy="50" r="28" fill="#FFD700"/>
            </svg>`;
        }
    }
    
    return `<div class="weather-icon-container" style="width: ${size}px; height: ${size}px; display: inline-flex; align-items: center; justify-content: center;">${svg}</div>`;
}
