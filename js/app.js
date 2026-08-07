// Додайте ці методи в кінець класу WeatherLabApp (перед закриваючою фігурною дужкою)

/**
 * Toggle reduced motion
 */
toggleReducedMotion() {
    this.a11ySettings.reducedMotion = !this.a11ySettings.reducedMotion;
    this.saveAccessibilitySettings();
    document.body.classList.toggle('reduced-motion', this.a11ySettings.reducedMotion);
    
    const btn = document.getElementById('reduced-motion-btn');
    if (btn) {
        btn.setAttribute('aria-pressed', this.a11ySettings.reducedMotion);
        btn.classList.toggle('active', this.a11ySettings.reducedMotion);
    }
    
    this.announceAccessibilityChange(
        this.a11ySettings.reducedMotion ? 'Анімації зменшено' : 'Анімації відновлено'
    );
}

/**
 * Toggle dyslexic font
 */
toggleDyslexicFont() {
    this.a11ySettings.dyslexicFont = !this.a11ySettings.dyslexicFont;
    this.saveAccessibilitySettings();
    document.body.classList.toggle('dyslexic-font', this.a11ySettings.dyslexicFont);
    
    if (this.a11ySettings.dyslexicFont) {
        this.loadDyslexicFont();
    }
    
    const btn = document.getElementById('dyslexic-font-btn');
    if (btn) {
        btn.setAttribute('aria-pressed', this.a11ySettings.dyslexicFont);
        btn.classList.toggle('active', this.a11ySettings.dyslexicFont);
    }
    
    this.announceAccessibilityChange(
        this.a11ySettings.dyslexicFont ? 'Шрифт для дислексії увімкнено' : 'Стандартний шрифт відновлено'
    );
}

/**
 * Toggle simplified mode
 */
toggleSimplifiedMode() {
    this.a11ySettings.simplifiedMode = !this.a11ySettings.simplifiedMode;
    this.saveAccessibilitySettings();
    document.body.classList.toggle('simplified-mode', this.a11ySettings.simplifiedMode);
    
    const btn = document.getElementById('simplified-mode-btn');
    if (btn) {
        btn.setAttribute('aria-pressed', this.a11ySettings.simplifiedMode);
        btn.classList.toggle('active', this.a11ySettings.simplifiedMode);
    }
    
    this.announceAccessibilityChange(
        this.a11ySettings.simplifiedMode ? 'Спрощений режим увімкнено' : 'Повний режим відновлено'
    );
}

/**
 * Announce accessibility change for screen readers
 */
announceAccessibilityChange(message) {
    let announcer = document.getElementById('a11y-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'a11y-announcer';
        announcer.className = 'sr-only';
        announcer.setAttribute('aria-live', 'assertive');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
    }
    announcer.textContent = '';
    setTimeout(() => { announcer.textContent = message; }, 50);
}

/**
 * Load OpenDyslexic font
 */
loadDyslexicFont() {
    if (document.getElementById('dyslexic-font-css')) return;
    
    const link = document.createElement('link');
    link.id = 'dyslexic-font-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic.css';
    document.head.appendChild(link);
}

/**
 * Generate professional PDF report for 5-6 grades
 */
