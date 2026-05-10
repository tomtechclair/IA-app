/**
 * 3D Weather Icons - Style realistic 3D design
 * Inspired by professional 3D weather icon sets
 */

class WeatherIcons3D {
    constructor() {
        this.colors = {
            sun: { main: '#FFD700', highlight: '#FFED4A', shadow: '#FFA500', dark: '#FF8C00' },
            moon: { main: '#E8E8E8', highlight: '#FFFFFF', shadow: '#C0C0C0', dark: '#A0A0A0' },
            cloud: { main: '#FFFFFF', highlight: '#F8F9FA', shadow: '#E2E8F0', dark: '#CBD5E0' },
            rain: { main: '#3B82F6', highlight: '#60A5FA', shadow: '#2563EB', dark: '#1D4ED8' },
            snow: { main: '#E0F2FE', highlight: '#F0F9FF', shadow: '#BAE6FD', dark: '#7DD3FC' },
            thunder: { main: '#FFD700', highlight: '#FFED4A', shadow: '#F59E0B', dark: '#D97706' },
            fog: { main: '#E2E8F0', highlight: '#F7FAFC', shadow: '#CBD5E0', dark: '#A0AEC0' }
        };
    }

    createSVG(content, viewBox = '0 0 100 100', className = '') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="weather-icon-3d ${className}">` +
               `<defs>` +
               `<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">` +
               `<feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>` +
               `</filter>` +
               `<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">` +
               `<feGaussianBlur stdDeviation="4" result="coloredBlur"/>` +
               `<feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>` +
               `</filter>` +
               `</defs>` +
               `${content}` +
               `</svg>`;
    }

    // Create 3D Sun with rays and depth
    createSun3D() {
        const c = this.colors.sun;
        return this.createSVG(`
            <!-- Sun rays -->
            <g filter="url(#shadow)">
                ${Array.from({length: 8}, (_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const x1 = 50 + Math.cos(angle) * 32;
                    const y1 = 50 + Math.sin(angle) * 32;
                    const x2 = 50 + Math.cos(angle) * 42;
                    const y2 = 50 + Math.sin(angle) * 42;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c.main}" stroke-width="4" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <!-- Sun body with 3D effect -->
            <circle cx="50" cy="50" r="22" fill="${c.shadow}" filter="url(#shadow)"/>
            <circle cx="48" cy="48" r="22" fill="${c.dark}"/>
            <circle cx="49" cy="49" r="21" fill="${c.main}"/>
            <circle cx="48" cy="47" r="19" fill="${c.highlight}"/>
            
            <!-- Inner highlight -->
            <ellipse cx="44" cy="42" rx="8" ry="6" fill="${c.highlight}" opacity="0.6"/>
        `);
    }

    // Create 3D Moon with craters
    createMoon3D() {
        const c = this.colors.moon;
        return this.createSVG(`
            <!-- Moon shadow -->
            <circle cx="52" cy="52" r="20" fill="${c.dark}" filter="url(#shadow)"/>
            
            <!-- Moon body -->
            <circle cx="50" cy="50" r="20" fill="${c.shadow}"/>
            <circle cx="49" cy="49" r="20" fill="${c.main}"/>
            <circle cx="48" cy="48" r="20" fill="c.light}"/>
            
            <!-- Craters for 3D effect -->
            <circle cx="42" cy="42" r="4" fill="${c.shadow}" opacity="0.4"/>
            <circle cx="58" cy="55" r="3" fill="${c.shadow}" opacity="0.3"/>
            <circle cx="45" cy="58" r="2.5" fill="${c.shadow}" opacity="0.35"/>
            <circle cx="55" cy="40" r="3.5" fill="${c.shadow}" opacity="0.25"/>
            
            <!-- Highlight -->
            <ellipse cx="45" cy="42" rx="6" ry="8" fill="${c.highlight}" opacity="0.5"/>
        `);
    }

    // Create 3D Cloud with depth
    createCloud3D() {
        const c = this.colors.cloud;
        return this.createSVG(`
            <!-- Cloud shadow -->
            <g filter="url(#shadow)">
                <ellipse cx="50" cy="58" rx="28" ry="18" fill="${c.dark}"/>
                <ellipse cx="38" cy="50" rx="18" ry="14" fill="${c.dark}"/>
                <ellipse cx="62" cy="52" rx="16" ry="12" fill="${c.dark}"/>
            </g>
            
            <!-- Cloud body -->
            <ellipse cx="50" cy="56" rx="28" ry="18" fill="${c.shadow}"/>
            <ellipse cx="38" cy="48" rx="18" ry="14" fill="${c.shadow}"/>
            <ellipse cx="62" cy="50" rx="16" ry="12" fill="c.shadow}"/>
            
            <!-- Cloud highlight -->
            <ellipse cx="50" cy="54" rx="26" ry="16" fill="${c.main}"/>
            <ellipse cx="38" cy="46" rx="16" ry="12" fill="${c.main}"/>
            <ellipse cx="62" cy="48" rx="14" ry="10" fill="${c.main}"/>
            
            <!-- Top highlights -->
            <ellipse cx="38" cy="42" rx="12" ry="8" fill="${c.highlight}" opacity="0.8"/>
            <ellipse cx="50" cy="48" rx="20" ry="10" fill="${c.highlight}" opacity="0.6"/>
        `);
    }

    // Create 3D Cloud with Sun
    createCloudSun3D() {
        const cc = this.colors.cloud;
        const sc = this.colors.sun;
        return this.createSVG(`
            <!-- Sun behind cloud -->
            <g filter="url(#shadow)">
                ${Array.from({length: 6}, (_, i) => {
                    const angle = (i * 60 + 30) * Math.PI / 180;
                    const x1 = 68 + Math.cos(angle) * 18;
                    const y1 = 32 + Math.sin(angle) * 18;
                    const x2 = 68 + Math.cos(angle) * 26;
                    const y2 = 32 + Math.sin(angle) * 26;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${sc.main}" stroke-width="3.5" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <circle cx="68" cy="32" r="14" fill="${sc.shadow}" filter="url(#shadow)"/>
            <circle cx="67" cy="31" r="14" fill="${sc.main}"/>
            <circle cx="66" cy="30" r="12" fill="${sc.highlight}"/>
            
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="42" cy="62" rx="24" ry="16" fill="${cc.dark}"/>
                <ellipse cx="32" cy="54" rx="16" ry="12" fill="${cc.dark}"/>
                <ellipse cx="52" cy="56" rx="14" ry="10" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="42" cy="60" rx="24" ry="16" fill="${cc.shadow}"/>
            <ellipse cx="32" cy="52" rx="16" ry="12" fill="${cc.shadow}"/>
            <ellipse cx="52" cy="54" rx="14" ry="10" fill="${cc.shadow}"/>
            
            <ellipse cx="42" cy="58" rx="22" ry="14" fill="${cc.main}"/>
            <ellipse cx="32" cy="50" rx="14" ry="10" fill="${cc.main}"/>
            <ellipse cx="52" cy="52" rx="12" ry="8" fill="${cc.main}"/>
            
            <ellipse cx="32" cy="46" rx="10" ry="6" fill="${cc.highlight}" opacity="0.8"/>
        `);
    }

    // Create 3D Cloud with Moon
    createCloudMoon3D() {
        const cc = this.colors.cloud;
        const mc = this.colors.moon;
        return this.createSVG(`
            <!-- Moon behind cloud -->
            <circle cx="70" cy="30" r="12" fill="${mc.shadow}" filter="url(#shadow)"/>
            <circle cx="69" cy="29" r="12" fill="${mc.main}"/>
            <circle cx="70" cy="30" r="10" fill="${mc.highlight}" opacity="0.3"/>
            
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="42" cy="62" rx="24" ry="16" fill="${cc.dark}"/>
                <ellipse cx="32" cy="54" rx="16" ry="12" fill="${cc.dark}"/>
                <ellipse cx="52" cy="56" rx="14" ry="10" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="42" cy="60" rx="24" ry="16" fill="${cc.shadow}"/>
            <ellipse cx="32" cy="52" rx="16" ry="12" fill="${cc.shadow}"/>
            <ellipse cx="52" cy="54" rx="14" ry="10" fill="${cc.shadow}"/>
            
            <ellipse cx="42" cy="58" rx="22" ry="14" fill="${cc.main}"/>
            <ellipse cx="32" cy="50" rx="14" ry="10" fill="${cc.main}"/>
            <ellipse cx="52" cy="52" rx="12" ry="8" fill="${cc.main}"/>
            
            <ellipse cx="32" cy="46" rx="10" ry="6" fill="${cc.highlight}" opacity="0.8"/>
        `);
    }

    // Create 3D Rain
    createRain3D() {
        const cc = this.colors.cloud;
        const rc = this.colors.rain;
        return this.createSVG(`
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="50" cy="42" rx="26" ry="16" fill="${cc.dark}"/>
                <ellipse cx="38" cy="34" rx="18" ry="12" fill="${cc.dark}"/>
                <ellipse cx="62" cy="36" rx="16" ry="10" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="50" cy="40" rx="26" ry="16" fill="${cc.shadow}"/>
            <ellipse cx="38" cy="32" rx="18" ry="12" fill="${cc.shadow}"/>
            <ellipse cx="62" cy="34" rx="16" ry="10" fill="${cc.shadow}"/>
            
            <ellipse cx="50" cy="38" rx="24" ry="14" fill="${cc.main}"/>
            <ellipse cx="38" cy="30" rx="16" ry="10" fill="${cc.main}"/>
            <ellipse cx="62" cy="32" rx="14" ry="8" fill="${cc.main}"/>
            
            <ellipse cx="38" cy="26" rx="12" ry="6" fill="${cc.highlight}" opacity="0.8"/>
            
            <!-- Rain drops with 3D effect -->
            <g filter="url(#shadow)">
                <ellipse cx="30" cy="65" rx="3" ry="8" fill="${rc.dark}"/>
                <ellipse cx="45" cy="72" rx="3" ry="9" fill="${rc.dark}"/>
                <ellipse cx="60" cy="68" rx="3" ry="8" fill="${rc.dark}"/>
                <ellipse cx="38" cy="78" rx="3" ry="9" fill="${rc.dark}"/>
                <ellipse cx="52" cy="82" rx="3" ry="8" fill="${rc.dark}"/>
            </g>
            
            <ellipse cx="30" cy="64" rx="3" ry="8" fill="${rc.main}"/>
            <ellipse cx="45" cy="71" rx="3" ry="9" fill="${rc.main}"/>
            <ellipse cx="60" cy="67" rx="3" ry="8" fill="${rc.main}"/>
            <ellipse cx="38" cy="77" rx="3" ry="9" fill="${rc.main}"/>
            <ellipse cx="52" cy="81" rx="3" ry="8" fill="${rc.main}"/>
            
            <!-- Highlights on drops -->
            <ellipse cx="29" cy="61" rx="1.5" ry="4" fill="${rc.highlight}" opacity="0.7"/>
            <ellipse cx="44" cy="67" rx="1.5" ry="5" fill="${rc.highlight}" opacity="0.7"/>
            <ellipse cx="59" cy="64" rx="1.5" ry="4" fill="${rc.highlight}" opacity="0.7"/>
        `);
    }

    // Create 3D Snow
    createSnow3D() {
        const cc = this.colors.cloud;
        const sc = this.colors.snow;
        return this.createSVG(`
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="50" cy="42" rx="26" ry="16" fill="${cc.dark}"/>
                <ellipse cx="38" cy="34" rx="18" ry="12" fill="${cc.dark}"/>
                <ellipse cx="62" cy="36" rx="16" ry="10" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="50" cy="40" rx="26" ry="16" fill="${cc.shadow}"/>
            <ellipse cx="38" cy="32" rx="18" ry="12" fill="${cc.shadow}"/>
            <ellipse cx="62" cy="34" rx="16" ry="10" fill="${cc.shadow}"/>
            
            <ellipse cx="50" cy="38" rx="24" ry="14" fill="${cc.main}"/>
            <ellipse cx="38" cy="30" rx="16" ry="10" fill="${cc.main}"/>
            <ellipse cx="62" cy="32" rx="14" ry="8" fill="${cc.main}"/>
            
            <!-- Snowflakes with 3D effect -->
            <g filter="url(#shadow)">
                ${[[30, 65], [45, 72], [60, 68], [38, 78], [52, 82], [35, 58], [55, 55]].map(([x, y]) => `
                    <circle cx="${x}" cy="${y}" r="5" fill="${sc.dark}"/>
                    <circle cx="${x}" cy="${y}" r="4" fill="${sc.main}"/>
                    <circle cx="${x-1}" cy="${y-1}" r="2" fill="${sc.highlight}" opacity="0.8"/>
                `).join('')}
            </g>
            
            <!-- Snowflake details -->
            <g stroke="${sc.highlight}" stroke-width="1.5" opacity="0.6">
                ${[[30, 65], [45, 72], [60, 68]].map(([x, y]) => `
                    <line x1="${x}" y1="${y-4}" x2="${x}" y2="${y+4}"/>
                    <line x1="${x-4}" y1="${y}" x2="${x+4}" y2="${y}"/>
                    <line x1="${x-3}" y1="${y-3}" x2="${x+3}" y2="${y+3}"/>
                    <line x1="${x-3}" y1="${y+3}" x2="${x+3}" y2="${y-3}"/>
                `).join('')}
            </g>
        `);
    }

    // Create 3D Thunder
    createThunder3D() {
        const cc = this.colors.cloud;
        const tc = this.colors.thunder;
        return this.createSVG(`
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="50" cy="42" rx="26" ry="16" fill="${cc.dark}"/>
                <ellipse cx="38" cy="34" rx="18" ry="12" fill="${cc.dark}"/>
                <ellipse cx="62" cy="36" rx="16" ry="10" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="50" cy="40" rx="26" ry="16" fill="${cc.shadow}"/>
            <ellipse cx="38" cy="32" rx="18" ry="12" fill="${cc.shadow}"/>
            <ellipse cx="62" cy="34" rx="16" ry="10" fill="${cc.shadow}"/>
            
            <ellipse cx="50" cy="38" rx="24" ry="14" fill="${cc.main}"/>
            <ellipse cx="38" cy="30" rx="16" ry="10" fill="${cc.main}"/>
            <ellipse cx="62" cy="32" rx="14" ry="8" fill="${cc.main}"/>
            
            <!-- Lightning bolt with 3D effect -->
            <g filter="url(#shadow)">
                <path d="M48 52 L38 72 L48 72 L42 92 L58 68 L48 68 L52 52 Z" fill="${tc.dark}"/>
            </g>
            
            <path d="M48 50 L38 70 L48 70 L42 90 L58 66 L48 66 L52 50 Z" fill="${tc.main}"/>
            <path d="M48 50 L38 70 L48 70 L42 90 L58 66 L48 66 L52 50 Z" fill="${tc.highlight}" opacity="0.3"/>
            
            <!-- Glow effect -->
            <ellipse cx="48" cy="70" rx="15" ry="20" fill="${tc.main}" opacity="0.2" filter="url(#glow)"/>
        `);
    }

    // Create 3D Fog
    createFog3D() {
        const fc = this.colors.fog;
        return this.createSVG(`
            <!-- Fog layers with 3D depth -->
            <g filter="url(#shadow)">
                <rect x="10" y="35" width="80" height="8" rx="4" fill="${fc.dark}"/>
                <rect x="15" y="48" width="70" height="8" rx="4" fill="${fc.dark}"/>
                <rect x="20" y="61" width="60" height="8" rx="4" fill="${fc.dark}"/>
            </g>
            
            <rect x="10" y="33" width="80" height="8" rx="4" fill="${fc.shadow}"/>
            <rect x="15" y="46" width="70" height="8" rx="4" fill="${fc.shadow}"/>
            <rect x="20" y="59" width="60" height="8" rx="4" fill="${fc.shadow}"/>
            
            <rect x="10" y="31" width="80" height="8" rx="4" fill="${fc.main}"/>
            <rect x="15" y="44" width="70" height="8" rx="4" fill="${fc.main}"/>
            <rect x="20" y="57" width="60" height="8" rx="4" fill="${fc.main}"/>
            
            <rect x="10" y="29" width="80" height="6" rx="3" fill="${fc.highlight}" opacity="0.6"/>
            <rect x="15" y="42" width="70" height="6" rx="3" fill="${fc.highlight}" opacity="0.5"/>
        `);
    }

    // Create 3D Drizzle
    createDrizzle3D() {
        const cc = this.colors.cloud;
        const rc = this.colors.rain;
        return this.createSVG(`
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="50" cy="42" rx="26" ry="16" fill="${cc.dark}"/>
                <ellipse cx="38" cy="34" rx="18" ry="12" fill="${cc.dark}"/>
                <ellipse cx="62" cy="36" rx="16" ry="10" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="50" cy="40" rx="26" ry="16" fill="${cc.shadow}"/>
            <ellipse cx="38" cy="32" rx="18" ry="12" fill="${cc.shadow}"/>
            <ellipse cx="62" cy="34" rx="16" ry="10" fill="${cc.shadow}"/>
            
            <ellipse cx="50" cy="38" rx="24" ry="14" fill="${cc.main}"/>
            <ellipse cx="38" cy="30" rx="16" ry="10" fill="${cc.main}"/>
            <ellipse cx="62" cy="32" rx="14" ry="8" fill="${cc.main}"/>
            
            <!-- Small drizzle drops -->
            <g filter="url(#shadow)">
                ${[[30, 58], [40, 62], [50, 58], [60, 62], [35, 68], [45, 72], [55, 68]].map(([x, y]) => `
                    <line x1="${x}" y1="${y}" x2="${x-2}" y2="${y+6}" stroke="${rc.dark}" stroke-width="2.5" stroke-linecap="round"/>
                `).join('')}
            </g>
            
            ${[[30, 58], [40, 62], [50, 58], [60, 62], [35, 68], [45, 72], [55, 68]].map(([x, y]) => `
                <line x1="${x}" y1="${y}" x2="${x-2}" y2="${y+6}" stroke="${rc.main}" stroke-width="2.5" stroke-linecap="round"/>
            `).join('')}
        `);
    }

    // Create 3D Sleet
    createSleet3D() {
        const cc = this.colors.cloud;
        const rc = this.colors.rain;
        const sc = this.colors.snow;
        return this.createSVG(`
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="50" cy="42" rx="26" ry="16" fill="${cc.dark}"/>
                <ellipse cx="38" cy="34" rx="18" ry="12" fill="${cc.dark}"/>
                <ellipse cx="62" cy="36" rx="16" ry="10" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="50" cy="40" rx="26" ry="16" fill="${cc.shadow}"/>
            <ellipse cx="38" cy="32" rx="18" ry="12" fill="${cc.shadow}"/>
            <ellipse cx="62" cy="34" rx="16" ry="10" fill="${cc.shadow}"/>
            
            <ellipse cx="50" cy="38" rx="24" ry="14" fill="${cc.main}"/>
            <ellipse cx="38" cy="30" rx="16" ry="10" fill="${cc.main}"/>
            <ellipse cx="62" cy="32" rx="14" ry="8" fill="${cc.main}"/>
            
            <!-- Mixed rain and snow -->
            <g filter="url(#shadow)">
                <ellipse cx="30" cy="65" rx="3" ry="7" fill="${rc.dark}"/>
                <circle cx="45" cy="68" r="4" fill="${sc.dark}"/>
                <ellipse cx="60" cy="65" rx="3" ry="7" fill="${rc.dark}"/>
                <circle cx="38" cy="76" r="4" fill="${sc.dark}"/>
                <ellipse cx="52" cy="78" rx="3" ry="7" fill="${rc.dark}"/>
            </g>
            
            <ellipse cx="30" cy="64" rx="3" ry="7" fill="${rc.main}"/>
            <circle cx="45" cy="67" r="4" fill="${sc.main}"/>
            <ellipse cx="60" cy="64" rx="3" ry="7" fill="${rc.main}"/>
            <circle cx="38" cy="75" r="4" fill="${sc.main}"/>
            <ellipse cx="52" cy="77" rx="3" ry="7" fill="${rc.main}"/>
        `);
    }

    // Create 3D Cloud with Sun and Rain
    createCloudSunRain3D() {
        const cc = this.colors.cloud;
        const rc = this.colors.rain;
        const sc = this.colors.sun;
        return this.createSVG(`
            <!-- Sun -->
            <g filter="url(#shadow)">
                ${Array.from({length: 5}, (_, i) => {
                    const angle = (i * 72 + 20) * Math.PI / 180;
                    const x1 = 72 + Math.cos(angle) * 14;
                    const y1 = 28 + Math.sin(angle) * 14;
                    const x2 = 72 + Math.cos(angle) * 20;
                    const y2 = 28 + Math.sin(angle) * 20;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${sc.main}" stroke-width="3" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <circle cx="72" cy="28" r="10" fill="${sc.shadow}" filter="url(#shadow)"/>
            <circle cx="71" cy="27" r="10" fill="${sc.main}"/>
            <circle cx="70" cy="26" r="8" fill="${sc.highlight}"/>
            
            <!-- Cloud -->
            <g filter="url(#shadow)">
                <ellipse cx="42" cy="55" rx="22" ry="14" fill="${cc.dark}"/>
                <ellipse cx="32" cy="48" rx="14" ry="10" fill="${cc.dark}"/>
                <ellipse cx="52" cy="50" rx="12" ry="8" fill="${cc.dark}"/>
            </g>
            
            <ellipse cx="42" cy="53" rx="22" ry="14" fill="${cc.shadow}"/>
            <ellipse cx="32" cy="46" rx="14" ry="10" fill="${cc.shadow}"/>
            <ellipse cx="52" cy="48" rx="12" ry="8" fill="${cc.shadow}"/>
            
            <ellipse cx="42" cy="51" rx="20" ry="12" fill="${cc.main}"/>
            <ellipse cx="32" cy="44" rx="12" ry="8" fill="${cc.main}"/>
            <ellipse cx="52" cy="46" rx="10" ry="6" fill="${cc.main}"/>
            
            <!-- Rain -->
            <g filter="url(#shadow)">
                <ellipse cx="25" cy="72" rx="2.5" ry="6" fill="${rc.dark}"/>
                <ellipse cx="38" cy="76" rx="2.5" ry="7" fill="${rc.dark}"/>
                <ellipse cx="52" cy="72" rx="2.5" ry="6" fill="${rc.dark}"/>
            </g>
            
            <ellipse cx="25" cy="71" rx="2.5" ry="6" fill="${rc.main}"/>
            <ellipse cx="38" cy="75" rx="2.5" ry="7" fill="${rc.main}"/>
            <ellipse cx="52" cy="71" rx="2.5" ry="6" fill="${rc.main}"/>
        `);
    }

    // Get icon based on WMO weather code
    getIcon(code, isDay = true) {
        const iconMap = {
            0: isDay ? 'sun' : 'moon',
            1: isDay ? 'cloudSun' : 'cloudMoon',
            2: isDay ? 'cloudSun' : 'cloudMoon',
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

        const iconName = iconMap[code] || (isDay ? 'sun' : 'moon');
        const methodName = `create${iconName.charAt(0).toUpperCase() + iconName.slice(1)}3D`;
        
        if (typeof this[methodName] === 'function') {
            return this[methodName]();
        }
        
        return this.createSun3D();
    }
}

// Create global instance
const weatherIcons3D = new WeatherIcons3D();

// Helper function to get 3D weather icon
function getWeatherIcon3D(code, isDay = true, size = 48) {
    const svg = weatherIcons3D.getIcon(code, isDay);
    return `<div class="weather-icon-3d-container" style="width: ${size}px; height: ${size}px;">${svg}</div>`;
}

// Override the existing getWeatherIcon function
if (typeof getWeatherIcon === 'function') {
    const originalGetWeatherIcon = getWeatherIcon;
    getWeatherIcon = function(code, isDay = true, size = 48) {
        return getWeatherIcon3D(code, isDay, size);
    };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherIcons3D, getWeatherIcon3D };
}