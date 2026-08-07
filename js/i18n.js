// ============================================================
// WEATHERLAB НУШ — Internationalization (i18n) System v2.0
// ============================================================
// Supports: Ukrainian (uk) | English (en)
// Standards: ISO 639-1, ICU MessageFormat compatible
// ============================================================

const i18n = {
    // Current language
    currentLang: localStorage.getItem('weatherlab_lang') || 'uk',
    
    // Translation dictionaries
    translations: {
        // ===== UKRAINIAN =====
        uk: {
            // App
            appTitle: '🌈 WeatherLab НУШ',
            appSubtitle: 'Інтерактивний календар спостережень за погодою',
            version: 'Версія 2.0 | PWA | WCAG 2.2 AA',
            
            // Navigation & Actions
            today: 'Сьогодні',
            back: '← Назад',
            next: 'Далі →',
            save: '💾 Зберегти',
            cancel: 'Скасувати',
            delete: '🗑️ Видалити',
            close: 'Закрити',
            settings: 'Налаштування',
            accessibility: 'Доступність',
            
            // Location
            locationPlaceholder: '🏙️ Введіть назву міста...',
            detectLocation: '📍 Визначити',
            detectMyLocation: '📍 Визначити моє місце',
            noLocation: 'Локацію не вибрано',
            locationDetected: '✅ Локацію визначено',
            locationError: '❌ Не вдалося визначити локацію',
            
            // Calendar Views
            calendarView: 'Календар',
            listView: 'Список',
            chartView: 'Графік',
            
            // Weather Modal
            weatherRecord: 'Запис погоди',
            temperature: '🌡️ Температура (°C):',
            tempError: 'Введіть температуру від -50 до +50',
            weatherType: '☁️ Тип погоди:',
            windInfo: '💨 Вітер:',
            windSpeed: 'Швидкість вітру (м/с):',
            mood: '😊 Мій настрій:',
            observations: '📝 Мої спостереження:',
            charactersLeft: 'Залишилось символів:',
            deleteRecord: '🗑️ Видалити запис',
            deleteConfirm: 'Видалити цей запис?',
            realDataForDay: '🔬 Реальні дані за цей день:',
            
            // Statistics
            statistics: '📊 Моя статистика',
            daysRecorded: 'днів записано',
            avgTemp: 'середня t°',
            sunnyDays: 'сонячних днів',
            currentStreak: 'днів підряд',
            accuracy: 'точність',
            badgesEarned: 'бейджів',
            
            // Comparison
            compareWithReal: '🔬 Порівняти з реальними даними',
            comparisonResults: '🔬 Результати порівняння',
            noComparisonData: 'Немає записів для порівняння за цей місяць.',
            averageAccuracy: 'Середня точність',
            
            // Export
            exportData: '📥 Експортувати дані',
            printReport: '🖨️ Друк звіту',
            downloadMethodology: '📥 Завантажити методичний паспорт (PDF)',
            
            // Achievements
            myAchievements: '🏆 Мої досягнення',
            newAchievement: 'Нове досягнення!',
            noAchievements: 'Поки що немає досягнень. Почни спостерігати! 🌟',
            
            // PWA
            installPrompt: 'Встанови додаток на свій пристрій для швидкого доступу!',
            install: 'Встановити',
            offlineMode: '📡 Офлайн-режим. Дані збережуться локально.',
            
            // Onboarding
            welcome: '🌈 Ласкаво просимо до WeatherLab!',
            onboardingStep1: 'Привіт, маленький досліднику!',
            onboardingStep1Desc: 'Я допоможу тобі спостерігати за погодою щодня. Це весело та корисно!',
            onboardingStep2: 'Обери свій аватар!',
            onboardingStep3: 'Де ти знаходишся?',
            onboardingStep3Desc: 'Це допоможе порівнювати твої спостереження зі справжньою погодою!',
            onboardingStep4: 'Як тобі зручніше?',
            childMode: 'Дитячий режим',
            childModeDesc: 'Великі кнопки, більше емодзі',
            teacherMode: 'Режим вчителя',
            teacherModeDesc: 'Аналітика, звіти, клас',
            startExploring: '🎉 Почати досліджувати!',
            
            // Accessibility
            highContrast: 'Високий контраст',
            largeText: 'Великий текст',
            reduceMotion: 'Зменшити рух',
            dyslexicFont: 'Шрифт для дислексії',
            simplifiedMode: 'Спрощений режим',
            
            // Teacher Panel
            teacherPanel: '👩‍🏫 Панель вчителя',
            classManagement: 'Управління класом',
            createClassroom: '🏫 Створити клас',
            joinClassroom: '🔗 Приєднатися до класу',
            classDashboard: 'Дашборд класу',
            exportClassReport: '📊 Експорт звіту класу',
            classCode: 'Код класу',
            className: 'Назва класу',
            studentsCount: 'Кількість учнів',
            
            // Methodology
            methodologyPassport: '📋 Методичний паспорт НУШ',
            subject: 'Предмет:',
            subjectName: '«Я досліджую світ» (природнича галузь)',
            classLevel: 'Клас:',
            nushOutcomes: 'Групи результатів НУШ:',
            outcome1: 'Досліджує об\'єкти природи, використовуючи доступні прилади',
            outcome2: 'Фіксує результати спостережень у різні способи',
            outcome3: 'Встановлює взаємозв\'язки між об\'єктами та явищами природи',
            outcome4: 'Аналізує та порівнює отримані дані',
            outcome5: 'Представляє дані у вигляді таблиць, графіків, діаграм',
            inclusiveAdaptations: 'Інклюзивні адаптації:',
            adaptation1: '✅ Підтримка екранних читачів (JAWS, NVDA, VoiceOver, TalkBack)',
            adaptation2: '✅ Повна навігація з клавіатури (Tab, Enter, Escape, стрілки)',
            adaptation3: '✅ Високий контраст (WCAG 2.2 AAA)',
            adaptation4: '✅ Масштабування до 200% без втрати функціоналу',
            adaptation5: '✅ Спрощений режим для учнів з когнітивними особливостями',
            adaptation6: '✅ Шрифт OpenDyslexic для учнів з дислексією',
            adaptation7: '✅ Зменшення анімацій (prefers-reduced-motion)',
            adaptation8: '✅ Мінімальний розмір інтерактивних елементів 44×44px',
            
            // Footer
            dataSource: 'Дані з',
            geocoding: 'Геокодування:',
            
            // Weather Types
            weather_sunny: 'Сонячно',
            weather_partly_cloudy: 'Мінлива хмарність',
            weather_cloudy: 'Хмарно',
            weather_rain: 'Дощ',
            weather_snow: 'Сніг',
            weather_thunderstorm: 'Гроза',
            weather_windy: 'Сильний вітер',
            weather_rainbow: 'Райдуга',
            weather_fog: 'Туман',
            
            // Wind Directions
            wind_north: 'Північний',
            wind_south: 'Південний',
            wind_west: 'Західний',
            wind_east: 'Східний',
            wind_northwest: 'Північно-західний',
            wind_northeast: 'Північно-східний',
            wind_southwest: 'Південно-західний',
            wind_southeast: 'Південно-східний',
            
            // Wind Strength
            wind_calm: 'Штиль',
            wind_light: 'Слабкий',
            wind_moderate: 'Помірний',
            wind_strong: 'Сильний',
            wind_storm: 'Шторм',
            
            // Mood
            mood_happy: 'Щасливий',
            mood_pleased: 'Задоволений',
            mood_neutral: 'Нейтральний',
            mood_sad: 'Сумний',
            mood_excited: 'Радісний',
            mood_tired: 'Втомлений',
            
            // Toast messages
            toast_saved: '✅ Збережено!',
            toast_deleted: '🗑️ Видалено',
            toast_online: '📡 Онлайн',
            toast_offline: '📡 Офлайн-режим',
            toast_error: '❌ Помилка',
            
            // Alerts
            alert_fillAllFields: 'Будь ласка, заповніть всі поля!',
            alert_setLocation: 'Спочатку визначте свою локацію!',
            alert_noData: 'Немає даних для експорту!',
            alert_fetchError: 'Не вдалося отримати дані. Перевірте підключення до Інтернету.',
            alert_storageFull: 'Недостатньо місця для збереження. Очистіть старі записи.',
        },
        
        // ===== ENGLISH =====
        en: {
            // App
            appTitle: '🌈 WeatherLab NUS',
            appSubtitle: 'Interactive Weather Observation Calendar',
            version: 'Version 2.0 | PWA | WCAG 2.2 AA',
            
            // Navigation & Actions
            today: 'Today',
            back: '← Back',
            next: 'Next →',
            save: '💾 Save',
            cancel: 'Cancel',
            delete: '🗑️ Delete',
            close: 'Close',
            settings: 'Settings',
            accessibility: 'Accessibility',
            
            // Location
            locationPlaceholder: '🏙️ Enter city name...',
            detectLocation: '📍 Detect',
            detectMyLocation: '📍 Detect My Location',
            noLocation: 'No location selected',
            locationDetected: '✅ Location detected',
            locationError: '❌ Could not detect location',
            
            // Calendar Views
            calendarView: 'Calendar',
            listView: 'List',
            chartView: 'Chart',
            
            // Weather Modal
            weatherRecord: 'Weather Record',
            temperature: '🌡️ Temperature (°C):',
            tempError: 'Enter temperature from -50 to +50',
            weatherType: '☁️ Weather Type:',
            windInfo: '💨 Wind:',
            windSpeed: 'Wind Speed (m/s):',
            mood: '😊 My Mood:',
            observations: '📝 My Observations:',
            charactersLeft: 'Characters left:',
            deleteRecord: '🗑️ Delete Record',
            deleteConfirm: 'Delete this record?',
            realDataForDay: '🔬 Real Data for this Day:',
            
            // Statistics
            statistics: '📊 My Statistics',
            daysRecorded: 'days recorded',
            avgTemp: 'avg temp',
            sunnyDays: 'sunny days',
            currentStreak: 'day streak',
            accuracy: 'accuracy',
            badgesEarned: 'badges',
            
            // Comparison
            compareWithReal: '🔬 Compare with Real Data',
            comparisonResults: '🔬 Comparison Results',
            noComparisonData: 'No records to compare for this month.',
            averageAccuracy: 'Average accuracy',
            
            // Export
            exportData: '📥 Export Data',
            printReport: '🖨️ Print Report',
            downloadMethodology: '📥 Download Methodology Passport (PDF)',
            
            // Achievements
            myAchievements: '🏆 My Achievements',
            newAchievement: 'New Achievement!',
            noAchievements: 'No achievements yet. Start observing! 🌟',
            
            // PWA
            installPrompt: 'Install this app on your device for quick access!',
            install: 'Install',
            offlineMode: '📡 Offline mode. Data will be saved locally.',
            
            // Onboarding
            welcome: '🌈 Welcome to WeatherLab!',
            onboardingStep1: 'Hello, little explorer!',
            onboardingStep1Desc: 'I will help you observe the weather every day. It\'s fun and useful!',
            onboardingStep2: 'Choose your avatar!',
            onboardingStep3: 'Where are you?',
            onboardingStep3Desc: 'This will help compare your observations with real weather!',
            onboardingStep4: 'Which mode suits you?',
            childMode: 'Child Mode',
            childModeDesc: 'Big buttons, more emojis',
            teacherMode: 'Teacher Mode',
            teacherModeDesc: 'Analytics, reports, class',
            startExploring: '🎉 Start Exploring!',
            
            // Accessibility
            highContrast: 'High Contrast',
            largeText: 'Large Text',
            reduceMotion: 'Reduce Motion',
            dyslexicFont: 'Dyslexic Font',
            simplifiedMode: 'Simplified Mode',
            
            // Teacher Panel
            teacherPanel: '👩‍🏫 Teacher Panel',
            classManagement: 'Class Management',
            createClassroom: '🏫 Create Classroom',
            joinClassroom: '🔗 Join Classroom',
            classDashboard: 'Class Dashboard',
            exportClassReport: '📊 Export Class Report',
            classCode: 'Class Code',
            className: 'Class Name',
            studentsCount: 'Number of Students',
            
            // Methodology
            methodologyPassport: '📋 NUS Methodology Passport',
            subject: 'Subject:',
            subjectName: '"I Explore the World" (Natural Science)',
            classLevel: 'Grade:',
            nushOutcomes: 'NUS Outcome Groups:',
            outcome1: 'Explores natural objects using available instruments',
            outcome2: 'Records observation results in various ways',
            outcome3: 'Establishes relationships between natural objects and phenomena',
            outcome4: 'Analyzes and compares obtained data',
            outcome5: 'Presents data in tables, graphs, and charts',
            inclusiveAdaptations: 'Inclusive Adaptations:',
            adaptation1: '✅ Screen reader support (JAWS, NVDA, VoiceOver, TalkBack)',
            adaptation2: '✅ Full keyboard navigation (Tab, Enter, Escape, arrows)',
            adaptation3: '✅ High contrast (WCAG 2.2 AAA)',
            adaptation4: '✅ Zoom up to 200% without loss of functionality',
            adaptation5: '✅ Simplified mode for students with cognitive disabilities',
            adaptation6: '✅ OpenDyslexic font for students with dyslexia',
            adaptation7: '✅ Reduced animations (prefers-reduced-motion)',
            adaptation8: '✅ Minimum interactive element size of 44×44px',
            
            // Footer
            dataSource: 'Data from',
            geocoding: 'Geocoding:',
            
            // Weather Types
            weather_sunny: 'Sunny',
            weather_partly_cloudy: 'Partly Cloudy',
            weather_cloudy: 'Cloudy',
            weather_rain: 'Rain',
            weather_snow: 'Snow',
            weather_thunderstorm: 'Thunderstorm',
            weather_windy: 'Strong Wind',
            weather_rainbow: 'Rainbow',
            weather_fog: 'Fog',
            
            // Wind Directions
            wind_north: 'North',
            wind_south: 'South',
            wind_west: 'West',
            wind_east: 'East',
            wind_northwest: 'Northwest',
            wind_northeast: 'Northeast',
            wind_southwest: 'Southwest',
            wind_southeast: 'Southeast',
            
            // Wind Strength
            wind_calm: 'Calm',
            wind_light: 'Light',
            wind_moderate: 'Moderate',
            wind_strong: 'Strong',
            wind_storm: 'Storm',
            
            // Mood
            mood_happy: 'Happy',
            mood_pleased: 'Pleased',
            mood_neutral: 'Neutral',
            mood_sad: 'Sad',
            mood_excited: 'Excited',
            mood_tired: 'Tired',
            
            // Toast messages
            toast_saved: '✅ Saved!',
            toast_deleted: '🗑️ Deleted',
            toast_online: '📡 Online',
            toast_offline: '📡 Offline Mode',
            toast_error: '❌ Error',
            
            // Alerts
            alert_fillAllFields: 'Please fill in all fields!',
            alert_setLocation: 'Please set your location first!',
            alert_noData: 'No data to export!',
            alert_fetchError: 'Failed to fetch data. Please check your internet connection.',
            alert_storageFull: 'Not enough storage space. Please clear old records.',
        }
    },
    
    /**
     * Get translation for a key
     * @param {string} key - Translation key
     * @param {string} [lang] - Language code (defaults to current)
     * @returns {string} Translated string
     */
    t(key, lang = null) {
        const language = lang || this.currentLang;
        return this.translations[language]?.[key] || 
               this.translations['uk'][key] || 
               `[${key}]`;
    },
    
    /**
     * Get translation with variable interpolation
     * @param {string} key - Translation key
     * @param {Object} vars - Variables to interpolate
     * @param {string} [lang] - Language code
     * @returns {string} Interpolated string
     * 
     * @example
     * i18n.tf('hello_name', { name: 'Софійка' }) 
     * // => 'Привіт, Софійка!'
     */
    tf(key, vars = {}, lang = null) {
        let template = this.t(key, lang);
        Object.keys(vars).forEach(varName => {
            template = template.replace(`{${varName}}`, vars[varName]);
        });
        return template;
    },
    
    /**
     * Switch current language
     * @param {string} lang - Language code ('uk' or 'en')
     */
    switchLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Language "${lang}" not supported`);
            return;
        }
        
        this.currentLang = lang;
        localStorage.setItem('weatherlab_lang', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = this.t(key);
            if (translation) {
                // Preserve child elements that aren't text
                if (el.children.length === 0) {
                    el.textContent = translation;
                } else {
                    // Update only text nodes
                    this.updateTextNodes(el, key);
                }
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const translation = this.t(key);
            if (translation) {
                el.placeholder = translation;
            }
        });
        
        // Update aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            const translation = this.t(key);
            if (translation) {
                el.setAttribute('aria-label', translation);
            }
        });
        
        // Dispatch event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    },
    
    /**
     * Update text nodes while preserving child elements
     */
    updateTextNodes(element, key) {
        const translation = this.t(key);
        if (!translation) return;
        
        // Find the first text node and update it
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        let textNode = walker.nextNode();
        
        // Skip empty/whitespace text nodes before child elements
        while (textNode && textNode.textContent.trim() === '') {
            textNode = walker.nextNode();
        }
        
        if (textNode) {
            // Check if translation contains HTML-like span for outcome-code
            if (translation.includes('<span')) {
                element.innerHTML = translation;
            } else {
                textNode.textContent = translation;
            }
        }
    },
    
    /**
     * Get current language
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLang;
    },
    
    /**
     * Get list of supported languages
     * @returns {Array<{code: string, name: string, nativeName: string}>}
     */
    getSupportedLanguages() {
        return [
            { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
            { code: 'en', name: 'English', nativeName: 'English' }
        ];
    },
    
    /**
     * Initialize i18n on page load
     */
    init() {
        // Apply saved language
        const savedLang = localStorage.getItem('weatherlab_lang') || 'uk';
        this.switchLanguage(savedLang);
        
        // Set up language switcher buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
