// IA Météo — Moteur d'analyse météo intelligent
// Analyse les données en temps réel et génère des prévisions enrichies

class IAMeteo {
    constructor() {
        this.lastAnalysis = null;
    }

    // Analyse complète des données météo
    analyze(weatherData, cityName) {
        if (!weatherData || !weatherData.current) return null;

        const current = weatherData.current;
        const hourly = weatherData.hourly || {};
        const daily = weatherData.daily || {};
        const now = new Date();
        const hour = now.getHours();

        const analysis = {
            summary: this.generateSummary(current, hourly, daily, hour, cityName),
            trend: this.analyzeTrend(hourly, hour),
            alerts: this.generateAlerts(current, hourly, daily, hour),
            recommendation: this.generateRecommendation(current, hourly, hour),
            comfort: this.calculateComfort(current),
            nextHours: this.analyzeNextHours(hourly, hour)
        };

        this.lastAnalysis = analysis;
        return analysis;
    }

    // Résumé intelligent
    generateSummary(current, hourly, daily, hour, cityName) {
        const temp = Math.round(current.temperature_2m);
        const feelsLike = Math.round(current.apparent_temperature || temp);
        const code = current.weather_code || 0;
        const humidity = current.relative_humidity_2m || 0;
        const wind = Math.round(current.wind_speed_10m || 0);

        const period = hour < 6 ? 'nuit' : hour < 12 ? 'matinée' : hour < 18 ? 'après-midi' : 'soirée';

        // Température ressentie
        const feelsText = Math.abs(feelsLike - temp) >= 3
            ? `, ressenti ${feelsLike}°`
            : '';

        // Condition principale
        const condText = this.getConditionText(code);

        // Tendance prochaines heures
        const nextTrend = this.getShortTrend(hourly, hour);

        return `${condText} à ${cityName || 'votre position'} en cette ${period}. ${temp}°${feelsText}. ${nextTrend}`;
    }

    getConditionText(code) {
        if (code === 0) return 'Ciel dégagé';
        if (code === 1) return 'Ciel majoritairement dégagé';
        if (code === 2) return 'Temps partiellement nuageux';
        if (code === 3) return 'Ciel nuageux';
        if (code === 45 || code === 48) return 'Brouillard';
        if (code >= 51 && code <= 57) return 'Bruine';
        if (code >= 61 && code <= 67) return 'Pluie';
        if (code >= 71 && code <= 77) return 'Neige';
        if (code >= 80 && code <= 82) return 'Averses';
        if (code >= 85 && code <= 86) return 'Averses de neige';
        if (code >= 95) return 'Orages';
        return 'Temps variable';
    }

    getShortTrend(hourly, hour) {
        if (!hourly || !hourly.temperature_2m || hourly.temperature_2m.length < 6) {
            return '';
        }

        // Trouver l'index actuel
        let idx = 0;
        if (hourly.time) {
            for (let i = 0; i < hourly.time.length; i++) {
                const m = (hourly.time[i] || '').match(/T(\d{2}):/);
                if (m && parseInt(m[1]) === hour) { idx = i; break; }
            }
        }

        const tempNow = hourly.temperature_2m[idx] || 0;
        const temp3h = hourly.temperature_2m[idx + 3] || tempNow;
        const temp6h = hourly.temperature_2m[idx + 6] || tempNow;

        // Vérifier la pluie à venir
        const rainComing = this.checkRainComing(hourly, idx);
        if (rainComing) return rainComing;

        const diff3h = Math.round(temp3h - tempNow);
        if (Math.abs(diff3h) < 2) return 'Températures stables dans les prochaines heures.';
        if (diff3h > 0) return `Hausse de ${diff3h}° attendue dans les 3 prochaines heures.`;
        return `Baisse de ${Math.abs(diff3h)}° attendue dans les 3 prochaines heures.`;
    }

    checkRainComing(hourly, currentIdx) {
        if (!hourly.weather_code) return null;

        const isRaining = this.isRainCode(hourly.weather_code[currentIdx]);

        for (let i = 1; i <= 6; i++) {
            const futureIdx = currentIdx + i;
            if (futureIdx >= hourly.weather_code.length) break;
            const futureCode = hourly.weather_code[futureIdx];

            if (!isRaining && this.isRainCode(futureCode)) {
                return `Pluie prévue dans ${i}h.`;
            }
            if (isRaining && !this.isRainCode(futureCode)) {
                return `Éclaircie prévue dans ${i}h.`;
            }
        }
        return null;
    }

    isRainCode(code) {
        return (code >= 51 && code <= 67) || (code >= 80 && code <= 99);
    }

