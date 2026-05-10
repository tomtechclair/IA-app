class UltraRealisticWeatherIcons {
    constructor() {
        this.setupDefs();
    }
    
    setupDefs() {
        this.defs = `
        <defs>
            <!-- Advanced Filters for Realistic 3D -->
            <filter id="groundShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
                <feOffset dx="0" dy="12" result="offsetblur"/>
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.25"/>
                </feComponentTransfer>
                <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            
            <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
                <feOffset dx="0" dy="5" result="offsetblur"/>
                <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
                <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            
            <filter id="cloudVolume">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
                <feOffset in="blur" dx="2" dy="4" result="offsetBlur"/>
                <feComposite in="SourceGraphic" in2="offsetBlur" operator="over"/>
            </filter>
            
            <filter id="waterDrop">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                <feOffset dx="1" dy="2" result="offsetblur"/>
                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lighting-color="white" result="specOut">
                    <fePointLight x="20" y="20" z="30"/>
                </feSpecularLighting>
                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"/>
                <feMerge><feMergeNode in="offsetblur"/><feMergeNode in="litPaint"/></feMerge>
            </filter>
            
            <!-- Advanced Gradients -->
            <radialGradient id="sunCore" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stop-color="#FFFEF0"/>
                <stop offset="15%" stop-color="#FFF5A0"/>
                <stop offset="35%" stop-color="#FFD700"/>
                <stop offset="60%" stop-color="#FFA500"/>
                <stop offset="85%" stop-color="#FF8C00"/>
                <stop offset="100%" stop-color="#E67300"/>
            </radialGradient>
            
            <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFD700" stop-opacity="0.3"/>
                <stop offset="50%" stop-color="#FFA500" stop-opacity="0.1"/>
                <stop offset="100%" stop-color="#FF8C00" stop-opacity="0"/>
            </radialGradient>
            
            <radialGradient id="moonSurface" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="25%" stop-color="#F0F0F5"/>
                <stop offset="55%" stop-color="#D8D8E0"/>
                <stop offset="85%" stop-color="#B0B0C0"/>
                <stop offset="100%" stop-color="#9090A0"/>
            </radialGradient>
            
            <radialGradient id="cloudPuff" cx="30%" cy="25%" r="75%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="30%" stop-color="#FAFAFA"/>
                <stop offset="60%" stop-color="#F0F0F0"/>
                <stop offset="85%" stop-color="#E0E0E8"/>
                <stop offset="100%" stop-color="#C8C8D8"/>
            </radialGradient>
            
            <radialGradient id="cloudPuffBottom" cx="50%" cy="70%" r="60%">
                <stop offset="0%" stop-color="#E0E0E8"/>
                <stop offset="60%" stop-color="#C0C0D0"/>
                <stop offset="100%" stop-color="#A0A0B0"/>
            </radialGradient>
            
            <radialGradient id="darkCloudPuff" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#C0C8D0"/>
                <stop offset="40%" stop-color="#A0AAB8"/>
                <stop offset="80%" stop-color="#808A98"/>
                <stop offset="100%" stop-color="#606A78"/>
            </radialGradient>
            
            <radialGradient id="darkCloudBottom" cx="50%" cy="75%" r="55%">
                <stop offset="0%" stop-color="#9098A0"/>
                <stop offset="100%" stop-color="#707880"/>
            </radialGradient>
            
            <radialGradient id="rainDrop" cx="30%" cy="25%" r="70%">
                <stop offset="0%" stop-color="#E8F8FF"/>
                <stop offset="25%" stop-color="#60D0FF"/>
                <stop offset="60%" stop-color="#0090E0"/>
                <stop offset="100%" stop-color="#0060B0"/>
            </radialGradient>
            
            <radialGradient id="snowFlake" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="40%" stop-color="#E8F8FF"/>
                <stop offset="80%" stop-color="#C0E8FF"/>
                <stop offset="100%" stop-color="#98D8FF"/>
            </radialGradient>
            
            <radialGradient id="lightningBolt" cx="40%" cy="20%" r="80%">
                <stop offset="0%" stop-color="#FFFFF0"/>
                <stop offset="30%" stop-color="#FFEA00"/>
                <stop offset="70%" stop-color="#FFAA00"/>
                <stop offset="100%" stop-color="#FF8800"/>
            </radialGradient>
            
            <linearGradient id="fogLayer" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
                <stop offset="50%" stop-color="#F0F0F5" stop-opacity="0.65"/>
                <stop offset="100%" stop-color="#E0E0EA" stop-opacity="0.4"/>
            </linearGradient>
            
            <filter id="innerGlow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur"/>
                <feComposite in="blur" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
                <feFlood flood-color="white" flood-opacity="0.3" result="color"/>
                <feComposite in="color" in2="shadowDiff" operator="in" result="shadow"/>
                <feComposite in="shadow" in2="SourceGraphic" operator="over"/>
            </filter>
        </defs>
        `;
    }
    
    wrap(content, viewBox = '0 0 120 120') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="realistic-3d-icon" style="overflow:visible">${this.defs}${content}</svg>`;
    }
    
    // REALISTIC SUN with volumetric glow
    sun() {
        return this.wrap(`
            <!-- Large atmospheric glow -->
            <circle cx="60" cy="60" r="50" fill="url(#sunHalo)"/>
            <circle cx="60" cy="60" r="40" fill="url(#sunHalo)" opacity="0.5"/>
            
            <!-- Ground shadow for floating effect -->
            <ellipse cx="60" cy="108" rx="28" ry="8" fill="#000" opacity="0.12" filter="url(#groundShadow)"/>
            
            <!-- Sun rays with varying widths and glow -->
            <g filter="url(#glow)" opacity="0.6">
                ${Array.from({length: 12}, (_, i) => {
                    const angle = (i * 30) * Math.PI / 180;
                    const x1 = 60 + Math.cos(angle) * 34;
                    const y1 = 60 + Math.sin(angle) * 34;
                    const x2 = 60 + Math.cos(angle) * 52;
                    const y2 = 60 + Math.sin(angle) * 52;
                    const width = [4, 3, 5, 3, 4, 3, 5, 3, 4, 3, 5, 3][i];
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="${width}" stroke-linecap="round" opacity="0.8"/>`;
                }).join('')}
            </g>
            
            <!-- Main sun body with 3D sphere effect -->
            <circle cx="60" cy="60" r="28" fill="#CC5500" filter="url(#groundShadow)"/>
            <circle cx="58" cy="58" r="28" fill="url(#sunCore)"/>
            
            <!-- Bright specular highlight -->
            <ellipse cx="48" cy="46" rx="10" ry="8" fill="#FFF" opacity="0.5"/>
            <ellipse cx="50" cy="48" rx="5" ry="4" fill="#FFF" opacity="0.7"/>
            <ellipse cx="46" cy="44" rx="3" ry="2" fill="#FFF" opacity="0.9"/>
            
            <!-- Secondary highlight -->
            <ellipse cx="52" cy="68" rx="6" ry="4" fill="#FFD700" opacity="0.3"/>
        `);
    }
    
    // REALISTIC MOON with craters and surface detail
    moon() {
        return this.wrap(`
            <ellipse cx="60" cy="108" rx="22" ry="6" fill="#000" opacity="0.1" filter="url(#groundShadow)"/>
            
            <!-- Moon glow -->
            <circle cx="60" cy="60" r="32" fill="#FFFFFF" opacity="0.05" filter="url(#glow)"/>
            
            <!-- Main moon sphere -->
            <circle cx="62" cy="62" r="22" fill="#707080" filter="url(#groundShadow)"/>
            <circle cx="60" cy="60" r="22" fill="url(#moonSurface)"/>
            
            <!-- Major craters with depth -->
            <circle cx="48" cy="52" r="6" fill="#B0B0C0" opacity="0.4"/>
            <circle cx="48" cy="52" r="5" fill="#A0A0B0" opacity="0.3"/>
            <ellipse cx="46" cy="50" rx="2" ry="1.5" fill="#FFF" opacity="0.4"/>
            
            <circle cx="70" cy="65" r="5" fill="#B0B0C0" opacity="0.35"/>
            <circle cx="70" cy="65" r="4" fill="#A0A0B0" opacity="0.25"/>
            <ellipse cx="68" cy="63" rx="1.5" ry="1" fill="#FFF" opacity="0.3"/>
            
            <!-- Small craters -->
            <circle cx="54" cy="70" r="3.5" fill="#C0C0D0" opacity="0.3"/>
            <circle cx="64" cy="48" r="4" fill="#C0C0D0" opacity="0.25"/>
            <circle cx="58" cy="58" r="2.5" fill="#D0D0E0" opacity="0.2"/>
            
            <!-- Bright specular highlight -->
            <ellipse cx="50" cy="48" rx="8" ry="10" fill="#FFF" opacity="0.25"/>
            <ellipse cx="52" cy="50" rx="4" ry="5" fill="#FFF" opacity="0.4"/>
            <ellipse cx="50" cy="48" rx="2" ry="2.5" fill="#FFF" opacity="0.7"/>
        `);
    }
    
    // Helper to create organic cloud puff
    cloudPuff(cx, cy, rx, ry, dark = false) {
        const grad = dark ? 'url(#darkCloudPuff)' : 'url(#cloudPuff)';
        const bottomGrad = dark ? 'url(#darkCloudBottom)' : 'url(#cloudPuffBottom)';
        
        return `
            <!-- Bottom shadow for volume -->
            <ellipse cx="${cx + 2}" cy="${cy + 4}" rx="${rx}" ry="${ry}" fill="#000" opacity="0.1"/>
            
            <!-- Main puff body -->
            <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${grad}"/>
            
            <!-- Bottom darker area for 3D effect -->
            <ellipse cx="${cx}" cy="${cy + ry * 0.3}" rx="${rx * 0.9}" ry="${ry * 0.7}" fill="${bottomGrad}" opacity="0.6"/>
            
            <!-- Top highlight -->
            <ellipse cx="${cx - rx * 0.2}" cy="${cy - ry * 0.4}" rx="${rx * 0.5}" ry="${ry * 0.4}" fill="#FFF" opacity="0.7"/>
            <ellipse cx="${cx - rx * 0.1}" cy="${cy - ry * 0.3}" rx="${rx * 0.25}" ry="${ry * 0.2}" fill="#FFF" opacity="0.85"/>
        `;
    }
    
    // REALISTIC CLOUD with organic shapes
    cloud() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="60" cy="108" rx="38" ry="8" fill="#000" opacity="0.08" filter="url(#groundShadow)"/>
            
            <!-- Multiple organic puffs forming a realistic cloud -->
            ${this.cloudPuff(60, 64, 32, 20)}
            ${this.cloudPuff(38, 52, 24, 18)}
            ${this.cloudPuff(82, 54, 22, 16)}
            ${this.cloudPuff(48, 42, 20, 16)}
            ${this.cloudPuff(72, 44, 18, 14)}
            
            <!-- Extra small puffs for organic edges -->
            ${this.cloudPuff(28, 60, 14, 10)}
            ${this.cloudPuff(92, 58, 12, 9)}
            ${this.cloudPuff(42, 34, 10, 8)}
            ${this.cloudPuff(78, 36, 8, 6)}
            
            <!-- Soft glow around cloud -->
            <ellipse cx="60" cy="56" rx="48" ry="32" fill="#FFF" opacity="0.03" filter="url(#glow)"/>
        `);
    }
    
    // REALISTIC PARTLY CLOUDY
    partlyCloudy() {
        return this.wrap(`
            <!-- Ground shadow -->
            <ellipse cx="55" cy="108" rx="32" ry="7" fill="#000" opacity="0.08" filter="url(#groundShadow)"/>
            
            <!-- Sun in background -->
            <circle cx="80" cy="36" r="20" fill="url(#sunHalo)" opacity="0.4"/>
            
            <!-- Sun rays behind cloud -->
            <g opacity="0.5">
                ${Array.from({length: 8}, (_, i) => {
                    const angle = (i * 45 + 20) * Math.PI / 180;
                    const x1 = 80 + Math.cos(angle) * 24;
                    const y1 = 36 + Math.sin(angle) * 24;
                    const x2 = 80 + Math.cos(angle) * 38;
                    const y2 = 36 + Math.sin(angle) * 38;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#FFD700" stroke-width="3.5" stroke-linecap="round"/>`;
                }).join('')}
            </g>
            
            <!-- Sun body -->
            <circle cx="80" cy="36" r="18" fill="url(#sunCore)" filter="url(#softShadow)"/>
            <ellipse cx="74" cy="28" rx="5" ry="4" fill="#FFF" opacity="0.6"/>
            
            <!-- Cloud in front -->
            ${this.cloudPuff(48, 68, 28, 18)}
            ${this.cloudPuff(30, 56, 20, 14)}
            ${this.cloudPuff(66, 58, 18, 12)}
            ${this.cloudPuff(40, 48, 14, 11)}
            ${this.cloudPuff(56, 50, 12, 9)}
            
            <!-- Small edge puffs -->
            ${this.cloudPuff(22, 64, 10, 7)}
            ${this.cloudPuff(74, 62, 8, 6)}
        `);
    }
    
    // REALISTIC NIGHT CLOUDY
    nightCloudy() {
        return this.wrap(`
            <ellipse cx="55" cy="108" rx="32" ry="7" fill="#000" opacity="0.08" filter="url(#groundShadow)"/>
            
            <!-- Moon in background -->
            <circle cx="82" cy="32" r="14" fill="url(#moonSurface)" filter="url(#softShadow)"/>
            <ellipse cx="78" cy="26" rx="4" ry="5" fill="#FFF" opacity="0.35"/>
            <circle cx="78" cy="30" r="2" fill="#C0C0D0" opacity="0.4"/>
            
            <!-- Stars -->
            <circle cx="24" cy="24" r="1.2" fill="#FFF" opacity="0.8"/>
            <circle cx="32" cy="18" r="0.8" fill="#FFF" opacity="0.6"/>
            <circle cx="92" cy="20" r="1" fill="#FFF" opacity="0.7"/>
            
            <!-- Cloud -->
            ${this.cloudPuff(48, 68, 28, 18)}
            ${this.cloudPuff(30, 56, 20, 14)}
            ${this.cloudPuff(66, 58, 18, 12)}
            ${this.cloudPuff(40, 48, 14, 11)}
            ${this.cloudPuff(56, 50, 12, 9)}
            ${this.cloudPuff(22, 64, 10, 7)}
        `);
    }
    
    // REALISTIC RAIN with proper water drops
    rain() {
        return this.wrap(`
            <ellipse cx="60" cy="108" rx="30" ry="7" fill="#000" opacity="0.1" filter="url(#groundShadow)"/>
            
            <!-- Dark cloud -->
            ${this.cloudPuff(60, 50, 30, 18, true)}
            ${this.cloudPuff(42, 40, 22, 14, true)}
            ${this.cloudPuff(78, 42, 20, 13, true)}
            ${this.cloudPuff(52, 32, 16, 11, true)}
            ${this.cloudPuff(70, 34, 14, 10, true)}
            
            <!-- Water drops with realistic teardrop shape -->
            <g filter="url(#waterDrop)">
                ${[
                    {x: 28, y: 66, h: 16},
                    {x: 44, y: 72, h: 18},
                    {x: 60, y: 68, h: 17},
                    {x: 76, y: 74, h: 19},
                    {x: 36, y: 82, h: 16},
                    {x: 52, y: 88, h: 18},
                    {x: 68, y: 84, h: 17},
                    {x: 32, y: 96, h: 15}
                ].map(d => `
                    <path d="M${d.x} ${d.y} Q${d.x-3} ${d.y+d.h*0.6} ${d.x} ${d.y+d.h} Q${d.x+3} ${d.y+d.h*0.6} ${d.x} ${d.y} Z" fill="url(#rainDrop)"/>
                    <ellipse cx="${d.x-1}" cy="${d.y+2}" rx="1.5" ry="2.5" fill="#FFF" opacity="0.6"/>
                `).join('')}
            </g>
        `);
    }
    
    // REALISTIC SNOW with crystal details
    snow() {
        return this.wrap(`
            <ellipse cx="60" cy="108" rx="30" ry="7" fill="#000" opacity="0.08" filter="url(#groundShadow)"/>
            
            <!-- Cloud -->
            ${this.cloudPuff(60, 50, 30, 18)}
            ${this.cloudPuff(42, 40, 22, 14)}
            ${this.cloudPuff(78, 42, 20, 13)}
            ${this.cloudPuff(52, 32, 16, 11)}
            ${this.cloudPuff(70, 34, 14, 10)}
            
            <!-- Snow crystals with 6-point structure -->
            <g filter="url(#softShadow)">
                ${[
                    {x: 28, y: 68, r: 5},
                    {x: 48, y: 74, r: 5.5},
                    {x: 68, y: 70, r: 5},
                    {x: 38, y: 86, r: 4.5},
                    {x: 58, y: 90, r: 5},
                    {x: 78, y: 84, r: 4.5}
                ].map(s => `
                    <g transform="translate(${s.x}, ${s.y})">
                        <!-- Main crystal body -->
                        <circle r="${s.r}" fill="url(#snowFlake)"/>
                        <circle r="${s.r*0.7}" fill="#FFF" opacity="0.5"/>
                        
                        <!-- 6-point star structure -->
                        <g stroke="#FFF" stroke-width="1.2" opacity="0.7" fill="none">
                            ${Array.from({length: 6}, (_, i) => {
                                const angle = (i * 60) * Math.PI / 180;
                                const x2 = Math.cos(angle) * s.r * 1.3;
                                const y2 = Math.sin(angle) * s.r * 1.3;
                                return `<line x1="0" y1="0" x2="${x2}" y2="${y2}"/>`;
                            }).join('')}
                        </g>
                        
                        <!-- Center highlight -->
                        <circle r="${s.r*0.25}" fill="#FFF" opacity="0.9"/>
                        <circle cx="${-s.r*0.1}" cy="${-s.r*0.1}" r="${s.r*0.15}" fill="#FFF" opacity="1"/>
                    </g>
                `).join('')}
            </g>
        `);
    }
    
    // REALISTIC THUNDERSTORM
    thunderstorm() {
        return this.wrap(`
            <ellipse cx="60" cy="108" rx="32" ry="7" fill="#000" opacity="0.12" filter="url(#groundShadow)"/>
            
            <!-- Very dark storm cloud -->
            ${this.cloudPuff(60, 50, 32, 19, true)}
            ${this.cloudPuff(40, 38, 24, 15, true)}
            ${this.cloudPuff(80, 40, 22, 14, true)}
            ${this.cloudPuff(50, 30, 18, 12, true)}
            ${this.cloudPuff(72, 32, 16, 11, true)}
            ${this.cloudPuff(30, 46, 12, 8, true)}
            
            <!-- Lightning bolt -->
            <g filter="url(#groundShadow)">
                <path d="M52 56 L36 84 L52 84 L40 112 L74 80 L58 80 L68 56 Z" fill="url(#lightningBolt)"/>
                <path d="M52 56 L36 84 L52 84 L40 112 L74 80 L58 80 L68 56 Z" fill="#FFF" opacity="0.25"/>
            </g>
            
            <!-- Lightning glow -->
            <ellipse cx="56" cy="84" rx="24" ry="32" fill="#FFD700" opacity="0.1" filter="url(#glow)"/>
            
            <!-- Rain drops -->
            <g filter="url(#waterDrop)">
                <path d="M22 72 Q19 82 22 90 Q25 82 22 72 Z" fill="url(#rainDrop)"/>
                <path d="M88 76 Q85 86 88 94 Q91 86 88 76 Z" fill="url(#rainDrop)"/>
            </g>
        `);
    }
    
    // REALISTIC FOG
    fog() {
        return this.wrap(`
            <ellipse cx="60" cy="108" rx="42" ry="7" fill="#000" opacity="0.06" filter="url(#groundShadow)"/>
            
            <!-- Multiple fog layers with varying opacity -->
            <g filter="url(#softShadow)">
                <rect x="8" y="28" width="104" height="20" rx="10" fill="url(#fogLayer)" opacity="0.9"/>
                <rect x="12" y="44" width="96" height="18" rx="9" fill="url(#fogLayer)" opacity="0.75"/>
                <rect x="16" y="58" width="88" height="16" rx="8" fill="url(#fogLayer)" opacity="0.6"/>
                <rect x="22" y="72" width="76" height="14" rx="7" fill="url(#fogLayer)" opacity="0.45"/>
                <rect x="28" y="84" width="64" height="12" rx="6" fill="url(#fogLayer)" opacity="0.3"/>
            </g>
            
            <!-- Top bright highlights -->
            <rect x="8" y="26" width="104" height="12" rx="6" fill="#FFF" opacity="0.4"/>
            <rect x="12" y="42" width="96" height="10" rx="5" fill="#FFF" opacity="0.3"/>
            <rect x="16" y="56" width="88" height="8" rx="4" fill="#FFF" opacity="0.2"/>
        `);
    }
    
    // REALISTIC SLEET
    sleet() {
        return this.wrap(`
            <ellipse cx="60" cy="108" rx="30" ry="7" fill="#000" opacity="0.08" filter="url(#groundShadow)"/>
            
            <!-- Cloud -->
            ${this.cloudPuff(60, 50, 30, 18, true)}
            ${this.cloudPuff(42, 40, 22, 14, true)}
            ${this.cloudPuff(78, 42, 20, 13, true)}
            ${this.cloudPuff(52, 32, 16, 11, true)}
            
            <!-- Mixed rain and snow -->
            <g filter="url(#waterDrop)">
                <!-- Rain drops -->
                <path d="M26 66 Q23 76 26 84 Q29 76 26 66 Z" fill="url(#rainDrop)"/>
                <path d="M62 72 Q59 84 62 94 Q65 84 62 72 Z" fill="url(#rainDrop)"/>
                <path d="M86 68 Q83 78 86 86 Q89 78 86 68 Z" fill="url(#rainDrop)"/>
            </g>
            
            <!-- Snow crystals -->
            <g filter="url(#softShadow)">
                <g transform="translate(42, 78)">
                    <circle r="4" fill="url(#snowFlake)"/>
                    <circle r="2.5" fill="#FFF" opacity="0.6"/>
                    <circle r="1" fill="#FFF" opacity="0.9"/>
                </g>
                <g transform="translate(74, 82)">
                    <circle r="3.5" fill="url(#snowFlake)"/>
                    <circle r="2" fill="#FFF" opacity="0.6"/>
                    <circle r="0.8" fill="#FFF" opacity="0.9"/>
                </g>
            </g>
        `);
    }
    
    // REALISTIC WIND
    wind() {
        return this.wrap(`
            <ellipse cx="60" cy="108" rx="32" ry="7" fill="#000" opacity="0.08" filter="url(#groundShadow)"/>
            
            <!-- Wind swirls with depth -->
            <g filter="url(#softShadow)">
                <!-- Main wind lines -->
                <path d="M16 34 Q40 24 56 34 Q72 44 96 34" stroke="#80D0E8" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M16 34 Q40 24 56 34 Q72 44 96 34" stroke="#A0E8FF" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>
                
                <path d="M12 56 Q36 46 52 56 Q68 66 100 56" stroke="#60C0D8" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M12 56 Q36 46 52 56 Q68 66 100 56" stroke="#90E0F0" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>
                
                <path d="M18 78 Q42 68 58 78 Q74 88 98 78" stroke="#40B0C8" stroke-width="6" fill="none" stroke-linecap="round"/>
                <path d="M18 78 Q42 68 58 78 Q74 88 98 78" stroke="#80D8F0" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.6"/>
            </g>
            
            <!-- Wind particles -->
            <circle cx="28" cy="42" r="2.5" fill="#80D0E8" opacity="0.6"/>
            <circle cx="78" cy="48" r="2" fill="#60C0D8" opacity="0.5"/>
            <circle cx="48" cy="66" r="2" fill="#40B0C8" opacity="0.6"/>
            <circle cx="88" cy="72" r="1.5" fill="#60C0D8" opacity="0.5"/>
            
            <!-- Small debris -->
            <ellipse cx="22" cy="52" rx="3" ry="1.5" fill="#80D0E8" opacity="0.4" transform="rotate(15 22 52)"/>
            <ellipse cx="92" cy="62" rx="2.5" ry="1.2" fill="#60C0D8" opacity="0.3" transform="rotate(-10 92 62)"/>
        `);
    }
    
    // Map weather codes to icon methods
    getIcon(code, isDay = true) {
        const map = {
            0: isDay ? 'sun' : 'moon',
            1: isDay ? 'partlyCloudy' : 'nightCloudy',
            2: isDay ? 'partlyCloudy' : 'nightCloudy',
            3: 'cloud',
            45: 'fog',
            48: 'fog',
            51: 'rain',
            53: 'rain',
            55: 'rain',
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
            82: 'thunderstorm',
            85: 'snow',
            86: 'snow',
            95: 'thunderstorm',
            96: 'thunderstorm',
            99: 'thunderstorm'
        };
        
        const name = map[code] || (isDay ? 'sun' : 'moon');
        if (typeof this[name] === 'function') {
            return this[name]();
        }
        return this.sun();
    }
}

// Global instance
const realisticIcons = new UltraRealisticWeatherIcons();

// Override the function completely
function getWeatherIcon3D(code, isDay = true, size = 48) {
    const svg = realisticIcons.getIcon(code, isDay);
    return `<div class="realistic-icon-wrapper" style="width:${size}px;height:${size}px">${svg}</div>`;
}

// Override all existing icon functions
if (typeof getWeatherIcon === 'function') {
    getWeatherIcon = function(code, isDay = true, size = 48) {
        return getWeatherIcon3D(code, isDay, size);
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UltraRealisticWeatherIcons, getWeatherIcon3D };
}