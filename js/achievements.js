// ============================================================
// WEATHERLAB НУШ — Achievement System v2.0
// ============================================================
// Manages badges, streaks, and gamification
// ============================================================

const Achievements = {
    // All badge definitions
    badges: [
        // ===== MILESTONE BADGES =====
        {
            id: 'first_record',
            emoji: '🌱',
            nameUk: 'Перше спостереження',
            nameEn: 'First Observation',
            descriptionUk: 'Зроби свій перший запис погоди!',
            descriptionEn: 'Make your first weather record!',
            condition: (stats) => stats.totalRecords >= 1,
            category: 'milestone',
            rarity: 'common'
        },
        {
            id: 'three_days',
            emoji: '🌿',
            nameUk: 'Юний натураліст',
            nameEn: 'Young Naturalist',
            descriptionUk: 'Запиши погоду 3 дні',
            descriptionEn: 'Record weather for 3 days',
            condition: (stats) => stats.totalRecords >= 3,
            category: 'milestone',
            rarity: 'common'
        },
        {
            id: 'week_streak',
            emoji: '⭐',
            nameUk: 'Тижневий метеоролог',
            nameEn: 'Weekly Meteorologist',
            descriptionUk: 'Заповнюй календар 7 днів підряд!',
            descriptionEn: 'Fill the calendar for 7 consecutive days!',
            condition: (stats) => stats.maxStreak >= 7,
            category: 'streak',
            rarity: 'uncommon'
        },
        {
            id: 'two_weeks',
            emoji: '🌟',
            nameUk: 'Двотижневий спостерігач',
            nameEn: 'Two-Week Observer',
            descriptionUk: '14 днів підряд спостережень!',
            descriptionEn: '14 consecutive days of observations!',
            condition: (stats) => stats.maxStreak >= 14,
            category: 'streak',
            rarity: 'rare'
        },
        {
            id: 'month_master',
            emoji: '👑',
            nameUk: 'Професійний кліматолог',
            nameEn: 'Professional Climatologist',
            descriptionUk: 'Запиши погоду за цілий місяць (30 днів)!',
            descriptionEn: 'Record weather for a full month (30 days)!',
            condition: (stats) => stats.totalRecords >= 30,
            category: 'milestone',
            rarity: 'legendary'
        },
        {
            id: 'fifty_days',
            emoji: '🏆',
            nameUk: 'Золотий метеоролог',
            nameEn: 'Golden Meteorologist',
            descriptionUk: '50 днів спостережень!',
            descriptionEn: '50 days of observations!',
            condition: (stats) => stats.totalRecords >= 50,
            category: 'milestone',
            rarity: 'legendary'
        },
        {
            id: 'hundred_days',
            emoji: '💎',
            nameUk: 'Діамантовий дослідник',
            nameEn: 'Diamond Explorer',
            descriptionUk: '100 днів спостережень! Неймовірно!',
            descriptionEn: '100 days of observations! Incredible!',
            condition: (stats) => stats.totalRecords >= 100,
            category: 'milestone',
            rarity: 'mythic'
        },
        
        // ===== WEATHER TYPE BADGES =====
        {
            id: 'rain_expert',
            emoji: '☔',
            nameUk: 'Дощовий експерт',
            nameEn: 'Rain Expert',
            descriptionUk: 'Запиши 5 дощових днів',
            descriptionEn: 'Record 5 rainy days',
            condition: (stats) => stats.weatherCounts['🌧️'] >= 5,
            category: 'weather_type',
            rarity: 'uncommon'
        },
        {
            id: 'snow_hunter',
            emoji: '❄️',
            nameUk: 'Сніговий мисливець',
            nameEn: 'Snow Hunter',
            descriptionUk: 'Запиши 3 сніжних дні',
            descriptionEn: 'Record 3 snowy days',
            condition: (stats) => stats.weatherCounts['❄️'] >= 3,
            category: 'weather_type',
            rarity: 'uncommon'
        },
        {
            id: 'rainbow_finder',
            emoji: '🌈',
            nameUk: 'Знайшов скарб!',
            nameEn: 'Treasure Found!',
            descriptionUk: 'Побач і запиши райдугу!',
            descriptionEn: 'See and record a rainbow!',
            condition: (stats) => stats.weatherCounts['🌈'] >= 1,
            category: 'weather_type',
            rarity: 'rare'
        },
        {
            id: 'storm_chaser',
            emoji: '⛈️',
            nameUk: 'Мисливець за грозами',
            nameEn: 'Storm Chaser',
            descriptionUk: 'Запиши 3 грозових дні',
            descriptionEn: 'Record 3 thunderstorm days',
            condition: (stats) => stats.weatherCounts['⛈️'] >= 3,
            category: 'weather_type',
            rarity: 'rare'
        },
        {
            id: 'sun_lover',
            emoji: '☀️',
            nameUk: 'Сонячний друг',
            nameEn: 'Sun Lover',
            descriptionUk: 'Запиши 10 сонячних днів',
            descriptionEn: 'Record 10 sunny days',
            condition: (stats) => stats.weatherCounts['☀️'] >= 10,
            category: 'weather_type',
            rarity: 'common'
        },
        {
            id: 'fog_explorer',
            emoji: '🌫️',
            nameUk: 'Туманний дослідник',
            nameEn: 'Fog Explorer',
            descriptionUk: 'Запиши 3 туманних дні',
            descriptionEn: 'Record 3 foggy days',
            condition: (stats) => stats.weatherCounts['🌫️'] >= 3,
            category: 'weather_type',
            rarity: 'uncommon'
        },
        
        // ===== ACCURACY BADGES =====
        {
            id: 'accurate_observer',
            emoji: '🎯',
            nameUk: 'Точний спостерігач',
            nameEn: 'Accurate Observer',
            descriptionUk: 'Досягни 70% точності порівняно з реальними даними',
            descriptionEn: 'Achieve 70% accuracy compared to real data',
            condition: (stats) => stats.averageAccuracy >= 70,
            category: 'accuracy',
            rarity: 'rare'
        },
        {
            id: 'perfect_eye',
            emoji: '🔭',
            nameUk: 'Ідеальне око',
            nameEn: 'Perfect Eye',
            descriptionUk: 'Досягни 90% точності!',
            descriptionEn: 'Achieve 90% accuracy!',
            condition: (stats) => stats.averageAccuracy >= 90,
            category: 'accuracy',
            rarity: 'legendary'
        },
        
        // ===== EXPLORATION BADGES =====
        {
            id: 'first_login',
            emoji: '👋',
            nameUk: 'Ласкаво просимо!',
            nameEn: 'Welcome!',
            descriptionUk: 'Перший вхід у додаток',
            descriptionEn: 'First login to the app',
            condition: (stats) => stats.hasLoggedIn === true,
            category: 'exploration',
            rarity: 'common'
        },
        {
            id: 'location_set',
            emoji: '📍',
            nameUk: 'Я тут!',
            nameEn: 'I\'m Here!',
            descriptionUk: 'Встанови свою локацію',
            descriptionEn: 'Set your location',
            condition: (stats) => stats.hasLocation === true,
            category: 'exploration',
            rarity: 'common'
        },
        {
            id: 'first_comparison',
            emoji: '🔬',
            nameUk: 'Перше порівняння',
            nameEn: 'First Comparison',
            descriptionUk: 'Порівняй свої дані з реальними',
            descriptionEn: 'Compare your data with real weather',
            condition: (stats) => stats.hasCompared === true,
            category: 'exploration',
            rarity: 'uncommon'
        },
        {
            id: 'data_exporter',
            emoji: '📊',
            nameUk: 'Аналітик даних',
            nameEn: 'Data Analyst',
            descriptionUk: 'Експортуй свої дані',
            descriptionEn: 'Export your data',
            condition: (stats) => stats.hasExported === true,
            category: 'exploration',
            rarity: 'uncommon'
        },
        
        // ===== CLASSROOM BADGES =====
        {
            id: 'team_player',
            emoji: '🤝',
            nameUk: 'Командний гравець',
            nameEn: 'Team Player',
            descriptionUk: 'Приєднайся до класу',
            descriptionEn: 'Join a classroom',
            condition: (stats) => stats.hasJoinedClassroom === true,
            category: 'classroom',
            rarity: 'uncommon'
        },
        {
            id: 'class_leader',
            emoji: '🏅',
            nameUk: 'Лідер класу',
            nameEn: 'Class Leader',
            descriptionUk: 'Зроби найбільше спостережень у класі',
            descriptionEn: 'Make the most observations in your class',
            condition: (stats) => stats.isClassLeader === true,
            category: 'classroom',
            rarity: 'rare'
        },
        
        // ===== SPECIAL BADGES =====
        {
            id: 'all_seasons',
            emoji: '🍂❄️🌸☀️',
            nameUk: 'Всі пори року',
            nameEn: 'All Seasons',
            descriptionUk: 'Записуй погоду протягом 3 різних місяців',
            descriptionEn: 'Record weather across 3 different months',
            condition: (stats) => stats.uniqueMonths >= 3,
            category: 'special',
            rarity: 'epic'
        },
        {
            id: 'night_owl',
            emoji: '🦉',
            nameUk: 'Нічна сова',
            nameEn: 'Night Owl',
            descriptionUk: 'Зроби запис після 20:00',
            descriptionEn: 'Make a record after 8 PM',
            condition: (stats) => stats.hasLateRecord === true,
            category: 'special',
            rarity: 'uncommon'
        },
        {
            id: 'early_bird',
            emoji: '🐦',
            nameUk: 'Рання пташка',
            nameEn: 'Early Bird',
            descriptionUk: 'Зроби запис до 8:00 ранку',
            descriptionEn: 'Make a record before 8 AM',
            condition: (stats) => stats.hasEarlyRecord === true,
            category: 'special',
            rarity: 'uncommon'
        },
        {
            id: 'perfect_month',
            emoji: '📅',
            nameUk: 'Ідеальний місяць',
            nameEn: 'Perfect Month',
            descriptionUk: 'Заповни всі дні поточного місяця',
            descriptionEn: 'Fill all days of the current month',
            condition: (stats) => stats.currentMonthComplete === true,
            category: 'special',
            rarity: 'epic'
        }
    ],
    
    // Track unlocked badges
    unlockedBadges: JSON.parse(localStorage.getItem('weatherlab_badges') || '[]'),
    
    /**
     * Calculate current statistics
     */
    calculateStats() {
        const allKeys = Object.keys(localStorage).filter(k => k.startsWith('weather_'));
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        const stats = {
            totalRecords: allKeys.length,
            maxStreak: 0,
            currentStreak: 0,
            weatherCounts: {},
            averageAccuracy: 0,
            hasLoggedIn: true,
            hasLocation: !!JSON.parse(localStorage.getItem('weatherlab_location') || 'null'),
            hasCompared: localStorage.getItem('weatherlab_has_compared') === 'true',
            hasExported: localStorage.getItem('weatherlab_has_exported') === 'true',
            hasJoinedClassroom: !!localStorage.getItem('weatherlab_classroom'),
            isClassLeader: false,
            uniqueMonths: new Set(),
            hasLateRecord: false,
            hasEarlyRecord: false,
            currentMonthComplete: false
        };
        
        // Calculate streaks and weather counts
        let tempStreak = 0;
        const currentMonthDays = new Date(currentYear, currentMonth + 1, 0).getDate();
        let currentMonthRecords = 0;
        
        for (let day = 1; day <= currentMonthDays; day++) {
            const dataKey = `weather_${currentYear}_${currentMonth}_${day}`;
            const data = JSON.parse(localStorage.getItem(dataKey) || 'null');
            
            if (data) {
                currentMonthRecords++;
                
                // Count weather types
                stats.weatherCounts[data.weather] = (stats.weatherCounts[data.weather] || 0) + 1;
                
                // Check record time
                if (data.timestamp) {
                    const recordTime = new Date(data.timestamp);
                    const hour = recordTime.getHours();
                    if (hour >= 20) stats.hasLateRecord = true;
                    if (hour < 8) stats.hasEarlyRecord = true;
                }
            }
        }
        
        // Calculate streak from all records
        allKeys.sort().forEach(key => {
            const data = JSON.parse(localStorage.getItem(key));
            if (data) {
                // Extract month from key
                const parts = key.split('_');
                if (parts.length >= 3) {
                    const month = parseInt(parts[2]);
                    stats.uniqueMonths.add(month);
                }
                
                tempStreak++;
                stats.maxStreak = Math.max(stats.maxStreak, tempStreak);
            }
        });
        
        // Check if current month is complete
        stats.currentMonthComplete = currentMonthRecords >= currentMonthDays;
        
        // Calculate average accuracy from stored data
        const accuracyData = JSON.parse(localStorage.getItem('weatherlab_accuracy_data') || '[]');
        if (accuracyData.length > 0) {
            const totalAccuracy = accuracyData.reduce((sum, item) => sum + item.accuracy, 0);
            stats.averageAccuracy = Math.round(totalAccuracy / accuracyData.length);
        }
        
        return stats;
    },
    
    /**
     * Check for newly unlocked achievements
     * @returns {Array} List of newly unlocked badges
     */
    check() {
        const stats = this.calculateStats();
        const newlyUnlocked = [];
        
        this.badges.forEach(badge => {
            // Skip if already unlocked
            if (this.unlockedBadges.includes(badge.id)) return;
            
            // Check condition
            try {
                if (badge.condition(stats)) {
                    this.unlockedBadges.push(badge.id);
                    newlyUnlocked.push(badge);
                }
            } catch (e) {
                console.error(`Error checking badge ${badge.id}:`, e);
            }
        });
        
        // Save unlocked badges
        if (newlyUnlocked.length > 0) {
            localStorage.setItem('weatherlab_badges', JSON.stringify(this.unlockedBadges));
        }
        
        return newlyUnlocked;
    },
    
    /**
     * Force unlock a specific achievement
     * @param {string} badgeId - Badge ID
     * @returns {Object|null} Badge object or null
     */
    unlock(badgeId) {
        if (this.unlockedBadges.includes(badgeId)) return null;
        
        const badge = this.badges.find(b => b.id === badgeId);
        if (!badge) return null;
        
        this.unlockedBadges.push(badgeId);
        localStorage.setItem('weatherlab_badges', JSON.stringify(this.unlockedBadges));
        
        return badge;
    },
    
    /**
     * Get all unlocked badges
     * @returns {Array} List of unlocked badge objects
     */
    getUnlocked() {
        return this.unlockedBadges;
    },
    
    /**
     * Get all badge definitions
     * @returns {Array} All badge objects
     */
    getAllBadges() {
        return this.badges;
    },
    
    /**
     * Get badge by ID
     * @param {string} id - Badge ID
     * @returns {Object|null} Badge object
     */
    getBadge(id) {
        return this.badges.find(b => b.id === id) || null;
    },
    
    /**
     * Get badges by category
     * @param {string} category - Badge category
     * @returns {Array} Filtered badges
     */
    getBadgesByCategory(category) {
        return this.badges.filter(b => b.category === category);
    },
    
    /**
     * Get rarity color
     * @param {string} rarity - Rarity level
     * @returns {string} CSS color
     */
    getRarityColor(rarity) {
        const colors = {
            'common': '#9e9e9e',
            'uncommon': '#4caf50',
            'rare': '#2196f3',
            'epic': '#9c27b0',
            'legendary': '#ff9800',
            'mythic': '#f44336'
        };
        return colors[rarity] || '#9e9e9e';
    },
    
    /**
     * Get progress towards a badge
     * @param {string} badgeId - Badge ID
     * @returns {Object} Progress info { current, target, percentage }
     */
    getProgress(badgeId) {
        const stats = this.calculateStats();
        const badge = this.getBadge(badgeId);
        
        if (!badge) return null;
        if (this.unlockedBadges.includes(badgeId)) {
            return { current: 100, target: 100, percentage: 100, completed: true };
        }
        
        // Calculate progress based on badge type
        switch (badgeId) {
            case 'first_record':
                return { current: stats.totalRecords, target: 1, 
                         percentage: Math.min(100, stats.totalRecords * 100), completed: stats.totalRecords >= 1 };
            case 'week_streak':
                return { current: stats.maxStreak, target: 7, 
                         percentage: Math.min(100, (stats.maxStreak / 7) * 100), completed: stats.maxStreak >= 7 };
            case 'month_master':
                return { current: stats.totalRecords, target: 30, 
                         percentage: Math.min(100, (stats.totalRecords / 30) * 100), completed: stats.totalRecords >= 30 };
            case 'rain_expert':
                return { current: stats.weatherCounts['🌧️'] || 0, target: 5, 
                         percentage: Math.min(100, ((stats.weatherCounts['🌧️'] || 0) / 5) * 100), 
                         completed: (stats.weatherCounts['🌧️'] || 0) >= 5 };
            default:
                return { current: 0, target: 100, percentage: 0, completed: false };
        }
    },
    
    /**
     * Reset all achievements (for testing)
     */
    resetAll() {
        this.unlockedBadges = [];
        localStorage.removeItem('weatherlab_badges');
    },
    
    /**
     * Get total count of badges
     * @returns {number}
     */
    getTotalCount() {
        return this.badges.length;
    },
    
    /**
     * Get unlocked count
     * @returns {number}
     */
    getUnlockedCount() {
        return this.unlockedBadges.length;
    },
    
    /**
     * Get completion percentage
     * @returns {number} 0-100
     */
    getCompletionPercentage() {
        return Math.round((this.unlockedBadges.length / this.badges.length) * 100);
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Achievements;
}
