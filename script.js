window.addEventListener('load', function() {
    // showWeekendUpdateAlert(); // Désactivé
    initScrollProgress();
    initBackToTop();
    initMobileMenu();
    initContactForm();
    initFAQ();
    initSmoothScroll();
});


function showWeekendUpdateAlert() {
    // Créer une alerte stylisée et détaillée pour la mise à jour du weekend
    var alertDiv = document.createElement('div');
    alertDiv.id = 'weekendAlert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <div class="alert-header">
                <div class="alert-icon">
                    <i class="fa-solid fa-bell"></i>
                </div>
                <div class="alert-title">
                    <h2>🚀 MISE À JOUR SITE TOM !</h2>
                    <p>Ce weekend : Nouveau design et fonctionnalités majeures !</p>
                </div>
                <button class="alert-close" onclick="closeWeekendAlert()">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
            <div class="alert-details">
                <div class="countdown-section">
                    <div class="countdown-title">
                        <i class="fa-solid fa-hourglass-half"></i>
                        <span>TEMPS RESTANT AVANT LE DÉBUT</span>
                    </div>
                    <div class="countdown-timer" id="countdownTimer">
                        <div class="time-unit">
                            <div class="time-value" id="days">00</div>
                            <div class="time-label">Jours</div>
                        </div>
                        <div class="time-separator">:</div>
                        <div class="time-unit">
                            <div class="time-value" id="hours">00</div>
                            <div class="time-label">Heures</div>
                        </div>
                        <div class="time-separator">:</div>
                        <div class="time-unit">
                            <div class="time-value" id="minutes">00</div>
                            <div class="time-label">Minutes</div>
                        </div>
                        <div class="time-separator">:</div>
                        <div class="time-unit">
                            <div class="time-value" id="seconds">00</div>
                            <div class="time-label">Secondes</div>
                        </div>
                    </div>
                    <div class="countdown-date">
                        <i class="fa-solid fa-calendar-check"></i>
                        <span>Début : Samedi 9 Mai 2026</span>
                    </div>
                </div>
                <div class="feature-list">
                    <div class="feature-item">
                        <i class="fa-solid fa-sparkles"></i>
                        <span>Design TOM entièrement refait</span>
                    </div>
                    <div class="feature-item">
                        <i class="fa-solid fa-rocket"></i>
                        <span>Performance ultra-optimisée</span>
                    </div>
                    <div class="feature-item">
                        <i class="fa-solid fa-shield-halved"></i>
                        <span>Sécurité renforcée maximale</span>
                    </div>
                                    </div>
                <div class="alert-footer">
                    <div class="alert-timing">
                        <i class="fa-solid fa-tools"></i>
                        <span>Maintenance : Samedi 9 et Dimanche 10 Mai</span>
                    </div>
                    <div class="alert-cta">
                        <button class="alert-btn" onclick="closeWeekendAlert()">
                            <i class="fa-solid fa-thumbs-up"></i>
                            <span>Parfait !</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter les styles CSS améliorés et plus gros
    alertDiv.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #7c3aed 100%);
        color: white;
        padding: 0;
        border-radius: 25px;
        box-shadow: 0 25px 80px rgba(0, 212, 255, 0.6);
        z-index: 10000;
        max-width: 600px;
        min-width: 500px;
        animation: slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(25px);
        border: 3px solid rgba(255, 255, 255, 0.4);
        font-family: 'Rajdhani', sans-serif;
        font-size: 18px;
    `;
    
    // Ajouter le CSS pour l'animation améliorée
    var style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(120%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(120%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.5); }
            50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.8); }
        }
        
        #weekendAlert .alert-content {
            padding: 0;
            position: relative;
        }
        
        #weekendAlert .alert-header {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 25px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px 20px 0 0;
        }
        
        #weekendAlert .alert-icon {
            font-size: 32px;
            animation: pulse 2s infinite, glow 3s infinite;
            background: rgba(255, 255, 255, 0.2);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #weekendAlert .alert-title h2 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 900;
            color: white;
            text-transform: uppercase;
            letter-spacing: 2px;
            line-height: 1.2;
        }
        
        #weekendAlert .alert-title p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
            line-height: 1.4;
            font-weight: 500;
        }
        
        #weekendAlert .alert-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-size: 18px;
        }
        
        #weekendAlert .alert-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg) scale(1.1);
        }
        
        #weekendAlert .alert-details {
            padding: 25px 30px;
        }
        
        #weekendAlert .countdown-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 25px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        #weekendAlert .countdown-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #00ff88;
        }
        
        #weekendAlert .countdown-timer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            margin-bottom: 15px;
        }
        
        #weekendAlert .time-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            padding: 10px;
            min-width: 60px;
        }
        
        #weekendAlert .time-value {
            font-size: 24px;
            font-weight: 900;
            color: #00ff88;
            line-height: 1;
            margin-bottom: 5px;
        }
        
        #weekendAlert .time-label {
            font-size: 12px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.8);
            text-transform: uppercase;
        }
        
        #weekendAlert .time-separator {
            font-size: 20px;
            font-weight: 900;
            color: #00ff88;
            margin: 0 5px;
        }
        
        #weekendAlert .countdown-date {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            opacity: 0.9;
            color: rgba(255, 255, 255, 0.9);
        }
        
        #weekendAlert .countdown-date i {
            color: #00ff88;
        }
        
        #weekendAlert .feature-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        #weekendAlert .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        
        #weekendAlert .feature-item:last-child {
            border-bottom: none;
        }
        
        #weekendAlert .feature-item:hover {
            transform: translateX(5px);
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            padding-left: 10px;
        }
        
        #weekendAlert .feature-item i {
            font-size: 18px;
            color: #00ff88;
            min-width: 20px;
        }
        
        #weekendAlert .feature-item span {
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
        }
        
        #weekendAlert .alert-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 0 0 20px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        #weekendAlert .alert-timing {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            opacity: 0.8;
        }
        
        #weekendAlert .alert-timing i {
            color: #00ff88;
        }
        
        #weekendAlert .alert-btn {
            background: rgba(0, 255, 136, 0.2);
            border: 2px solid #00ff88;
            color: white;
            padding: 8px 16px;
            border-radius: 25px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            font-weight: 600;
            font-size: 14px;
        }
        
        #weekendAlert .alert-btn:hover {
            background: rgba(0, 255, 136, 0.3);
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 255, 136, 0.3);
        }
        
        @media (max-width: 768px) {
            #weekendAlert {
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                right: auto !important;
                bottom: auto !important;
                max-width: 92vw !important;
                min-width: auto !important;
                width: 85% !important;
                z-index: 10000 !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            #weekendAlert .alert-header {
                padding: 20px !important;
                gap: 15px !important;
                flex-direction: row !important;
                text-align: left !important;
                align-items: center !important;
            }
            
            #weekendAlert .alert-icon {
                width: 50px !important;
                height: 50px !important;
                font-size: 20px !important;
                margin-bottom: 0 !important;
            }
            
            #weekendAlert .alert-title h2 {
                font-size: 18px !important;
                line-height: 1.2 !important;
                margin-bottom: 4px !important;
            }
            
            #weekendAlert .alert-title p {
                font-size: 13px !important;
                margin-bottom: 0 !important;
            }
            
            #weekendAlert .alert-details {
                padding: 20px 25px !important;
            }
            
            #weekendAlert .countdown-section {
                padding: 20px !important;
                margin-bottom: 20px !important;
            }
            
            #weekendAlert .countdown-title {
                font-size: 14px !important;
                margin-bottom: 12px !important;
                gap: 8px !important;
            }
            
            #weekendAlert .countdown-timer {
                gap: 4px !important;
                margin-bottom: 12px !important;
            }
            
            #weekendAlert .time-unit {
                min-width: 50px !important;
                padding: 8px 6px !important;
            }
            
            #weekendAlert .time-value {
                font-size: 20px !important;
            }
            
            #weekendAlert .time-label {
                font-size: 11px !important;
            }
            
            #weekendAlert .feature-item {
                gap: 10px !important;
                padding: 6px 0 !important;
            }
            
            #weekendAlert .feature-item span {
                font-size: 12px !important;
            }
            
            #weekendAlert .alert-footer {
                flex-direction: row !important;
                gap: 12px !important;
                padding: 12px 20px !important;
                justify-content: space-between !important;
            }
            
            #weekendAlert .alert-timing {
                font-size: 12px !important;
                gap: 6px !important;
            }
            
            #weekendAlert .alert-btn {
                padding: 8px 16px !important;
                font-size: 13px !important;
                width: auto !important;
                justify-content: center !important;
            }
        }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(alertDiv);
    
    // Démarrer le compte à rebours
    startCountdown();
    
    // Vérifier si on est en mode maintenance (aujourd'hui à 23H)
    checkMaintenanceMode();
    
    // Plus de fermeture automatique - l'utilisateur doit cliquer sur "Parfait"
}

function startCountdown() {
    // Date cible : Samedi 9 Mai 2026 00:00:00
    var targetDate = new Date('2026-05-09T00:00:00');
    
    function updateCountdown() {
        var now = new Date();
        var difference = targetDate - now;
        
        if (difference > 0) {
            var days = Math.floor(difference / (1000 * 60 * 60 * 24));
            var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            // Mettre à jour les éléments
            var daysElement = document.getElementById('days');
            var hoursElement = document.getElementById('hours');
            var minutesElement = document.getElementById('minutes');
            var secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Le countdown est terminé
            var daysElement = document.getElementById('days');
            var hoursElement = document.getElementById('hours');
            var minutesElement = document.getElementById('minutes');
            var secondsElement = document.getElementById('seconds');
            
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
        }
    }
    
    // Mettre à jour immédiatement
    updateCountdown();
    
    // Mettre à jour chaque seconde
    setInterval(updateCountdown, 1000);
}

function closeWeekendAlert() {
    var alertDiv = document.getElementById('weekendAlert');
    if (alertDiv) {
        alertDiv.style.animation = 'slideOutRight 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(function() {
            alertDiv.remove();
        }, 800);
    }
}

function checkMaintenanceMode() {
    // Mode maintenance désactivé - site accessible normalement
    // showMaintenanceMode();
}

function showMaintenanceMode() {
    // Créer un overlay de maintenance complet
    var maintenanceOverlay = document.createElement('div');
    maintenanceOverlay.id = 'maintenanceOverlay';
    maintenanceOverlay.innerHTML = `
        <div class="maintenance-content">
            <div class="maintenance-header">
                <div class="maintenance-icon">
                    <i class="fa-solid fa-tools"></i>
                </div>
                <h1>🔧 MODE MAINTENANCE</h1>
                <p class="main-message">Mise à jour majeure en cours</p>
                <p class="return-time"><strong>Retour prévu : 18H aujourd'hui</strong></p>
            </div>
            
            <div class="maintenance-info">
                <div class="info-section">
                    <div class="progress-section">
                        <div class="progress-label">
                            <span>Progression</span>
                            <span class="progress-percent" id="progressPercent">0%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-status" id="progressStatus">Initialisation...</div>
                    </div>
                    
                    <div class="timer-section">
                        <div class="timer-label">Temps restant</div>
                        <div class="timer-display" id="maintenanceTimer">00:00:00</div>
                    </div>
                </div>
                
                <div class="features-section">
                    <h3>🚀 Nouveautés Jarvis</h3>
                    <div class="features-grid">
                        <div class="feature-item">Interface refaite</div>
                        <div class="feature-item">Performance optimisée</div>
                        <div class="feature-item">Sécurité renforcée</div>
                        <div class="feature-item">Fonctions avancées</div>
                    </div>
                </div>
            </div>
            
            <div class="maintenance-footer">
                <p>Merci de votre patience 🙏</p>
                <p class="site-name">Tomclair.tech - Mise à jour...</p>
            </div>
        </div>
    `;
    
    // Ajouter les styles CSS pour le mode maintenance complet
    var maintenanceStyle = document.createElement('style');
    maintenanceStyle.textContent = `
        #maintenanceOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0f 0%, #1a1f3a 100%);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Rajdhani', sans-serif;
            color: #e0e0e0;
        }
        
        .maintenance-content {
            text-align: center;
            max-width: 700px;
            padding: 30px 25px;
            background: rgba(255, 255, 255, 0.05);
            border: 2px solid rgba(0, 212, 255, 0.3);
            border-radius: 20px;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 60px rgba(0, 212, 255, 0.2);
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .maintenance-header {
            margin-bottom: 25px;
        }
        
        .maintenance-icon {
            font-size: 50px;
            color: #00d4ff;
            margin-bottom: 15px;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .maintenance-content h1 {
            font-family: 'Orbitron', sans-serif;
            font-size: 28px;
            margin-bottom: 10px;
            color: #00d4ff;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .main-message {
            font-size: 18px;
            margin-bottom: 8px;
            color: #e0e0e0;
        }
        
        .return-time {
            font-size: 20px;
            margin-bottom: 0;
            color: #00ff88;
            font-weight: bold;
        }
        
        .maintenance-info {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .info-section {
            flex: 1;
        }
        
        .progress-section {
            background: rgba(0, 212, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid rgba(0, 212, 255, 0.2);
            margin-bottom: 15px;
        }
        
        .timer-section {
            background: rgba(0, 255, 136, 0.1);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid rgba(0, 255, 136, 0.2);
        }
        
        .progress-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 600;
            color: #00ff88;
        }
        
        .progress-percent {
            font-family: 'Orbitron', sans-serif;
            font-size: 16px;
        }
        
        .progress-bar {
            width: 100%;
            height: 10px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00d4ff, #00ff88);
            border-radius: 5px;
            width: 0%;
            transition: width 0.5s ease;
            position: relative;
        }
        
        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .progress-status {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
            font-style: italic;
        }
        
        .timer-label {
            font-size: 12px;
            color: #00ff88;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .timer-display {
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: #00ff88;
            letter-spacing: 2px;
        }
        
        .features-section {
            flex: 1;
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .features-section h3 {
            font-family: 'Orbitron', sans-serif;
            font-size: 16px;
            color: #00d4ff;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .feature-item {
            font-size: 12px;
            padding: 8px;
            background: rgba(0, 212, 255, 0.1);
            border-radius: 8px;
            color: #e0e0e0;
            text-align: center;
        }
        
        .maintenance-footer {
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .maintenance-footer p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            margin: 5px 0;
        }
        
        .site-name {
            color: #00d4ff !important;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            .maintenance-content {
                margin: 10px;
                padding: 20px 15px;
                max-width: none;
                max-height: 95vh;
            }
            
            .maintenance-content h1 {
                font-size: 22px;
            }
            
            .main-message {
                font-size: 16px;
            }
            
            .return-time {
                font-size: 18px;
            }
            
            .maintenance-info {
                flex-direction: column;
                gap: 15px;
            }
            
            .progress-section,
            .timer-section {
                padding: 15px;
            }
            
            .progress-bar {
                height: 8px;
            }
            
            .timer-display {
                font-size: 20px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
                gap: 8px;
            }
            
            .feature-item {
                font-size: 11px;
                padding: 6px;
            }
            
            .maintenance-footer p {
                font-size: 12px;
            }
        }
    `;
    
    document.head.appendChild(maintenanceStyle);
    document.body.appendChild(maintenanceOverlay);
    
    // Démarrer le timer de maintenance
    startMaintenanceTimer();
}

function startMaintenanceTimer() {
    // Progression fixe : +10% toutes les 1H05
    var currentProgress = 0;
    var progressInterval = 1000; // 1 minute en millisecondes (63 minutes pour 10%)
    var totalDuration = 630000; // 10.5 minutes pour atteindre 100%
    var startTime = Date.now();
    
    // Messages de progression
    var progressMessages = [
        "Initialisation de la maintenance...",
        "Sauvegarde des données en cours...",
        "Téléchargement des mises à jour...",
        "Installation des nouveaux composants...",
        "Configuration de l'interface Jarvis...",
        "Optimisation des performances...",
        "Tests de sécurité en cours...",
        "Finalisation de la mise à jour...",
        "Redémarrage des services...",
        "Maintenance presque terminée..."
    ];
    
    function updateMaintenanceTimer() {
        var elapsed = Date.now() - startTime;
        currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
        
        if (currentProgress < 100) {
            // Mettre à jour la barre de progression
            var progressFill = document.getElementById('progressFill');
            var progressPercent = document.getElementById('progressPercent');
            var progressStatus = document.getElementById('progressStatus');
            
            if (progressFill && progressPercent && progressStatus) {
                progressFill.style.width = currentProgress + '%';
                progressPercent.textContent = Math.floor(currentProgress) + '%';
                
                // Choisir le message de progression approprié
                var messageIndex = Math.floor((currentProgress / 100) * progressMessages.length);
                if (messageIndex >= progressMessages.length) messageIndex = progressMessages.length - 1;
                progressStatus.textContent = progressMessages[messageIndex];
            }
            
            setTimeout(updateMaintenanceTimer, progressInterval);
        } else {
            // Maintenance terminée, afficher 100% et recharger
            var progressFill = document.getElementById('progressFill');
            var progressPercent = document.getElementById('progressPercent');
            var progressStatus = document.getElementById('progressStatus');
            
            if (progressFill && progressPercent && progressStatus) {
                progressFill.style.width = '100%';
                progressPercent.textContent = '100%';
                progressStatus.textContent = 'Maintenance terminée ! Redémarrage...';
            }
            
            setTimeout(function() {
                location.reload();
            }, 3000);
        }
    }
    
    updateMaintenanceTimer();
}

function initScrollProgress() {
    var progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

function initBackToTop() {
    var backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(form);
        var submitBtn = form.querySelector('button[type="submit"]');
        var originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.success) {
                submitBtn.textContent = 'Message envoyé !';
                form.reset();
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        })
        .catch(function(error) {
            submitBtn.textContent = 'Erreur - Réessayez';
            submitBtn.disabled = false;
            setTimeout(function() {
                submitBtn.textContent = originalText;
            }, 3000);
        });
    });
}

function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        var icon = item.querySelector('.fa-chevron-down');
        
        question.addEventListener('click', function() {
            var isOpen = answer.style.display === 'block';
            
            // Close all other items
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                    otherItem.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            answer.style.display = isOpen ? 'none' : 'block';
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });
}

function initSmoothScroll() {
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!navLinks.length) return;
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                var offsetTop = targetSection.offsetTop - 80;
                
                // Animation premium avec easing personnalisé
                var startPosition = window.pageYOffset;
                var distance = offsetTop - startPosition;
                var duration = 1200; // 1.2 secondes
                var startTime = null;
                
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
                
                function animateScroll(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    var timeElapsed = currentTime - startTime;
                    var progress = Math.min(timeElapsed / duration, 1);
                    var easeProgress = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + (distance * easeProgress));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                
                requestAnimationFrame(animateScroll);
                
                // Update active nav link avec animation
                navLinks.forEach(function(l) {
                    l.classList.remove('active');
                });
                this.classList.add('active');
                
                // Ajouter un effet de pulse sur la section cible
                targetSection.style.animation = 'sectionPulse 0.6s ease-out';
                setTimeout(function() {
                    targetSection.style.animation = '';
                }, 600);
            }
        });
    });
}

function initMobileMenu() {
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.querySelector('.nav-links');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        var navToggle = document.getElementById('navToggle');
        var navLinks = document.querySelector('.nav-links');
        if (navToggle && navLinks) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
