/**
 * Ultra Visible 3D Weather Icons
 * Using high-contrast, bold 3D SVG icons with dramatic shadows and lighting
 */

class Visible3DIcons {
    constructor() {
        this.styles = `
        <defs>
            <filter id="bigShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.35"/>
            </filter>
            <filter id="hugeShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.4"/>
            </filter>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <radialGradient id="sunGrad" cx="30%" cy="30%">
                <stop offset="0%" stop-color="#FFF700"/>
                <stop offset="40%" stop-color="#FFD700"/>
                <stop offset="100%" stop-color="#FF8C00"/>
            </radialGradient>
            <radialGradient id="moonGrad" cx="30%" cy="30%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="50%" stop-color="#E8E8E8"/>
                <stop offset="100%" stop-color="#B0B0B0"/>
            </radialGradient>
            <radialGradient id="cloudGrad" cx="30%" cy="25%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="60%" stop-color="#F0F0F0"/>
                <stop offset="100%" stop-color="#C0C0C0"/>
            </radialGradient>
            <radialGradient id="rainGrad" cx="30%" cy="30%">
                <stop offset="0%" stop-color="#00BFFF"/>
                <stop offset="100%" stop-color="#0066CC"/>
            </radialGradient>
            <radialGradient id="snowGrad" cx="30%" cy="30%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="100%" stop-color="#B0E0E6"/>
            </radialGradient>
            <linearGradient id="thunderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFF00"/>
                <stop offset="100%" stop-color="#FF6600"/>
            </linearGradient>
        </defs>
        `;
    }
    
