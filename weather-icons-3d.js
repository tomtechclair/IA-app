/**
 * Ultra 3D Weather Icons
 * Professional 3D icons with realistic depth, lighting, and materials
 */

class Ultra3DWeatherIcons {
    constructor() {
        this.defs = `
        <defs>
            <!-- 3D Sphere Gradient for Sun -->
            <radialGradient id="sun3d" cx="35%" cy="30%" r="65%">
                <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
                <stop offset="20%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#FFA500;stop-opacity:1" />
                <stop offset="80%" style="stop-color:#FF8C00;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#CC5500;stop-opacity:1" />
            </radialGradient>
            
            <!-- 3D Moon Gradient -->
            <radialGradient id="moon3d" cx="35%" cy="30%" r="65%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="30%" style="stop-color:#F5F5F5;stop-opacity:1" />
                <stop offset="60%" style="stop-color:#E0E0E0;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#B0B0B0;stop-opacity:1" />
            </radialGradient>
            
            <!-- 3D Cloud Gradient -->
            <radialGradient id="cloud3d-top" cx="30%" cy="20%" r="70%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#F0F0F0;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#D0D0D0;stop-opacity:1" />
            </radialGradient>
            
            <radialGradient id="cloud3d-bottom" cx="50%" cy="80%" r="60%">
                <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#B8B8B8;stop-opacity:1" />
            </radialGradient>
            
            <!-- Water Drop Gradient -->
            <radialGradient id="water3d" cx="35%" cy="30%" r="65%">
                <stop offset="0%" style="stop-color:#E0F7FA;stop-opacity:1" />
                <stop offset="30%" style="stop-color:#4FC3F7;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#0288D1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#01579B;stop-opacity:1" />
            </radialGradient>
            
            <!-- Snow Gradient -->
            <radialGradient id="snow3d" cx="35%" cy="35%" r="65%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#E0F7FA;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#B2EBF2;stop-opacity:1" />
            </radialGradient>
            
            <!-- Lightning Gradient -->
            <radialGradient id="lightning3d" cx="50%" cy="20%" r="80%">
                <stop offset="0%" style="stop-color:#FFFF00;stop-opacity:1" />
                <stop offset="40%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#FF8C00;stop-opacity:1" />
            </radialGradient>
            
            <!-- 3D Filters -->
            <filter id="shadow3d" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="0" dy="6" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.4"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode in="offsetblur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode in="offsetblur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <filter id="glow3d" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <filter id="innerShadow">
                <feOffset dx="0" dy="3"/>
                <feGaussianBlur stdDeviation="3" result="offset-blur"/>
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                <feFlood flood-color="black" flood-opacity="0.3" result="color"/>
                <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
            </filter>
        </defs>
        `;
    }
    
