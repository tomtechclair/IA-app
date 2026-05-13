#!/usr/bin/env python3
import re
import json

with open('/workspace/project/M-t-o/script.js', 'r') as f:
    content = f.read()

# ============ FIX 1: Timezone handling ============
# The hourly forecast shows incorrect hours because it's using local browser time
# Instead, we should use the timezone from the API response

# Find where the timezone is extracted and use it for hourly display
# Replace simple hour parsing with timezone-aware parsing
old_timezone = '''timezone: 'auto','''
new_timezone = '''timezone: 'auto',
        timezoneOffset: raw.timezone_offset !== undefined ? raw.timezone_offset : 0,'''
content = content.replace(old_timezone, new_timezone)

# Fix hourly time display to use actual timezone
old_hourly_time = '''// Afficher l'heure basE sur l'index avec un format simple
            const hourTime = ts ? new Date(ts).getHours() : i;
            const timeLabel = isCurrentHour ? 'Maint' : `${hourTime}h`;'''
new_hourly_time = '''// Afficher l'heure en tenant compte du fuseau horaire
            let hourTime = i;
            if (ts) {
                const hourMatch = ts.match(/T(\\d{2}):/);
                hourTime = hourMatch ? parseInt(hourMatch[1]) : i;
            }
            // Ajuster selon le décalage horaire du lieu
            const tzOffset = window.timezoneOffset || 0;
            hourTime = (hourTime + tzOffset) % 24;
            if (hourTime < 0) hourTime += 24;
            const timeLabel = isCurrentHour ? 'Maint' : `${hourTime}h`;'''
content = content.replace(old_hourly_time, new_hourly_time)

# ============ FIX 2: Better weather icons ============
# Let's make the icons larger and more detailed

# Replace the icon generation with larger, more detailed SVG icons
old_icon_func = '''function createWeatherIconSVG(weatherCode, isDay, size = 32) {'''
new_icon_func = '''function createWeatherIconSVG(weatherCode, isDay, size = 48) {'''
content = content.replace(old_icon_func, new_icon_func)

# Update the SVG generation for more detailed icons
old_svg_start = '''    const cx = s * 0.5;
    const cy = s * 0.5;
    const r = s * 0.25;

    const getCloud = (offY = 0) => `<path d="M${s*0.15},${s*0.45+offY}'''
new_svg_start = '''    const cx = s * 0.5;
    const cy = s * 0.5;
    const r = s * 0.22;
    const or = s * 0.35;  // outer ring for sun
    
    // Detailed cloud path with more curves
    const getCloud = (offY = 0) => `<path d="M${s*0.12},${s*0.48+offY}'''
content = content.replace(old_svg_start, new_svg_start)

# Add sun rays for clear day
old_clear = '''    if (weatherCode === 0) { // Clear
        svg = isDay
            ? `${getSun()}`
            : `<circle cx="${cx}" cy="${cy}" r="${r*0.8}" fill="#F5F5F5"/><circle cx="${cx}" cy="${cy}" r="${r*0.4}" fill="#636366"/>`;'''
new_clear = '''    if (weatherCode === 0) { // Clear
        svg = isDay
            ? `${getSun()}<g stroke="${colors.sun}" stroke-width="${s*0.03}" opacity="0.7">
                <line x1="${cx}" y1="${s*0.1}" x2="${cx}" y2="${s*0.22}"/>
                <line x1="${cx}" y1="${s*0.9}" x2="${cx}" y2="${s*0.78}"/>
                <line x1="${s*0.1}" y1="${cy}" x2="${s*0.22}" y2="${cy}"/>
                <line x1="${s*0.9}" y1="${cy}" x2="${s*0.78}" y2="${cy}"/>
                <line x1="${s*0.22}" y1="${s*0.22}" x2="${s*0.32}" y2="${s*0.32}"/>
                <line x1="${s*0.78}" y1="${s*0.78}" x2="${s*0.68}" y2="${s*0.68}"/>
                <line x1="${s*0.22}" y1="${s*0.78}" x2="${s*0.32}" y2="${s*0.68}"/>
                <line x1="${s*0.78}" y1="${s*0.22}" x2="${s*0.68}" y2="${s*0.32}"/>
            </g>`
            : `<circle cx="${cx}" cy="${cy}" r="${or}" fill="none" stroke="#F5F5F5" stroke-width="${s*0.02}"/>
               <circle cx="${cx}" cy="${cy}" r="${r}" fill="#F5F5F5"/>
               <circle cx="${cx}" cy="${cy}" r="${r*0.5}" fill="#48484A"/>`;'''
content = content.replace(old_clear, new_clear)

