/**
 * Storm Background System
 * Manages dynamic rain particles, lightning timing, and atmospheric effects
 */

class StormBackground {
    constructor() {
        this.container = null;
        this.rainContainer = null;
        this.rainDrops = [];
        this.maxRainDrops = 150;
        this.lightningInterval = null;
        this.intensity = 'medium';
        this.init();
    }
    
    init() {
        // Create main atmosphere container
        this.container = document.createElement('div');
        this.container.className = 'storm-atmosphere';
        
        // Create fog layers
        for (let i = 0; i < 3; i++) {
            const fog = document.createElement('div');
            fog.className = 'fog-layer';
            this.container.appendChild(fog);
        }
        
        // Create volumetric clouds
        const cloudsContainer = document.createElement('div');
        cloudsContainer.className = 'volumetric-clouds';
        
        const cloudLayers = ['back', 'mid', 'front'];
        cloudLayers.forEach(layer => {
            const cloud = document.createElement('div');
            cloud.className = `cloud-layer ${layer}`;
            cloudsContainer.appendChild(cloud);
        });
        
        this.container.appendChild(cloudsContainer);
        
        // Create lightning container
        const lightningContainer = document.createElement('div');
        lightningContainer.className = 'lightning-container';
        
        for (let i = 0; i < 3; i++) {
            const flash = document.createElement('div');
            flash.className = 'lightning-flash';
            lightningContainer.appendChild(flash);
        }
        
        this.container.appendChild(lightningContainer);
        
        // Create rain container
        this.rainContainer = document.createElement('div');
        this.rainContainer.className = 'rain-container';
        this.container.appendChild(this.rainContainer);
        
        // Create cinematic fog
        const cinematicFog = document.createElement('div');
        cinematicFog.className = 'cinematic-fog';
        this.container.appendChild(cinematicFog);
        
        // Create glossy overlay
        const glossyOverlay = document.createElement('div');
        glossyOverlay.className = 'glossy-overlay';
        this.container.appendChild(glossyOverlay);
        
        // Create HDR glow
        const hdrGlow = document.createElement('div');
        hdrGlow.className = 'hdr-glow';
        this.container.appendChild(hdrGlow);
        
        // Create ambient particles
        const ambientParticles = document.createElement('div');
        ambientParticles.className = 'ambient-particles';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${10 + Math.random() * 10}s`;
            ambientParticles.appendChild(particle);
        }
        
        this.container.appendChild(ambientParticles);
        
        // Create detail overlay for 4K effect
        const detailOverlay = document.createElement('div');
        detailOverlay.className = 'detail-overlay';
        this.container.appendChild(detailOverlay);
        
        // Insert into DOM
        const app = document.querySelector('.app');
        if (app) {
            const oldBg = app.querySelector('.background');
            if (oldBg) {
                oldBg.remove();
            }
            app.insertBefore(this.container, app.firstChild);
        }
        
        // Start rain generation
        this.startRain();
        
        // Set storm intensity based on weather
        this.updateIntensity();
    }
    
    startRain() {
        // Generate initial rain drops
        for (let i = 0; i < this.maxRainDrops; i++) {
            this.createRainDrop();
        }
        
        // Continuously regenerate rain
        setInterval(() => {
            if (this.rainDrops.length < this.maxRainDrops) {
                this.createRainDrop();
            }
        }, 100);
    }
    
    createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        
        // Random properties
        const left = Math.random() * 100;
        const height = 15 + Math.random() * 25;
        const duration = 0.5 + Math.random() * 0.5;
        const delay = Math.random() * 2;
        const opacity = 0.3 + Math.random() * 0.4;
        
        drop.style.left = `${left}%`;
        drop.style.height = `${height}px`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.opacity = opacity;
        
        // Add slight horizontal movement for wind effect
        const windOffset = (Math.random() - 0.5) * 20;
        drop.style.transform = `translateX(${windOffset}px)`;
        
        this.rainContainer.appendChild(drop);
        this.rainDrops.push(drop);
        
        // Remove drop after animation
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
            const index = this.rainDrops.indexOf(drop);
            if (index > -1) {
                this.rainDrops.splice(index, 1);
            }
        }, (duration + delay) * 1000);
    }
    
    updateIntensity(intensity = 'medium') {
        this.intensity = intensity;
        this.container.className = `storm-atmosphere storm-intensity-${intensity}`;
        
        // Adjust rain density
        switch(intensity) {
            case 'low':
                this.maxRainDrops = 50;
                break;
            case 'medium':
                this.maxRainDrops = 150;
                break;
            case 'high':
                this.maxRainDrops = 300;
                break;
        }
    }
    
    triggerLightning() {
        const flashes = this.container.querySelectorAll('.lightning-flash');
        flashes.forEach((flash, index) => {
            setTimeout(() => {
                flash.style.animation = 'none';
                flash.offsetHeight; // Trigger reflow
                flash.style.animation = `lightningFlash 0.5s ease-out`;
            }, index * 100);
        });
    }
    
    destroy() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
}

// Initialize storm background when DOM is ready
let stormBackground = null;

function initStormBackground() {
    // Remove old instance if exists
    if (stormBackground) {
        stormBackground.destroy();
    }
    
    // Create new instance
    stormBackground = new StormBackground();
    
    return stormBackground;
}

// Update background based on weather code
function updateStormBackground(weatherCode) {
    if (!stormBackground) return;
    
    // Map weather codes to storm intensity
    const stormCodes = [95, 96, 99];
    const heavyRainCodes = [65, 82];
    const rainCodes = [51, 53, 55, 61, 63, 80, 81];
    
    if (stormCodes.includes(weatherCode)) {
        stormBackground.updateIntensity('high');
    } else if (heavyRainCodes.includes(weatherCode)) {
        stormBackground.updateIntensity('medium');
    } else if (rainCodes.includes(weatherCode)) {
        stormBackground.updateIntensity('low');
    } else {
        // For non-rainy weather, reduce rain intensity
        stormBackground.updateIntensity('low');
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StormBackground, initStormBackground, updateStormBackground };
}