    wrap(content, viewBox = '0 0 100 100') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="ultra-3d-icon">${this.defs}${content}</svg>`;
    }
    
    // REALISTIC 3D SUN
    sun() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000" opacity="0.15" filter="url(#shadow3d)"/>
            
            <!-- Back glow -->
            <circle cx="50" cy="48" r="32" fill="#FFD700" opacity="0.15" filter="url(#glow3d)"/>
            
            <!-- Sun rays -->
            <g opacity="0.9">
                ${Array.from({length: 12}, (_, i) => {
                    const angle = (i * 30) * Math.PI / 180;
                    const x1 = 50 + Math.cos(angle) * 28;
                    const y1 = 48 + Math.sin(angle) * 28;
                    const x2 = 50 + Math.cos(angle) * 40;
                    const y2 = 48 + Math.sin(angle) * 40;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#sun3d)" stroke-width="5" stroke-linecap="round" opacity="0.7"/>`;
                }).join('')}
            </g>
            
            <!-- Main sun body -->
            <circle cx="50" cy="48" r="22" fill="url(#sun3d)" filter="url(#shadow3d)"/>
            
            <!-- Sun highlight -->
            <ellipse cx="42" cy="38" rx="8" ry="6" fill="#FFF" opacity="0.4"/>
            <ellipse cx="44" cy="40" rx="4" ry="3" fill="#FFF" opacity="0.6"/>
        `);
    }
    
    // REALISTIC 3D MOON
    moon() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="22" ry="5" fill="#000" opacity="0.15" filter="url(#shadow3d)"/>
            
            <!-- Moon glow -->
            <circle cx="50" cy="48" r="28" fill="#E0E0E0" opacity="0.1" filter="url(#glow3d)"/>
            
            <!-- Main moon body -->
            <circle cx="50" cy="48" r="22" fill="url(#moon3d)" filter="url(#shadow3d)"/>
            
            <!-- Craters for realism -->
            <circle cx="40" cy="40" r="5" fill="#C0C0C0" opacity="0.3"/>
            <circle cx="38" cy="42" r="2" fill="#B0B0B0" opacity="0.4"/>
            <circle cx="58" cy="55" r="4" fill="#C0C0C0" opacity="0.25"/>
            <circle cx="45" cy="58" r="3" fill="#C0C0C0" opacity="0.3"/>
            <circle cx="55" cy="38" r="3.5" fill="#D0D0D0" opacity="0.2"/>
            
            <!-- Highlight -->
            <ellipse cx="42" cy="38" rx="6" ry="8" fill="#FFF" opacity="0.25"/>
            <ellipse cx="44" cy="40" rx="3" ry="4" fill="#FFF" opacity="0.4"/>
        `);
    }
    
    // REALISTIC 3D CLOUD
    cloud() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="35" ry="6" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud shadow/bottom layer -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="58" rx="32" ry="18" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="35" cy="48" rx="22" ry="16" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="65" cy="50" rx="20" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="42" cy="40" rx="18" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="58" cy="42" rx="16" ry="12" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <!-- Cloud main body -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="56" rx="30" ry="16" fill="url(#cloud3d-top)"/>
                <ellipse cx="35" cy="46" rx="20" ry="14" fill="url(#cloud3d-top)"/>
                <ellipse cx="65" cy="48" rx="18" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="42" cy="38" rx="16" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="58" cy="40" rx="14" ry="10" fill="url(#cloud3d-top)"/>
            </g>
            
            <!-- Top highlights for 3D effect -->
            <ellipse cx="35" cy="38" rx="14" ry="8" fill="#FFF" opacity="0.6"/>
            <ellipse cx="50" cy="44" rx="18" ry="8" fill="#FFF" opacity="0.4"/>
            <ellipse cx="42" cy="32" rx="10" ry="6" fill="#FFF" opacity="0.7"/>
        `);
    }
    
    // REALISTIC 3D CLOUD + SUN
    cloudSun() {
        return this.wrap(`
            <!-- Sun in background -->
            <circle cx="72" cy="32" r="18" fill="#FFD700" opacity="0.1" filter="url(#glow3d)"/>
            
            ${Array.from({length: 8}, (_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const x1 = 72 + Math.cos(angle) * 16;
                const y1 = 32 + Math.sin(angle) * 16;
                const x2 = 72 + Math.cos(angle) * 24;
                const y2 = 32 + Math.sin(angle) * 24;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#sun3d)" stroke-width="4" stroke-linecap="round" opacity="0.6"/>`;
            }).join('')}
            
            <circle cx="72" cy="32" r="14" fill="url(#sun3d)" filter="url(#shadow3d)"/>
            <ellipse cx="68" cy="26" rx="4" ry="3" fill="#FFF" opacity="0.5"/>
            
            <!-- Ground shadow -->
            <ellipse cx="42" cy="88" rx="30" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud bottom -->
            <g filter="url(#softShadow)">
                <ellipse cx="42" cy="62" rx="28" ry="16" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="28" cy="52" rx="18" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="55" cy="54" rx="16" ry="12" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="35" cy="44" rx="14" ry="12" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <!-- Cloud top -->
            <g filter="url(#softShadow)">
                <ellipse cx="42" cy="60" rx="26" ry="14" fill="url(#cloud3d-top)"/>
                <ellipse cx="28" cy="50" rx="16" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="55" cy="52" rx="14" ry="10" fill="url(#cloud3d-top)"/>
                <ellipse cx="35" cy="42" rx="12" ry="10" fill="url(#cloud3d-top)"/>
            </g>
            
            <ellipse cx="28" cy="42" rx="10" ry="6" fill="#FFF" opacity="0.6"/>
            <ellipse cx="42" cy="48" rx="12" ry="6" fill="#FFF" opacity="0.4"/>
        `);
    }
    
    // REALISTIC 3D CLOUD + MOON
    cloudMoon() {
        return this.wrap(`
            <!-- Moon in background -->
            <circle cx="72" cy="30" r="12" fill="#E0E0E0" opacity="0.1" filter="url(#glow3d)"/>
            <circle cx="72" cy="30" r="10" fill="url(#moon3d)" filter="url(#shadow3d)"/>
            <circle cx="70" cy="28" r="2.5" fill="#C0C0C0" opacity="0.3"/>
            <ellipse cx="68" cy="26" rx="3" ry="4" fill="#FFF" opacity="0.3"/>
            
            <!-- Ground shadow -->
            <ellipse cx="42" cy="88" rx="30" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud bottom -->
            <g filter="url(#softShadow)">
                <ellipse cx="42" cy="62" rx="28" ry="16" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="28" cy="52" rx="18" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="55" cy="54" rx="16" ry="12" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="35" cy="44" rx="14" ry="12" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <!-- Cloud top -->
            <g filter="url(#softShadow)">
                <ellipse cx="42" cy="60" rx="26" ry="14" fill="url(#cloud3d-top)"/>
                <ellipse cx="28" cy="50" rx="16" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="55" cy="52" rx="14" ry="10" fill="url(#cloud3d-top)"/>
                <ellipse cx="35" cy="42" rx="12" ry="10" fill="url(#cloud3d-top)"/>
            </g>
            
            <ellipse cx="28" cy="42" rx="10" ry="6" fill="#FFF" opacity="0.5"/>
            <ellipse cx="42" cy="48" rx="12" ry="6" fill="#FFF" opacity="0.3"/>
        `);
    }
    
    // REALISTIC 3D RAIN
    rain() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud bottom -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="44" rx="26" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="36" cy="36" rx="18" ry="12" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="64" cy="38" rx="16" ry="10" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="42" cy="28" rx="14" ry="10" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <!-- Cloud top -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="42" rx="24" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="36" cy="34" rx="16" ry="10" fill="url(#cloud3d-top)"/>
                <ellipse cx="64" cy="36" rx="14" ry="8" fill="url(#cloud3d-top)"/>
                <ellipse cx="42" cy="26" rx="12" ry="8" fill="url(#cloud3d-top)"/>
            </g>
            
            <ellipse cx="36" cy="26" rx="10" ry="5" fill="#FFF" opacity="0.4"/>
            
            <!-- 3D Rain drops with teardrop shape -->
            <g filter="url(#shadow3d)">
                ${[[25, 64], [45, 70], [65, 66], [35, 78], [55, 82]].map(([x, y]) => `
                    <path d="M${x} ${y} Q${x-3} ${y+8} ${x} ${y+14} Q${x+3} ${y+8} ${x} ${y} Z" fill="url(#water3d)"/>
                    <ellipse cx="${x}" cy="${y+2}" rx="2" ry="3" fill="#E0F7FA" opacity="0.6"/>
                `).join('')}
            </g>
        `);
    }
    
    // REALISTIC 3D SNOW
    snow() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="44" rx="26" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="36" cy="36" rx="18" ry="12" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="64" cy="38" rx="16" ry="10" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="42" rx="24" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="36" cy="34" rx="16" ry="10" fill="url(#cloud3d-top)"/>
                <ellipse cx="64" cy="36" rx="14" ry="8" fill="url(#cloud3d-top)"/>
            </g>
            
            <!-- 3D Snowflakes -->
            <g filter="url(#shadow3d)">
                ${[[28, 62], [48, 68], [68, 64], [38, 78], [58, 82]].map(([x, y]) => `
                    <circle cx="${x}" cy="${y}" r="5" fill="url(#snow3d)"/>
                    <circle cx="${x-1}" cy="${y-1}" r="2" fill="#FFF" opacity="0.8"/>
                    <g stroke="#FFF" stroke-width="1" opacity="0.7">
                        <line x1="${x}" y1="${y-4}" x2="${x}" y2="${y+4}"/>
                        <line x1="${x-4}" y1="${y}" x2="${x+4}" y2="${y}"/>
                        <line x1="${x-3}" y1="${y-3}" x2="${x+3}" y2="${y+3}"/>
                        <line x1="${x-3}" y1="${y+3}" x2="${x+3}" y2="${y-3}"/>
                    </g>
                `).join('')}
            </g>
        `);
    }
    
    // REALISTIC 3D THUNDER
    thunder() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Dark cloud bottom -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="44" rx="26" ry="14" fill="#8B8B8B"/>
                <ellipse cx="36" cy="36" rx="18" ry="12" fill="#8B8B8B"/>
                <ellipse cx="64" cy="38" rx="16" ry="10" fill="#8B8B8B"/>
            </g>
            
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="42" rx="24" ry="12" fill="#A0A0A0"/>
                <ellipse cx="36" cy="34" rx="16" ry="10" fill="#A0A0A0"/>
                <ellipse cx="64" cy="36" rx="14" ry="8" fill="#A0A0A0"/>
            </g>
            
            <!-- Lightning bolt 3D -->
            <g filter="url(#shadow3d)">
                <path d="M46 50 L34 70 L46 70 L38 88 L60 66 L48 66 L54 50 Z" fill="url(#lightning3d)"/>
                <path d="M46 50 L34 70 L46 70 L38 88 L60 66 L48 66 L54 50 Z" fill="#FFF" opacity="0.3"/>
            </g>
            
            <!-- Lightning glow -->
            <ellipse cx="48" cy="68" rx="18" ry="24" fill="#FFD700" opacity="0.15" filter="url(#glow3d)"/>
        `);
    }
    
    // REALISTIC 3D FOG
    fog() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="35" ry="5" fill="#000" opacity="0.08" filter="url(#shadow3d)"/>
            
            <!-- Multiple fog layers with depth -->
            <g filter="url(#softShadow)">
                <rect x="8" y="32" width="84" height="14" rx="7" fill="#E8E8E8" opacity="0.9"/>
                <rect x="12" y="46" width="76" height="12" rx="6" fill="#F0F0F0" opacity="0.8"/>
                <rect x="18" y="58" width="64" height="10" rx="5" fill="#F5F5F5" opacity="0.7"/>
                <rect x="25" y="68" width="50" height="8" rx="4" fill="#FAFAFA" opacity="0.6"/>
            </g>
            
            <!-- Top highlights -->
            <rect x="8" y="30" width="84" height="10" rx="5" fill="#FFF" opacity="0.5"/>
            <rect x="12" y="44" width="76" height="8" rx="4" fill="#FFF" opacity="0.4"/>
        `);
    }
    
    // REALISTIC 3D DRIZZLE
    drizzle() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="44" rx="26" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="36" cy="36" rx="18" ry="12" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="64" cy="38" rx="16" ry="10" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="42" rx="24" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="36" cy="34" rx="16" ry="10" fill="url(#cloud3d-top)"/>
                <ellipse cx="64" cy="36" rx="14" ry="8" fill="url(#cloud3d-top)"/>
            </g>
            
            <!-- Small drizzle drops -->
            <g filter="url(#shadow3d)">
                ${[[30, 58], [40, 62], [50, 58], [60, 62], [35, 68], [45, 72], [55, 68]].map(([x, y]) => `
                    <line x1="${x}" y1="${y}" x2="${x-2}" y2="${y+7}" stroke="url(#water3d)" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="${x}" cy="${y}" r="1.5" fill="#E0F7FA" opacity="0.6"/>
                `).join('')}
            </g>
        `);
    }
    
    // REALISTIC 3D SLEET
    sleet() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="28" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud -->
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="44" rx="26" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="36" cy="36" rx="18" ry="12" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="64" cy="38" rx="16" ry="10" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <g filter="url(#softShadow)">
                <ellipse cx="50" cy="42" rx="24" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="36" cy="34" rx="16" ry="10" fill="url(#cloud3d-top)"/>
                <ellipse cx="64" cy="36" rx="14" ry="8" fill="url(#cloud3d-top)"/>
            </g>
            
            <!-- Mixed rain and snow -->
            <g filter="url(#shadow3d)">
                <line x1="28" y1="58" x2="26" y2="68" stroke="url(#water3d)" stroke-width="3" stroke-linecap="round"/>
                <circle cx="42" cy="66" r="4" fill="url(#snow3d)"/>
                <circle cx="40" cy="64" r="1.5" fill="#FFF" opacity="0.7"/>
                <line x1="58" y1="58" x2="56" y2="68" stroke="url(#water3d)" stroke-width="3" stroke-linecap="round"/>
                <circle cx="35" cy="76" r="4" fill="url(#snow3d)"/>
                <circle cx="33" cy="74" r="1.5" fill="#FFF" opacity="0.7"/>
                <line x1="52" y1="70" x2="50" y2="80" stroke="url(#water3d)" stroke-width="3" stroke-linecap="round"/>
            </g>
        `);
    }
    
    // REALISTIC 3D CLOUD + SUN + RAIN
    cloudSunRain() {
        return this.wrap(`
            <!-- Sun -->
            <circle cx="74" cy="28" r="12" fill="url(#sun3d)" filter="url(#shadow3d)"/>
            ${Array.from({length: 6}, (_, i) => {
                const angle = (i * 60 + 20) * Math.PI / 180;
                const x1 = 74 + Math.cos(angle) * 14;
                const y1 = 28 + Math.sin(angle) * 14;
                const x2 = 74 + Math.cos(angle) * 20;
                const y2 = 28 + Math.sin(angle) * 20;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#sun3d)" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`;
            }).join('')}
            <ellipse cx="70" cy="24" rx="3" ry="2" fill="#FFF" opacity="0.5"/>
            
            <!-- Ground shadow -->
            <ellipse cx="40" cy="88" rx="26" ry="5" fill="#000" opacity="0.1" filter="url(#shadow3d)"/>
            
            <!-- Cloud -->
            <g filter="url(#softShadow)">
                <ellipse cx="40" cy="58" rx="24" ry="14" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="26" cy="50" rx="16" ry="12" fill="url(#cloud3d-bottom)"/>
                <ellipse cx="54" cy="52" rx="14" ry="10" fill="url(#cloud3d-bottom)"/>
            </g>
            
            <g filter="url(#softShadow)">
                <ellipse cx="40" cy="56" rx="22" ry="12" fill="url(#cloud3d-top)"/>
                <ellipse cx="26" cy="48" rx="14" ry="10" fill="url(#cloud3d-top)"/>
                <ellipse cx="54" cy="50" rx="12" ry="8" fill="url(#cloud3d-top)"/>
            </g>
            
            <!-- Rain -->
            <g filter="url(#shadow3d)">
                <path d="M22 72 Q20 78 22 82 Q24 78 22 72 Z" fill="url(#water3d)"/>
                <path d="M38 76 Q36 82 38 86 Q40 82 38 76 Z" fill="url(#water3d)"/>
                <path d="M54 72 Q52 78 54 82 Q56 78 54 72 Z" fill="url(#water3d)"/>
            </g>
        `);
    }
    
    // Get icon by WMO code
    getIcon(code, isDay = true) {
        const map = {
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
        
        const name = map[code] || (isDay ? 'sun' : 'moon');
        const method = name === 'cloudSun' ? 'cloudSun' : 
                      name === 'cloudMoon' ? 'cloudMoon' : 
                      name === 'cloudSunRain' ? 'cloudSunRain' : name;
        
        if (typeof this[method] === 'function') {
            return this[method]();
        }
        return this.sun();
    }
}

// Global instance
const ultra3DIcons = new Ultra3DWeatherIcons();

// Helper function
function getWeatherIcon3D(code, isDay = true, size = 48) {
    const svg = ultra3DIcons.getIcon(code, isDay);
    return `<div class="ultra-3d-icon-wrapper" style="width:${size}px;height:${size}px">${svg}</div>`;
}

// Override existing function
if (typeof getWeatherIcon === 'function') {
    getWeatherIcon = function(code, isDay = true, size = 48) {
        return getWeatherIcon3D(code, isDay, size);
    };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Ultra3DWeatherIcons, getWeatherIcon3D };
}