async generatePDFReport() {
    const studentName = localStorage.getItem('weatherlab_student_name') || 'Учень';
    const studentAvatar = localStorage.getItem('weatherlab_avatar') || '🧑‍🔬';
    const className = localStorage.getItem('weatherlab_class') || '';
    const location = JSON.parse(localStorage.getItem('weatherlab_location') || 'null');
    const locationName = location?.name || 'Не вказано';
    
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const monthName = this.monthNames[this.currentMonth];
    
    // Збираємо дані
    const records = [];
    let totalTemp = 0, tempCount = 0;
    let sunnyDays = 0, cloudyDays = 0, rainyDays = 0, snowyDays = 0, stormyDays = 0;
    const windDirections = {};
    let totalWindSpeed = 0, windCount = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
        const data = this.getWeatherData(dataKey);
        
        if (data) {
            records.push({ day, ...data });
            totalTemp += data.temp;
            tempCount++;
            
            switch(data.weather) {
                case '☀️': sunnyDays++; break;
                case '🌤️': 
                case '☁️': cloudyDays++; break;
                case '🌧️': rainyDays++; break;
                case '❄️': snowyDays++; break;
                case '⛈️': stormyDays++; break;
            }
            
            if (data.windDirection) {
                windDirections[data.windDirection] = (windDirections[data.windDirection] || 0) + 1;
            }
            if (data.windSpeed) {
                totalWindSpeed += data.windSpeed;
                windCount++;
            }
        }
    }
    
    const avgTemp = tempCount > 0 ? (totalTemp / tempCount).toFixed(1) : '—';
    const avgWindSpeed = windCount > 0 ? (totalWindSpeed / windCount).toFixed(1) : '—';
    const dominantWind = Object.entries(windDirections).sort((a, b) => b[1] - a[1])[0];
    
    // Будуємо HTML-звіт
    const reportHTML = `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Метеорологічний звіт — ${studentName}</title>
    <style>
        @page { size: A4; margin: 1.5cm; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 210mm; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            text-align: center; 
            padding: 20px; 
            background: linear-gradient(135deg, #e3f2fd, #bbdefb); 
            border-radius: 15px; 
            margin-bottom: 25px; 
        }
        .header h1 { color: #01579b; font-size: 24px; margin-bottom: 5px; }
        .header .subtitle { color: #666; font-size: 14px; }
        .student-info { 
            display: flex; 
            align-items: center; 
            gap: 15px; 
            padding: 15px; 
            background: #f8fdff; 
            border-radius: 10px; 
            margin-bottom: 20px; 
            border: 2px solid #e0e0e0;
        }
        .avatar { font-size: 50px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; }
        .info-item { font-size: 13px; }
        .info-label { font-weight: bold; color: #01579b; }
        .stats-grid { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 15px; 
            margin: 20px 0; 
        }
        .stat-card { 
            text-align: center; 
            padding: 15px; 
            background: white; 
            border-radius: 10px; 
            border: 2px solid #e0e0e0; 
        }
        .stat-value { font-size: 28px; font-weight: bold; color: #0277bd; }
        .stat-label { font-size: 12px; color: #666; margin-top: 5px; }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
            font-size: 11px; 
        }
        th { 
            background: #0277bd; 
            color: white; 
            padding: 10px 8px; 
            text-align: left; 
            font-size: 11px;
        }
        td { 
            padding: 8px; 
            border-bottom: 1px solid #e0e0e0; 
        }
        tr:nth-child(even) { background: #f8fdff; }
        .weather-emoji { font-size: 18px; }
        .section-title { 
            color: #01579b; 
            font-size: 18px; 
            margin: 25px 0 15px 0; 
            padding-bottom: 8px; 
            border-bottom: 3px solid #4fc3f7; 
        }
        .analysis-box { 
            background: #fff3e0; 
            padding: 15px; 
            border-radius: 10px; 
            border-left: 4px solid #ff9800; 
            margin: 15px 0; 
        }
        .analysis-box h4 { color: #e65100; margin-bottom: 8px; }
        .nush-badge { 
            display: inline-block; 
            background: #e8f5e9; 
            color: #2e7d32; 
            padding: 5px 12px; 
            border-radius: 20px; 
            font-size: 11px; 
            font-weight: bold; 
            margin: 3px; 
        }
        .footer { 
            margin-top: 30px; 
            padding-top: 15px; 
            border-top: 2px solid #e0e0e0; 
            text-align: center; 
            font-size: 11px; 
            color: #888; 
        }
        .chart-placeholder {
            text-align: center;
            padding: 30px;
            background: #f5f5f5;
            border-radius: 10px;
            margin: 15px 0;
            font-style: italic;
            color: #666;
        }
        @media print {
            body { padding: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <!-- Титульна частина -->
    <div class="header">
        <h1>🌤️ Метеорологічний звіт</h1>
        <p class="subtitle">Проєкт з природничих наук / географії</p>
        <p class="subtitle">${monthName} ${this.currentYear} року</p>
    </div>
    
    <!-- Інформація про учня -->
    <div class="student-info">
        <div class="avatar">${studentAvatar}</div>
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Учень:</span> ${studentName}
            </div>
            <div class="info-item">
                <span class="info-label">Клас:</span> ${className || '5-6 клас'}
            </div>
            <div class="info-item">
                <span class="info-label">Локація:</span> ${locationName}
            </div>
            <div class="info-item">
                <span class="info-label">Період:</span> ${monthName} ${this.currentYear}
            </div>
            <div class="info-item">
                <span class="info-label">Предмет:</span> Природничі науки / Географія
            </div>
            <div class="info-item">
                <span class="info-label">Дата звіту:</span> ${new Date().toLocaleDateString('uk-UA')}
            </div>
        </div>
    </div>
    
    <!-- Ключові показники -->
    <div class="section-title">📊 Ключові метеорологічні показники</div>
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-value">${tempCount}</div>
            <div class="stat-label">днів спостережень</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${avgTemp}°C</div>
            <div class="stat-label">середня температура</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${avgWindSpeed}</div>
            <div class="stat-label">середня швидкість вітру (м/с)</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">${dominantWind ? dominantWind[0] : '—'}</div>
            <div class="stat-label">переважаючий вітер</div>
        </div>
    </div>
    
    <!-- Розподіл погодних явищ -->
    <div class="section-title">☁️ Розподіл погодних явищ</div>
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-value">☀️ ${sunnyDays}</div>
            <div class="stat-label">сонячних днів</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">☁️ ${cloudyDays}</div>
            <div class="stat-label">хмарних днів</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">🌧️ ${rainyDays}</div>
            <div class="stat-label">дощових днів</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">⛈️ ${stormyDays}</div>
            <div class="stat-label">грозових днів</div>
        </div>
    </div>
    
    <!-- Таблиця спостережень -->
    <div class="section-title">📋 Щоденник спостережень</div>
    <table>
        <thead>
            <tr>
                <th>Дата</th>
                <th>День тижня</th>
                <th>Температура</th>
                <th>Погода</th>
                <th>Вітер</th>
                <th>Швидкість вітру</th>
                <th>Настрій</th>
                <th>Нотатки</th>
            </tr>
        </thead>
        <tbody>
            ${records.map(r => {
                const date = new Date(this.currentYear, this.currentMonth, r.day);
                const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
                const dayName = dayNames[date.getDay()];
                
                return `
                <tr>
                    <td>${r.day}.${this.currentMonth + 1}.${this.currentYear}</td>
                    <td>${dayName}</td>
                    <td><strong>${r.temp}°C</strong></td>
                    <td class="weather-emoji">${r.weather}</td>
                    <td>${r.windDirection || '—'}</td>
                    <td>${r.windSpeed ? r.windSpeed + ' м/с' : '—'}</td>
                    <td>${r.mood || '—'}</td>
                    <td>${r.notes || '—'}</td>
                </tr>`;
            }).join('')}
            ${records.length === 0 ? '<tr><td colspan="8" style="text-align:center; padding:20px;">Немає записів за цей місяць</td></tr>' : ''}
        </tbody>
    </table>
    
    <!-- Аналіз -->
    <div class="section-title">🔬 Аналіз та висновки</div>
    <div class="analysis-box">
        <h4>📌 Спостереження за місяць:</h4>
        <p>
            За період спостережень (${tempCount} днів) середня температура становила <strong>${avgTemp}°C</strong>.
            Переважала <strong>${sunnyDays >= cloudyDays && sunnyDays >= rainyDays ? 'сонячна' : cloudyDays >= rainyDays ? 'хмарна' : 'дощова'} погода</strong>
            (${Math.max(sunnyDays, cloudyDays, rainyDays)} днів).
            Домінуючий напрям вітру — <strong>${dominantWind ? dominantWind[0] : 'не визначено'}</strong>.
        </p>
        ${tempCount >= 7 ? `
        <p style="margin-top: 10px;">
            <strong>📈 Тенденція:</strong> 
            ${records.length >= 2 && records[records.length-1].temp > records[0].temp ? 'Спостерігається потепління протягом місяця.' : 
              records.length >= 2 && records[records.length-1].temp < records[0].temp ? 'Спостерігається похолодання протягом місяця.' : 
              'Температура відносно стабільна.'}
        </p>` : ''}
    </div>
    
    <!-- НУШ результати -->
    <div class="section-title">🎯 Освітні результати НУШ</div>
    <div>
        <span class="nush-badge">ПРО 1.1 — Дослідження природи</span>
        <span class="nush-badge">ПРО 1.2 — Фіксація спостережень</span>
        <span class="nush-badge">ПРО 2.1 — Аналіз даних</span>
        <span class="nush-badge">МАО 2.3 — Таблиці та графіки</span>
        <span class="nush-badge">ГЕО 1.1 — Атмосфера та погода</span>
        <span class="nush-badge">ГЕО 2.1 — Кліматичні спостереження</span>
    </div>
    
    <!-- Підпис -->
    <div class="footer">
        <p>📋 Звіт створено за допомогою WeatherLab НУШ v2.0</p>
        <p>© ${this.currentYear} — Проєкт з природничих наук / географії (5-6 класи НУШ)</p>
        <p>Дані зібрано учнем самостійно шляхом щоденних спостережень</p>
    </div>
</body>
</html>`;
    
    // Відкриваємо для друку
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    
    // Дочекаємось завантаження і друкуємо
    printWindow.onload = function() {
        setTimeout(() => {
            printWindow.print();
            // Також даємо можливість зберегти
            printWindow.onafterprint = function() {
                // Пропонуємо зберегти як PDF через діалог браузера
            };
        }, 500);
    };
    
    this.trackEvent('report_generated', { 
        type: 'monthly_pdf', 
        grade: '5-6',
        records: tempCount 
    });
}

