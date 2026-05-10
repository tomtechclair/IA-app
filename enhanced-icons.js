/**
 * Enhanced Icons System - Combines Apple Weather Icons with Category Icons
 * This file provides both weather icons and category icons for the weather app
 */

// Import the AppleWeatherIcons class (assuming it's loaded before this)
// The apple-weather-icons.js must be loaded first

/**
 * Category Icons - SVG icons for different weather information categories
 */
const categoryIcons = {
    // Create SVG helper
    createSVG: function(content, viewBox = '0 0 100 100', className = '') {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" class="category-icon ${className}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${content}</svg>`;
    },

    // Time/Hour icon
    clock: function() {
        return this.createSVG(`
            <circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="3"/>
            <line x1="50" y1="20" x2="50" y2="35" stroke="currentColor" stroke-width="3"/>
            <line x1="50" y1="50" x2="65" y2="50" stroke="currentColor" stroke-width="3"/>
        `, '0 0 100 100', 'icon-clock');
    },

    // Calendar/Day icon
    calendar: function() {
        return this.createSVG(`
            <rect x="15" y="20" width="70" height="65" rx="5" stroke="currentColor" stroke-width="3"/>
            <line x1="15" y1="35" x2="85" y2="35" stroke="currentColor" stroke-width="3"/>
            <line x1="30" y1="15" x2="30" y2="25" stroke="currentColor" stroke-width="3"/>
            <line x1="70" y1="15" x2="70" y2="25" stroke="currentColor" stroke-width="3"/>
            <circle cx="30" cy="50" r="4" fill="currentColor"/>
            <circle cx="50" cy="50" r="4" fill="currentColor"/>
            <circle cx="70" cy="50" r="4" fill="currentColor"/>
        `, '0 0 100 100', 'icon-calendar');
    },

    // Droplet/Humidity icon
    droplet: function() {
        return this.createSVG(`
            <path d="M50 15 C50 15 35 35 35 50 C35 62 42 70 50 70 C58 70 65 62 65 50 C65 35 50 15 50 15 Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
        `, '0 0 100 100', 'icon-droplet');
    },

    // Wind icon
    wind: function() {
        return this.createSVG(`
            <path d="M15 30 Q25 20 40 30 Q50 40 60 30" stroke="currentColor" stroke-width="3" fill="none"/>
            <path d="M10 50 Q25 40 45 50 Q60 60 75 50" stroke="currentColor" stroke-width="3" fill="none"/>
            <path d="M20 70 Q35 60 50 70 Q65 80 80 70" stroke="currentColor" stroke-width="3" fill="none"/>
        `, '0 0 100 100', 'icon-wind');
    },

    // Eye/Visibility icon
    eye: function() {
        return this.createSVG(`
            <path d="M50 35 C35 35 20 50 20 50 C20 50 35 65 50 65 C65 65 80 50 80 50 C80 50 65 35 50 35 Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="5" fill="currentColor"/>
        `, '0 0 100 100', 'icon-eye');
    },

    // Thermometer icon
    thermometer: function() {
        return this.createSVG(`
            <rect x="42" y="20" width="16" height="50" rx="8" stroke="currentColor" stroke-width="2.5" fill="none"/>
            <circle cx="50" cy="65" r="10" fill="currentColor" stroke="currentColor" stroke-width="2"/>
            <rect x="46" y="35" width="8" height="22" rx="4" fill="currentColor"/>
        `, '0 0 100 100', 'icon-thermometer');
    },

    // UV icon
    uv: function() {
        return this.createSVG(`
            <circle cx="30" cy="35" r="12" stroke="currentColor" stroke-width="2.5" fill="none"/>
            <path d="M25 35 L35 35 M30 30 L30 40" stroke="currentColor" stroke-width="2.5"/>
            <circle cx="70" cy="35" r="12" stroke="currentColor" stroke-width="2.5" fill="none"/>
            <path d="M65 35 L75 35 M70 30 L70 40" stroke="currentColor" stroke-width="2.5"/>
            <line x1="42" y1="35" x2="58" y2="35" stroke="currentColor" stroke-width="2.5"/>
            <path d="M35 60 L65 60 L60 75 L40 75 Z" stroke="currentColor" stroke-width="2.5" fill="none"/>
        `, '0 0 100 100', 'icon-uv');
    },

    // Pressure icon
    pressure: function() {
        return this.createSVG(`
            <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="2.5" fill="none"/>
            <circle cx="50" cy="50" r="20" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
        `, '0 0 100 100', 'icon-pressure');
    },

    // Sunrise icon
    sunrise: function() {
        return this.createSVG(`
            <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M50 15 L50 35" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M30 35 L40 45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M70 35 L60 45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="12" fill="currentColor"/>
        `, '0 0 100 100', 'icon-sunrise');
    },

    // Sunset icon
    sunset: function() {
        return this.createSVG(`
            <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M50 85 L50 65" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M30 65 L40 55" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M70 65 L60 55" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="12" fill="currentColor"/>
        `, '0 0 100 100', 'icon-sunset');
    },

    // Get icon by name
    getIcon: function(name) {
        return this[name] ? this[name]() : '';
    }
};

/**
 * Enhanced weather icon function that uses Apple Weather icons
 * Falls back to createWeatherIconSVG if available
 */
function getEnhancedWeatherIcon(code, isDay = true, size = 32) {
    if (typeof appleWeatherIcons !== 'undefined' && appleWeatherIcons.getIcon) {
        const svg = appleWeatherIcons.getIcon(code, isDay);
        return `<div class="weather-icon-container" style="width: ${size}px; height: ${size}px; display: inline-flex; align-items: center; justify-content: center;">${svg}</div>`;
    }
    // Fallback to original system
    if (typeof createWeatherIconSVG === 'function') {
        return createWeatherIconSVG(code, isDay, size);
    }
    return '';
}

/**
 * Get category icon with size
 */
function getCategoryIcon(name, size = 24) {
    const svg = categoryIcons.getIcon(name);
    return `<div class="category-icon-container" style="width: ${size}px; height: ${size}px; display: inline-flex; align-items: center; justify-content: center; color: currentColor;">${svg}</div>`;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { categoryIcons, getEnhancedWeatherIcon, getCategoryIcon };
}
