// ============================================================
// WEATHERLAB НУШ — Accessibility Manager v2.0
// ============================================================
// Manages accessibility features and user preferences
// ============================================================

const Accessibility = {
    // Default settings
    settings: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        dyslexicFont: false,
        simplifiedMode: false,
        screenReaderOptimized: false,
        focusIndicators: true,
        monochrome: false
    },
    
    // Feature detection cache
    features: {
        screenReader: null,
        reducedMotionPreference: null,
        highContrastPreference: null,
        touchDevice: null
    },
    
    /**
     * Initialize accessibility features
     */
    init() {
        // Load saved settings
        this.loadSettings();
        
        // Detect user preferences
        this.detectFeatures();
        
        // Apply settings
        this.applyAllSettings();
        
        // Set up mutation observer for dynamic content
        this.observeDOM();
        
        // Set up keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        console.log('♿ Accessibility initialized', this.settings);
    },
    
    /**
     * Load settings from localStorage
     */
    loadSettings() {
        const saved = JSON.parse(localStorage.getItem('weatherlab_a11y') || 'null');
        if (saved) {
            this.settings = { ...this.settings, ...saved };
        }
        
        // Check system preferences
        this.features.reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.features.highContrastPreference = window.matchMedia('(prefers-contrast: high)').matches;
        this.features.touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Apply system preferences if not manually set
        if (saved === null) {
            this.settings.reducedMotion = this.features.reducedMotionPreference;
            this.settings.highContrast = this.features.highContrastPreference;
        }
    },
    
    /**
     * Save settings to localStorage
     */
    saveSettings() {
        localStorage.setItem('weatherlab_a11y', JSON.stringify(this.settings));
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('accessibilityChanged', { 
            detail: this.settings 
        }));
    },
    
    /**
     * Detect accessibility features
     */
    detectFeatures() {
        // Detect screen reader (heuristic)
        this.features.screenReader = (() => {
            // Check for common screen reader indicators
            const hasScreenReaderClass = document.body.classList.contains('screen-reader-active');
            const hasAccessibilityAPI = window.navigator.accessibility !== undefined;
            return hasScreenReaderClass || hasAccessibilityAPI;
        })();
        
        // Listen for preference changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            if (this.settings.reducedMotion !== e.matches) {
                this.settings.reducedMotion = e.matches;
                this.applySetting('reducedMotion');
                this.saveSettings();
            }
        });
        
        window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
            if (this.settings.highContrast !== e.matches) {
                this.settings.highContrast = e.matches;
                this.applySetting('highContrast');
                this.saveSettings();
            }
        });
    },
    
    /**
     * Apply all accessibility settings
     */
    applyAllSettings() {
        Object.keys(this.settings).forEach(setting => {
            this.applySetting(setting);
        });
    },
    
    /**
     * Apply a specific setting
     * @param {string} setting - Setting name
     */
    applySetting(setting) {
        const value = this.settings[setting];
        const body = document.body;
        const html = document.documentElement;
        
        switch (setting) {
            case 'highContrast':
                body.classList.toggle('high-contrast', value);
                html.style.setProperty('--bg-primary', value ? '#ffffff' : '');
                this.updatePanelButton('high-contrast-btn', value);
                break;
                
            case 'largeText':
                body.classList.toggle('large-text', value);
                this.updatePanelButton('large-text-btn', value);
                break;
                
            case 'reducedMotion':
                body.classList.toggle('reduced-motion', value);
                this.updatePanelButton('reduced-motion-btn', value);
                break;
                
            case 'dyslexicFont':
                body.classList.toggle('dyslexic-font', value);
                if (value) {
                    this.loadDyslexicFont();
                }
                this.updatePanelButton('dyslexic-font-btn', value);
                break;
                
            case 'simplifiedMode':
                body.classList.toggle('simplified-mode', value);
                this.updatePanelButton('simplified-mode-btn', value);
                break;
                
            case 'screenReaderOptimized':
                body.classList.toggle('sr-optimized', value);
                this.addScreenReaderAnnouncements(value);
                break;
                
            case 'focusIndicators':
                body.classList.toggle('no-focus-indicators', !value);
                break;
                
            case 'monochrome':
                body.classList.toggle('monochrome', value);
                html.style.setProperty('filter', value ? 'grayscale(100%)' : '');
                break;
        }
    },
    
    /**
     * Toggle a setting
     * @param {string} setting - Setting name
     */
    toggle(setting) {
        if (this.settings[setting] !== undefined) {
            this.settings[setting] = !this.settings[setting];
            this.applySetting(setting);
            this.saveSettings();
            this.announceChange(setting);
        }
    },
    
    /**
     * Update accessibility panel button state
     */
    updatePanelButton(buttonId, isActive) {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.setAttribute('aria-pressed', isActive);
            btn.classList.toggle('active', isActive);
        }
    },
    
    /**
     * Announce setting change to screen readers
     */
    announceChange(setting) {
        const messages = {
            highContrast: {
                on: 'Режим високого контрасту увімкнено',
                off: 'Режим високого контрасту вимкнено'
            },
            largeText: {
                on: 'Великий текст увімкнено',
                off: 'Великий текст вимкнено'
            },
            reducedMotion: {
                on: 'Анімації зменшено',
                off: 'Анімації відновлено'
            },
            dyslexicFont: {
                on: 'Шрифт для дислексії увімкнено',
                off: 'Стандартний шрифт відновлено'
            },
            simplifiedMode: {
                on: 'Спрощений режим увімкнено',
                off: 'Повний режим відновлено'
            }
        };
        
        const message = messages[setting]?.[this.settings[setting] ? 'on' : 'off'];
        if (message) {
            this.announce(message);
        }
    },
    
    /**
     * Announce message to screen readers
     * @param {string} message - Message to announce
     */
    announce(message) {
        const announcer = document.getElementById('a11y-announcer') || this.createAnnouncer();
        announcer.textContent = '';
        setTimeout(() => {
            announcer.textContent = message;
        }, 50);
    },
    
    /**
     * Create screen reader announcer element
     */
    createAnnouncer() {
        const announcer = document.createElement('div');
        announcer.id = 'a11y-announcer';
        announcer.className = 'sr-only';
        announcer.setAttribute('aria-live', 'assertive');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
        return announcer;
    },
    
    /**
     * Add screen reader announcements for dynamic content
     */
    addScreenReaderAnnouncements(enabled) {
        if (enabled) {
            // Announce page sections
            document.querySelectorAll('[role="region"], [role="main"], [role="navigation"]').forEach(el => {
                if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
                    const heading = el.querySelector('h1, h2, h3');
                    if (heading) {
                        el.setAttribute('aria-labelledby', heading.id || heading.textContent.trim());
                    }
                }
            });
        }
    },
    
    /**
     * Load OpenDyslexic font dynamically
     */
    loadDyslexicFont() {
        if (document.getElementById('dyslexic-font-css')) return;
        
        const link = document.createElement('link');
        link.id = 'dyslexic-font-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic.css';
        document.head.appendChild(link);
    },
    
    /**
     * Set up keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + A: Toggle accessibility menu
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                const panel = document.getElementById('accessibility-panel');
                if (panel) {
                    panel.hidden = !panel.hidden;
                    this.announce(panel.hidden ? 'Меню доступності закрито' : 'Меню доступності відкрито');
                }
            }
            
            // Alt + C: Toggle high contrast
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                this.toggle('highContrast');
            }
            
            // Alt + T: Toggle large text
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                this.toggle('largeText');
            }
            
            // Alt + M: Toggle reduced motion
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                this.toggle('reducedMotion');
            }
        });
    },
    
    /**
     * Observe DOM changes for new content
     */
    observeDOM() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.enhanceNewElement(node);
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },
    
    /**
     * Enhance new elements with accessibility attributes
     */
    enhanceNewElement(element) {
        // Add missing alt text to images
        element.querySelectorAll?.('img:not([alt])')?.forEach(img => {
            img.setAttribute('alt', '');
            img.setAttribute('role', 'presentation');
        });
        
        // Ensure interactive elements have accessible names
        element.querySelectorAll?.('button:not([aria-label]):empty, a:not([aria-label]):empty')?.forEach(el => {
            const text = el.textContent?.trim();
            if (!text) {
                el.setAttribute('aria-label', 'Кнопка');
            }
        });
        
        // Add ARIA roles to custom elements
        element.querySelectorAll?.('[onclick]:not([role])')?.forEach(el => {
            if (el.tagName !== 'A' && el.tagName !== 'BUTTON') {
                el.setAttribute('role', 'button');
                el.setAttribute('tabindex', '0');
            }
        });
    },
    
    /**
     * Get contrast ratio between two colors
     * @param {string} color1 - CSS color
     * @param {string} color2 - CSS color
     * @returns {number} Contrast ratio
     */
    getContrastRatio(color1, color2) {
        const getLuminance = (color) => {
            const rgb = this.parseColor(color);
            const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
                c = c / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        
        const l1 = getLuminance(color1);
        const l2 = getLuminance(color2);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);
        
        return (lighter + 0.05) / (darker + 0.05);
    },
    
    /**
     * Parse CSS color to RGB
     */
    parseColor(color) {
        const div = document.createElement('div');
        div.style.color = color;
        document.body.appendChild(div);
        const computed = getComputedStyle(div).color;
        document.body.removeChild(div);
        
        const match = computed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return match ? { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) } : { r: 0, g: 0, b: 0 };
    },
    
    /**
     * Check if current theme meets WCAG AA contrast
     * @returns {Object} Results
     */
    checkContrast() {
        const bodyStyles = getComputedStyle(document.body);
        const textColor = bodyStyles.color;
        const bgColor = bodyStyles.backgroundColor;
        
        const ratio = this.getContrastRatio(textColor, bgColor);
        
        return {
            textColor,
            bgColor,
            ratio: ratio.toFixed(2),
            meetsAA: ratio >= 4.5,
            meetsAAA: ratio >= 7
        };
    },
    
    /**
     * Reset all accessibility settings
     */
    resetAll() {
        this.settings = {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            dyslexicFont: false,
            simplifiedMode: false,
            screenReaderOptimized: false,
            focusIndicators: true,
            monochrome: false
        };
        
        this.applyAllSettings();
        this.saveSettings();
        this.announce('Налаштування доступності скинуто до стандартних');
    },
    
    /**
     * Get all current settings
     * @returns {Object}
     */
    getSettings() {
        return { ...this.settings, features: { ...this.features } };
    }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    Accessibility.init();
});