    // Analyse de tendance
    analyzeTrend(hourly, hour) {
        if (!hourly || !hourly.temperature_2m || hourly.temperature_2m.length < 12) {
            return { direction: 'stable', icon: '→', text: 'Stable' };
        }

        let idx = 0;
        if (hourly.time) {
            for (let i = 0; i < hourly.time.length; i++) {
                const m = (hourly.time[i] || '').match(/T(\d{2}):/);
                if (m && parseInt(m[1]) === hour) { idx = i; break; }
            }
        }

        const temps = [];
        for (let i = 0; i < 6; i++) {
            if (idx + i < hourly.temperature_2m.length) {
                temps.push(hourly.temperature_2m[idx + i]);
            }
        }

        if (temps.length < 3) return { direction: 'stable', icon: '→', text: 'Stable' };

        const diff = temps[temps.length - 1] - temps[0];
        if (diff > 3) return { direction: 'up', icon: '↑', text: `+${Math.round(diff)}° sur 6h` };
        if (diff < -3) return { direction: 'down', icon: '↓', text: `${Math.round(diff)}° sur 6h` };
        return { direction: 'stable', icon: '→', text: 'Stable sur 6h' };
    }

    // Alertes intelligentes
    generateAlerts(current, hourly, daily, hour) {
        const alerts = [];
        const temp = current.temperature_2m;
        const wind = current.wind_speed_10m || 0;
        const code = current.weather_code || 0;

        // Alerte chaleur
        if (temp >= 35) alerts.push({ level: 'danger', icon: '🔴', text: 'Canicule — restez hydraté et à l\'ombre' });
        else if (temp >= 30) alerts.push({ level: 'warning', icon: '🟠', text: 'Forte chaleur — pensez à vous hydrater' });

        // Alerte froid
        if (temp <= -10) alerts.push({ level: 'danger', icon: '🔴', text: 'Froid extrême — limitez les sorties' });
        else if (temp <= 0) alerts.push({ level: 'warning', icon: '🟠', text: 'Gel — attention aux routes' });

        // Alerte vent
        if (wind >= 80) alerts.push({ level: 'danger', icon: '🔴', text: 'Vent violent — restez à l\'abri' });
        else if (wind >= 50) alerts.push({ level: 'warning', icon: '🟠', text: 'Vent fort — soyez prudent' });

        // Alerte orage
        if (code >= 95) alerts.push({ level: 'danger', icon: '⛈️', text: 'Orage en cours — mettez-vous à l\'abri' });

        // Alerte verglas
        if ((code >= 56 && code <= 57) || (code >= 66 && code <= 67)) {
            alerts.push({ level: 'danger', icon: '🧊', text: 'Pluie verglaçante — routes glissantes' });
        }

        // Alerte brouillard
        if (code === 45 || code === 48) {
            alerts.push({ level: 'info', icon: '🌫️', text: 'Brouillard — visibilité réduite' });
        }

        // Pluie à venir
        if (hourly && hourly.weather_code) {
            let idx = 0;
            if (hourly.time) {
                for (let i = 0; i < hourly.time.length; i++) {
                    const m = (hourly.time[i] || '').match(/T(\d{2}):/);
                    if (m && parseInt(m[1]) === hour) { idx = i; break; }
                }
            }
            if (!this.isRainCode(code)) {
                for (let i = 1; i <= 3; i++) {
                    if (idx + i < hourly.weather_code.length && this.isRainCode(hourly.weather_code[idx + i])) {
                        alerts.push({ level: 'info', icon: '🌧️', text: `Pluie prévue dans ${i}h` });
                        break;
                    }
                }
            }
        }

        // UV élevé
        if (hourly && hourly.uv_index) {
            let idx = 0;
            if (hourly.time) {
                for (let i = 0; i < hourly.time.length; i++) {
                    const m = (hourly.time[i] || '').match(/T(\d{2}):/);
                    if (m && parseInt(m[1]) === hour) { idx = i; break; }
                }
            }
            const uv = hourly.uv_index[idx] || 0;
            if (uv >= 8) alerts.push({ level: 'warning', icon: '☀️', text: 'UV très élevé — protégez votre peau' });
            else if (uv >= 6) alerts.push({ level: 'info', icon: '☀️', text: 'UV élevé — crème solaire recommandée' });
        }

        return alerts;
    }

