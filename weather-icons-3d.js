/**
 * PREMIUM 3D WEATHER ICON PACK
 * Professional weather icons with realistic 3D styling
 * Features: glossy materials, soft shadows, glassmorphism, volumetric effects
 */

class Premium3DWeatherIcons {
    constructor() {
        this.svgNS = "http://www.w3.org/2000/svg";
        this.setupDefs();
    }

    setupDefs() {
        this.defs = `
        <defs>
            <!-- PREMIUM MATERIALS -->
            
            <!-- Sun Material - Glossy Gold -->
            <radialGradient id="sunMaterial" cx="30%" cy="25%" r="75%">
                <stop offset="0%" stop-color="#FFFACD" />
                <stop offset="20%" stop-color="#FFD700" />
                <stop offset="50%" stop-color="#FFA500" />
                <stop offset="80%" stop-color="#FF8C00" />
                <stop offset="100%" stop-color="#CC6600" />
            </radialGradient>
            
            <!-- Sun Glow -->
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFD700" stop-opacity="0.4" />
                <stop offset="50%" stop-color="#FFA500" stop-opacity="0.15" />
                <stop offset="100%" stop-color="#FF8C00" stop-opacity="0" />
            </radialGradient>
            
            <!-- Moon Material - Porcelain White -->
            <radialGradient id="moonMaterial" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="30%" stop-color="#F0F0F5" />
                <stop offset="60%" stop-color="#E0E0E8" />
                <stop offset="100%" stop-color="#C0C0D0" />
            </radialGradient>
            
            <!-- Cloud Material - Soft Cotton -->
            <radialGradient id="cloudTop" cx="30%" cy="20%" r="80%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="40%" stop-color="#F8F9FA" />
                <stop offset="80%" stop-color="#E2E6EA" />
                <stop offset="100%" stop-color="#C5CCD4" />
            </radialGradient>
            
            <radialGradient id="cloudBottom" cx="50%" cy="80%" r="60%">
                <stop offset="0%" stop-color="#D0D5DB" />
                <stop offset="100%" stop-color="#A0AAB5" />
            </radialGradient>
            
            <radialGradient id="cloudDark" cx="50%" cy="70%" r="65%">
                <stop offset="0%" stop-color="#B0B8C0" />
                <stop offset="100%" stop-color="#808890" />
            </radialGradient>
            
            <!-- Rain Drop Material - Crystal Water -->
            <radialGradient id="rainMaterial" cx="25%" cy="20%" r="80%">
                <stop offset="0%" stop-color="#E0F7FF" />
                <stop offset="30%" stop-color="#4FC3F7" />
                <stop offset="70%" stop-color="#0288D1" />
                <stop offset="100%" stop-color="#01579B" />
            </radialGradient>
            
            <!-- Snow Material - Sparkle Ice -->
            <radialGradient id="snowMaterial" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="50%" stop-color="#E0F7FA" />
                <stop offset="100%" stop-color="#B2EBF2" />
            </radialGradient>
            
            <!-- Lightning Material - Electric Gold -->
            <radialGradient id="lightningMaterial" cx="40%" cy="20%" r="70%">
                <stop offset="0%" stop-color="#FFFFE0" />
                <stop offset="30%" stop-color="#FFD700" />
                <stop offset="70%" stop-color="#FFA000" />
                <stop offset="100%" stop-color="#FF6F00" />
            </radialGradient>
            
            <!-- Glassmorphism Overlay -->
            <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.7" />
                <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.1" />
                <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.0" />
                <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.3" />
            </linearGradient>
            
            <!-- Fog Material -->
            <linearGradient id="fogMaterial" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
                <stop offset="50%" stop-color="#F0F0F5" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#E0E0EA" stop-opacity="0.4" />
            </linearGradient>
            
            <!-- Rainbow Gradient -->
            <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FF0000" />
                <stop offset="17%" stop-color="#FF7F00" />
                <stop offset="33%" stop-color="#FFFF00" />
                <stop offset="50%" stop-color="#00FF00" />
                <stop offset="67%" stop-color="#0000FF" />
                <stop offset="83%" stop-color="#4B0082" />
                <stop offset="100%" stop-color="#9400D3" />
            </linearGradient>

            <!-- PREMIUM FILTERS -->
            
            <!-- Realistic Drop Shadow -->
            <filter id="dropShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                <feOffset in="blur" dx="0" dy="6" result="offsetBlur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.35"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <!-- Heavy Drop Shadow for ground -->
            <filter id="heavyShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur"/>
                <feOffset in="blur" dx="0" dy="10" result="offsetBlur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.4"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <!-- Soft Glow Effect -->
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            
            <!-- Glass Reflection -->
            <filter id="glassEffect">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lighting-color="#FFFFFF" result="specOut">
                    <fePointLight x="30" y="30" z="40"/>
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
            </filter>
            
            <!-- Volumetric Cloud Shadow -->
            <filter id="volumetric" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur"/>
                <feOffset in="blur" dx="2" dy="8" result="offsetBlur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.25"/>
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            
            <!-- Inner Highlight for 3D depth -->
            <filter id="inner3D">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
                <feOffset dx="2" dy="2" result="offsetBlur"/>
                <feComposite in="offsetBlur" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
                <feFlood flood-color="#000000" flood-opacity="0.2" result="color"/>
                <feComposite in="color" in2="shadowDiff" operator="in" result="shadow"/>
                <feComposite in="shadow" in2="SourceGraphic" operator="over"/>
            </filter>
            
            <!-- Noise Texture for realism -->
            <filter id="noiseTexture">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" result="noise"/>
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise"/>
                <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite"/>
                <feBlend mode="multiply" in="composite" in2="SourceGraphic"/>
            </filter>
        </defs>
        `;
    }

