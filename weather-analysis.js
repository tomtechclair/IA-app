/**
 * Analyse intelligente des conditions météo
 * Détecte les risques orageux et ajuste les conditions affichées
 */

// Codes orageux WMO
const STORM_CODES = [95, 96, 99];
const HEAVY_RAIN_CODES = [65, 82, 99];
const RAIN_CODES = [51, 53, 55, 61, 63, 65, 80, 81, 82];

// Conditions avec descriptions enrichies
const ENHANCED_WEATHER_CODES = {
    0: { condition: 'Ensoleillé', bg: 'bg-blue', severity: 'normal' },
    1: { condition: 'Partiellement nuageux', bg: 'bg-blue', severity: 'normal' },
    2: { condition: 'Nuageux', bg: 'bg-cloudy', severity: 'normal' },
    3: { condition: 'Couvert', bg: 'bg-cloudy', severity: 'normal' },
    45: { condition: 'Brouillard', bg: 'bg-cloudy', severity: 'normal' },
    48: { condition: 'Brouillard givrant', bg: 'bg-cloudy', severity: 'normal' },
    51: { condition: 'Bruine légère', bg: 'bg-rain', severity: 'light' },
    53: { condition: 'Bruine modérée', bg: 'bg-rain', severity: 'light' },
    55: { condition: 'Bruine forte', bg: 'bg-rain', severity: 'moderate' },
    61: { condition: 'Pluie légère', bg: 'bg-rain', severity: 'light' },
    63: { condition: 'Pluie modérée', bg: 'bg-rain', severity: 'moderate' },
    65: { condition: 'Pluie forte', bg: 'bg-rain', severity: 'heavy' },
    71: { condition: 'Neige légère', bg: 'bg-cloudy', severity: 'light' },
    73: { condition: 'Neige modérée', bg: 'bg-cloudy', severity: 'moderate' },
    75: { condition: 'Neige forte', bg: 'bg-cloudy', severity: 'heavy' },
    77: { condition: 'Grains de neige', bg: 'bg-cloudy', severity: 'light' },
    80: { condition: 'Averses légères', bg: 'bg-rain', severity: 'light' },
    81: { condition: 'Averses modérées', bg: 'bg-rain', severity: 'moderate' },
    82: { condition: 'Averses violentes', bg: 'bg-rain', severity: 'heavy' },
    85: { condition: 'Averses de neige', bg: 'bg-cloudy', severity: 'light' },
    86: { condition: 'Averses de neige', bg: 'bg-cloudy', severity: 'heavy' },
    95: { condition: 'Orage', bg: 'bg-rain', severity: 'storm' },
    96: { condition: 'Orage grêle', bg: 'bg-rain', severity: 'storm' },
    99: { condition: 'Orage violent', bg: 'bg-rain', severity: 'severe' }
};

/**
 * Analyse si un orage est imminent dans les prochaines heures
 * @param {Object} weatherData - Données météo complètes
 * @param {number} currentHourIndex - Index de l'heure actuelle
 * @returns {Object|null} - Informations sur l'orage imminent ou null
 */
function detectUpcomingStorm(weatherData, currentHourIndex) {
    if (!weatherData || !weatherData.hourly) return null;
    
    const hourly = weatherData.hourly;
    const lookaheadHours = 6; // Vérifier les 6 prochaines heures
    
    let stormDetected = false;
    let stormHour = null;
    let maxCape = 0;
    let maxPrecipitation = 0;
    
    for (let i = 1; i <= lookaheadHours; i++) {
        const hourIndex = currentHourIndex + i;
        if (hourIndex >= hourly.time.length) break;
        
        const code = hourly.weather_code[hourIndex];
        const cape = hourly.cape ? hourly.cape[hourIndex] : 0;
        const precipitation = hourly.precipitation_probability ? hourly.precipitation_probability[hourIndex] : 0;
        const rain = hourly.rain ? hourly.rain[hourIndex] : 0;
        const showers = hourly.showers ? hourly.showers[hourIndex] : 0;
        
        // Détecter un code orageux
        if (STORM_CODES.includes(code)) {
            stormDetected = true;
            if (!stormHour) stormHour = i;
        }
        
        // Détecter un risque orageux avec CAPE élevé (> 1000 J/kg = risque orageux)
        if (cape > 1000) {
            stormDetected = true;
            maxCape = Math.max(maxCape, cape);
            if (!stormHour) stormHour = i;
        }
        
        // Détecter des averses violentes avec forte probabilité
        if (showers > 5 || (precipitation > 80 && (code === 82 || code === 65))) {
            maxPrecipitation = Math.max(maxPrecipitation, precipitation || 0);
            if (!stormHour && code >= 80) stormHour = i;
        }
    }
    
    if (stormDetected) {
        return {
            imminent: stormHour <= 2,
            soon: stormHour <= 4,
            hoursUntil: stormHour,
            maxCape: maxCape,
            maxPrecipitation: maxPrecipitation
        };
    }
    
    return null;
}

