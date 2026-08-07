// ============================================================
// WEATHERLAB НУШ — Onboarding Wizard v2.0
// ============================================================

const Onboarding = {
    // Onboarding state
    currentStep: 1,
    totalSteps: 4,
    completed: localStorage.getItem('weatherlab_onboarding') === 'true',
    
    // Avatar options
    avatars: [
        '🦊', '🐱', '🐶', '🐼', '🦄', '🐸', 
        '🦋', '🐝', '🌻', '⭐', '🌈', '🚀',
        '🌍', '🔭', '🎨', '📚'
    ],
    
    // Mode options
    modes: [
        {
            id: 'child',
            emoji: '🧒',
            nameUk: 'Дитячий режим',
            nameEn: 'Child Mode',
            descUk: 'Великі кнопки, більше емодзі, спрощений інтерфейс',
            descEn: 'Big buttons, more emojis, simplified interface'
        },
        {
            id: 'teacher',
            emoji: '👩‍🏫',
            nameUk: 'Режим вчителя',
            nameEn: 'Teacher Mode',
            descUk: 'Аналітика, звіти, управління класом',
            descEn: 'Analytics, reports, class management'
        }
    ],
    
    /**
     * Initialize onboarding
     */
    init() {
        if (this.completed) return;
        
        this.render();
        this.show();
        this.bindEvents();
    },
    
    /**
     * Render onboarding steps
     */
    render() {
        const overlay = document.getElementById('onboarding-overlay');
        if (!overlay) return;
        
        const stepsContainer = document.getElementById('onboarding-steps');
        if (!stepsContainer) return;
        
        // Step 1: Welcome
        const step1 = document.createElement('div');
        step1.className = 'onboarding-step active';
        step1.dataset.step = '1';
        step1.innerHTML = `
            <div class="onboarding-emoji">👋</div>
            <h3 data-i18n="onboardingStep1">Привіт, маленький досліднику!</h3>
            <p data-i18n="onboardingStep1Desc">
                Я допоможу тобі спостерігати за погодою щодня. Це весело та корисно!
            </p>
            <p style="margin-top: 15px; color: #666;">
                🌍 Разом ми навчимося розуміти природу!
            </p>
        `;
        
        // Step 2: Avatar
        const step2 = document.createElement('div');
        step2.className = 'onboarding-step';
        step2.dataset.step = '2';
        step2.innerHTML = `
            <div class="onboarding-emoji">🎨</div>
            <h3 data-i18n="onboardingStep2">Обери свій аватар!</h3>
            <p style="color: #666; margin-bottom: 15px;">
                Це буде твій помічник у дослідженні погоди
            </p>
            <div class="avatar-picker" id="avatar-picker" role="radiogroup" aria-label="Вибір аватара">
                ${this.avatars.map(avatar => `
                    <button class="avatar-option" data-avatar="${avatar}" 
                            onclick="Onboarding.selectAvatar('${avatar}')"
                            aria-label="Обрати аватар ${avatar}">
                        ${avatar}
                    </button>
                `).join('')}
            </div>
        `;
        
        // Step 3: Location
        const step3 = document.createElement('div');
        step3.className = 'onboarding-step';
        step3.dataset.step = '3';
        step3.innerHTML = `
            <div class="onboarding-emoji">📍</div>
            <h3 data-i18n="onboardingStep3">Де ти знаходишся?</h3>
            <p data-i18n="onboardingStep3Desc" style="color: #666; margin-bottom: 15px;">
                Це допоможе порівнювати твої спостереження зі справжньою погодою!
            </p>
            <button class="btn btn-primary" onclick="Onboarding.detectLocation()" 
                    id="onboarding-geo-btn">
                📍 <span>Визначити моє місце</span>
            </button>
            <p style="margin: 15px 0; color: #999;">— або —</p>
            <input type="text" id="onboarding-location-input" class="form-input" 
                   placeholder="Введи назву міста" style="text-align: center;">
            <div id="onboarding-location-status" style="margin-top: 10px; font-weight: bold;"></div>
        `;
        
        // Step 4: Mode
        const step4 = document.createElement('div');
        step4.className = 'onboarding-step';
        step4.dataset.step = '4';
        step4.innerHTML = `
            <div class="onboarding-emoji">⚙️</div>
            <h3 data-i18n="onboardingStep4">Як тобі зручніше?</h3>
            <p style="color: #666; margin-bottom: 15px;">
                Обери режим, який підходить саме тобі
            </p>
            <div class="mode-picker">
                ${this.modes.map(mode => `
                    <button class="mode-card" data-mode="${mode.id}" 
                            onclick="Onboarding.selectMode('${mode.id}')">
                        <span style="font-size: 3rem;">${mode.emoji}</span>
                        <strong>${mode.nameUk}</strong>
                        <small style="display: block; margin-top: 5px; color: #666;">
                            ${mode.descUk}
                        </small>
                    </button>
                `).join('')}
            </div>
        `;
        
        stepsContainer.innerHTML = '';
        stepsContainer.appendChild(step1);
        stepsContainer.appendChild(step2);
        stepsContainer.appendChild(step3);
        stepsContainer.appendChild(step4);
        
        // Update dots
        this.updateDots();
    },
    
    /**
     * Show onboarding overlay
     */
    show() {
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.hidden = false;
            overlay.style.display = 'flex';
            // Prevent closing by clicking outside
            overlay.onclick = (e) => {
                if (e.target === overlay) return; // Don't close
            };
        }
        this.currentStep = 1;
        this.updateStep();
    },
    
    /**
     * Hide onboarding overlay
     */
    hide() {
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.hidden = true;
            overlay.style.display = 'none';
        }
    },
    
    /**
     * Bind navigation events
     */
    bindEvents() {
        const nextBtn = document.getElementById('onboarding-next');
        const prevBtn = document.getElementById('onboarding-prev');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStep());
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.completed) return;
            
            const overlay = document.getElementById('onboarding-overlay');
            if (overlay?.hidden) return;
            
            if (e.key === 'ArrowRight' || e.key === 'Enter') {
                e.preventDefault();
                this.nextStep();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevStep();
            } else if (e.key === 'Escape' && this.currentStep > 1) {
                e.preventDefault();
                this.prevStep();
            }
        });
    },
    
    /**
     * Go to next step
     */
    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStep();
        } else {
            this.complete();
        }
    },
    
    /**
     * Go to previous step
     */
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    },
    
    /**
     * Update visible step
     */
    updateStep() {
        // Update step visibility
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.toggle('active', 
                parseInt(step.dataset.step) === this.currentStep);
        });
        
        // Update navigation buttons
        const prevBtn = document.getElementById('onboarding-prev');
        const nextBtn = document.getElementById('onboarding-next');
        
        if (prevBtn) prevBtn.hidden = this.currentStep === 1;
        
        if (nextBtn) {
            if (this.currentStep === this.totalSteps) {
                nextBtn.innerHTML = '🎉 <span>Почати досліджувати!</span>';
            } else {
                nextBtn.innerHTML = '<span>Далі</span> →';
            }
        }
        
        this.updateDots();
        
        // Focus first focusable element in step
        const activeStep = document.querySelector('.onboarding-step.active');
        if (activeStep) {
            const firstInput = activeStep.querySelector('input, button');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
        
        // Track step view
        if (typeof Analytics !== 'undefined') {
            Analytics.track('onboarding_step_viewed', { 
                step: this.currentStep,
                total: this.totalSteps
            });
        }
    },
    
    /**
     * Update progress dots
     */
    updateDots() {
        const dotsContainer = document.getElementById('onboarding-dots');
        if (!dotsContainer) return;
        
        let dotsHTML = '';
        for (let i = 1; i <= this.totalSteps; i++) {
            dotsHTML += `<span class="dot ${i === this.currentStep ? 'active' : ''}"></span>`;
        }
        dotsContainer.innerHTML = dotsHTML;
    },
    
    /**
     * Select avatar
     */
    selectAvatar(avatar) {
        // Update UI
        document.querySelectorAll('.avatar-option').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.avatar === avatar);
        });
        
        // Save to localStorage
        localStorage.setItem('weatherlab_avatar', avatar);
        
        // Vibrate feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Track
        if (typeof Analytics !== 'undefined') {
            Analytics.track('onboarding_avatar_selected', { avatar });
        }
        
        // Auto-advance after short delay
        setTimeout(() => this.nextStep(), 500);
    },
    
    /**
     * Select mode
     */
    selectMode(modeId) {
        // Update UI
        document.querySelectorAll('.mode-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.mode === modeId);
        });
        
        // Save to localStorage
        localStorage.setItem('weatherlab_mode', modeId);
        
        // Apply mode immediately
        if (typeof app !== 'undefined' && app.setMode) {
            app.setMode(modeId);
        }
        
        // Vibrate feedback
        if (navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
        }
        
        // Track
        if (typeof Analytics !== 'undefined') {
            Analytics.track('onboarding_mode_selected', { mode: modeId });
        }
        
        // Auto-advance after short delay
        setTimeout(() => this.nextStep(), 500);
    },
    
    /**
     * Detect user location during onboarding
     */
    async detectLocation() {
        const btn = document.getElementById('onboarding-geo-btn');
        const statusEl = document.getElementById('onboarding-location-status');
        
        if (!navigator.geolocation) {
            statusEl.textContent = '❌ Геолокація не підтримується';
            statusEl.style.color = 'red';
            return;
        }
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading-spinner"></span> Визначаю...';
        
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
            
            const locationName = data.address?.city || 
                                data.address?.town || 
                                data.address?.village || 
                                'Невідомо';
            
            // Save location
            const locationData = {
                name: locationName,
                lat: latitude,
                lon: longitude,
                source: 'geolocation'
            };
            
            localStorage.setItem('weatherlab_location', JSON.stringify(locationData));
            
            // Update input
            const locationInput = document.getElementById('onboarding-location-input');
            if (locationInput) {
                locationInput.value = locationName;
            }
            
            // Show success
            statusEl.textContent = `✅ ${locationName}`;
            statusEl.style.color = 'green';
            
            btn.innerHTML = '✅ Визначено!';
            
            // Track
            if (typeof Analytics !== 'undefined') {
                Analytics.track('onboarding_location_detected', { source: 'geolocation' });
            }
            
            // Auto-advance
            setTimeout(() => this.nextStep(), 1500);
            
        } catch (error) {
            console.error('Geolocation error:', error);
            statusEl.textContent = '❌ Не вдалося. Введіть місто вручну.';
            statusEl.style.color = 'orange';
            btn.innerHTML = '📍 Спробувати ще раз';
        } finally {
            btn.disabled = false;
        }
    },
    
    /**
     * Complete onboarding
     */
    complete() {
        // Save manual location if entered
        const locationInput = document.getElementById('onboarding-location-input');
        if (locationInput?.value.trim()) {
            const locationData = {
                name: locationInput.value.trim(),
                source: 'manual'
            };
            localStorage.setItem('weatherlab_location', JSON.stringify(locationData));
            
            // Update app location display
            if (typeof app !== 'undefined' && app.updateLocationDisplay) {
                app.updateLocationDisplay();
            }
        }
        
        // Mark as completed
        this.completed = true;
        localStorage.setItem('weatherlab_onboarding', 'true');
        
        // Hide overlay
        this.hide();
        
        // Unlock achievement
        if (typeof Achievements !== 'undefined') {
            Achievements.unlock('first_login');
        }
        
        // Track
        if (typeof Analytics !== 'undefined') {
            Analytics.track('onboarding_completed', {
                hasAvatar: !!localStorage.getItem('weatherlab_avatar'),
                hasLocation: !!localStorage.getItem('weatherlab_location'),
                mode: localStorage.getItem('weatherlab_mode') || 'child'
            });
        }
        
        // Refresh app
        if (typeof app !== 'undefined' && app.init) {
            app.init();
        }
    },
    
    /**
     * Reset onboarding (for testing)
     */
    reset() {
        this.completed = false;
        this.currentStep = 1;
        localStorage.removeItem('weatherlab_onboarding');
        localStorage.removeItem('weatherlab_avatar');
        
        // Show onboarding again
        this.render();
        this.show();
    }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!Onboarding.completed) {
        Onboarding.init();
    }
});
