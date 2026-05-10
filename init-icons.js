/**
 * Initialize Category Icons
 * This script runs after enhanced-icons.js and sets up all category icons
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for categoryIcons to be available
    if (typeof categoryIcons === 'undefined') {
        console.warn('categoryIcons not loaded yet, retrying...');
        setTimeout(arguments.callee, 100);
        return;
    }

    // Map of label IDs to icon names
    const labelIconMap = {
        'label-next-hour': 'clock',
        'label-hourly': 'clock',
        'label-daily': 'calendar',
        'label-humidity': 'droplet',
        'label-wind': 'wind',
        'label-visibility': 'eye',
        'label-feels-like': 'thermometer',
        'label-uv': 'uv',
        'label-pressure': 'pressure',
        'label-sunrise': 'sunrise',
        'label-sunset': 'sunset'
    };

    // Initialize each label icon
    for (const [labelId, iconName] of Object.entries(labelIconMap)) {
        const label = document.getElementById(labelId);
        if (label) {
            const iconSpan = label.querySelector('.label-icon');
            if (iconSpan) {
                const svg = categoryIcons.getIcon(iconName);
                if (svg) {
                    iconSpan.innerHTML = svg;
                }
            }
        }
    }

    console.log('Category icons initialized successfully');
});