# Add more detail to partly cloudy
old_partly = '''    } else if (weatherCode === 1 || weatherCode === 2) { // Partly cloudy
        svg = isDay
            ? `${getSun()}<g transform="translate(${-s*0.15}, ${-s*0.1})">${getCloud(-s*0.1)}</g>`
            : `${getCloud()}`;'''
new_partly = '''    } else if (weatherCode === 1 || weatherCode === 2) { // Partly cloudy
        svg = isDay
            ? `${getSun()}<g transform="translate(${-s*0.18}, ${-s*0.12})">${getCloud(-s*0.08)}</g>
               <g stroke="${colors.sun}" stroke-width="${s*0.02}" opacity="0.5">
                   <line x1="${s*0.7}" y1="${s*0.15}" x2="${s*0.75}" y2="${s*0.22}"/>
                   <line x1="${s*0.85}" y1="${s*0.3}" x2="${s*0.92}" y2="${s*0.35}"/>
               </g>`
            : `${getCloud()}<circle cx="${s*0.7}" cy="${s*0.35}" r="${s*0.1}" fill="#F5F5F0" opacity="0.6"/>`;'''
content = content.replace(old_partly, new_partly)

# Better rain drops
old_rain = '''    const getRain = () => `<line x1="${s*0.35}" y1="${s*0.55}" x2="${s*0.3}" y2="${s*0.75}" stroke="${colors.rain}" stroke-width="${s*0.06}" stroke-linecap="round"/><line x1="${s*0.5}" y1="${s*0.55}" x2="${s*0.45}" y2="${s*0.75}" stroke="${colors.rain}" stroke-width="${s*0.06}" stroke-linecap="round"/><line x1="${s*0.65}" y1="${s*0.55}" x2="${s*0.6}" y2="${s*0.75}" stroke="${colors.rain}" stroke-width="${s*0.06}" stroke-linecap="round"/>`;'''
new_rain = '''    const getRain = () => `<g stroke="${colors.rain}" stroke-width="${s*0.05}" stroke-linecap="round" opacity="0.8">
                <line x1="${s*0.32}" y1="${s*0.52}" x2="${s*0.27}" y2="${s*0.72}"/>
                <line x1="${s*0.48}" y1="${s*0.52}" x2="${s*0.43}" y2="${s*0.72}"/>
                <line x1="${s*0.64}" y1="${s*0.52}" x2="${s*0.59}" y2="${s*0.72}"/>
                <line x1="${s*0.4}" y1="${s*0.55}" x2="${s*0.35}" y2="${s*0.75}"/>
                <line x1="${s*0.56}" y1="${s*0.55}" x2="${s*0.51}" y2="${s*0.75}"/>
            </g>`;'''
content = content.replace(old_rain, new_rain)

# More detailed snow
old_snow = '''    const getSnow = () => `<circle cx="${s*0.35}" cy="${s*0.6}" r="${s*0.05}" fill="${colors.snow}"/><circle cx="${s*0.5}" cy="${s*0.65}" r="${s*0.05}" fill="${colors.snow}"/><circle cx="${s*0.65}" cy="${s*0.6}" r="${s*0.05}" fill="${colors.snow}"/>`;'''
new_snow = '''    const getSnow = () => `<g fill="${colors.snow}">
                <circle cx="${s*0.35}" cy="${s*0.58}" r="${s*0.04}"/>
                <circle cx="${s*0.5}" cy="${s*0.62}" r="${s*0.045}"/>
                <circle cx="${s*0.65}" cy="${s*0.58}" r="${s*0.04}"/>
                <circle cx="${s*0.28}" cy="${s*0.68}" r="${s*0.035}"/>
                <circle cx="${s*0.42}" cy="${s*0.7}" r="${s*0.04}"/>
                <circle cx="${s*0.55}" cy="${s*0.72}" r="${s*0.035}"/>
                <circle cx="${s*0.72}" cy="${s*0.68}" r="${s*0.03}"/>
            </g>`;'''
content = content.replace(old_snow, new_snow)

# Add animation hints in the SVG defs (will be in the HTML)
# Add CSS for animations at the end of the file
animation_css = '''
// Enhanced weather animations
if (!document.getElementById('weather-animations')) {
    const style = document.createElement('style');
    style.id = 'weather-animations';
    style.textContent = `
        .weather-icon { display: inline-block; }
        @keyframes rain-drop { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(${s*0.2}); opacity: 0; } }
        @keyframes snow-fall { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(${s*0.3}) rotate(360deg); } }
        @keyframes sun-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes cloud-drift { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(${s*0.02}); } }
    `;
    document.head.appendChild(style);
}
'''

# Only add this if not already present
if 'weather-animations' not in content:
    # Add at end of fetchWeatherData or similar
    content += animation_css

with open('/workspace/project/M-t-o/script.js', 'w') as f:
    f.write(content)
    
print("V52 applied: Timezone fix + Better icons")
