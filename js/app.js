/**
 * WeatherLab НУШ - Main Application Class
 * Version: 2.0
 * License: MIT
 */

class WeatherLabApp {
    constructor() {
        // Date management
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth();
        this.selectedDay = null;
        this.currentView = 'calendar';
        
        // User state
        this.currentLang = localStorage.getItem('weatherlab_lang') || 'uk';
        this.userMode = localStorage.getItem('weatherlab_mode') || 'child';
        this.userLocation = JSON.parse(localStorage.getItem('weatherlab_location') || 'null');
        this.userAvatar = localStorage.getItem('weatherlab_avatar') || null;
        this.onboardingCompleted = localStorage.getItem('weatherlab_onboarding') === 'true';
        this.classroomCode = localStorage.getItem('weatherlab_classroom') || null;
        
        // Data
        this.realWeatherData = null;
        this.monthData = {};
        
        // Accessibility settings
        this.a11ySettings = {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            dyslexicFont: false,
            simplifiedMode: false
        };
        
        // Load saved accessibility settings
        const savedA11y = JSON.parse(localStorage.getItem('weatherlab_a11y') || 'null');
        if (savedA11y) {
            this.a11ySettings = { ...this.a11ySettings, ...savedA11y };
        }
        
        // Weather emoji options
        this.weatherOptions = [
            { value: '☀️', label: 'Сонячно', labelEn: 'Sunny' },
            { value: '🌤️', label: 'Мінлива хмарність', labelEn: 'Partly Cloudy' },
            { value: '☁️', label: 'Хмарно', labelEn: 'Cloudy' },
            { value: '🌧️', label: 'Дощ', labelEn: 'Rain' },
            { value: '❄️', label: 'Сніг', labelEn: 'Snow' },
            { value: '⛈️', label: 'Гроза', labelEn: 'Thunderstorm' },
            { value: '🌪️', label: 'Сильний вітер', labelEn: 'Strong Wind' },
            { value: '🌈', label: 'Райдуга', labelEn: 'Rainbow' },
            { value: '🌫️', label: 'Туман', labelEn: 'Fog' }
        ];
        
        // Mood options
        this.moodOptions = [
            { value: '😀', label: 'Щасливий', labelEn: 'Happy' },
            { value: '😊', label: 'Задоволений', labelEn: 'Pleased' },
            { value: '😐', label: 'Нейтральний', labelEn: 'Neutral' },
            { value: '😢', label: 'Сумний', labelEn: 'Sad' },
            { value: '🤩', label: 'Радісний', labelEn: 'Excited' },
            { value: '🥱', label: 'Втомлений', labelEn: 'Tired' }
        ];
        
        // Wind directions
        this.windDirections = [
            { value: 'Пн', symbol: '↑', label: 'Північний' },
            { value: 'Пд', symbol: '↓', label: 'Південний' },
            { value: 'Зх', symbol: '←', label: 'Західний' },
            { value: 'Сх', symbol: '→', label: 'Східний' },
            { value: 'ПнЗх', symbol: '↖', label: 'Північно-західний' },
            { value: 'ПнСх', symbol: '↗', label: 'Північно-східний' },
            { value: 'ПдЗх', symbol: '↙', label: 'Південно-західний' },
            { value: 'ПдСх', symbol: '↘', label: 'Південно-східний' }
        ];
        
        // Month names (Ukrainian)
        this.monthNames = [
            "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
            "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
        ];
        
        this.monthNamesGenitive = [
            "січня", "лютого", "березня", "квітня", "травня", "червня",
            "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
        ];
        
        // Bind methods
        this.init = this.init.bind(this);
        this.renderCalendar = this.renderCalendar.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    
    /**
     * Initialize the application
     */
    async init() {
        console.log('🌈 WeatherLab НУШ v2.0 initializing...');
        
        // Apply saved accessibility settings
        this.applyAccessibilitySettings();
        
        // Apply language
        this.applyLanguage(this.currentLang);
        
        // Apply user mode
        this.applyUserMode();
        
        // Show onboarding if not completed
        if (!this.onboardingCompleted) {
            this.showOnboarding();
        }
        
        // Initialize components
        this.initEmojiPickers();
        this.initWindPicker();
        this.initCharacterCounter();
        this.initKeyboardNavigation();
        
        // Load initial data
        this.renderCalendar();
        this.updateStats();
        this.checkAchievements();
        
        // Set up online/offline detection
        this.setupConnectivityDetection();
        
        // Load real weather data for current month if location is set
        if (this.userLocation) {
            this.updateLocationDisplay();
            // Optionally preload real data
            // this.fetchRealWeatherData();
        }
        
        // Register for push notifications if supported
        this.setupPushNotifications();
        
        // Track app open
        this.trackEvent('app_opened', { mode: this.userMode, lang: this.currentLang });
        
        console.log('✅ WeatherLab НУШ initialized successfully!');
    }
    
    /**
     * Apply language throughout the UI
     */
    applyLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('weatherlab_lang', lang);
        
        // Update lang attribute on HTML
        document.documentElement.lang = lang;
        document.documentElement.dir = 'ltr';
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const isActive = btn.dataset.lang === lang;
            btn.setAttribute('aria-pressed', isActive);
            btn.setAttribute('aria-checked', isActive);
            if (isActive) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all i18n elements
        if (typeof i18n !== 'undefined' && i18n.translations[lang]) {
            const translations = i18n.translations[lang];
            
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (translations[key]) {
                    el.textContent = translations[key];
                }
            });
            
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.dataset.i18nPlaceholder;
                if (translations[key]) {
                    el.placeholder = translations[key];
                }
            });
        }
        
        // Re-render calendar to update labels
        this.renderCalendar();
    }
    
    /**
     * Switch language
     */
    switchLanguage(lang) {
        this.applyLanguage(lang);
        this.trackEvent('language_switched', { lang });
    }
    
    /**
     * Apply user mode (child/teacher)
     */
    applyUserMode() {
        document.body.classList.remove('mode-child', 'mode-teacher');
        document.body.classList.add(`mode-${this.userMode}`);
        
        // Show/hide teacher panel
        const teacherPanel = document.getElementById('teacher-panel');
        if (teacherPanel) {
            teacherPanel.hidden = this.userMode !== 'teacher';
        }
        
        // Apply simplified mode for young children
        if (this.userMode === 'child' && this.a11ySettings.simplifiedMode) {
            document.body.classList.add('simplified-mode');
        }
    }
    
    /**
     * Set user mode
     */
    setMode(mode) {
        this.userMode = mode;
        localStorage.setItem('weatherlab_mode', mode);
        this.applyUserMode();
        this.trackEvent('mode_changed', { mode });
        
        // Update onboarding
        const modeCards = document.querySelectorAll('.mode-card');
        modeCards.forEach(card => card.classList.remove('selected'));
        const activeCard = document.getElementById(`mode-${mode}`);
        if (activeCard) activeCard.classList.add('selected');
    }
    
    /**
     * Show onboarding wizard
     */
    showOnboarding() {
        const overlay = document.getElementById('onboarding-overlay');
        overlay.hidden = false;
        overlay.style.display = 'flex';
        
        this.currentOnboardingStep = 1;
        this.updateOnboardingStep();
        
        // Generate avatars
        this.generateAvatarPicker();
        
        // Set up onboarding navigation
        document.getElementById('onboarding-next').onclick = () => this.nextOnboardingStep();
        document.getElementById('onboarding-prev').onclick = () => this.prevOnboardingStep();
        
        this.trackEvent('onboarding_started');
    }
    
    /**
     * Generate avatar options
     */
    generateAvatarPicker() {
        const avatars = ['🦊', '🐱', '🐶', '🐼', '🦄', '🐸', '🦋', '🐝', '🌻', '⭐', '🌈', '🚀'];
        const picker = document.getElementById('avatar-picker');
        
        picker.innerHTML = avatars.map(avatar => `
            <button class="avatar-option" data-avatar="${avatar}" 
                    onclick="app.selectAvatar('${avatar}')"
                    aria-label="Обрати аватар ${avatar}">
                ${avatar}
            </button>
        `).join('');
    }
    
    /**
     * Select user avatar
     */
    selectAvatar(avatar) {
        this.userAvatar = avatar;
        localStorage.setItem('weatherlab_avatar', avatar);
        
        document.querySelectorAll('.avatar-option').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.dataset.avatar === avatar) {
                btn.classList.add('selected');
            }
        });
        
        this.trackEvent('avatar_selected', { avatar });
    }
    
    /**
     * Update onboarding step
     */
    updateOnboardingStep() {
        const steps = document.querySelectorAll('.onboarding-step');
        const dots = document.querySelectorAll('.onboarding-dots .dot');
        const prevBtn = document.getElementById('onboarding-prev');
        const nextBtn = document.getElementById('onboarding-next');
        
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === this.currentOnboardingStep);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === this.currentOnboardingStep);
        });
        
        prevBtn.hidden = this.currentOnboardingStep === 1;
        
        if (this.currentOnboardingStep === 4) {
            nextBtn.textContent = this.currentLang === 'uk' ? '🎉 Почати!' : '🎉 Start!';
        } else {
            nextBtn.textContent = this.currentLang === 'uk' ? 'Далі →' : 'Next →';
        }
    }
    
    /**
     * Next onboarding step
     */
    nextOnboardingStep() {
        if (this.currentOnboardingStep < 4) {
            this.currentOnboardingStep++;
            this.updateOnboardingStep();
        } else {
            this.completeOnboarding();
        }
    }
    
    /**
     * Previous onboarding step
     */
    prevOnboardingStep() {
        if (this.currentOnboardingStep > 1) {
            this.currentOnboardingStep--;
            this.updateOnboardingStep();
        }
    }
    
    /**
     * Complete onboarding
     */
    completeOnboarding() {
        // Save location if entered
        const locationInput = document.getElementById('onboarding-location');
        if (locationInput.value.trim()) {
            this.userLocation = {
                name: locationInput.value.trim(),
                source: 'manual'
            };
            localStorage.setItem('weatherlab_location', JSON.stringify(this.userLocation));
            this.updateLocationDisplay();
        }
        
        this.onboardingCompleted = true;
        localStorage.setItem('weatherlab_onboarding', 'true');
        
        document.getElementById('onboarding-overlay').hidden = true;
        document.getElementById('onboarding-overlay').style.display = 'none';
        
        this.trackEvent('onboarding_completed');
        
        // Show welcome achievement
        this.unlockAchievement('first_login');
    }
    
    /**
     * Detect user location
     */
    async detectLocation() {
        const geoBtn = document.getElementById('geo-btn');
        const statusEl = document.getElementById('location-status');
        
        if (!navigator.geolocation) {
            statusEl.textContent = this.currentLang === 'uk' 
                ? 'Геолокація не підтримується вашим браузером' 
                : 'Geolocation is not supported by your browser';
            return;
        }
        
        geoBtn.disabled = true;
        geoBtn.innerHTML = '<span class="loading-spinner"></span> Визначаю...';
        
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                });
            });
            
            const { latitude, longitude } = position.coords;
            
            // Reverse geocode
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=uk`
            );
            const data = await response.json();
            
            this.userLocation = {
                name: data.address.city || data.address.town || data.address.village || 'Невідомо',
                lat: latitude,
                lon: longitude,
                source: 'geolocation'
            };
            
            localStorage.setItem('weatherlab_location', JSON.stringify(this.userLocation));
            this.updateLocationDisplay();
            
            statusEl.textContent = this.currentLang === 'uk' 
                ? `✅ Локацію визначено: ${this.userLocation.name}` 
                : `✅ Location detected: ${this.userLocation.name}`;
            
            this.trackEvent('location_detected', { source: 'geolocation' });
            
            // Fetch real weather data
            this.fetchRealWeatherData();
            
        } catch (error) {
            console.error('Geolocation error:', error);
            statusEl.textContent = this.currentLang === 'uk'
                ? '❌ Не вдалося визначити локацію. Введіть місто вручну.'
                : '❌ Could not detect location. Please enter city manually.';
            this.trackEvent('location_error', { error: error.message });
        } finally {
            geoBtn.disabled = false;
            geoBtn.innerHTML = '📍 Визначити';
        }
    }
    
    /**
     * Update location display
     */
    updateLocationDisplay() {
        const locationName = document.getElementById('location-name');
        if (this.userLocation && this.userLocation.name) {
            locationName.textContent = this.userLocation.name;
            document.getElementById('location-input').value = this.userLocation.name;
        }
    }
    
    /**
     * Render calendar for current month
     */
    renderCalendar() {
        const grid = document.getElementById('calendar-grid');
        const monthLabel = document.getElementById('current-month-label');
        
        monthLabel.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
        
        // Clear grid
        grid.innerHTML = '';
        
        // Calculate first day and total days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getMonth() === this.currentMonth && 
                               today.getFullYear() === this.currentYear;
        
        // Adjust for Monday start
        let startOffset = firstDay === 0 ? 6 : firstDay - 1;
        
        // Add empty cells
        for (let i = 0; i < startOffset; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-cell empty';
            emptyCell.setAttribute('aria-hidden', 'true');
            grid.appendChild(emptyCell);
        }
        
        // Generate day cells
        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';
            cell.setAttribute('role', 'gridcell');
            cell.setAttribute('tabindex', '0');
            
            const cellDate = new Date(this.currentYear, this.currentMonth, day);
            const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
            const savedData = this.getWeatherData(dataKey);
            
            // Determine cell type
            if (isCurrentMonth && day === today.getDate()) {
                cell.classList.add('today');
                cell.setAttribute('aria-label', `Сьогодні, ${day} ${this.monthNamesGenitive[this.currentMonth]}`);
            } else if (cellDate > today) {
                cell.classList.add('future');
                cell.setAttribute('aria-disabled', 'true');
            } else {
                cell.classList.add('past');
            }
            
            if (savedData) {
                cell.classList.add('recorded');
            }
            
            // Build cell content
            let cellHTML = `<div class="cell-date" aria-hidden="true">${day}</div>`;
            
            if (savedData) {
                cellHTML += `<div class="cell-weather" aria-hidden="true">${savedData.weather}</div>`;
                cellHTML += `<div class="cell-temp" aria-hidden="true">${savedData.temp}°C</div>`;
                
                cell.setAttribute('aria-label', 
                    `${day} ${this.monthNamesGenitive[this.currentMonth]}, ${savedData.weather}, ${savedData.temp}°C`);
            } else {
                cell.setAttribute('aria-label', 
                    `${day} ${this.monthNamesGenitive[this.currentMonth]}, немає запису`);
            }
            
            cell.innerHTML = cellHTML;
            
            // Add click handler (only for past/today)
            if (cellDate <= today) {
                cell.addEventListener('click', () => this.openModal(day));
                cell.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.openModal(day);
                    }
                });
            }
            
            grid.appendChild(cell);
        }
        
        // Update button states
        document.getElementById('prev-month').disabled = false;
        document.getElementById('next-month').disabled = false;
        
        // Can't go to future months
        const nextMonth = new Date(this.currentYear, this.currentMonth + 1, 1);
        if (nextMonth > today) {
            document.getElementById('next-month').disabled = true;
        }
    }
    
    /**
     * Get weather data from storage
     */
    getWeatherData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error reading weather data:', e);
            return null;
        }
    }
    
    /**
     * Save weather data to storage
     */
    saveWeatherData(key, data) {
        try {
            // Add metadata
            data.savedAt = new Date().toISOString();
            data.appVersion = '2.0';
            
            localStorage.setItem(key, JSON.stringify(data));
            
            // Also save to IndexedDB if available
            if (window.indexedDB) {
                this.saveToIndexedDB(key, data);
            }
            
            return true;
        } catch (e) {
            console.error('Error saving weather data:', e);
            if (e.name === 'QuotaExceededError') {
                alert(this.currentLang === 'uk' 
                    ? 'Недостатньо місця для збереження. Очистіть старі записи.' 
                    : 'Not enough storage space. Please clear old records.');
            }
            return false;
        }
    }
    
    /**
     * Save data to IndexedDB (for larger datasets)
     */
    async saveToIndexedDB(key, data) {
        // IndexedDB implementation would go here
        // For MVP, localStorage is sufficient
    }
    
    /**
     * Change month
     */
    changeMonth(delta) {
        this.currentMonth += delta;
        
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        
        // Don't allow future months
        const today = new Date();
        const targetMonth = new Date(this.currentYear, this.currentMonth, 1);
        if (targetMonth > today) {
            this.currentMonth = today.getMonth();
            this.currentYear = today.getFullYear();
        }
        
        this.renderCalendar();
        this.updateStats();
    }
    
    /**
     * Go to today
     */
    goToToday() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.renderCalendar();
        this.updateStats();
    }
    
    /**
     * Switch view (calendar/list/chart)
     */
    switchView(view) {
        this.currentView = view;
        
        // Update tab buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
            btn.setAttribute('aria-selected', btn.dataset.view === view);
        });
        
        // Show/hide views
        document.getElementById('calendar-grid').hidden = view !== 'calendar';
        document.getElementById('list-view').hidden = view !== 'list';
        document.getElementById('chart-view').hidden = view !== 'chart';
        
        // Render appropriate view
        if (view === 'list') this.renderListView();
        if (view === 'chart') this.renderChartView();
        
        this.trackEvent('view_switched', { view });
    }
    
    /**
     * Render list view
     */
    renderListView() {
        const listView = document.getElementById('list-view');
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        
        let html = '<div class="list-view-header">';
        html += `<h3>${this.monthNames[this.currentMonth]} ${this.currentYear}</h3>`;
        html += '</div><ul class="weather-list">';
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
            const data = this.getWeatherData(dataKey);
            
            const dayOfWeek = new Date(this.currentYear, this.currentMonth, day).getDay();
            const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            
            html += `<li class="weather-list-item ${data ? 'has-data' : ''}" 
                          onclick="app.openModal(${day})" tabindex="0">
                <span class="list-date">${day} ${this.monthNamesGenitive[this.currentMonth]} (${dayNames[dayOfWeek]})</span>
                ${data ? `<span class="list-weather">${data.weather} ${data.temp}°C</span>` : 
                         '<span class="list-empty">—</span>'}
            </li>`;
        }
        
        html += '</ul>';
        listView.innerHTML = html;
    }
    
    /**
     * Render chart view
     */
    renderChartView() {
        // Simple chart implementation using Canvas
        const canvas = document.getElementById('temperature-chart');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 300;
        
        // Get temperature data
        const temps = [];
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
            const data = this.getWeatherData(dataKey);
            temps.push(data ? data.temp : null);
        }
        
        // Draw chart (simplified)
        this.drawTemperatureChart(ctx, temps);
    }
    
    /**
     * Draw temperature chart
     */
    drawTemperatureChart(ctx, temps) {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const padding = 40;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Filter out null values for range calculation
        const validTemps = temps.filter(t => t !== null);
        if (validTemps.length === 0) {
            ctx.fillStyle = '#666';
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(
                this.currentLang === 'uk' ? 'Немає даних для графіку' : 'No data for chart',
                width / 2, height / 2
            );
            return;
        }
        
        const minTemp = Math.min(...validTemps) - 5;
        const maxTemp = Math.max(...validTemps) + 5;
        const tempRange = maxTemp - minTemp;
        
        // Draw axes
        ctx.strokeStyle = '#ccc';
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Draw temperature points
        ctx.strokeStyle = '#0277bd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        let firstPoint = true;
        temps.forEach((temp, index) => {
            if (temp === null) {
                firstPoint = true;
                return;
            }
            
            const x = padding + (index / (temps.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((temp - minTemp) / tempRange) * (height - 2 * padding);
            
            if (firstPoint) {
                ctx.moveTo(x, y);
                firstPoint = false;
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        temps.forEach((temp, index) => {
            if (temp === null) return;
            
            const x = padding + (index / (temps.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((temp - minTemp) / tempRange) * (height - 2 * padding);
            
            ctx.fillStyle = '#0277bd';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    /**
     * Open weather input modal
     */
    openModal(day) {
        this.selectedDay = day;
        
        const modal = document.getElementById('weather-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDate = document.getElementById('modal-date');
        
        modalTitle.textContent = this.currentLang === 'uk' 
            ? 'Запис погоди' 
            : 'Weather Record';
        
        modalDate.textContent = `${day} ${this.monthNamesGenitive[this.currentMonth]} ${this.currentYear}`;
        
        // Load existing data
        const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
        const existingData = this.getWeatherData(dataKey);
        
        // Reset form
        document.getElementById('weather-form').reset();
        document.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelectorAll('.wind-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('char-count').textContent = '500';
        
        // Show delete button if data exists
        document.getElementById('delete-record-btn').hidden = !existingData;
        
        // Populate with existing data
        if (existingData) {
            document.getElementById('temp-input').value = existingData.temp;
            document.getElementById('notes-input').value = existingData.notes || '';
            document.getElementById('wind-speed').value = existingData.windSpeed || 0;
            document.getElementById('wind-speed-range').value = existingData.windSpeed || 0;
            document.getElementById('wind-speed-value').textContent = existingData.windSpeed || 0;
            
            // Select weather
            const weatherOpt = document.querySelector(`#weather-picker [data-value="${existingData.weather}"]`);
            if (weatherOpt) weatherOpt.classList.add('selected');
            
            // Select mood
            const moodOpt = document.querySelector(`#mood-picker [data-value="${existingData.mood}"]`);
            if (moodOpt) moodOpt.classList.add('selected');
            
            // Select wind direction
            const windOpt = document.querySelector(`#wind-direction-picker [data-value="${existingData.windDirection}"]`);
            if (windOpt) windOpt.classList.add('selected');
            
            // Show real data comparison if available
            this.showRealDataComparison(day);
        } else {
            // Set defaults
            const defaultWeather = document.querySelector('#weather-picker [data-value="☀️"]');
            if (defaultWeather) defaultWeather.classList.add('selected');
            
            const defaultMood = document.querySelector('#mood-picker [data-value="😊"]');
            if (defaultMood) defaultMood.classList.add('selected');
            
            const defaultWind = document.querySelector('#wind-direction-picker [data-value="Пн"]');
            if (defaultWind) defaultWind.classList.add('selected');
        }
        
        // Show modal
        modal.hidden = false;
        modal.style.display = 'flex';
        
        // Focus on temperature input
        setTimeout(() => document.getElementById('temp-input').focus(), 100);
        
        // Trap focus within modal
        this.trapFocus(modal);
        
        this.trackEvent('modal_opened', { day, hasData: !!existingData });
    }
    
    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('weather-modal');
        modal.hidden = true;
        modal.style.display = 'none';
        
        // Restore focus
        if (this.previousFocus) {
            this.previousFocus.focus();
        }
    }
    
    /**
     * Trap focus within modal (accessibility)
     */
    trapFocus(modal) {
        this.previousFocus = document.activeElement;
        
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
            
            if (e.key === 'Escape') {
                app.closeModal();
            }
        });
    }
    
    /**
     * Save weather record
     */
    saveWeatherRecord(event) {
        event.preventDefault();
        
        // Validate
        const tempInput = document.getElementById('temp-input');
        const temp = parseFloat(tempInput.value);
        
        if (isNaN(temp) || temp < -50 || temp > 50) {
            tempInput.setAttribute('aria-invalid', 'true');
            tempInput.focus();
            return;
        }
        tempInput.setAttribute('aria-invalid', 'false');
        
        // Get selected values
        const weatherEl = document.querySelector('#weather-picker .emoji-option.selected');
        const moodEl = document.querySelector('#mood-picker .emoji-option.selected');
        const windDirEl = document.querySelector('#wind-direction-picker .wind-btn.selected');
        const windSpeed = parseFloat(document.getElementById('wind-speed-range').value) || 0;
        const notes = document.getElementById('notes-input').value.trim();
        
        if (!weatherEl || !moodEl || !windDirEl) {
            alert(this.currentLang === 'uk' 
                ? 'Будь ласка, заповніть всі поля!' 
                : 'Please fill in all fields!');
            return;
        }
        
        // Build data object
        const data = {
            temp: temp,
            weather: weatherEl.dataset.value,
            mood: moodEl.dataset.value,
            windDirection: windDirEl.dataset.value,
            windSpeed: windSpeed,
            notes: notes,
            date: `${this.selectedDay}.${this.currentMonth + 1}.${this.currentYear}`,
            timestamp: new Date().toISOString(),
            location: this.userLocation ? this.userLocation.name : null
        };
        
        // Save
        const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${this.selectedDay}`;
        const saved = this.saveWeatherData(dataKey, data);
        
        if (saved) {
            // Update UI
            this.renderCalendar();
            this.updateStats();
            
            // Check achievements
            setTimeout(() => this.checkAchievements(), 500);
            
            // Close modal
            this.closeModal();
            
            // Show success feedback
            this.showToast(this.currentLang === 'uk' ? '✅ Збережено!' : '✅ Saved!');
            
            // Track
            this.trackEvent('record_saved', { day: this.selectedDay, weather: data.weather });
            
            // If in classroom, sync data
            if (this.classroomCode && typeof Classroom !== 'undefined') {
                Classroom.syncRecord(this.selectedDay, data);
            }
        }
    }
    
    /**
     * Delete weather record
     */
    deleteRecord() {
        if (!confirm(this.currentLang === 'uk' 
            ? 'Видалити цей запис?' 
            : 'Delete this record?')) {
            return;
        }
        
        const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${this.selectedDay}`;
        localStorage.removeItem(dataKey);
        
        this.renderCalendar();
        this.updateStats();
        this.closeModal();
        
        this.showToast(this.currentLang === 'uk' ? '🗑️ Видалено' : '🗑️ Deleted');
        this.trackEvent('record_deleted', { day: this.selectedDay });
    }
    
    /**
     * Adjust temperature by delta
     */
    adjustTemp(delta) {
        const input = document.getElementById('temp-input');
        let value = parseFloat(input.value) || 0;
        value += delta;
        value = Math.round(value * 2) / 2; // Round to 0.5
        value = Math.max(-50, Math.min(50, value));
        input.value = value;
    }
    
    /**
     * Initialize emoji pickers
     */
    initEmojiPickers() {
        // Weather picker
        const weatherPicker = document.getElementById('weather-picker');
        weatherPicker.innerHTML = this.weatherOptions.map(opt => `
            <button type="button" class="emoji-option" data-value="${opt.value}"
                    aria-label="${this.currentLang === 'uk' ? opt.label : opt.labelEn}"
                    title="${this.currentLang === 'uk' ? opt.label : opt.labelEn}"
                    onclick="app.selectEmoji(this, 'weather-picker')">
                ${opt.value}
            </button>
        `).join('');
        
        // Mood picker
        const moodPicker = document.getElementById('mood-picker');
        moodPicker.innerHTML = this.moodOptions.map(opt => `
            <button type="button" class="emoji-option" data-value="${opt.value}"
                    aria-label="${this.currentLang === 'uk' ? opt.label : opt.labelEn}"
                    title="${this.currentLang === 'uk' ? opt.label : opt.labelEn}"
                    onclick="app.selectEmoji(this, 'mood-picker')">
                ${opt.value}
            </button>
        `).join('');
    }
    
    /**
     * Select emoji in picker
     */
    selectEmoji(element, pickerId) {
        const picker = document.getElementById(pickerId);
        picker.querySelectorAll('.emoji-option').forEach(opt => opt.classList.remove('selected'));
        element.classList.add('selected');
        element.setAttribute('aria-pressed', 'true');
    }
    
    /**
     * Initialize wind direction picker
     */
    initWindPicker() {
        const picker = document.getElementById('wind-direction-picker');
        picker.innerHTML = this.windDirections.map(dir => `
            <button type="button" class="wind-btn" data-value="${dir.value}"
                    aria-label="${dir.label}"
                    title="${dir.label}"
                    onclick="app.selectWind(this)">
                ${dir.symbol}
            </button>
        `).join('');
    }
    
    /**
     * Select wind direction
     */
    selectWind(element) {
        const picker = document.getElementById('wind-direction-picker');
        picker.querySelectorAll('.wind-btn').forEach(btn => btn.classList.remove('selected'));
        element.classList.add('selected');
    }
    
    /**
     * Initialize character counter
     */
    initCharacterCounter() {
        const notesInput = document.getElementById('notes-input');
        const charCount = document.getElementById('char-count');
        
        notesInput.addEventListener('input', () => {
            const remaining = 500 - notesInput.value.length;
            charCount.textContent = remaining;
            
            if (remaining < 50) {
                charCount.style.color = 'var(--error)';
            } else {
                charCount.style.color = 'var(--gray-500)';
            }
        });
    }
    
    /**
     * Initialize keyboard navigation
     */
    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape to close modal
            if (e.key === 'Escape') {
                const modal = document.getElementById('weather-modal');
                if (!modal.hidden) {
                    this.closeModal();
                }
            }
        });
    }
    
    /**
     * Setup online/offline detection
     */
    setupConnectivityDetection() {
        const indicator = document.getElementById('offline-indicator');
        
        window.addEventListener('online', () => {
            indicator.hidden = true;
            this.showToast(this.currentLang === 'uk' ? '📡 Онлайн' : '📡 Online');
        });
        
        window.addEventListener('offline', () => {
            indicator.hidden = false;
            this.showToast(this.currentLang === 'uk' 
                ? '📡 Офлайн-режим. Дані збережуться локально.' 
                : '📡 Offline mode. Data will be saved locally.');
        });
        
        if (!navigator.onLine) {
            indicator.hidden = false;
        }
    }
    
    /**
     * Setup push notifications
     */
    async setupPushNotifications() {
        if (!('Notification' in window)) return;
        
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            // Schedule daily reminder at 8:00 AM
            this.scheduleDailyReminder();
        }
    }
    
    /**
     * Schedule daily reminder
     */
    scheduleDailyReminder() {
        // Check if notification was already sent today
        const lastNotification = localStorage.getItem('weatherlab_last_notification');
        const today = new Date().toDateString();
        
        if (lastNotification === today) return;
        
        // Schedule for 8:00 AM
        const now = new Date();
        const reminderTime = new Date(now);
        reminderTime.setHours(8, 0, 0, 0);
        
        if (reminderTime < now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }
        
        const timeUntilReminder = reminderTime - now;
        
        setTimeout(() => {
            if (Notification.permission === 'granted') {
                new Notification('🌈 WeatherLab НУШ', {
                    body: this.currentLang === 'uk' 
                        ? 'Час записати погоду! Що ти бачиш за вікном?' 
                        : 'Time to record the weather! What do you see outside?',
                    icon: '/icons/icon-192.png',
                    badge: '/icons/icon-72.png',
                    vibrate: [200, 100, 200]
                });
                
                localStorage.setItem('weatherlab_last_notification', today);
            }
        }, timeUntilReminder);
    }
    
    /**
     * Fetch real weather data from Open-Meteo API
     */
    async fetchRealWeatherData() {
        if (!this.userLocation || !this.userLocation.lat) return;
        
        const { lat, lon } = this.userLocation;
        const startDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-01`;
        const endDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${new Date(this.currentYear, this.currentMonth + 1, 0).getDate()}`;
        
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&start_date=${startDate}&end_date=${endDate}`
            );
            
            if (!response.ok) throw new Error('API request failed');
            
            this.realWeatherData = await response.json();
            this.trackEvent('real_data_fetched');
            
            // Update comparison if modal is open
            if (this.selectedDay) {
                this.showRealDataComparison(this.selectedDay);
            }
            
        } catch (error) {
            console.error('Error fetching real weather data:', error);
            this.trackEvent('real_data_error', { error: error.message });
        }
    }
    
    /**
     * Show real data comparison for a specific day
     */
    showRealDataComparison(day) {
        if (!this.realWeatherData) return;
        
        const dayIndex = day - 1; // API uses 0-based index
        const daily = this.realWeatherData.daily;
        
        if (dayIndex >= daily.time.length) return;
        
        const realTemp = (daily.temperature_2m_max[dayIndex] + daily.temperature_2m_min[dayIndex]) / 2;
        const realWindSpeed = daily.windspeed_10m_max[dayIndex];
        const weatherCode = daily.weathercode[dayIndex];
        
        const weatherEmoji = this.mapWeatherCode(weatherCode);
        
        const banner = document.getElementById('modal-real-data');
        const content = document.getElementById('modal-real-data-content');
        
        content.innerHTML = `
            <p>🌡️ ${this.currentLang === 'uk' ? 'Температура' : 'Temperature'}: ${realTemp.toFixed(1)}°C</p>
            <p>☁️ ${this.currentLang === 'uk' ? 'Погода' : 'Weather'}: ${weatherEmoji}</p>
            <p>💨 ${this.currentLang === 'uk' ? 'Вітер' : 'Wind'}: ${realWindSpeed.toFixed(1)} м/с</p>
        `;
        
        banner.hidden = false;
    }
    
    /**
     * Map Open-Meteo weather code to emoji
     */
    mapWeatherCode(code) {
        const codeMap = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️',
            51: '🌧️', 53: '🌧️', 55: '🌧️',
            61: '🌧️', 63: '🌧️', 65: '🌧️',
            71: '❄️', 73: '❄️', 75: '❄️',
            80: '🌧️', 81: '🌧️', 82: '🌧️',
            85: '❄️', 86: '❄️',
            95: '⛈️', 96: '⛈️', 99: '⛈️'
        };
        return codeMap[code] || '❓';
    }
    
    /**
     * Compare user data with real weather data
     */
    async compareWithRealData() {
        if (!this.userLocation) {
            alert(this.currentLang === 'uk' 
                ? 'Спочатку визначте свою локацію!' 
                : 'Please set your location first!');
            return;
        }
        
        // Show loading state
        const compareBtn = document.getElementById('compare-btn');
        compareBtn.disabled = true;
        compareBtn.innerHTML = '<span class="loading-spinner"></span> Завантажую...';
        
        // Fetch data if not already loaded
        if (!this.realWeatherData) {
            await this.fetchRealWeatherData();
        }
        
        if (!this.realWeatherData) {
            alert(this.currentLang === 'uk' 
                ? 'Не вдалося отримати дані. Перевірте підключення до Інтернету.' 
                : 'Failed to fetch data. Please check your internet connection.');
            compareBtn.disabled = false;
            compareBtn.innerHTML = '🔬 Порівняти з реальними даними';
            return;
        }
        
        // Compare data
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const results = [];
        let totalDiff = 0;
        let compareCount = 0;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
            const userData = this.getWeatherData(dataKey);
            
            if (!userData) continue;
            
            const dayIndex = day - 1;
            if (dayIndex >= this.realWeatherData.daily.time.length) continue;
            
            const realTemp = (this.realWeatherData.daily.temperature_2m_max[dayIndex] + 
                             this.realWeatherData.daily.temperature_2m_min[dayIndex]) / 2;
            
            const diff = Math.abs(userData.temp - realTemp);
            totalDiff += diff;
            compareCount++;
            
            results.push({
                day,
                userTemp: userData.temp,
                realTemp: realTemp.toFixed(1),
                diff: diff.toFixed(1),
                accuracy: diff <= 2 ? 'good' : diff <= 5 ? 'fair' : 'poor'
            });
        }
        
        // Update stats
        const avgAccuracy = compareCount > 0 ? (1 - totalDiff / (compareCount * 10)) * 100 : 0;
        document.getElementById('stat-accuracy').textContent = 
            compareCount > 0 ? `${Math.round(avgAccuracy)}%` : '--%';
        
        // Display results
        const comparisonSection = document.getElementById('comparison-section');
        const resultsDiv = document.getElementById('comparison-results');
        
        if (results.length === 0) {
            resultsDiv.innerHTML = `<p>${this.currentLang === 'uk' 
                ? 'Немає записів для порівняння за цей місяць.' 
                : 'No records to compare for this month.'}</p>`;
        } else {
            let html = '<table class="comparison-table"><thead><tr>';
            html += '<th>Дата</th><th>Ваш запис</th><th>Реальна t°</th><th>Різниця</th></tr></thead><tbody>';
            
            results.forEach(r => {
                html += `<tr>
                    <td>${r.day}.${this.currentMonth + 1}</td>
                    <td>${r.userTemp}°C</td>
                    <td>${r.realTemp}°C</td>
                    <td class="accuracy-${r.accuracy}">${r.diff}°C</td>
                </tr>`;
            });
            
            html += '</tbody></table>';
            html += `<p style="margin-top: 10px;"><strong>${this.currentLang === 'uk' ? 'Середня точність' : 'Average accuracy'}: ${Math.round(avgAccuracy)}%</strong></p>`;
            
            resultsDiv.innerHTML = html;
        }
        
        comparisonSection.hidden = false;
        compareBtn.disabled = false;
        compareBtn.innerHTML = '🔬 Порівняти з реальними даними';
        
        this.trackEvent('comparison_done', { accuracy: Math.round(avgAccuracy) });
    }
    
    /**
     * Update statistics panel
     */
    updateStats() {
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        let totalTemp = 0, count = 0, sunnyDays = 0, currentStreak = 0, maxStreak = 0;
        let badgeCount = 0;
        
        const today = new Date();
        const isCurrentMonth = today.getMonth() === this.currentMonth && 
                               today.getFullYear() === this.currentYear;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
            const data = this.getWeatherData(dataKey);
            
            if (data) {
                totalTemp += data.temp;
                count++;
                if (data.weather === '☀️') sunnyDays++;
                
                // Calculate streak (only for current month and past days)
                const cellDate = new Date(this.currentYear, this.currentMonth, day);
                if (cellDate <= today || !isCurrentMonth) {
                    currentStreak++;
                    maxStreak = Math.max(maxStreak, currentStreak);
                }
            } else {
                currentStreak = 0;
            }
        }
        
        // Count badges
        const allKeys = Object.keys(localStorage).filter(k => k.startsWith('weather_'));
        badgeCount = allKeys.length >= 3 ? 1 : 0;
        badgeCount += allKeys.length >= 7 ? 1 : 0;
        badgeCount += allKeys.length >= 14 ? 1 : 0;
        badgeCount += allKeys.length >= 30 ? 1 : 0;
        badgeCount += sunnyDays >= 5 ? 1 : 0;
        
        // Update display
        document.getElementById('stat-days').textContent = count;
        document.getElementById('stat-avg-temp').textContent = 
            count > 0 ? `${(totalTemp / count).toFixed(1)}°C` : '--°C';
        document.getElementById('stat-sunny').textContent = sunnyDays;
        document.getElementById('stat-streak').textContent = maxStreak;
        document.getElementById('stat-badges').textContent = badgeCount;
    }
    
    /**
     * Check and unlock achievements
     */
    checkAchievements() {
        if (typeof Achievements === 'undefined') return;
        
        const allData = {};
        const keys = Object.keys(localStorage).filter(k => k.startsWith('weather_'));
        keys.forEach(k => {
            allData[k] = JSON.parse(localStorage.getItem(k));
        });
        
        const newBadges = Achievements.check(allData);
        
        newBadges.forEach(badge => {
            this.showAchievementPopup(badge);
        });
        
        // Update achievements display
        this.renderAchievements();
    }
    
    /**
     * Unlock specific achievement
     */
    unlockAchievement(achievementId) {
        if (typeof Achievements === 'undefined') return;
        
        const badge = Achievements.unlock(achievementId);
        if (badge) {
            this.showAchievementPopup(badge);
            this.renderAchievements();
        }
    }
    
    /**
     * Show achievement popup
     */
    showAchievementPopup(badge) {
        const popup = document.getElementById('achievement-popup');
        document.getElementById('achievement-popup-icon').textContent = badge.emoji;
        document.getElementById('achievement-popup-name').textContent = 
            this.currentLang === 'uk' ? badge.nameUk : badge.nameEn;
        
        popup.hidden = false;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            popup.hidden = true;
        }, 5000);
        
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 400]);
        }
    }
    
    /**
     * Dismiss achievement popup
     */
    dismissAchievement() {
        document.getElementById('achievement-popup').hidden = true;
    }
    
    /**
     * Render achievements in sidebar
     */
    renderAchievements() {
        if (typeof Achievements === 'undefined') return;
        
        const list = document.getElementById('achievements-list');
        const unlocked = Achievements.getUnlocked();
        const all = Achievements.getAllBadges();
        
        let html = '';
        all.forEach(badge => {
            const isUnlocked = unlocked.includes(badge.id);
            html += `
                <div class="achievement-badge ${isUnlocked ? 'unlocked' : 'locked'}">
                    <span class="badge-emoji">${isUnlocked ? badge.emoji : '🔒'}</span>
                    <span class="badge-name">${this.currentLang === 'uk' ? badge.nameUk : badge.nameEn}</span>
                </div>
            `;
        });
        
        list.innerHTML = html || '<p>Поки що немає досягнень. Почни спостерігати! 🌟</p>';
    }
    
    /**
     * Export data
     */
    exportData() {
        const allData = {};
        const keys = Object.keys(localStorage).filter(k => k.startsWith('weather_'));
        
        if (keys.length === 0) {
            alert(this.currentLang === 'uk' ? 'Немає даних для експорту!' : 'No data to export!');
            return;
        }
        
        keys.sort().forEach(k => {
            allData[k] = JSON.parse(localStorage.getItem(k));
        });
        
        const dataStr = JSON.stringify(allData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `weatherlab_data_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.trackEvent('data_exported', { recordCount: keys.length });
    }
    
    /**
     * Print report
     */
    printReport() {
        window.print();
        this.trackEvent('report_printed');
    }
    
    /**
     * Download methodology PDF
     */
    downloadMethodologyPDF() {
        // In production, this would link to an actual PDF
        alert(this.currentLang === 'uk' 
            ? 'Методичний паспорт буде доступний у фінальній версії.' 
            : 'Methodology passport will be available in the final version.');
    }
    
    /**
     * Show toast notification
     */
    showToast(message) {
        // Simple toast implementation
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    /**
     * Track event (analytics)
     */
    trackEvent(eventName, data = {}) {
        if (typeof Analytics !== 'undefined') {
            Analytics.track(eventName, data);
        }
        
        // Also log to console in development
        if (window.location.hostname === 'localhost') {
            console.log(`📊 [Event] ${eventName}`, data);
        }
    }
    
    /**
     * Toggle accessibility menu
     */
    toggleAccessibilityMenu() {
        const panel = document.getElementById('accessibility-panel');
        const btn = document.getElementById('accessibility-menu-btn');
        
        const isOpen = !panel.hidden;
        panel.hidden = isOpen;
        btn.setAttribute('aria-expanded', !isOpen);
    }
    
    /**
     * Toggle high contrast mode
     */
    toggleHighContrast() {
        this.a11ySettings.highContrast = !this.a11ySettings.highContrast;
        this.saveAccessibilitySettings();
        document.body.classList.toggle('high-contrast', this.a11ySettings.highContrast);
    }
    
    /**
     * Toggle large text
     */
    toggleLargeText() {
        this.a11ySettings.largeText = !this.a11ySettings.largeText;
        this.saveAccessibilitySettings();
        document.body.classList.toggle('large-text', this.a11ySettings.largeText);
    }
    
    /**
     * Save accessibility settings
     */
    saveAccessibilitySettings() {
        localStorage.setItem('weatherlab_a11y', JSON.stringify(this.a11ySettings));
    }
    
    /**
     * Apply saved accessibility settings
     */
    applyAccessibilitySettings() {
        document.body.classList.toggle('high-contrast', this.a11ySettings.highContrast);
        document.body.classList.toggle('large-text', this.a11ySettings.largeText);
        document.body.classList.toggle('reduced-motion', this.a11ySettings.reducedMotion);
        document.body.classList.toggle('dyslexic-font', this.a11ySettings.dyslexicFont);
        document.body.classList.toggle('simplified-mode', this.a11ySettings.simplifiedMode);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WeatherLabApp();
    app.init();
});