    wrap(content, viewBox = '0 0 100 100') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="visible-3d-icon" style="overflow:visible">${this.styles}${content}</svg>`;
    }
    
    // ☀️ SUN - Big, bold, glowing
    sun() {
        return this.wrap(`
            <!-- Big rays -->
            <g filter="url(#glow)" opacity="0.3">
                ${Array.from({length: 8}, (_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const x1 = 50 + Math.cos(angle) * 28;
                    const y1 = 50 + Math.sin(angle) * 28;
                    const x2 = 50 + Math.cos(angle) * 46;
                    const y2 = 50 + Math.sin(angle) * 46;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="8" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <!-- Shadow -->
            <circle cx="50" cy="56" r="24" fill="#CC8800" opacity="0.3" filter="url(#hugeShadow)"/>
            
            <!-- Main sun body -->
            <circle cx="50" cy="50" r="24" fill="url(#sunGrad)" filter="url(#bigShadow)"/>
            
            <!-- Top highlight -->
            <ellipse cx="42" cy="38" rx="10" ry="8" fill="#FFF" opacity="0.4"/>
            
            <!-- Rays -->
            ${Array.from({length: 8}, (_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const x1 = 50 + Math.cos(angle) * 28;
                const y1 = 50 + Math.sin(angle) * 28;
                const x2 = 50 + Math.cos(angle) * 42;
                const y2 = 50 + Math.sin(angle) * 42;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#sunGrad)" stroke-width="5" stroke-linecap="round" filter="url(#bigShadow)"/>`;
            }).join('')}
        `);
    }
    
    // 🌙 MOON
    moon() {
        return this.wrap(`
            <circle cx="50" cy="56" r="20" fill="#888" opacity="0.3" filter="url(#hugeShadow)"/>
            <circle cx="50" cy="50" r="20" fill="url(#moonGrad)" filter="url(#bigShadow)"/>
            
            <!-- Craters -->
            <circle cx="42" cy="42" r="5" fill="#999" opacity="0.3"/>
            <circle cx="58" cy="55" r="4" fill="#999" opacity="0.2"/>
            <circle cx="45" cy="58" r="3" fill="#999" opacity="0.25"/>
            
            <!-- Highlight -->
            <ellipse cx="44" cy="38" rx="8" ry="10" fill="#FFF" opacity="0.3"/>
        `);
    }
    
    // ☁️ CLOUD - Big and fluffy
    cloud() {
        return this.wrap(`
            <!-- Big shadow underneath -->
            <ellipse cx="50" cy="72" rx="38" ry="10" fill="#999" opacity="0.2" filter="url(#hugeShadow)"/>
            
            <!-- Bottom darker layer for depth -->
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="60" rx="36" ry="20" fill="#C0C0C0"/>
                <ellipse cx="32" cy="48" rx="24" ry="18" fill="#C0C0C0"/>
                <ellipse cx="68" cy="50" rx="22" ry="16" fill="#C0C0C0"/>
                <ellipse cx="42" cy="38" rx="20" ry="16" fill="#C0C0C0"/>
                <ellipse cx="58" cy="40" rx="18" ry="14" fill="#C0C0C0"/>
            </g>
            
            <!-- Main white fluffy cloud -->
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="58" rx="34" ry="18" fill="url(#cloudGrad)"/>
                <ellipse cx="32" cy="46" rx="22" ry="16" fill="url(#cloudGrad)"/>
                <ellipse cx="68" cy="48" rx="20" ry="14" fill="url(#cloudGrad)"/>
                <ellipse cx="42" cy="36" rx="18" ry="14" fill="url(#cloudGrad)"/>
                <ellipse cx="58" cy="38" rx="16" ry="12" fill="url(#cloudGrad)"/>
            </g>
            
            <!-- Top bright highlights -->
            <ellipse cx="32" cy="36" rx="14" ry="8" fill="#FFF" opacity="0.7"/>
            <ellipse cx="50" cy="44" rx="20" ry="8" fill="#FFF" opacity="0.5"/>
            <ellipse cx="42" cy="30" rx="10" ry="6" fill="#FFF" opacity="0.8"/>
        `);
    }
    
    // ⛅ CLOUD + SUN
    cloudSun() {
        return this.wrap(`
            <!-- Sun behind -->
            <g filter="url(#glow)" opacity="0.2">
                ${Array.from({length: 6}, (_, i) => {
                    const angle = (i * 60 + 15) * Math.PI / 180;
                    const x1 = 72 + Math.cos(angle) * 18;
                    const y1 = 30 + Math.sin(angle) * 18;
                    const x2 = 72 + Math.cos(angle) * 30;
                    const y2 = 30 + Math.sin(angle) * 30;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="6" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <circle cx="72" cy="30" r="16" fill="url(#sunGrad)" filter="url(#bigShadow)"/>
            <ellipse cx="66" cy="22" rx="6" ry="5" fill="#FFF" opacity="0.4"/>
            
            <!-- Cloud shadow -->
            <ellipse cx="38" cy="76" rx="30" ry="10" fill="#999" opacity="0.2" filter="url(#hugeShadow)"/>
            
            <!-- Cloud bottom -->
            <g filter="url(#bigShadow)">
                <ellipse cx="38" cy="62" rx="28" ry="16" fill="#C0C0C0"/>
                <ellipse cx="22" cy="52" rx="18" ry="14" fill="#C0C0C0"/>
                <ellipse cx="54" cy="54" rx="16" ry="12" fill="#C0C0C0"/>
            </g>
            
            <!-- Cloud top -->
            <g filter="url(#bigShadow)">
                <ellipse cx="38" cy="60" rx="26" ry="14" fill="url(#cloudGrad)"/>
                <ellipse cx="22" cy="50" rx="16" ry="12" fill="url(#cloudGrad)"/>
                <ellipse cx="54" cy="52" rx="14" ry="10" fill="url(#cloudGrad)"/>
            </g>
            
            <ellipse cx="22" cy="42" rx="10" ry="6" fill="#FFF" opacity="0.6"/>
        `);
    }
    
    // 🌧️ RAIN
    rain() {
        return this.wrap(`
            <!-- Cloud shadow -->
            <ellipse cx="50" cy="78" rx="32" ry="8" fill="#999" opacity="0.2" filter="url(#hugeShadow)"/>
            
            <!-- Darker cloud bottom -->
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#A0A0A0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#A0A0A0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#A0A0A0"/>
            </g>
            
            <!-- Cloud top -->
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#C0C0C0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#C0C0C0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#C0C0C0"/>
            </g>
            
            <!-- Big rain drops -->
            <g filter="url(#bigShadow)">
                <path d="M22 62 Q18 74 22 82 Q26 74 22 62 Z" fill="url(#rainGrad)"/>
                <path d="M38 66 Q34 80 38 88 Q42 80 38 66 Z" fill="url(#rainGrad)"/>
                <path d="M54 62 Q50 74 54 82 Q58 74 54 62 Z" fill="url(#rainGrad)"/>
                <path d="M70 66 Q66 78 70 86 Q74 78 70 66 Z" fill="url(#rainGrad)"/>
                <path d="M30 72 Q26 82 30 90 Q34 82 30 72 Z" fill="url(#rainGrad)"/>
            </g>
            
            <!-- Drop highlights -->
            <ellipse cx="20" cy="68" rx="2" ry="4" fill="#FFF" opacity="0.5"/>
            <ellipse cx="36" cy="72" rx="2" ry="4" fill="#FFF" opacity="0.5"/>
        `);
    }
    
    // 🌨️ SNOW
    snow() {
        return this.wrap(`
            <ellipse cx="50" cy="78" rx="32" ry="8" fill="#999" opacity="0.2" filter="url(#hugeShadow)"/>
            
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#B0B0B0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#B0B0B0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#B0B0B0"/>
            </g>
            
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="url(#cloudGrad)"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="url(#cloudGrad)"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="url(#cloudGrad)"/>
            </g>
            
            <!-- Big snowflakes -->
            <g filter="url(#bigShadow)">
                ${[[25, 64], [42, 70], [60, 66], [35, 80], [52, 84]].map(([x, y]) => `
                    <circle cx="${x}" cy="${y}" r="5" fill="url(#snowGrad)"/>
                    <circle cx="${x-2}" cy="${y-2}" r="2" fill="#FFF" opacity="0.8"/>
                `).join('')}
            </g>
            
            <!-- Snowflake crosses -->
            <g stroke="#FFF" stroke-width="2" opacity="0.9">
                ${[[25, 64], [42, 70], [60, 66]].map(([x, y]) => `
                    <line x1="${x}" y1="${y-6}" x2="${x}" y2="${y+6}"/>
                    <line x1="${x-6}" y1="${y}" x2="${x+6}" y2="${y}"/>
                    <line x1="${x-4}" y1="${y-4}" x2="${x+4}" y2="${y+4}"/>
                    <line x1="${x-4}" y1="${y+4}" x2="${x+4}" y2="${y-4}"/>
                `).join('')}
            </g>
        `);
    }
    
    // ⛈️ THUNDER
    thunder() {
        return this.wrap(`
            <ellipse cx="50" cy="78" rx="32" ry="8" fill="#666" opacity="0.3" filter="url(#hugeShadow)"/>
            
            <!-- Dark storm cloud -->
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#606060"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#606060"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#606060"/>
            </g>
            
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#808080"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#808080"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#808080"/>
            </g>
            
            <!-- Lightning bolt - BIG and bold -->
            <g filter="url(#hugeShadow)">
                <path d="M44 50 L28 76 L44 76 L34 100 L62 72 L46 72 L56 50 Z" fill="url(#thunderGrad)"/>
                <path d="M44 50 L28 76 L44 76 L34 100 L62 72 L46 72 L56 50 Z" fill="#FFF" opacity="0.3"/>
            </g>
            
            <!-- Glow around lightning -->
            <ellipse cx="44" cy="74" rx="20" ry="28" fill="#FFD700" opacity="0.15" filter="url(#glow)"/>
        `);
    }
    
    // 🌫️ FOG
    fog() {
        return this.wrap(`
            <ellipse cx="50" cy="82" rx="38" ry="6" fill="#999" opacity="0.15" filter="url(#hugeShadow)"/>
            
            <!-- Thick fog layers -->
            <g filter="url(#bigShadow)">
                <rect x="5" y="30" width="90" height="18" rx="9" fill="#E0E0E0" opacity="0.9"/>
                <rect x="10" y="48" width="80" height="16" rx="8" fill="#E8E8E8" opacity="0.85"/>
                <rect x="15" y="64" width="70" height="14" rx="7" fill="#F0F0F0" opacity="0.7"/>
                <rect x="22" y="78" width="56" height="12" rx="6" fill="#F5F5F5" opacity="0.5"/>
            </g>
            
            <!-- Top bright layer -->
            <rect x="5" y="26" width="90" height="12" rx="6" fill="#FFF" opacity="0.5"/>
            <rect x="10" y="44" width="80" height="10" rx="5" fill="#FFF" opacity="0.4"/>
        `);
    }
    
    // 🌦️ DRIZZLE
    drizzle() {
        return this.wrap(`
            <ellipse cx="50" cy="78" rx="32" ry="8" fill="#999" opacity="0.2" filter="url(#hugeShadow)"/>
            
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#A0A0A0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#A0A0A0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#A0A0A0"/>
            </g>
            
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#C0C0C0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#C0C0C0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#C0C0C0"/>
            </g>
            
            <!-- Small drizzle lines -->
            <g filter="url(#bigShadow)">
                ${[[25, 60], [35, 64], [45, 60], [55, 64], [65, 60], [30, 72], [50, 76], [60, 72]].map(([x, y]) => `
                    <line x1="${x}" y1="${y}" x2="${x-2}" y2="${y+10}" stroke="url(#rainGrad)" stroke-width="3.5" stroke-linecap="round"/>
                `).join('')}
            </g>
        `);
    }
    
    // 🌨️ SLEET
    sleet() {
        return this.wrap(`
            <ellipse cx="50" cy="78" rx="32" ry="8" fill="#999" opacity="0.2" filter="url(#hugeShadow)"/>
            
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#A0A0A0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#A0A0A0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#A0A0A0"/>
            </g>
            
            <g filter="url(#bigShadow)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#C0C0C0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#C0C0C0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#C0C0C0"/>
            </g>
            
            <!-- Mixed rain and snow -->
            <g filter="url(#bigShadow)">
                <line x1="25" y1="60" x2="23" y2="72" stroke="url(#rainGrad)" stroke-width="3.5" stroke-linecap="round"/>
                <circle cx="40" cy="68" r="4" fill="url(#snowGrad)"/>
                <circle cx="38" cy="66" r="1.5" fill="#FFF" opacity="0.8"/>
                <line x1="55" y1="60" x2="53" y2="72" stroke="url(#rainGrad)" stroke-width="3.5" stroke-linecap="round"/>
                <circle cx="35" cy="78" r="4" fill="url(#snowGrad)"/>
                <circle cx="33" cy="76" r="1.5" fill="#FFF" opacity="0.8"/>
                <line x1="50" y1="70" x2="48" y2="82" stroke="url(#rainGrad)" stroke-width="3.5" stroke-linecap="round"/>
            </g>
        `);
    }
    
    getIcon(code, isDay = true) {
        const map = {
            0: isDay ? 'sun' : 'moon',
            1: isDay ? 'cloudSun' : 'cloud',
            2: isDay ? 'cloudSun' : 'cloud',
            3: 'cloud',
            45: 'fog',
            48: 'fog',
            51: 'drizzle',
            53: 'drizzle',
            55: 'drizzle',
            56: 'sleet',
            57: 'sleet',
            61: 'rain',
            63: 'rain',
            65: 'rain',
            66: 'sleet',
            67: 'sleet',
            71: 'snow',
            73: 'snow',
            75: 'snow',
            77: 'snow',
            80: 'rain',
            81: 'rain',
            82: 'thunder',
            85: 'snow',
            86: 'snow',
            95: 'thunder',
            96: 'thunder',
            99: 'thunder'
        };
        
        const name = map[code] || (isDay ? 'sun' : 'moon');
        if (typeof this[name] === 'function') {
            return this[name]();
        }
        return this.sun();
    }
}

// Global
const visible3DIcons = new Visible3DIcons();

function getWeatherIcon3D(code, isDay = true, size = 48) {
    const svg = visible3DIcons.getIcon(code, isDay);
    return `<div class="visible-3d-wrapper" style="width:${size}px;height:${size}px">${svg}</div>`;
}

// Override
if (typeof getWeatherIcon === 'function') {
    getWeatherIcon = function(code, isDay = true, size = 48) {
        return getWeatherIcon3D(code, isDay, size);
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Visible3DIcons, getWeatherIcon3D };
}