    wrap(content, viewBox = '0 0 100 100') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="premium-3d-icon" preserveAspectRatio="xMidYMid meet">${this.defs}${content}</svg>`;
    }

    // --- SUN ---
    sunny() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="50" cy="88" rx="28" ry="7" fill="#000000" opacity="0.15" filter="url(#heavyShadow)"/>
            
            <!-- Outer glow -->
            <circle cx="50" cy="50" r="42" fill="url(#sunGlow)"/>
            
            <!-- Sun rays -->
            <g filter="url(#dropShadow)">
                ${Array.from({length: 12}, (_, i) => {
                    const angle = (i * 30) * Math.PI / 180;
                    const x1 = 50 + Math.cos(angle) * 30;
                    const y1 = 50 + Math.sin(angle) * 30;
                    const x2 = 50 + Math.cos(angle) * 46;
                    const y2 = 50 + Math.sin(angle) * 46;
                    const width = i % 2 === 0 ? 5 : 3;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#sunMaterial)" stroke-width="${width}" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <!-- Main sun sphere -->
            <circle cx="50" cy="50" r="26" fill="url(#sunMaterial)" filter="url(#dropShadow)"/>
            
            <!-- 3D highlight on sun -->
            <ellipse cx="40" cy="38" rx="10" ry="7" fill="#FFFFFF" opacity="0.45"/>
            <ellipse cx="42" cy="40" rx="5" ry="3" fill="#FFFFFF" opacity="0.65"/>
            
            <!-- Glass reflection overlay -->
            <circle cx="50" cy="50" r="26" fill="url(#glassReflect)" opacity="0.15" style="mix-blend-mode: overlay;"/>
        `);
    }

    // --- MOON CLEAR ---
    moonClear() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="22" ry="6" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Moon glow -->
            <circle cx="50" cy="50" r="32" fill="#FFFFFF" opacity="0.05" filter="url(#softGlow)"/>
            
            <!-- Main moon sphere -->
            <circle cx="50" cy="50" r="22" fill="url(#moonMaterial)" filter="url(#dropShadow)"/>
            
            <!-- Moon craters -->
            <circle cx="42" cy="42" r="5" fill="#C0C0D0" opacity="0.3"/>
            <circle cx="40" cy="44" r="2" fill="#B0B0C0" opacity="0.4"/>
            <circle cx="58" cy="55" r="4" fill="#C0C0D0" opacity="0.25"/>
            <circle cx="45" cy="58" r="3" fill="#C0C0D0" opacity="0.3"/>
            <circle cx="55" cy="38" r="3.5" fill="#D0D0E0" opacity="0.2"/>
            
            <!-- 3D highlight -->
            <ellipse cx="42" cy="38" rx="7" ry="9" fill="#FFFFFF" opacity="0.35"/>
            <ellipse cx="44" cy="40" rx="3" ry="4" fill="#FFFFFF" opacity="0.55"/>
            
            <!-- Glass reflection -->
            <circle cx="50" cy="50" r="22" fill="url(#glassReflect)" opacity="0.1"/>
        `);
    }

    // --- PARTLY CLOUDY ---
    partlyCloudy() {
        return this.wrap(`
            <ellipse cx="42" cy="88" rx="30" ry="7" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Sun behind cloud -->
            <g filter="url(#softGlow)" opacity="0.3">
                ${Array.from({length: 8}, (_, i) => {
                    const angle = (i * 45 + 20) * Math.PI / 180;
                    const x1 = 72 + Math.cos(angle) * 16;
                    const y1 = 30 + Math.sin(angle) * 16;
                    const x2 = 72 + Math.cos(angle) * 26;
                    const y2 = 30 + Math.sin(angle) * 26;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <circle cx="72" cy="30" r="14" fill="url(#sunMaterial)" filter="url(#dropShadow)"/>
            <ellipse cx="68" cy="24" rx="4" ry="3" fill="#FFFFFF" opacity="0.5"/>
            
            <!-- Cloud layers -->
            <g filter="url(#volumetric)">
                <ellipse cx="42" cy="62" rx="32" ry="18" fill="url(#cloudBottom)"/>
                <ellipse cx="26" cy="52" rx="20" ry="16" fill="url(#cloudBottom)"/>
                <ellipse cx="56" cy="54" rx="18" ry="14" fill="url(#cloudBottom)"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="42" cy="60" rx="30" ry="16" fill="url(#cloudTop)"/>
                <ellipse cx="26" cy="50" rx="18" ry="14" fill="url(#cloudTop)"/>
                <ellipse cx="56" cy="52" rx="16" ry="12" fill="url(#cloudTop)"/>
            </g>
            
            <!-- Top highlights -->
            <ellipse cx="26" cy="42" rx="12" ry="7" fill="#FFFFFF" opacity="0.7"/>
            <ellipse cx="42" cy="48" rx="16" ry="7" fill="#FFFFFF" opacity="0.5"/>
            
            <!-- Glass overlay -->
            <ellipse cx="42" cy="58" rx="20" ry="10" fill="url(#glassReflect)" opacity="0.08"/>
        `);
    }

    // --- NIGHT CLOUDY ---
    nightCloudy() {
        return this.wrap(`
            <ellipse cx="40" cy="88" rx="30" ry="7" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Moon behind cloud -->
            <circle cx="72" cy="28" r="12" fill="url(#moonMaterial)" filter="url(#dropShadow)"/>
            <circle cx="70" cy="26" r="2.5" fill="#C0C0D0" opacity="0.3"/>
            <ellipse cx="68" cy="24" rx="3" ry="4" fill="#FFFFFF" opacity="0.35"/>
            
            <!-- Cloud layers -->
            <g filter="url(#volumetric)">
                <ellipse cx="38" cy="62" rx="32" ry="18" fill="url(#cloudBottom)"/>
                <ellipse cx="22" cy="52" rx="20" ry="16" fill="url(#cloudBottom)"/>
                <ellipse cx="52" cy="54" rx="18" ry="14" fill="url(#cloudBottom)"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="38" cy="60" rx="30" ry="16" fill="url(#cloudTop)"/>
                <ellipse cx="22" cy="50" rx="18" ry="14" fill="url(#cloudTop)"/>
                <ellipse cx="52" cy="52" rx="16" ry="12" fill="url(#cloudTop)"/>
            </g>
            
            <ellipse cx="22" cy="42" rx="12" ry="7" fill="#FFFFFF" opacity="0.5"/>
            <ellipse cx="38" cy="48" rx="16" ry="7" fill="#FFFFFF" opacity="0.35"/>
        `);
    }

    // --- CLOUDY ---
    cloudy() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="38" ry="8" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Multiple cloud layers for depth -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="64" rx="36" ry="20" fill="url(#cloudBottom)"/>
                <ellipse cx="30" cy="50" rx="24" ry="18" fill="url(#cloudBottom)"/>
                <ellipse cx="70" cy="52" rx="22" ry="16" fill="url(#cloudBottom)"/>
                <ellipse cx="40" cy="40" rx="20" ry="16" fill="url(#cloudBottom)"/>
                <ellipse cx="60" cy="42" rx="18" ry="14" fill="url(#cloudBottom)"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="62" rx="34" ry="18" fill="url(#cloudTop)"/>
                <ellipse cx="30" cy="48" rx="22" ry="16" fill="url(#cloudTop)"/>
                <ellipse cx="70" cy="50" rx="20" ry="14" fill="url(#cloudTop)"/>
                <ellipse cx="40" cy="38" rx="18" ry="14" fill="url(#cloudTop)"/>
                <ellipse cx="60" cy="40" rx="16" ry="12" fill="url(#cloudTop)"/>
            </g>
            
            <!-- Top highlights -->
            <ellipse cx="30" cy="36" rx="14" ry="8" fill="#FFFFFF" opacity="0.75"/>
            <ellipse cx="50" cy="44" rx="18" ry="8" fill="#FFFFFF" opacity="0.55"/>
            <ellipse cx="40" cy="28" rx="10" ry="6" fill="#FFFFFF" opacity="0.8"/>
            
            <!-- Glass overlay -->
            <ellipse cx="50" cy="60" rx="22" ry="10" fill="url(#glassReflect)" opacity="0.06"/>
        `);
    }

    // --- OVERCAST ---
    overcast() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="38" ry="8" fill="#000000" opacity="0.15" filter="url(#heavyShadow)"/>
            
            <!-- Darker overcast clouds -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="60" rx="38" ry="22" fill="url(#cloudDark)"/>
                <ellipse cx="28" cy="46" rx="26" ry="20" fill="url(#cloudDark)"/>
                <ellipse cx="72" cy="48" rx="24" ry="18" fill="url(#cloudDark)"/>
                <ellipse cx="42" cy="36" rx="22" ry="18" fill="url(#cloudDark)"/>
                <ellipse cx="62" cy="38" rx="20" ry="16" fill="url(#cloudDark)"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="58" rx="36" ry="20" fill="#C0C8D0"/>
                <ellipse cx="28" cy="44" rx="24" ry="18" fill="#C0C8D0"/>
                <ellipse cx="72" cy="46" rx="22" ry="16" fill="#C0C8D0"/>
                <ellipse cx="42" cy="34" rx="20" ry="16" fill="#C0C8D0"/>
                <ellipse cx="62" cy="36" rx="18" ry="14" fill="#C0C8D0"/>
            </g>
            
            <!-- Subtle highlights -->
            <ellipse cx="28" cy="32" rx="12" ry="6" fill="#FFFFFF" opacity="0.4"/>
            <ellipse cx="50" cy="40" rx="16" ry="6" fill="#FFFFFF" opacity="0.25"/>
        `);
    }

    // --- RAIN ---
    rain() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="30" ry="7" fill="#000000" opacity="0.15" filter="url(#heavyShadow)"/>
            
            <!-- Cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#A0A8B0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#A0A8B0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#A0A8B0"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#C0C8D0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#C0C8D0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#C0C8D0"/>
            </g>
            
            <!-- Rain drops with 3D teardrop shape -->
            <g filter="url(#dropShadow)">
                <path d="M22 60 Q18 72 22 82 Q26 72 22 60 Z" fill="url(#rainMaterial)"/>
                <ellipse cx="21" cy="66" rx="2" ry="4" fill="#FFFFFF" opacity="0.6"/>
                
                <path d="M40 66 Q36 80 40 90 Q44 80 40 66 Z" fill="url(#rainMaterial)"/>
                <ellipse cx="39" cy="74" rx="2" ry="5" fill="#FFFFFF" opacity="0.6"/>
                
                <path d="M58 62 Q54 74 58 84 Q62 74 58 62 Z" fill="url(#rainMaterial)"/>
                <ellipse cx="57" cy="70" rx="2" ry="4" fill="#FFFFFF" opacity="0.6"/>
                
                <path d="M34 74 Q30 84 34 94 Q38 84 34 74 Z" fill="url(#rainMaterial)"/>
                <ellipse cx="33" cy="82" rx="1.5" ry="3.5" fill="#FFFFFF" opacity="0.5"/>
                
                <path d="M52 78 Q48 88 52 98 Q56 88 52 78 Z" fill="url(#rainMaterial)"/>
                <ellipse cx="51" cy="86" rx="1.5" ry="3.5" fill="#FFFFFF" opacity="0.5"/>
            </g>
        `);
    }

    // --- HEAVY RAIN ---
    heavyRain() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="30" ry="7" fill="#000000" opacity="0.18" filter="url(#heavyShadow)"/>
            
            <!-- Darker cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="32" ry="18" fill="#8090A0"/>
                <ellipse cx="32" cy="34" rx="22" ry="16" fill="#8090A0"/>
                <ellipse cx="68" cy="36" rx="20" ry="14" fill="#8090A0"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="44" rx="30" ry="16" fill="#A0B0C0"/>
                <ellipse cx="32" cy="32" rx="20" ry="14" fill="#A0B0C0"/>
                <ellipse cx="68" cy="34" rx="18" ry="12" fill="#A0B0C0"/>
            </g>
            
            <!-- Many heavy rain drops -->
            <g filter="url(#dropShadow)">
                ${[[18, 56], [28, 64], [38, 58], [48, 68], [58, 60], [68, 66], [78, 58], [24, 76], [34, 82], [44, 76], [54, 86], [64, 78], [74, 84]].map(([x, y]) => `
                    <path d="M${x} ${y} Q${x-3} ${y+10} ${x} ${y+18} Q${x+3} ${y+10} ${x} ${y} Z" fill="url(#rainMaterial)"/>
                    <ellipse cx="${x-1}" cy="${y+6}" rx="1.5" ry="3" fill="#FFFFFF" opacity="0.5"/>
                `).join('')}
            </g>
        `);
    }

    // --- STORM / THUNDERSTORM ---
    thunderstorm() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="30" ry="7" fill="#000000" opacity="0.2" filter="url(#heavyShadow)"/>
            
            <!-- Dark storm cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="48" rx="32" ry="18" fill="#606870"/>
                <ellipse cx="32" cy="36" rx="22" ry="16" fill="#606870"/>
                <ellipse cx="68" cy="38" rx="20" ry="14" fill="#606870"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="30" ry="16" fill="#808890"/>
                <ellipse cx="32" cy="34" rx="20" ry="14" fill="#808890"/>
                <ellipse cx="68" cy="36" rx="18" ry="12" fill="#808890"/>
            </g>
            
            <!-- Lightning bolt - BIG -->
            <g filter="url(#heavyShadow)">
                <path d="M42 52 L26 78 L42 78 L32 104 L62 74 L46 74 L56 52 Z" fill="url(#lightningMaterial)"/>
                <path d="M42 52 L26 78 L42 78 L32 104 L62 74 L46 74 L56 52 Z" fill="#FFFFFF" opacity="0.25"/>
            </g>
            
            <!-- Lightning glow -->
            <ellipse cx="44" cy="76" rx="22" ry="32" fill="#FFD700" opacity="0.12" filter="url(#softGlow)"/>
            
            <!-- Rain drops -->
            <g filter="url(#dropShadow)">
                <path d="M20 64 Q17 74 20 82 Q23 74 20 64 Z" fill="url(#rainMaterial)"/>
                <path d="M35 70 Q32 82 35 92 Q38 82 35 70 Z" fill="url(#rainMaterial)"/>
                <path d="M65 66 Q62 76 65 84 Q68 76 65 66 Z" fill="url(#rainMaterial)"/>
            </g>
        `);
    }

    // --- SNOW ---
    snow() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="28" ry="7" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#B0B8C0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#B0B8C0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#B0B8C0"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#D0D8E0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#D0D8E0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#D0D8E0"/>
            </g>
            
            <!-- 3D Snowflakes -->
            <g filter="url(#dropShadow)">
                ${[[24, 62], [42, 68], [60, 64], [34, 78], [52, 82]].map(([x, y]) => `
                    <circle cx="${x}" cy="${y}" r="5.5" fill="url(#snowMaterial)"/>
                    <circle cx="${x-2}" cy="${y-2}" r="2" fill="#FFFFFF" opacity="0.9"/>
                    <g stroke="#FFFFFF" stroke-width="1.5" opacity="0.8">
                        <line x1="${x}" y1="${y-5.5}" x2="${x}" y2="${y+5.5}"/>
                        <line x1="${x-5.5}" y1="${y}" x2="${x+5.5}" y2="${y}"/>
                        <line x1="${x-4}" y1="${y-4}" x2="${x+4}" y2="${y+4}"/>
                        <line x1="${x-4}" y1="${y+4}" x2="${x+4}" y2="${y-4}"/>
                    </g>
                `).join('')}
            </g>
        `);
    }

    // --- HEAVY SNOW ---
    heavySnow() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="28" ry="7" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#A0A8B0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#A0A8B0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#A0A8B0"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#C0C8D0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#C0C8D0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#C0C8D0"/>
            </g>
            
            <!-- Many snowflakes -->
            <g filter="url(#dropShadow)">
                ${[[18, 58], [28, 64], [38, 56], [48, 66], [58, 60], [68, 66], [78, 58], [24, 74], [34, 80], [44, 72], [54, 84], [64, 76], [74, 82]].map(([x, y]) => `
                    <circle cx="${x}" cy="${y}" r="4" fill="url(#snowMaterial)"/>
                    <circle cx="${x-1.5}" cy="${y-1.5}" r="1.5" fill="#FFFFFF" opacity="0.9"/>
                `).join('')}
            </g>
        `);
    }

    // --- SLEET ---
    sleet() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="28" ry="7" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#A0A8B0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#A0A8B0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#A0A8B0"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#C0C8D0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#C0C8D0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#C0C8D0"/>
            </g>
            
            <!-- Mixed rain and snow -->
            <g filter="url(#dropShadow)">
                <!-- Rain drops -->
                <path d="M22 58 Q19 68 22 76 Q25 68 22 58 Z" fill="url(#rainMaterial)"/>
                <path d="M52 62 Q49 74 52 84 Q55 74 52 62 Z" fill="url(#rainMaterial)"/>
                <path d="M68 60 Q65 70 68 78 Q71 70 68 60 Z" fill="url(#rainMaterial)"/>
                
                <!-- Snowflakes -->
                <circle cx="36" cy="68" r="4.5" fill="url(#snowMaterial)"/>
                <circle cx="34" cy="66" r="1.5" fill="#FFFFFF" opacity="0.9"/>
                <circle cx="46" cy="76" r="4" fill="url(#snowMaterial)"/>
                <circle cx="44" cy="74" r="1.5" fill="#FFFFFF" opacity="0.9"/>
                <circle cx="60" cy="72" r="4.5" fill="url(#snowMaterial)"/>
                <circle cx="58" cy="70" r="1.5" fill="#FFFFFF" opacity="0.9"/>
            </g>
        `);
    }

    // --- HAIL ---
    hail() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="28" ry="7" fill="#000000" opacity="0.15" filter="url(#heavyShadow)"/>
            
            <!-- Dark cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="48" rx="30" ry="16" fill="#8090A0"/>
                <ellipse cx="34" cy="38" rx="20" ry="14" fill="#8090A0"/>
                <ellipse cx="66" cy="40" rx="18" ry="12" fill="#8090A0"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="28" ry="14" fill="#A0B0C0"/>
                <ellipse cx="34" cy="36" rx="18" ry="12" fill="#A0B0C0"/>
                <ellipse cx="66" cy="38" rx="16" ry="10" fill="#A0B0C0"/>
            </g>
            
            <!-- Hail stones - ice spheres -->
            <g filter="url(#dropShadow)">
                ${[[22, 60], [38, 66], [56, 62], [72, 68], [30, 76], [48, 82], [64, 78]].map(([x, y]) => `
                    <circle cx="${x}" cy="${y}" r="4" fill="url(#snowMaterial)"/>
                    <circle cx="${x-1}" cy="${y-1}" r="1.5" fill="#FFFFFF" opacity="0.9"/>
                    <circle cx="${x+0.5}" cy="${y+1}" r="0.8" fill="#FFFFFF" opacity="0.5"/>
                `).join('')}
            </g>
        `);
    }

    // --- FOG ---
    fog() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="38" ry="7" fill="#000000" opacity="0.08" filter="url(#heavyShadow)"/>
            
            <!-- Volumetric fog layers -->
            <g filter="url(#volumetric)">
                <rect x="5" y="28" width="90" height="18" rx="9" fill="#D8DDE0" opacity="0.95"/>
                <rect x="8" y="46" width="84" height="16" rx="8" fill="#E0E5E8" opacity="0.85"/>
                <rect x="12" y="62" width="76" height="14" rx="7" fill="#E8EDF0" opacity="0.7"/>
                <rect x="18" y="76" width="64" height="12" rx="6" fill="#F0F3F5" opacity="0.5"/>
                <rect x="25" y="88" width="50" height="10" rx="5" fill="#F5F7F9" opacity="0.35"/>
            </g>
            
            <!-- Top highlights -->
            <rect x="5" y="26" width="90" height="10" rx="5" fill="#FFFFFF" opacity="0.6"/>
            <rect x="8" y="44" width="84" height="8" rx="4" fill="#FFFFFF" opacity="0.45"/>
        `);
    }

    // --- MIST (lighter fog) ---
    mist() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="38" ry="7" fill="#000000" opacity="0.06" filter="url(#heavyShadow)"/>
            
            <g filter="url(#volumetric)">
                <rect x="8" y="32" width="84" height="16" rx="8" fill="#E0E5E8" opacity="0.8"/>
                <rect x="12" y="48" width="76" height="14" rx="7" fill="#E8EDF0" opacity="0.65"/>
                <rect x="16" y="62" width="68" height="12" rx="6" fill="#F0F3F5" opacity="0.5"/>
                <rect x="22" y="74" width="56" height="10" rx="5" fill="#F5F7F9" opacity="0.35"/>
            </g>
            
            <rect x="8" y="30" width="84" height="8" rx="4" fill="#FFFFFF" opacity="0.5"/>
            <rect x="12" y="46" width="76" height="6" rx="3" fill="#FFFFFF" opacity="0.35"/>
        `);
    }

    // --- WIND ---
    wind() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="35" ry="7" fill="#000000" opacity="0.1" filter="url(#heavyShadow)"/>
            
            <!-- Wind swirls -->
            <g filter="url(#dropShadow)">
                <path d="M15 32 Q35 22 50 32 Q65 42 80 32" stroke="#80D0E8" stroke-width="5" fill="none" stroke-linecap="round"/>
                <path d="M15 32 Q35 22 50 32 Q65 42 80 32" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
                
                <path d="M10 50 Q30 40 45 50 Q60 60 85 50" stroke="#60C0D8" stroke-width="5" fill="none" stroke-linecap="round"/>
                <path d="M10 50 Q30 40 45 50 Q60 60 85 50" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
                
                <path d="M15 68 Q35 58 50 68 Q65 78 80 68" stroke="#40B0C8" stroke-width="5" fill="none" stroke-linecap="round"/>
                <path d="M15 68 Q35 58 50 68 Q65 78 80 68" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
            </g>
            
            <!-- Swirl decorations -->
            <circle cx="20" cy="32" r="3" fill="#80D0E8" opacity="0.6"/>
            <circle cx="75" cy="50" r="3" fill="#60C0D8" opacity="0.6"/>
            <circle cx="25" cy="68" r="3" fill="#40B0C8" opacity="0.6"/>
        `);
    }

    // --- TORNADO ---
    tornado() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="20" ry="6" fill="#000000" opacity="0.2" filter="url(#heavyShadow)"/>
            
            <!-- Tornado funnel -->
            <g filter="url(#dropShadow)">
                <path d="M35 20 Q55 18 65 22 Q70 35 60 42 Q50 55 55 65 Q45 78 48 88" 
                      stroke="#707880" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M35 20 Q55 18 65 22 Q70 35 60 42 Q50 55 55 65 Q45 78 48 88" 
                      stroke="#A0AAB0" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M35 20 Q55 18 65 22 Q70 35 60 42 Q50 55 55 65 Q45 78 48 88" 
                      stroke="#C0D0D8" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.5"/>
            </g>
            
            <!-- Debris -->
            <circle cx="32" cy="45" r="2" fill="#A0A0A0" opacity="0.6"/>
            <circle cx="68" cy="55" r="1.5" fill="#A0A0A0" opacity="0.5"/>
            <rect x="30" y="60" width="3" height="3" fill="#A0A0A0" opacity="0.4" transform="rotate(45 31.5 61.5)"/>
        `);
    }

    // --- HURRICANE ---
    hurricane() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="28" ry="6" fill="#000000" opacity="0.15" filter="url(#heavyShadow)"/>
            
            <!-- Spiral arms -->
            <g filter="url(#dropShadow)">
                <path d="M50 15 Q75 25 70 50 Q65 75 50 85" stroke="#60A8C8" stroke-width="7" fill="none" stroke-linecap="round"/>
                <path d="M50 15 Q75 25 70 50 Q65 75 50 85" stroke="#90D0F0" stroke-width="3" fill="none" stroke-linecap="round"/>
                
                <path d="M50 15 Q25 25 30 50 Q35 75 50 85" stroke="#4080A8" stroke-width="7" fill="none" stroke-linecap="round"/>
                <path d="M50 15 Q25 25 30 50 Q35 75 50 85" stroke="#70C0E8" stroke-width="3" fill="none" stroke-linecap="round"/>
                
                <path d="M50 15 Q35 20 28 35 Q25 50 50 85" stroke="#80C0D8" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M50 15 Q65 20 72 35 Q75 50 50 85" stroke="#50A0C0" stroke-width="6" fill="none" stroke-linecap="round"/>
            </g>
            
            <!-- Eye of hurricane -->
            <circle cx="50" cy="50" r="10" fill="#E0F0F8" filter="url(#dropShadow)"/>
            <circle cx="50" cy="50" r="6" fill="#FFFFFF" opacity="0.8"/>
            <circle cx="48" cy="48" r="3" fill="#FFFFFF" opacity="0.9"/>
        `);
    }

    // --- SUNRISE ---
    sunrise() {
        return this.wrap(`
            <ellipse cx="50" cy="85" rx="35" ry="6" fill="#000000" opacity="0.1" filter="url(#heavyShadow)"/>
            
            <!-- Horizon glow -->
            <rect x="5" y="60" width="90" height="30" rx="15" fill="#FFD700" opacity="0.08" filter="url(#softGlow)"/>
            
            <!-- Sun half visible -->
            <path d="M25 60 A25 25 0 0 1 75 60 Z" fill="url(#sunMaterial)" filter="url(#dropShadow)"/>
            <ellipse cx="35" cy="42" rx="8" ry="5" fill="#FFFFFF" opacity="0.5"/>
            
            <!-- Sun rays -->
            ${Array.from({length: 6}, (_, i) => {
                const angle = (i * 36 - 72) * Math.PI / 180;
                const x1 = 50 + Math.cos(angle) * 30;
                const y1 = 60 + Math.sin(angle) * 10;
                const x2 = 50 + Math.cos(angle) * 44;
                const y2 = 60 + Math.sin(angle) * 15;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="url(#sunMaterial)" stroke-width="4" stroke-linecap="round" opacity="0.8"/>`;
            }).join('')}
            
            <!-- Ground/horizon line -->
            <rect x="5" y="60" width="90" height="4" rx="2" fill="#E0D8C8"/>
            
            <!-- Birds -->
            <path d="M20 38 Q22 35 24 38" stroke="#606060" stroke-width="1.5" fill="none"/>
            <path d="M30 35 Q32 32 34 35" stroke="#606060" stroke-width="1.5" fill="none"/>
            <path d="M70 40 Q72 37 74 40" stroke="#606060" stroke-width="1.5" fill="none"/>
        `);
    }

    // --- SUNSET ---
    sunset() {
        return this.wrap(`
            <ellipse cx="50" cy="85" rx="35" ry="6" fill="#000000" opacity="0.1" filter="url(#heavyShadow)"/>
            
            <!-- Sunset glow -->
            <rect x="5" y="55" width="90" height="35" rx="17" fill="#FF6B35" opacity="0.06" filter="url(#softGlow)"/>
            
            <!-- Sun setting -->
            <path d="M28 58 A22 22 0 0 1 72 58 Z" fill="url(#sunMaterial)" filter="url(#dropShadow)"/>
            <ellipse cx="38" cy="42" rx="7" ry="4" fill="#FFFFFF" opacity="0.4"/>
            
            <!-- Sunset rays -->
            ${Array.from({length: 8}, (_, i) => {
                const angle = (i * 45 - 90) * Math.PI / 180;
                const x1 = 50 + Math.cos(angle) * 24;
                const y1 = 58 + Math.sin(angle) * 8;
                const x2 = 50 + Math.cos(angle) * 46;
                const y2 = 58 + Math.sin(angle) * 14;
                return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FF8C42" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>`;
            }).join('')}
            
            <!-- Horizon -->
            <rect x="5" y="58" width="90" height="4" rx="2" fill="#D0C8B8"/>
            
            <!-- Birds -->
            <path d="M15 40 Q17 37 19 40" stroke="#705040" stroke-width="1.5" fill="none"/>
            <path d="M25 36 Q27 33 29 36" stroke="#705040" stroke-width="1.5" fill="none"/>
            <path d="M75 42 Q77 39 79 42" stroke="#705040" stroke-width="1.5" fill="none"/>
            <path d="M82 38 Q84 35 86 38" stroke="#705040" stroke-width="1.5" fill="none"/>
        `);
    }

    // --- HOT TEMPERATURE ---
    hot() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="20" ry="6" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Thermometer body -->
            <g filter="url(#dropShadow)">
                <rect x="42" y="20" width="16" height="52" rx="8" fill="#F0F0F0"/>
                <rect x="44" y="22" width="12" height="48" rx="6" fill="#E8E8E8"/>
                
                <!-- Red mercury -->
                <rect x="45" y="28" width="10" height="38" rx="5" fill="#FF4444"/>
                <rect x="45" y="28" width="10" height="38" rx="5" fill="url(#sunMaterial)" opacity="0.7"/>
                
                <!-- Bulb -->
                <circle cx="50" cy="78" r="12" fill="#FF2222" filter="url(#dropShadow)"/>
                <circle cx="50" cy="78" r="12" fill="url(#sunMaterial)"/>
                <circle cx="47" cy="74" r="4" fill="#FFFFFF" opacity="0.5"/>
            </g>
            
            <!-- Heat waves -->
            <path d="M30 30 Q35 25 30 20" stroke="#FF8800" stroke-width="2.5" fill="none" opacity="0.6"/>
            <path d="M30 38 Q35 33 30 28" stroke="#FF8800" stroke-width="2.5" fill="none" opacity="0.6"/>
            <path d="M70 30 Q65 25 70 20" stroke="#FF8800" stroke-width="2.5" fill="none" opacity="0.6"/>
            <path d="M70 38 Q65 33 70 28" stroke="#FF8800" stroke-width="2.5" fill="none" opacity="0.6"/>
            
            <!-- Sun indicator -->
            <circle cx="68" cy="18" r="6" fill="url(#sunMaterial)" filter="url(#dropShadow)"/>
            <ellipse cx="66" cy="15" rx="2" ry="1.5" fill="#FFFFFF" opacity="0.6"/>
        `);
    }

    // --- COLD TEMPERATURE ---
    cold() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="20" ry="6" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Thermometer body -->
            <g filter="url(#dropShadow)">
                <rect x="42" y="20" width="16" height="52" rx="8" fill="#F0F0F0"/>
                <rect x="44" y="22" width="12" height="48" rx="6" fill="#E8E8E8"/>
                
                <!-- Blue mercury -->
                <rect x="45" y="56" width="10" height="12" rx="5" fill="#4488FF"/>
                <rect x="45" y="56" width="10" height="12" rx="5" fill="#66AAFF" opacity="0.6"/>
                
                <!-- Bulb -->
                <circle cx="50" cy="78" r="12" fill="#2266DD" filter="url(#dropShadow)"/>
                <circle cx="50" cy="78" r="12" fill="#4488FF"/>
                <circle cx="47" cy="74" r="4" fill="#FFFFFF" opacity="0.5"/>
            </g>
            
            <!-- Snowflakes around -->
            <g filter="url(#dropShadow)">
                <circle cx="28" cy="28" r="3.5" fill="url(#snowMaterial)"/>
                <circle cx="26" cy="26" r="1.2" fill="#FFFFFF" opacity="0.9"/>
                
                <circle cx="72" cy="32" r="3" fill="url(#snowMaterial)"/>
                <circle cx="70" cy="30" r="1" fill="#FFFFFF" opacity="0.9"/>
                
                <circle cx="22" cy="48" r="2.5" fill="url(#snowMaterial)"/>
                <circle cx="76" cy="52" r="2" fill="url(#snowMaterial)"/>
            </g>
            
            <!-- Snowflake decorations -->
            <g stroke="#FFFFFF" stroke-width="1.2" opacity="0.8">
                <line x1="28" y1="28" x2="28" y2="22"/>
                <line x1="25" y1="25" x2="31" y2="25"/>
                
                <line x1="72" y1="32" x2="72" y2="27"/>
                <line x1="69" y1="29" x2="75" y2="29"/>
            </g>
        `);
    }

    // --- RAINBOW ---
    rainbow() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="25" ry="6" fill="#000000" opacity="0.08" filter="url(#heavyShadow)"/>
            
            <!-- Ground -->
            <rect x="5" y="82" width="90" height="8" rx="4" fill="#90C860" opacity="0.6"/>
            
            <!-- Rainbow arcs -->
            <g filter="url(#dropShadow)">
                <path d="M15 85 A35 35 0 0 1 85 85" stroke="#FF0000" stroke-width="5" fill="none" opacity="0.85"/>
                <path d="M18 85 A32 32 0 0 1 82 85" stroke="#FF7F00" stroke-width="4.5" fill="none" opacity="0.85"/>
                <path d="M21 85 A29 29 0 0 1 79 85" stroke="#FFFF00" stroke-width="4" fill="none" opacity="0.85"/>
                <path d="M24 85 A26 26 0 0 1 76 85" stroke="#00FF00" stroke-width="3.5" fill="none" opacity="0.85"/>
                <path d="M27 85 A23 23 0 0 1 73 85" stroke="#0000FF" stroke-width="3" fill="none" opacity="0.85"/>
                <path d="M30 85 A20 20 0 0 1 70 85" stroke="#4B0082" stroke-width="2.5" fill="none" opacity="0.85"/>
                <path d="M33 85 A17 17 0 0 1 67 85" stroke="#9400D3" stroke-width="2" fill="none" opacity="0.85"/>
            </g>
            
            <!-- Clouds at ends -->
            <g filter="url(#volumetric)">
                <ellipse cx="15" cy="78" rx="14" ry="10" fill="url(#cloudTop)"/>
                <ellipse cx="85" cy="78" rx="14" ry="10" fill="url(#cloudTop)"/>
                <ellipse cx="12" cy="82" rx="10" ry="7" fill="url(#cloudBottom)"/>
                <ellipse cx="88" cy="82" rx="10" ry="7" fill="url(#cloudBottom)"/>
            </g>
            
            <!-- Sparkles -->
            <circle cx="45" cy="48" r="1.5" fill="#FFD700" opacity="0.8"/>
            <circle cx="55" cy="52" r="1.2" fill="#FFD700" opacity="0.6"/>
            <circle cx="40" cy="55" r="1" fill="#FFD700" opacity="0.7"/>
        `);
    }

    // --- MIXED WEATHER ---
    mixed() {
        return this.wrap(`
            <ellipse cx="50" cy="88" rx="30" ry="7" fill="#000000" opacity="0.12" filter="url(#heavyShadow)"/>
            
            <!-- Cloud -->
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="46" rx="30" ry="16" fill="#A0A8B0"/>
                <ellipse cx="34" cy="36" rx="20" ry="14" fill="#A0A8B0"/>
                <ellipse cx="66" cy="38" rx="18" ry="12" fill="#A0A8B0"/>
            </g>
            
            <g filter="url(#volumetric)">
                <ellipse cx="50" cy="44" rx="28" ry="14" fill="#C0C8D0"/>
                <ellipse cx="34" cy="34" rx="18" ry="12" fill="#C0C8D0"/>
                <ellipse cx="66" cy="36" rx="16" ry="10" fill="#C0C8D0"/>
            </g>
            
            <!-- Sun peeking through -->
            <circle cx="76" cy="28" r="12" fill="url(#sunMaterial)" filter="url(#dropShadow)"/>
            <ellipse cx="73" cy="24" rx="3.5" ry="2.5" fill="#FFFFFF" opacity="0.6"/>
            
            <!-- Rain drops -->
            <g filter="url(#dropShadow)">
                <path d="M22 58 Q19 68 22 76 Q25 68 22 58 Z" fill="url(#rainMaterial)"/>
                <ellipse cx="21" cy="64" rx="1.5" ry="3" fill="#FFFFFF" opacity="0.5"/>
                
                <path d="M40 64 Q37 76 40 86 Q43 76 40 64 Z" fill="url(#rainMaterial)"/>
                <ellipse cx="39" cy="72" rx="1.5" ry="3.5" fill="#FFFFFF" opacity="0.5"/>
            </g>
            
            <!-- Snowflake -->
            <circle cx="58" cy="66" r="3.5" fill="url(#snowMaterial)" filter="url(#dropShadow)"/>
            <circle cx="57" cy="65" r="1.2" fill="#FFFFFF" opacity="0.9"/>
        `);
    }

    // Map weather codes to icon methods
    getIcon(code, isDay = true) {
        const map = {
            0: isDay ? 'sunny' : 'moonClear',
            1: isDay ? 'partlyCloudy' : 'nightCloudy',
            2: isDay ? 'partlyCloudy' : 'nightCloudy',
            3: 'cloudy',
            45: 'fog',
            48: 'fog',
            51: 'rain',
            53: 'rain',
            55: 'heavyRain',
            56: 'sleet',
            57: 'sleet',
            61: 'rain',
            63: 'rain',
            65: 'heavyRain',
            66: 'sleet',
            67: 'sleet',
            71: 'snow',
            73: 'snow',
            75: 'heavySnow',
            77: 'snow',
            80: 'rain',
            81: 'heavyRain',
            82: 'thunderstorm',
            85: 'snow',
            86: 'heavySnow',
            95: 'thunderstorm',
            96: 'thunderstorm',
            99: 'thunderstorm'
        };
        
        const name = map[code] || (isDay ? 'sunny' : 'moonClear');
        if (typeof this[name] === 'function') {
            return this[name]();
        }
        return this.sunny();
    }
}

// Create global instance
const premium3DIcons = new Premium3DWeatherIcons();

// Helper function
function getWeatherIcon3D(code, isDay = true, size = 48) {
    const svg = premium3DIcons.getIcon(code, isDay);
    return `<div class="premium-3d-icon-wrapper" style="width:${size}px;height:${size}px">${svg}</div>`;
}

// Override existing function
if (typeof getWeatherIcon === 'function') {
    getWeatherIcon = function(code, isDay = true, size = 48) {
        return getWeatherIcon3D(code, isDay, size);
    };
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Premium3DWeatherIcons, getWeatherIcon3D };
}