/**
 * Détermine la condition météo à afficher en analysant les données actuelles et futures
 * @param {number} currentCode - Code météo actuel
 * @param {Object} currentData - Données météo actuelles
 * @param {Object} weatherData - Données météo complètes
 * @param {number} currentHourIndex - Index de l'heure actuelle
 * @returns {Object} - Condition avec texte et icône appropriés
 */
function getSmartWeatherCondition(currentCode, currentData, weatherData, currentHourIndex) {
    // Récupérer la condition de base
    const baseCondition = ENHANCED_WEATHER_CODES[currentCode] || { 
        condition: 'Inconnu', 
        bg: 'bg-blue',
        severity: 'normal'
    };
    
    // Si c'est déjà un orage, retourner tel quel
    if (STORM_CODES.includes(currentCode)) {
        return baseCondition;
    }
    
    // Vérifier les données actuelles pour un risque orageux immédiat
    const currentCape = currentData.cape || 0;
    const currentLightning = currentData.lightning_potential || 0;
    const currentPrecip = currentData.precipitation || 0;
    const currentShowers = currentData.showers || 0;
    const currentCloudCover = currentData.cloudcover || 0;
    
    // Si conditions orageuses actuelles détectées
    if (currentCape > 1000 || currentLightning > 0.5) {
        return {
            condition: 'Orage imminent',
            bg: 'bg-rain',
            severity: 'storm',
            iconCode: 95 // Force l'icône orage
        };
    }
    
    // Si le ciel est couvert et qu'il y a des averses violentes
    if (currentCode === 3 && currentShowers > 3) {
        return {
            condition: 'Averses orageuses',
            bg: 'bg-rain',
            severity: 'heavy',
            iconCode: 95
        };
    }
    
    // Analyser les prochaines heures
    const upcomingStorm = detectUpcomingStorm(weatherData, currentHourIndex);
    
    if (upcomingStorm) {
        const { imminent, soon, hoursUntil, maxCape } = upcomingStorm;
        
        // Orage très imminent (dans moins de 2 heures)
        if (imminent) {
            // Si c'est couvert ou nuageux avec orage imminent
            if (currentCode === 3 || currentCode === 2) {
                return {
                    condition: 'Orage imminent',
                    bg: 'bg-rain',
                    severity: 'storm',
                    iconCode: 95,
                    subtitle: `Orage prévu dans ${hoursUntil}h`
                };
            }
            
            // Si c'est déjà de la pluie
            if (RAIN_CODES.includes(currentCode)) {
                return {
                    condition: 'Pluie orageuse',
                    bg: 'bg-rain',
                    severity: 'storm',
                    iconCode: 95
                };
            }
        }
        
        // Orage dans les prochaines heures
        if (soon) {
            if (currentCode === 3) {
                return {
                    condition: 'Risque orageux',
                    bg: 'bg-cloudy',
                    severity: 'moderate',
                    iconCode: 95,
                    subtitle: `Orage possible dans ${hoursUntil}h`
                };
            }
            
            if (RAIN_CODES.includes(currentCode)) {
                return {
                    condition: 'Risque orageux',
                    bg: 'bg-rain',
                    severity: 'moderate',
                    iconCode: 80
                };
            }
        }
    }
    
    // Si averses violentes actuelles sans orage détecté
    if (currentShowers > 8 || (currentPrecip > 10 && currentCode >= 80)) {
        return {
            condition: 'Averses violentes',
            bg: 'bg-rain',
            severity: 'heavy',
            iconCode: 82
        };
    }
    
    return baseCondition;
}

/**
 * Détermine le code d'icône à utiliser pour l'affichage
 * @param {number} currentCode - Code météo actuel
 * @param {Object} condition - Condition intelligente déterminée
 * @returns {number} - Code d'icône à afficher
 */
function getDisplayIconCode(currentCode, condition) {
    // Si une icône spécifique est demandée
    if (condition.iconCode) {
        return condition.iconCode;
    }
    return currentCode;
}

// Exporter les fonctions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        detectUpcomingStorm, 
        getSmartWeatherCondition, 
        getDisplayIconCode,
        STORM_CODES 
    };
}