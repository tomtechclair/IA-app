/**
 * Dynamic Weather Background System
 * iOS-style backgrounds that change based on weather conditions
 */

class WeatherBackground {
    constructor() {
        this.container = null;
        this.currentBg = 'default';
        this.init();
    }
    
    init() {
        // Créer le conteneur de fond
        this.container = document.createElement('div');
        this.container.className = 'dynamic-weather-bg';
        this.container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            transition: background 1.5s ease-in-out;
        `;
        
        // Insérer avant le contenu existant
        const app = document.querySelector('.app');
        if (app) {
            app.insertBefore(this.container, app.firstChild);
        }
        
        this.setDefaultBackground();
    }
    
    setDefaultBackground() {
        this.container.style.background = this.gradients.default;
    }
    
    get gradients() {
        return {
            // ☀️ Ensoleillé / Clair
            sunny: `linear-gradient(180deg, 
                #4A90E2 0%, 
                #5BA3F5 20%,
                #74B9FF 40%,
                #87CEEB 60%,
                #A8D8EA 80%,
                #B8E6F0 100%)`,
            
            // 🌙 Nuit claire
            night: `linear-gradient(180deg,
                #0B1026 0%,
                #162044 20%,
                #1E2A5A 40%,
                #243870 60%,
                #2C4278 80%,
                #344C80 100%)`,
            
            // ⛅ Nuageux / Partiellement nuageux
            cloudy: `linear-gradient(180deg,
                #5B7B9C 0%,
                #6B8EAA 20%,
                #7BA0B8 40%,
                #8BB2C6 60%,
                #9BC4D4 80%,
                #ABD6E2 100%)`,
            
            // ☁️ Couvert
            overcast: `linear-gradient(180deg,
                #4A5568 0%,
                #5A6578 20%,
                #6A7588 40%,
                #7A8598 60%,
                #8A95A8 80%,
                #9AA5B8 100%)`,
            
            // 🌧️ Pluie / Bruine
            rain: `linear-gradient(180deg,
                #2D3748 0%,
                #3D4758 20%,
                #4D5768 40%,
                #5D6778 60%,
                #6D7788 80%,
                #7D8798 100%)`,
            
            // ⛈️ Orage
            storm: `linear-gradient(180deg,
                #1A202C 0%,
                #2A303C 20%,
                #3A404C 40%,
                #4A505C 60%,
                #5A606C 80%,
                #6A707C 100%)`,
            
            // ❄️ Neige
            snow: `linear-gradient(180deg,
                #718096 0%,
                #8190A6 20%,
                #91A0B6 40%,
                #A1B0C6 60%,
                #B1C0D6 80%,
                #C1D0E6 100%)`,
            
            // 🌫️ Brouillard
            fog: `linear-gradient(180deg,
                #718096 0%,
                #8A9AAE 20%,
                #A0B0C0 40%,
                #B5C5D0 60%,
                #CAD0D8 80%,
                #D5D5D5 100%)`,
            
            // 🌅 Aube / Crépuscule
            sunset: `linear-gradient(180deg,
                #2D3436 0%,
                #4A3F4A 20%,
                #6A5060 40%,
                #8A6078 60%,
                #AA7090 80%,
                #C080A8 100%)`,
            
            // Default
            default: `linear-gradient(180deg,
                #1a1a2e 0%,
                #16213e 30%,
                #0f3460 60%,
                #533483 100%)`
        };
    }
    
    updateFromWeatherCode(code, isDay = true) {
        let bgType = 'default';
        
        // Mapping des codes WMO vers les types de fond
        if (code === 0) {
            bgType = isDay ? 'sunny' : 'night';
        } else if (code === 1 || code === 2) {
            bgType = isDay ? 'sunny' : 'night'; // Partiellement nuageux
        } else if (code === 3) {
            bgType = 'cloudy'; // Couvert
        } else if (code >= 45 && code <= 48) {
            bgType = 'fog'; // Brouillard
        } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
            bgType = 'rain'; // Pluie
        } else if (code >= 71 && code <= 77) {
            bgType = 'snow'; // Neige
        } else if (code >= 95) {
            bgType = 'storm'; // Orage
        }
        
        // Si nuit et pas spécifiquement un type, utiliser night
        if (!isDay && bgType === 'default') {
            bgType = 'night';
        }
        
        this.applyBackground(bgType);
    }
    
    applyBackground(type) {
        if (this.currentBg === type) return;
        
        const gradient = this.gradients[type] || this.gradients.default;
        
        // Transition douce
        this.container.style.opacity = '0';
        
        setTimeout(() => {
            this.container.style.background = gradient;
            this.container.style.opacity = '1';
            this.currentBg = type;
        }, 150);
    }
    
    // Ajouter des particules pour les effets (pluie, neige)
    addWeatherEffects(code) {
        // Supprimer les effets existants
        this.removeWeatherEffects();
        
        if (code >= 51 && code <= 67) {
            this.createRainEffect();
        } else if (code >= 71 && code <= 77) {
            this.createSnowEffect();
        } else if (code >= 95) {
            this.createLightningEffect();
        }
    }
    
    createRainEffect() {
        const rainContainer = document.createElement('div');
        rainContainer.className = 'weather-effect rain-effect';
        rainContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        // Créer des gouttes de pluie
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.style.cssText = `
                position: absolute;
                width: 1px;
                height: ${15 + Math.random() * 20}px;
                background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.3));
                left: ${Math.random() * 100}%;
                animation: rainDrop ${0.5 + Math.random() * 0.5}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            rainContainer.appendChild(drop);
        }
        
        this.container.appendChild(rainContainer);
        
        // Ajouter le CSS d'animation si pas déjà présent
        if (!document.getElementById('weather-animations')) {
            const style = document.createElement('style');
            style.id = 'weather-animations';
            style.textContent = `
                @keyframes rainDrop {
                    0% { transform: translateY(-100px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                
                @keyframes snowFall {
                    0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
                
                @keyframes lightning {
                    0%, 90%, 100% { opacity: 0; }
                    92%, 96% { opacity: 0.3; }
                    94% { opacity: 0.1; }
                    95% { opacity: 0.5; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    createSnowEffect() {
        const snowContainer = document.createElement('div');
        snowContainer.className = 'weather-effect snow-effect';
        snowContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 30; i++) {
            const flake = document.createElement('div');
            flake.style.cssText = `
                position: absolute;
                width: ${3 + Math.random() * 5}px;
                height: ${3 + Math.random() * 5}px;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: snowFall ${3 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            snowContainer.appendChild(flake);
        }
        
        this.container.appendChild(snowContainer);
    }
    
    createLightningEffect() {
        const lightning = document.createElement('div');
        lightning.className = 'weather-effect lightning-effect';
        lightning.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            background: rgba(255,255,255,0);
            animation: lightning ${8 + Math.random() * 10}s ease-out infinite;
        `;
        
        this.container.appendChild(lightning);
    }
    
    removeWeatherEffects() {
        const effects = this.container.querySelectorAll('.weather-effect');
        effects.forEach(effect => effect.remove());
    }
}

// Instance globale
let weatherBg = null;

function initWeatherBackground() {
    weatherBg = new WeatherBackground();
}

function updateWeatherBackground(code, isDay) {
    if (weatherBg) {
        weatherBg.updateFromWeatherCode(code, isDay);
        weatherBg.addWeatherEffects(code);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherBackground, initWeatherBackground, updateWeatherBackground };
}