    // Recommandations
    generateRecommendation(current, hourly, hour) {
        const temp = current.temperature_2m;
        const code = current.weather_code || 0;
        const wind = current.wind_speed_10m || 0;

        const recs = [];

        // Vêtements
        if (temp < 5) recs.push('🧥 Manteau chaud');
        else if (temp < 15) recs.push('🧥 Veste');
        else if (temp < 20) recs.push('👕 Pull léger');
        else recs.push('👕 Tenue légère');

        // Pluie
        if (this.isRainCode(code)) {
            recs.push('☂️ Parapluie');
        } else if (hourly && hourly.weather_code) {
            let idx = 0;
            if (hourly.time) {
                for (let i = 0; i < hourly.time.length; i++) {
                    const m = (hourly.time[i] || '').match(/T(\d{2}):/);
                    if (m && parseInt(m[1]) === hour) { idx = i; break; }
                }
            }
            for (let i = 1; i <= 6; i++) {
                if (idx + i < hourly.weather_code.length && this.isRainCode(hourly.weather_code[idx + i])) {
                    recs.push('☂️ Parapluie (pluie prévue)');
                    break;
                }
            }
        }

        // Soleil
        if (code <= 1 && hour >= 10 && hour <= 16) {
            recs.push('🕶️ Lunettes de soleil');
        }

        // Vent
        if (wind >= 40) recs.push('💨 Attention au vent');

        return recs;
    }

    // Indice de confort
    calculateComfort(current) {
        const temp = current.temperature_2m;
        const humidity = current.relative_humidity_2m || 50;
        const wind = current.wind_speed_10m || 0;

        // Calcul de l'indice de confort (0-100)
        let score = 100;

        // Température idéale: 20-25°C
        if (temp < 0) score -= 40;
        else if (temp < 10) score -= 25;
        else if (temp < 15) score -= 10;
        else if (temp > 35) score -= 40;
        else if (temp > 30) score -= 25;
        else if (temp > 25) score -= 10;

        // Humidité idéale: 40-60%
        if (humidity > 80) score -= 15;
        else if (humidity > 70) score -= 8;
        else if (humidity < 30) score -= 10;

        // Vent
        if (wind > 50) score -= 20;
        else if (wind > 30) score -= 10;

        score = Math.max(0, Math.min(100, score));

        let label, emoji;
        if (score >= 80) { label = 'Excellent'; emoji = '😎'; }
        else if (score >= 60) { label = 'Agréable'; emoji = '🙂'; }
        else if (score >= 40) { label = 'Correct'; emoji = '😐'; }
        else if (score >= 20) { label = 'Inconfortable'; emoji = '😕'; }
        else { label = 'Difficile'; emoji = '😰'; }

        return { score, label, emoji };
    }

    // Analyse des prochaines heures
    analyzeNextHours(hourly, hour) {
        if (!hourly || !hourly.temperature_2m) return [];

        let idx = 0;
        if (hourly.time) {
            for (let i = 0; i < hourly.time.length; i++) {
                const m = (hourly.time[i] || '').match(/T(\d{2}):/);
                if (m && parseInt(m[1]) === hour) { idx = i; break; }
            }
        }

        const points = [];
        for (let i = 0; i <= 12; i += 3) {
            const fi = idx + i;
            if (fi >= (hourly.temperature_2m || []).length) break;
            const h = (hour + i) % 24;
            points.push({
                hour: `${String(h).padStart(2, '0')}h`,
                temp: Math.round(hourly.temperature_2m[fi]),
                code: hourly.weather_code ? hourly.weather_code[fi] : 0,
                rain: hourly.precipitation_probability ? hourly.precipitation_probability[fi] : 0
            });
        }

        return points;
    }
}

// Instance globale
const iaMeteo = new IAMeteo();

// Fonction pour afficher l'analyse IA dans l'interface
function displayIAAnalysis(weatherData, cityName) {
    const analysis = iaMeteo.analyze(weatherData, cityName);
    if (!analysis) return;

    const container = document.getElementById('ia-meteo-content');
    if (!container) return;

    let html = '';

    // Résumé IA
    html += `<div class="ia-summary">${analysis.summary}</div>`;

    // Tendance
    const trend = analysis.trend;
    html += `<div class="ia-trend">
        <span class="ia-trend-icon">${trend.icon}</span>
        <span>Tendance : ${trend.text}</span>
    </div>`;

    // Confort
    const comfort = analysis.comfort;
    html += `<div class="ia-comfort">
        <span>${comfort.emoji}</span>
        <span>Confort : ${comfort.label}</span>
        <div class="ia-comfort-bar">
            <div class="ia-comfort-fill" style="width: ${comfort.score}%"></div>
        </div>
    </div>`;

    // Recommandations
    if (analysis.recommendation.length > 0) {
        html += `<div class="ia-recommendations">`;
        analysis.recommendation.forEach(rec => {
            html += `<span class="ia-rec-tag">${rec}</span>`;
        });
        html += `</div>`;
    }

    // Alertes
    if (analysis.alerts.length > 0) {
        html += `<div class="ia-alerts">`;
        analysis.alerts.forEach(alert => {
            html += `<div class="ia-alert ia-alert-${alert.level}">
                <span>${alert.icon}</span>
                <span>${alert.text}</span>
            </div>`;
        });
        html += `</div>`;
    }

    container.innerHTML = html;
}
