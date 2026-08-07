// ============================================================
// WEATHERLAB НУШ — Analytics & Tracking v2.0
// ============================================================
// Privacy-respecting analytics for educational use
// ============================================================

const Analytics = {
    // Configuration
    config: {
        enabled: true,
        anonymizeData: true,
        batchSize: 10,
        flushInterval: 30000, // 30 seconds
        endpoint: null, // Set in production
        debug: false
    },
    
    // Event buffer
    eventBuffer: [],
    sessionId: null,
    sessionStart: null,
    
    /**
     * Initialize analytics
     */
    init() {
        this.sessionId = this.generateSessionId();
        this.sessionStart = new Date().toISOString();
        
        // Load saved config
        const savedConfig = JSON.parse(localStorage.getItem('weatherlab_analytics_config') || 'null');
        if (savedConfig) {
            this.config = { ...this.config, ...savedConfig };
        }
        
        // Track initial page view
        this.track('app_loaded', {
            version: '2.0',
            mode: localStorage.getItem('weatherlab_mode') || 'child',
            language: localStorage.getItem('weatherlab_lang') || 'uk',
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            isPWA: window.matchMedia('(display-mode: standalone)').matches
        });
        
        // Set up periodic flush
        setInterval(() => this.flush(), this.config.flushInterval);
        
        // Flush on page unload
        window.addEventListener('beforeunload', () => this.flush());
        
        if (this.config.debug) {
            console.log('📊 Analytics initialized:', this.sessionId);
        }
    },
    
    /**
     * Track an event
     * @param {string} eventName - Event name
     * @param {Object} [data] - Event data
     */
    track(eventName, data = {}) {
        if (!this.config.enabled) return;
        
        const event = {
            event: eventName,
            timestamp: new Date().toISOString(),
            sessionId: this.sessionId,
            data: this.config.anonymizeData ? this.anonymize(data) : data,
            page: window.location.pathname,
            referrer: document.referrer || null
        };
        
        this.eventBuffer.push(event);
        
        if (this.config.debug) {
            console.log(`📊 [Event] ${eventName}`, data);
        }
        
        // Flush if buffer is full
        if (this.eventBuffer.length >= this.config.batchSize) {
            this.flush();
        }
    },
    
    /**
     * Track page view
     * @param {string} pageName - Page name
     */
    pageView(pageName) {
        this.track('page_view', {
            pageName: pageName,
            title: document.title,
            url: window.location.href
        });
    },
    
    /**
     * Track user action
     * @param {string} action - Action name
     * @param {string} category - Action category
     * @param {string} [label] - Action label
     */
    action(action, category, label = null) {
        this.track('user_action', {
            action,
            category,
            label
        });
    },
    
    /**
     * Track error
     * @param {Error|string} error - Error object or message
     * @param {string} [source] - Error source
     */
    error(error, source = 'unknown') {
        this.track('error', {
            message: error.message || error,
            stack: error.stack || null,
            source: source
        });
    },
    
    /**
     * Track performance metric
     * @param {string} metric - Metric name
     * @param {number} value - Metric value
     */
    performance(metric, value) {
        this.track('performance', {
            metric,
            value,
            unit: 'ms'
        });
    },
    
    /**
     * Get session statistics
     * @returns {Object} Session stats
     */
    getSessionStats() {
        const allEvents = JSON.parse(localStorage.getItem('weatherlab_events') || '[]');
        const sessionEvents = allEvents.filter(e => e.sessionId === this.sessionId);
        
        const eventCounts = {};
        sessionEvents.forEach(e => {
            eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
        });
        
        return {
            sessionId: this.sessionId,
            startTime: this.sessionStart,
            duration: Date.now() - new Date(this.sessionStart).getTime(),
            totalEvents: sessionEvents.length,
            eventBreakdown: eventCounts
        };
    },
    
    /**
     * Get aggregate statistics
     * @returns {Object} Aggregate stats
     */
    getAggregateStats() {
        const allEvents = JSON.parse(localStorage.getItem('weatherlab_events') || '[]');
        
        // Daily active usage
        const dailyUsage = {};
        const eventCounts = {};
        const weatherRecordCounts = {};
        
        allEvents.forEach(e => {
            // Daily usage
            const date = e.timestamp.split('T')[0];
            dailyUsage[date] = (dailyUsage[date] || 0) + 1;
            
            // Event counts
            eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
            
            // Weather record stats
            if (e.event === 'record_saved' && e.data?.weather) {
                weatherRecordCounts[e.data.weather] = (weatherRecordCounts[e.data.weather] || 0) + 1;
            }
        });
        
        // Calculate streaks
        const dates = Object.keys(dailyUsage).sort();
        let currentStreak = 0;
        let maxStreak = 0;
        
        dates.forEach((date, index) => {
            if (index === 0) {
                currentStreak = 1;
            } else {
                const prevDate = new Date(dates[index - 1]);
                const currDate = new Date(date);
                const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);
                
                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                }
            }
            maxStreak = Math.max(maxStreak, currentStreak);
        });
        
        return {
            totalEvents: allEvents.length,
            totalDays: Object.keys(dailyUsage).length,
            maxStreak,
            mostCommonEvent: Object.entries(eventCounts).sort((a, b) => b[1] - a[1])[0] || null,
            weatherDistribution: weatherRecordCounts,
            dailyUsage
        };
    },
    
    /**
     * Flush events to storage/endpoint
     */
    async flush() {
        if (this.eventBuffer.length === 0) return;
        
        const events = [...this.eventBuffer];
        this.eventBuffer = [];
        
        // Store locally
        try {
            const storedEvents = JSON.parse(localStorage.getItem('weatherlab_events') || '[]');
            storedEvents.push(...events);
            
            // Keep only last 1000 events to prevent storage overflow
            const trimmed = storedEvents.slice(-1000);
            localStorage.setItem('weatherlab_events', JSON.stringify(trimmed));
        } catch (e) {
            console.error('Failed to store analytics events:', e);
        }
        
        // Send to endpoint if configured
        if (this.config.endpoint) {
            try {
                await fetch(this.config.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ events, sessionId: this.sessionId }),
                    keepalive: true
                });
            } catch (e) {
                console.error('Failed to send analytics:', e);
            }
        }
    },
    
    /**
     * Anonymize sensitive data
     * @param {Object} data - Raw data
     * @returns {Object} Anonymized data
     */
    anonymize(data) {
        const sensitiveKeys = ['email', 'name', 'phone', 'address', 'password', 'token'];
        const cleaned = { ...data };
        
        sensitiveKeys.forEach(key => {
            if (cleaned[key]) {
                cleaned[key] = '[REDACTED]';
            }
        });
        
        return cleaned;
    },
    
    /**
     * Generate unique session ID
     * @returns {string}
     */
    generateSessionId() {
        return 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    /**
     * Enable/disable analytics
     * @param {boolean} enabled
     */
    setEnabled(enabled) {
        this.config.enabled = enabled;
        localStorage.setItem('weatherlab_analytics_config', JSON.stringify(this.config));
    },
    
    /**
     * Clear all analytics data
     */
    clearData() {
        localStorage.removeItem('weatherlab_events');
        this.eventBuffer = [];
    },
    
    /**
     * Export analytics data
     * @returns {Object} All analytics data
     */
    exportData() {
        return {
            session: this.getSessionStats(),
            aggregate: this.getAggregateStats(),
            config: this.config,
            exportedAt: new Date().toISOString()
        };
    }
};

// Initialize analytics on load
document.addEventListener('DOMContentLoaded', () => {
    Analytics.init();
});