/**
 * Save report as downloadable HTML file
 */
saveReportAsFile() {
    const studentName = localStorage.getItem('weatherlab_student_name') || 'учень';
    const monthName = this.monthNames[this.currentMonth];
    const fileName = `Метеозвіт_${studentName}_${monthName}_${this.currentYear}.html`;
    
    // Генеруємо звіт (той самий HTML)
    const reportHTML = this.generateReportHTML();
    
    // Створюємо Blob і завантажуємо
    const blob = new Blob([reportHTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showToast(`✅ Звіт збережено: ${fileName}`);
}

/**
 * Generate report HTML (для збереження у файл)
 */
generateReportHTML() {
    const studentName = localStorage.getItem('weatherlab_student_name') || 'Учень';
    const studentAvatar = localStorage.getItem('weatherlab_avatar') || '🧑‍🔬';
    const className = localStorage.getItem('weatherlab_class') || '';
    const location = JSON.parse(localStorage.getItem('weatherlab_location') || 'null');
    const locationName = location?.name || 'Не вказано';
    
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const monthName = this.monthNames[this.currentMonth];
    
    // Збираємо дані
    const records = [];
    let totalTemp = 0, tempCount = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dataKey = `weather_${this.currentYear}_${this.currentMonth}_${day}`;
        const data = this.getWeatherData(dataKey);
        if (data) {
            records.push({ day, ...data });
            totalTemp += data.temp;
            tempCount++;
        }
    }
    
    const avgTemp = tempCount > 0 ? (totalTemp / tempCount).toFixed(1) : '—';
    
    return `<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <title>Метеозвіт — ${studentName} — ${monthName} ${this.currentYear}</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #01579b; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #0277bd; color: white; }
        .info { background: #e3f2fd; padding: 15px; border-radius: 10px; margin: 15px 0; }
    </style>
</head>
<body>
    <h1>🌤️ Метеорологічний звіт</h1>
    <div class="info">
        <p><strong>Учень:</strong> ${studentAvatar} ${studentName}</p>
        <p><strong>Клас:</strong> ${className || '5-6 клас'}</p>
        <p><strong>Локація:</strong> ${locationName}</p>
        <p><strong>Період:</strong> ${monthName} ${this.currentYear}</p>
        <p><strong>Предмет:</strong> Природничі науки / Географія (НУШ)</p>
        <p><strong>Середня температура:</strong> ${avgTemp}°C</p>
    </div>
    <table>
        <tr><th>Дата</th><th>t°C</th><th>Погода</th><th>Вітер</th><th>Нотатки</th></tr>
        ${records.map(r => `
        <tr>
            <td>${r.day}.${this.currentMonth + 1}.${this.currentYear}</td>
            <td>${r.temp}°C</td>
            <td>${r.weather}</td>
            <td>${r.windDirection || '—'} ${r.windSpeed ? r.windSpeed + ' м/с' : ''}</td>
            <td>${r.notes || '—'}</td>
        </tr>`).join('')}
    </table>
    <p style="text-align:center; color:#888; margin-top:30px;">
        Звіт створено за допомогою WeatherLab НУШ | ${new Date().toLocaleDateString('uk-UA')}
    </p>
</body>
</html>`;
}

/**
 * Set student name
 */
setStudentName(name) {
    localStorage.setItem('weatherlab_student_name', name);
    this.showToast(`✅ Ім'я збережено: ${name}`);
}

/**
 * Set class
 */
setClassName(className) {
    localStorage.setItem('weatherlab_class', className);
    this.showToast(`✅ Клас збережено: ${className}`);
}
