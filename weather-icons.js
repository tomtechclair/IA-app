// Icônes météo animées style Météo France (HACF)
// Utilise les SVG animés amCharts sous licence CC BY 4.0

// Map WMO weather codes -> meteofrance icon filenames
const WMO_TO_MF_ICON = {
  // Day icons
  day: {
    0: 'day',       // Clear sky
    1: 'day',       // Mainly clear
    2: 'cloudy-day-3', // Partly cloudy
    3: 'cloudy',    // Overcast
    45: 'fog',      // Fog
    48: 'fog',      // Depositing rime fog
    51: 'rainy-5',  // Light drizzle
    53: 'rainy-5',  // Moderate drizzle
    55: 'rainy-5',  // Dense drizzle
    56: 'snowy-rainy', // Freezing light drizzle
    57: 'snowy-rainy', // Freezing dense drizzle
    61: 'rainy-5',  // Slight rain
    63: 'rainy-5',  // Moderate rain
    65: 'rainy-6',  // Heavy rain
    66: 'snowy-rainy', // Freezing light rain
    67: 'snowy-rainy', // Freezing heavy rain
    71: 'snowy-6',  // Slight snow
    73: 'snowy-6',  // Moderate snow
    75: 'snowy-6',  // Heavy snow
    77: 'snowy-6',  // Snow grains
    80: 'rainy-5',  // Slight rain showers
    81: 'rainy-5',  // Moderate rain showers
    82: 'rainy-6',  // Violent rain showers
    85: 'snowy-6',  // Slight snow showers
    86: 'snowy-6',  // Heavy snow showers
    95: 'thunder',  // Thunderstorm
    96: 'lightning-rainy', // Thunderstorm with slight hail
    99: 'lightning-rainy', // Thunderstorm with heavy hail
  },
  // Night icons (some override day icons)
  night: {
    0: 'night',
    1: 'night',
    2: 'cloudy-night-3',
    3: 'cloudy',
    45: 'fog',
    48: 'fog',
    95: 'thunder',
    96: 'lightning-rainy',
    99: 'lightning-rainy',
  }
};

function createWeatherIconSVG(code, isDay = true, size = 32) {
  const c = Number(code || 0);
  const timeMap = isDay ? WMO_TO_MF_ICON.day : WMO_TO_MF_ICON.night;
  let iconName = timeMap[c];
  if (!iconName) iconName = isDay ? 'day' : 'night';
  
  // Try animated SVG first, fall back to static
  const basePath = 'icons/';
  // Use animated SVG (without -static suffix)
  const svgSrc = `${basePath}${iconName}.svg`;
  // Static fallback (for when animation doesn't work)
  const staticSrc = `${basePath}${iconName}-static.svg`;
  
  return `<div class="weather-icon-container" style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center">
    <object type="image/svg+xml" data="${svgSrc}" style="width:${size}px;height:${size}px;pointer-events:none;" 
      onerror="this.outerHTML='<img src=\'${staticSrc}\' style=\'width:${size}px;height:${size}px\' alt=\'weather\'>'">
      <img src="${staticSrc}" style="width:${size}px;height:${size}px" alt="weather">
    </object>
  </div>`;
}
