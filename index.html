<!DOCTYPE html>
<html lang="uk" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#0277bd">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="WeatherLab">
    <meta name="description" content="WeatherLab НУШ — метеорологічний календар для учнів 5-6 класів. Природничі науки, географія. Спостерігай, аналізуй, порівнюй!">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="manifest.json">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌈</text></svg>">
    
    <!-- Preload fonts -->
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Open+Sans:wght@400;600;700&display=swap" as="style">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Open+Sans:wght@400;600;700&display=swap">
    
    <!-- Security -->
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        script-src 'self' 'unsafe-inline' https://archive-api.open-meteo.com https://nominatim.openstreetmap.org;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https: blob:;
        connect-src 'self' https://archive-api.open-meteo.com https://nominatim.openstreetmap.org;
        manifest-src 'self';
        worker-src 'self';
    ">
    
    <title>🌈 WeatherLab НУШ — Метеоспостереження 5-6 клас</title>
    
    <style>
        :root {
            --primary: #0277bd;
            --primary-light: #4fc3f7;
            --primary-dark: #01579b;
            --secondary: #f57c00;
            --secondary-light: #ffb74d;
            --success: #2e7d32;
            --warning: #f9a825;
            --error: #c62828;
            --gray-50: #fafafa;
            --gray-100: #f5f5f5;
            --gray-200: #eeeeee;
            --gray-300: #e0e0e0;
            --gray-500: #9e9e9e;
            --gray-700: #616161;
            --gray-900: #212121;
            --font-display: 'Bubblegum Sans', cursive;
            --font-body: 'Open Sans', system-ui, sans-serif;
            --space-xs: 0.25rem;
            --space-sm: 0.5rem;
            --space-md: 1rem;
            --space-lg: 1.5rem;
            --space-xl: 2rem;
            --radius-sm: 0.5rem;
            --radius-md: 1rem;
            --radius-lg: 1.5rem;
            --radius-xl: 2rem;
            --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
            --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
            --transition-fast: 150ms ease;
            --transition-base: 300ms ease;
            --container-max: 1200px;
            --touch-target: 44px;
        }
        
        @media (prefers-contrast: high) {
            :root {
                --primary: #0000ff;
                --primary-light: #4444ff;
                --gray-100: #ffffff;
                --gray-200: #eeeeee;
            }
        }
        
        @media (prefers-reduced-motion: reduce) {
            * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: var(--font-body);
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            min-height: 100vh;
            color: var(--gray-900);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }
        
        .sr-only {
            position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
            overflow: hidden; clip: rect(0,0,0,0); border: 0;
        }
        
        :focus-visible { outline: 3px solid var(--secondary); outline-offset: 2px; border-radius: var(--radius-sm); }
        
        .skip-link {
            position: absolute; top: -100px; left: var(--space-md); background: var(--primary);
            color: white; padding: var(--space-md); z-index: 10000; transition: top var(--transition-base);
        }
        .skip-link:focus { top: 0; }
        
        .app-container {
            max-width: var(--container-max); margin: 0 auto; padding: var(--space-md);
            display: grid; gap: var(--space-lg);
            grid-template-areas: "header" "location" "student" "main" "stats" "methodology" "footer";
        }
        
        @media (min-width: 1024px) {
            .app-container {
                grid-template-columns: 1fr 340px;
                grid-template-areas:
                    "header header"
                    "location location"
                    "student student"
                    "main stats"
                    "main methodology"
                    "footer footer";
                gap: var(--space-xl);
            }
        }
        
        .app-header {
            grid-area: header; text-align: center; padding: var(--space-xl);
            background: rgba(255,255,255,0.9); border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md); backdrop-filter: blur(10px);
        }
        .app-title { font-family: var(--font-display); font-size: clamp(1.8rem, 5vw, 2.5rem); color: var(--primary-dark); }
        .app-subtitle { color: var(--gray-700); font-size: 1.1rem; }
        
        .lang-switcher {
            position: absolute; top: var(--space-md); right: var(--space-md);
            display: flex; gap: var(--space-xs);
        }
        .lang-btn {
            padding: var(--space-xs) var(--space-sm); border: 2px solid var(--primary-light);
            background: white; border-radius: var(--radius-sm); cursor: pointer; font-weight: 600;
            transition: all var(--transition-fast);
        }
        .lang-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        
        .location-panel {
            grid-area: location; background: white; border-radius: var(--radius-lg);
            padding: var(--space-lg); box-shadow: var(--shadow-md);
            display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: center;
        }
        .location-input {
            flex: 1; min-width: 200px; padding: var(--space-md); border: 2px solid var(--gray-300);
            border-radius: var(--radius-md); font-size: 1rem; font-family: var(--font-body);
        }
        .geo-btn {
            padding: var(--space-md) var(--space-lg); background: var(--primary); color: white;
            border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;
            display: flex; align-items: center; gap: var(--space-sm);
        }
        .geo-btn:hover { background: var(--primary-dark); }
        .geo-btn:disabled { background: var(--gray-300); cursor: not-allowed; }
        
        .student-panel {
            grid-area: student; background: white; border-radius: var(--radius-lg);
            padding: var(--space-lg); box-shadow: var(--shadow-md);
            display: flex; flex-wrap: wrap; gap: var(--space-md); align-items: center;
        }
        .student-input {
            padding: var(--space-md); border: 2px solid var(--gray-300);
            border-radius: var(--radius-md); font-size: 1rem; font-family: var(--font-body);
        }
        
        .main-content { grid-area: main; }
        
        .month-navigation {
            display: flex; justify-content: center; align-items: center;
            gap: var(--space-lg); margin-bottom: var(--space-lg);
        }
        .nav-btn {
            width: var(--touch-target); height: var(--touch-target); border: none;
            border-radius: 50%; background: var(--primary-light); color: white;
            font-size: 1.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .nav-btn:hover { background: var(--primary); transform: scale(1.1); }
        .current-month { font-size: 1.5rem; font-weight: 700; color: var(--primary-dark); min-width: 200px; text-align: center; }
        
        .calendar-grid {
            display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--space-xs);
            background: white; border-radius: var(--radius-lg); padding: var(--space-md);
            box-shadow: var(--shadow-md);
        }
        .weekday-header {
            text-align: center; font-weight: 600; color: var(--gray-700);
            padding: var(--space-sm); font-size: 0.9rem;
        }
        .calendar-cell {
            aspect-ratio: 1; display: flex; flex-direction: column; align-items: center;
            justify-content: center; border-radius: var(--radius-md); cursor: pointer;
            transition: all var(--transition-base); border: 2px solid transparent;
            font-size: 0.9rem; min-width: var(--touch-target); min-height: var(--touch-target);
            background: var(--gray-50);
        }
        .calendar-cell:hover:not(.future):not(.empty) {
            transform: translateY(-2px); box-shadow: var(--shadow-md);
            background: var(--primary-light); color: white;
        }
        .calendar-cell.today { border-color: var(--secondary); background: #fff3e0; font-weight: 700; }
        .calendar-cell.recorded { border-color: var(--success); background: #e8f5e9; }
        .calendar-cell.future { opacity: 0.35; cursor: not-allowed; }
        .calendar-cell.empty { background: transparent; cursor: default; }
        .cell-date { font-weight: 600; }
        .cell-emoji { font-size: 1.5rem; }
        .cell-temp { font-size: 0.75rem; color: var(--gray-700); }
        
        .action-buttons {
            display: flex; flex-wrap: wrap; gap: var(--space-md);
            margin-top: var(--space-xl); justify-content: center;
        }
        
        .stats-panel {
            grid-area: stats; background: white; border-radius: var(--radius-lg);
            padding: var(--space-lg); box-shadow: var(--shadow-md);
        }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-md); }
        .stat-card { text-align: center; padding: var(--space-md); background: var(--gray-50); border-radius: var(--radius-md); }
        .stat-emoji { font-size: 2rem; }
        .stat-value { font-size: 2rem; font-weight: 700; color: var(--primary); }
        .stat-label { font-size: 0.8rem; color: var(--gray-700); }
        
        .methodology-panel {
            grid-area: methodology; background: white; border-radius: var(--radius-lg);
            padding: var(--space-lg); box-shadow: var(--shadow-md);
        }
        .methodology-panel h2 { color: var(--primary-dark); }
        
        .modal-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: none;
            place-items: center; z-index: 1000; padding: var(--space-md); backdrop-filter: blur(3px);
        }
        .modal-content {
            background: white; border-radius: var(--radius-xl); padding: var(--space-xl);
            width: 100%; max-width: 550px; max-height: 90vh; overflow-y: auto;
            box-shadow: var(--shadow-lg); position: relative;
        }
        .modal-close {
            position: absolute; top: var(--space-md); right: var(--space-md);
            background: none; border: none; font-size: 1.5rem; cursor: pointer;
            width: var(--touch-target); height: var(--touch-target); border-radius: 50%;
        }
        
        .form-group { margin-bottom: var(--space-lg); }
        .form-label { display: block; font-weight: 600; margin-bottom: var(--space-sm); color: var(--gray-700); }
        .form-input {
            width: 100%; padding: var(--space-md); border: 2px solid var(--gray-300);
            border-radius: var(--radius-md); font-size: 1rem; font-family: var(--font-body);
        }
        .form-input:focus { border-color: var(--primary-light); outline: none; }
        
        .emoji-grid { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
        .emoji-option {
            font-size: 2rem; padding: var(--space-sm); border: 2px solid var(--gray-300);
            border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast);
            background: white; min-width: var(--touch-target); min-height: var(--touch-target);
            display: flex; align-items: center; justify-content: center;
        }
        .emoji-option:hover { transform: scale(1.15); border-color: var(--primary-light); }
        .emoji-option.selected { border-color: var(--primary); background: #e3f2fd; transform: scale(1.15); }
        
        .wind-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-sm); }
        .wind-btn {
            aspect-ratio: 1; border: 2px solid var(--gray-300); background: white;
            border-radius: var(--radius-md); cursor: pointer; font-size: 1.5rem;
            transition: all var(--transition-fast); min-width: var(--touch-target); min-height: var(--touch-target);
            display: flex; align-items: center; justify-content: center;
        }
        .wind-btn.selected { border-color: var(--primary); background: #e3f2fd; }
        
        .btn {
            padding: var(--space-md) var(--space-xl); border: none; border-radius: var(--radius-md);
            font-weight: 600; cursor: pointer; transition: all var(--transition-fast);
            font-size: 1rem; font-family: var(--font-body); min-height: var(--touch-target);
            display: inline-flex; align-items: center; gap: var(--space-sm);
        }
        .btn-primary { background: var(--primary); color: white; }
        .btn-primary:hover { background: var(--primary-dark); }
        .btn-secondary { background: var(--gray-200); color: var(--gray-900); }
        .btn-secondary:hover { background: var(--gray-300); }
        .btn-danger { background: var(--error); color: white; }
        .btn-success { background: var(--success); color: white; }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        .toast {
            position: fixed; bottom: var(--space-xl); left: 50%; transform: translateX(-50%);
            background: var(--gray-900); color: white; padding: var(--space-md) var(--space-xl);
            border-radius: var(--radius-full); font-weight: 600; z-index: 2000;
            animation: toastUp 0.3s ease;
        }
        @keyframes toastUp { from { transform: translateX(-50%) translateY(100%); opacity: 0; } }
        
        .offline-banner {
            position: fixed; top: 0; left: 0; right: 0; background: var(--warning);
            color: white; text-align: center; padding: var(--space-sm); z-index: 999;
        }
        
        .app-footer {
            grid-area: footer; text-align: center; padding: var(--space-lg);
            background: rgba(255,255,255,0.7); border-radius: var(--radius-lg);
        }
        
        @media (max-width: 768px) {
            .calendar-grid { gap: 2px; padding: var(--space-xs); }
            .calendar-cell { font-size: 0.7rem; min-width: 38px; min-height: 38px; }
            .cell-emoji { font-size: 1rem; }
            .modal-content { padding: var(--space-md); }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .btn { padding: var(--space-sm) var(--space-md); font-size: 0.85rem; }
        }
        
        @media print {
            .skip-link, .offline-banner, .modal-overlay, .nav-btn, .btn, .lang-switcher,
            .geo-btn, .student-panel, .location-panel, .action-buttons { display: none !important; }
            body { background: white; }
            .app-container { max-width: 100%; }
            .calendar-cell { border: 1px solid #000; }
        }
    </style>
</head>
<body>
    <a href="#main-content" class="skip-link">🌈 Перейти до календаря</a>
    
    <div id="offline-banner" class="offline-banner" hidden>📡 Офлайн-режим. Дані збережуться локально.</div>
    
    <div class="app-container">
        
        <!-- HEADER -->
        <header class="app-header" role="banner">
            <h1 class="app-title">🌈 WeatherLab НУШ</h1>
            <p class="app-subtitle">🌍 Метеорологічний календар • Природничі науки • Географія • 5-6 класи</p>
            
            <div class="lang-switcher">
                <button class="lang-btn active" data-lang="uk" aria-label="Українська">🇺🇦 УКР</button>
                <button class="lang-btn" data-lang="en" aria-label="English">🇬🇧 EN</button>
            </div>
        </header>
        
        <!-- LOCATION -->
        <section class="location-panel" aria-label="Локація">
            <span style="font-size:1.5rem;">📍</span>
            <input type="text" id="location-input" class="location-input" 
                   placeholder="🏙️ Введи назву міста..." aria-label="Місто">
            <button class="geo-btn" id="geo-btn" onclick="app.detectLocation()">
                📡 Визначити геолокацію
            </button>
            <span id="location-status" style="font-weight:600;"></span>
        </section>
        
        <!-- STUDENT INFO -->
        <section class="student-panel" aria-label="Інформація про учня">
            <span style="font-size:1.5rem;">🧑‍🔬</span>
            <input type="text" id="student-name" class="student-input" 
                   placeholder="Твоє ім'я та прізвище" aria-label="Ім'я учня">
            <input type="text" id="student-class" class="student-input" 
                   placeholder="Клас (5-А, 6-Б...)" aria-label="Клас" style="width:150px;">
            <button class="btn btn-primary" onclick="app.saveStudentInfo()">💾 Зберегти</button>
        </section>
        
        <!-- MAIN CALENDAR -->
        <main id="main-content" class="main-content" aria-label="Календар погоди">
            <div class="month-navigation">
                <button class="nav-btn" onclick="app.changeMonth(-1)" aria-label="Попередній місяць">←</button>
                <h2 class="current-month" id="current-month-label">Серпень 2026</h2>
                <button class="nav-btn" onclick="app.changeMonth(1)" aria-label="Наступний місяць">→</button>
                <button class="btn btn-secondary" onclick="app.goToToday()" style="margin-left:10px;">📅 Сьогодні</button>
            </div>
            
            <div class="weekday-headers" style="display:grid;grid-template-columns:repeat(7,1fr);gap:var(--space-xs);margin-bottom:var(--space-xs);">
                <div class="weekday-header">Пн</div><div class="weekday-header">Вт</div>
                <div class="weekday-header">Ср</div><div class="weekday-header">Чт</div>
                <div class="weekday-header">Пт</div><div class="weekday-header">Сб</div>
                <div class="weekday-header">Нд</div>
            </div>
            
            <div class="calendar-grid" id="calendar-grid" role="grid" aria-label="Календар"></div>
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="app.compareWithRealData()">
                    🔬 Порівняти з реальними даними
                </button>
                <button class="btn btn-success" onclick="app.generatePDFReport()">
                    📄 Створити звіт (PDF)
                </button>
                <button class="btn btn-secondary" onclick="app.saveReportAsFile()">
                    💾 Зберегти звіт
                </button>
                <button class="btn btn-secondary" onclick="app.printReport()">
                    🖨️ Друк
                </button>
            </div>
        </main>
        
        <!-- STATS -->
        <aside class="stats-panel" aria-label="Статистика">
            <h2>📊 Статистика місяця</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-emoji">📝</div>
                    <div class="stat-value" id="stat-days">0</div>
                    <div class="stat-label">днів записано</div>
                </div>
                <div class="stat-card">
                    <div class="stat-emoji">🌡️</div>
                    <div class="stat-value" id="stat-avg-temp">--°C</div>
                    <div class="stat-label">середня t°</div>
                </div>
                <div class="stat-card">
                    <div class="stat-emoji">☀️</div>
                    <div class="stat-value" id="stat-sunny">0</div>
                    <div class="stat-label">сонячних днів</div>
                </div>
                <div class="stat-card">
                    <div class="stat-emoji">💨</div>
                    <div class="stat-value" id="stat-windy">0</div>
                    <div class="stat-label">вітряних днів</div>
                </div>
                <div class="stat-card">
                    <div class="stat-emoji">🔥</div>
                    <div class="stat-value" id="stat-streak">0</div>
                    <div class="stat-label">днів підряд</div>
                </div>
                <div class="stat-card">
                    <div class="stat-emoji">🎯</div>
                    <div class="stat-value" id="stat-accuracy">--%</div>
                    <div class="stat-label">точність</div>
                </div>
            </div>
            <div id="comparison-results" style="margin-top:var(--space-lg);"></div>
        </aside>
        
        <!-- METHODOLOGY -->
        <section class="methodology-panel" aria-label="Методичний паспорт">
            <h2>📋 НУШ 5-6 класи</h2>
            <p><strong>Предмети:</strong> 🌍 Географія • 🔬 Природничі науки</p>
            <p><strong>Результати НУШ:</strong></p>
            <ul style="list-style:none;padding:0;">
                <li>✅ <strong>ПРО 1.1</strong> — Дослідження природних явищ</li>
                <li>✅ <strong>ПРО 1.2</strong> — Фіксація результатів спостережень</li>
                <li>✅ <strong>ПРО 2.1</strong> — Аналіз та порівняння даних</li>
                <li>✅ <strong>ГЕО 1.1</strong> — Атмосфера, погода, клімат</li>
                <li>✅ <strong>ГЕО 2.1</strong> — Метеорологічні спостереження</li>
                <li>✅ <strong>МАО 2.3</strong> — Таблиці, графіки, діаграми</li>
            </ul>
            <p style="margin-top:var(--space-md);"><strong>♿ Інклюзія:</strong> WCAG 2.2 AA • Screen reader • Клавіатура • Контраст</p>
        </section>
        
        <!-- FOOTER -->
        <footer class="app-footer">
            <p>🌍 Дані: <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a> | 
               📍 Геокодування: <a href="https://nominatim.org/" target="_blank" rel="noopener">Nominatim</a></p>
            <p>🌈 WeatherLab НУШ v2.1 • PWA • WCAG 2.2 AA • 5-6 класи</p>
        </footer>
    </div>
    
    <!-- WEATHER MODAL -->
    <div class="modal-overlay" id="weather-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
        <div class="modal-content">
            <button class="modal-close" onclick="app.closeModal()" aria-label="Закрити">✕</button>
            <h2 id="modal-title" style="text-align:center;">🌈 Запис погоди</h2>
            <p id="modal-date" style="text-align:center;color:var(--gray-500);"></p>
            
            <form id="weather-form" onsubmit="app.saveWeatherRecord(event)" novalidate>
                <div class="form-group">
                    <label class="form-label">🌡️ Температура (°C):</label>
                    <div style="display:flex;align-items:center;gap:var(--space-sm);">
                        <button type="button" class="btn btn-secondary" onclick="app.adjustTemp(-1)" style="min-width:44px;">−</button>
                        <input type="number" id="temp-input" class="form-input" step="0.5" placeholder="0" 
                               style="text-align:center;font-size:1.5rem;font-weight:700;max-width:120px;"
                               min="-50" max="50" aria-required="true">
                        <button type="button" class="btn btn-secondary" onclick="app.adjustTemp(1)" style="min-width:44px;">+</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">☁️ Тип погоди:</label>
                    <div class="emoji-grid" id="weather-picker"></div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">💨 Напрям вітру:</label>
                    <div class="wind-grid" id="wind-picker"></div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">💨 Швидкість вітру (м/с):</label>
                    <input type="range" id="wind-speed-range" min="0" max="20" step="0.5" value="0" 
                           style="width:100%;" oninput="document.getElementById('wind-speed-val').textContent=this.value">
                    <span id="wind-speed-val" style="font-weight:700;">0</span> м/с
                </div>
                
                <div class="form-group">
                    <label class="form-label">😊 Настрій:</label>
                    <div class="emoji-grid" id="mood-picker"></div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">📝 Нотатки:</label>
                    <textarea id="notes-input" class="form-input" rows="3" 
                              placeholder="Що цікавого помітив? Які хмари? Опади?" maxlength="300"></textarea>
                </div>
                
                <div style="display:flex;gap:var(--space-md);margin-top:var(--space-xl);flex-wrap:wrap;">
                    <button type="submit" class="btn btn-primary">💾 Зберегти</button>
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Скасувати</button>
                    <button type="button" class="btn btn-danger" id="delete-record-btn" 
                            onclick="app.deleteRecord()" hidden>🗑️ Видалити</button>
                </div>
            </form>
        </div>
    </div>
    
    <!-- TOAST CONTAINER -->
    <div id="toast-container"></div>
    
    <script>
        // ============================================================
        // WEATHERLAB НУШ — ГОЛОВНИЙ ДОДАТОК v2.1
        // ============================================================
        
        class WeatherLabApp {
            constructor() {
                this.now = new Date();
                this.year = this.now.getFullYear();
                this.month = this.now.getMonth();
                this.selectedDay = null;
                this.realData = null;
                
                this.months = ['Січень','Лютий','Березень','Квітень','Травень','Червень',
                              'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'];
                this.monthsGen = ['січня','лютого','березня','квітня','травня','червня',
                                 'липня','серпня','вересня','жовтня','листопада','грудня'];
                
                this.weatherEmojis = [
                    {v:'☀️',l:'Сонячно'},{v:'🌤️',l:'Мінлива хмарність'},
                    {v:'☁️',l:'Хмарно'},{v:'🌧️',l:'Дощ'},
                    {v:'⛈️',l:'Гроза'},{v:'❄️',l:'Сніг'},
                    {v:'🌪️',l:'Сильний вітер'},{v:'🌈',l:'Райдуга'},
                    {v:'🌫️',l:'Туман'}
                ];
                
                this.moodEmojis = [
                    {v:'😀',l:'Щасливий'},{v:'😊',l:'Задоволений'},
                    {v:'😐',l:'Нейтральний'},{v:'😢',l:'Сумний'},
                    {v:'🤩',l:'Радісний'},{v:'🥱',l:'Втомлений'}
                ];
                
                this.windDirs = [
                    {v:'Пн',e:'↑'},{v:'Пд',e:'↓'},{v:'Зх',e:'←'},{v:'Сх',e:'→'},
                    {v:'ПнЗх',e:'↖'},{v:'ПнСх',e:'↗'},{v:'ПдЗх',e:'↙'},{v:'ПдСх',e:'↘'}
                ];
                
                this.init();
            }
            
            init() {
                this.initPickers();
                this.renderCalendar();
                this.updateStats();
                this.setupConnectivity();
                
                // Завантажити збережені дані учня
                const savedName = localStorage.getItem('wl_student_name');
                const savedClass = localStorage.getItem('wl_student_class');
                if (savedName) document.getElementById('student-name').value = savedName;
                if (savedClass) document.getElementById('student-class').value = savedClass;
                
                const savedLoc = JSON.parse(localStorage.getItem('wl_location') || 'null');
                if (savedLoc) {
                    document.getElementById('location-input').value = savedLoc.name;
                    document.getElementById('location-status').textContent = '✅ ' + savedLoc.name;
                }
                
                document.getElementById('current-month-label').textContent = 
                    `${this.months[this.month]} ${this.year}`;
            }
            
            initPickers() {
                const wp = document.getElementById('weather-picker');
                wp.innerHTML = this.weatherEmojis.map(w => 
                    `<button type="button" class="emoji-option" data-v="${w.v}" 
                         title="${w.l}" onclick="app.selectEmoji(this,'weather-picker')">${w.v}</button>`
                ).join('');
                
                const mp = document.getElementById('mood-picker');
                mp.innerHTML = this.moodEmojis.map(m => 
                    `<button type="button" class="emoji-option" data-v="${m.v}" 
                         title="${m.l}" onclick="app.selectEmoji(this,'mood-picker')">${m.v}</button>`
                ).join('');
                
                const wdp = document.getElementById('wind-picker');
                wdp.innerHTML = this.windDirs.map(w => 
                    `<button type="button" class="wind-btn" data-v="${w.v}" 
                         title="${w.v}" onclick="app.selectWind(this)">${w.e}</button>`
                ).join('');
                
                // Вибрати перші елементи за замовчуванням
                wp.querySelector('.emoji-option')?.classList.add('selected');
                mp.querySelector('.emoji-option')?.classList.add('selected');
                wdp.querySelector('.wind-btn')?.classList.add('selected');
            }
            
            selectEmoji(el, pickerId) {
                document.querySelectorAll(`#${pickerId} .emoji-option`).forEach(o => o.classList.remove('selected'));
                el.classList.add('selected');
            }
            
            selectWind(el) {
                document.querySelectorAll('#wind-picker .wind-btn').forEach(o => o.classList.remove('selected'));
                el.classList.add('selected');
            }
            
            renderCalendar() {
                const grid = document.getElementById('calendar-grid');
                grid.innerHTML = '';
                
                const firstDay = new Date(this.year, this.month, 1).getDay();
                const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
                const today = new Date();
                const isCurrentMonth = today.getMonth() === this.month && today.getFullYear() === this.year;
                
                let offset = firstDay === 0 ? 6 : firstDay - 1;
                
                for (let i = 0; i < offset; i++) {
                    const empty = document.createElement('div');
                    empty.className = 'calendar-cell empty';
                    grid.appendChild(empty);
                }
                
                for (let day = 1; day <= daysInMonth; day++) {
                    const cell = document.createElement('div');
                    cell.className = 'calendar-cell';
                    cell.setAttribute('role', 'gridcell');
                    cell.setAttribute('tabindex', '0');
                    
                    const date = new Date(this.year, this.month, day);
                    const key = `wl_${this.year}_${this.month}_${day}`;
                    const data = JSON.parse(localStorage.getItem(key) || 'null');
                    
                    if (isCurrentMonth && day === today.getDate()) cell.classList.add('today');
                    else if (date > today) cell.classList.add('future');
                    if (data) cell.classList.add('recorded');
                    
                    let html = `<div class="cell-date">${day}</div>`;
                    if (data) {
                        html += `<div class="cell-emoji">${data.w}</div>`;
                        html += `<div class="cell-temp">${data.t}°C</div>`;
                    }
                    cell.innerHTML = html;
                    
                    if (date <= today || data) {
                        cell.addEventListener('click', () => this.openModal(day));
                        cell.addEventListener('keydown', e => { if(e.key==='Enter') this.openModal(day); });
                    }
                    
                    grid.appendChild(cell);
                }
                
                document.getElementById('current-month-label').textContent = 
                    `${this.months[this.month]} ${this.year}`;
            }
            
            changeMonth(d) {
                this.month += d;
                if (this.month < 0) { this.month = 11; this.year--; }
                else if (this.month > 11) { this.month = 0; this.year++; }
                
                const now = new Date();
                if (new Date(this.year, this.month, 1) > now) {
                    this.month = now.getMonth();
                    this.year = now.getFullYear();
                }
                
                this.renderCalendar();
                this.updateStats();
            }
            
            goToToday() {
                const now = new Date();
                this.month = now.getMonth();
                this.year = now.getFullYear();
                this.renderCalendar();
                this.updateStats();
            }
            
            openModal(day) {
                this.selectedDay = day;
                const modal = document.getElementById('weather-modal');
                document.getElementById('modal-date').textContent = 
                    `${day} ${this.monthsGen[this.month]} ${this.year}`;
                
                const key = `wl_${this.year}_${this.month}_${day}`;
                const data = JSON.parse(localStorage.getItem(key) || 'null');
                
                document.getElementById('temp-input').value = data?.t || '';
                document.getElementById('notes-input').value = data?.n || '';
                document.getElementById('wind-speed-range').value = data?.ws || 0;
                document.getElementById('wind-speed-val').textContent = data?.ws || 0;
                
                // Скинути вибір
                document.querySelectorAll('#weather-picker .emoji-option, #mood-picker .emoji-option, #wind-picker .wind-btn')
                    .forEach(o => o.classList.remove('selected'));
                
                if (data) {
                    document.querySelector(`#weather-picker [data-v="${data.w}"]`)?.classList.add('selected');
                    document.querySelector(`#mood-picker [data-v="${data.m}"]`)?.classList.add('selected');
                    document.querySelector(`#wind-picker [data-v="${data.wd}"]`)?.classList.add('selected');
                    document.getElementById('delete-record-btn').hidden = false;
                } else {
                    document.querySelector('#weather-picker .emoji-option')?.classList.add('selected');
                    document.querySelector('#mood-picker .emoji-option')?.classList.add('selected');
                    document.querySelector('#wind-picker .wind-btn')?.classList.add('selected');
                    document.getElementById('delete-record-btn').hidden = true;
                }
                
                modal.hidden = false;
                modal.style.display = 'flex';
                setTimeout(() => document.getElementById('temp-input').focus(), 100);
            }
            
            closeModal() {
                const modal = document.getElementById('weather-modal');
                modal.hidden = true;
                modal.style.display = 'none';
            }
            
            adjustTemp(d) {
                const inp = document.getElementById('temp-input');
                let v = parseFloat(inp.value) || 0;
                v = Math.round((v + d) * 2) / 2;
                v = Math.max(-50, Math.min(50, v));
                inp.value = v;
            }
            
            saveWeatherRecord(e) {
                e.preventDefault();
                const temp = parseFloat(document.getElementById('temp-input').value);
                if (isNaN(temp) || temp < -50 || temp > 50) {
                    alert('Введи температуру від -50 до +50!');
                    return;
                }
                
                const wEl = document.querySelector('#weather-picker .emoji-option.selected');
                const mEl = document.querySelector('#mood-picker .emoji-option.selected');
                const wdEl = document.querySelector('#wind-picker .wind-btn.selected');
                
                if (!wEl || !mEl || !wdEl) {
                    alert('Заповни всі поля!');
                    return;
                }
                
                const data = {
                    t: temp,
                    w: wEl.dataset.v,
                    m: mEl.dataset.v,
                    wd: wdEl.dataset.v,
                    ws: parseFloat(document.getElementById('wind-speed-range').value) || 0,
                    n: document.getElementById('notes-input').value.trim(),
                    ts: new Date().toISOString()
                };
                
                const key = `wl_${this.year}_${this.month}_${this.selectedDay}`;
                localStorage.setItem(key, JSON.stringify(data));
                
                this.renderCalendar();
                this.updateStats();
                this.closeModal();
                this.showToast('✅ Збережено!');
            }
            
            deleteRecord() {
                if (!confirm('Видалити цей запис?')) return;
                const key = `wl_${this.year}_${this.month}_${this.selectedDay}`;
                localStorage.removeItem(key);
                this.renderCalendar();
                this.updateStats();
                this.closeModal();
                this.showToast('🗑️ Видалено');
            }
            
            updateStats() {
                const dim = new Date(this.year, this.month + 1, 0).getDate();
                let count = 0, totalTemp = 0, sunny = 0, windy = 0, streak = 0, maxStreak = 0;
                
                for (let d = 1; d <= dim; d++) {
                    const key = `wl_${this.year}_${this.month}_${d}`;
                    const data = JSON.parse(localStorage.getItem(key) || 'null');
                    if (data) {
                        count++;
                        totalTemp += data.t;
                        if (data.w === '☀️') sunny++;
                        if (data.w === '🌪️' || data.ws >= 10) windy++;
                        streak++;
                        maxStreak = Math.max(maxStreak, streak);
                    } else {
                        streak = 0;
                    }
                }
                
                document.getElementById('stat-days').textContent = count;
                document.getElementById('stat-avg-temp').textContent = count > 0 ? `${(totalTemp/count).toFixed(1)}°C` : '--°C';
                document.getElementById('stat-sunny').textContent = sunny;
                document.getElementById('stat-windy').textContent = windy;
                document.getElementById('stat-streak').textContent = maxStreak;
            }
            
            saveStudentInfo() {
                const name = document.getElementById('student-name').value.trim();
                const cls = document.getElementById('student-class').value.trim();
                if (name) localStorage.setItem('wl_student_name', name);
                if (cls) localStorage.setItem('wl_student_class', cls);
                this.showToast('✅ Дані збережено!');
            }
            
            async detectLocation() {
                const btn = document.getElementById('geo-btn');
                btn.disabled = true;
                btn.textContent = '⏳ Визначаю...';
                
                try {
                    const pos = await new Promise((res, rej) => 
                        navigator.geolocation.getCurrentPosition(res, rej, {timeout:10000}));
                    
                    const resp = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&accept-language=uk`
                    );
                    const data = await resp.json();
                    const name = data.address?.city || data.address?.town || data.address?.village || 'Невідомо';
                    
                    document.getElementById('location-input').value = name;
                    document.getElementById('location-status').textContent = '✅ ' + name;
                    localStorage.setItem('wl_location', JSON.stringify({
                        name, lat: pos.coords.latitude, lon: pos.coords.longitude
                    }));
                    
                    this.showToast('✅ Локацію визначено: ' + name);
                } catch(err) {
                    alert('Не вдалося визначити локацію. Введи місто вручну.');
                } finally {
                    btn.disabled = false;
                    btn.textContent = '📡 Визначити геолокацію';
                }
            }
            
            async compareWithRealData() {
                const loc = JSON.parse(localStorage.getItem('wl_location') || 'null');
                if (!loc?.lat) { alert('Спочатку визнач локацію!'); return; }
                
                const btn = document.querySelector('#compare-btn, .btn-primary');
                btn.disabled = true;
                btn.textContent = '⏳ Завантажую...';
                
                const start = `${this.year}-${String(this.month+1).padStart(2,'0')}-01`;
                const end = `${this.year}-${String(this.month+1).padStart(2,'0')}-${String(new Date(this.year, this.month+1, 0).getDate()).padStart(2,'0')}`;
                
                try {
                    const resp = await fetch(
                        `https://archive-api.open-meteo.com/v1/archive?latitude=${loc.lat}&longitude=${loc.lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=auto`
                    );
                    if (!resp.ok) throw new Error('API error');
                    
                    this.realData = await resp.json();
                    
                    const dim = new Date(this.year, this.month + 1, 0).getDate();
                    let results = '', totalDiff = 0, compCount = 0;
                    
                    for (let d = 1; d <= dim; d++) {
                        const key = `wl_${this.year}_${this.month}_${d}`;
                        const ud = JSON.parse(localStorage.getItem(key) || 'null');
                        if (!ud) continue;
                        
                        const idx = d - 1;
                        if (idx >= this.realData.daily.time.length) continue;
                        
                        const realTemp = (this.realData.daily.temperature_2m_max[idx] + 
                                         this.realData.daily.temperature_2m_min[idx]) / 2;
                        const diff = Math.abs(ud.t - realTemp);
                        totalDiff += diff;
                        compCount++;
                        
                        const acc = diff <= 2 ? '🟢' : diff <= 5 ? '🟡' : '🔴';
                        results += `<tr><td>${d}.${this.month+1}</td><td>${ud.t}°C</td><td>${realTemp.toFixed(1)}°C</td><td>${acc} ${diff.toFixed(1)}°C</td></tr>`;
                    }
                    
                    const accuracy = compCount > 0 ? Math.round((1 - totalDiff/(compCount*10)) * 100) : 0;
                    document.getElementById('stat-accuracy').textContent = accuracy + '%';
                    
                    document.getElementById('comparison-results').innerHTML = `
                        <h3>🔬 Порівняння з реальними даними</h3>
                        <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
                            <tr><th>Дата</th><th>Твій запис</th><th>Реальна t°</th><th>Різниця</th></tr>
                            ${results || '<tr><td colspan="4">Немає даних для порівняння</td></tr>'}
                        </table>
                        <p><strong>🎯 Середня точність: ${accuracy}%</strong></p>
                    `;
                    
                } catch(err) {
                    alert('Помилка отримання даних. Перевір інтернет.');
                } finally {
                    btn.disabled = false;
                    btn.textContent = '🔬 Порівняти з реальними даними';
                }
            }
            
            generatePDFReport() {
                const name = localStorage.getItem('wl_student_name') || 'Учень';
                const cls = localStorage.getItem('wl_student_class') || '5-6 клас';
                const loc = JSON.parse(localStorage.getItem('wl_location') || 'null');
                const locName = loc?.name || 'Не вказано';
                const dim = new Date(this.year, this.month + 1, 0).getDate();
                
                let records = [], totalTemp = 0, count = 0;
                for (let d = 1; d <= dim; d++) {
                    const key = `wl_${this.year}_${this.month}_${d}`;
                    const data = JSON.parse(localStorage.getItem(key) || 'null');
                    if (data) { records.push({d, ...data}); totalTemp += data.t; count++; }
                }
                
                const avgTemp = count > 0 ? (totalTemp/count).toFixed(1) : '—';
                
                const html = `<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"><title>Метеозвіт — ${name}</title>
                <style>@page{size:A4;margin:1.5cm}body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:20px}
                h1{color:#01579b;text-align:center}.info{background:#e3f2fd;padding:15px;border-radius:10px;margin:15px 0}
                table{width:100%;border-collapse:collapse;margin:15px 0;font-size:12px}
                th{background:#0277bd;color:white;padding:8px}td{padding:6px;border:1px solid #ddd}
                .footer{text-align:center;color:#888;margin-top:30px;font-size:11px}
                @media print{body{padding:0}}</style></head><body>
                <h1>🌤️ Метеорологічний звіт</h1>
                <div class="info"><p><strong>Учень:</strong> ${name}</p><p><strong>Клас:</strong> ${cls}</p>
                <p><strong>Локація:</strong> ${locName}</p><p><strong>Період:</strong> ${this.months[this.month]} ${this.year}</p>
                <p><strong>Предмет:</strong> 🌍 Географія / 🔬 Природничі науки (НУШ 5-6 клас)</p>
                <p><strong>Середня температура:</strong> ${avgTemp}°C | <strong>Днів спостережень:</strong> ${count}</p></div>
                <table><tr><th>Дата</th><th>t°C</th><th>Погода</th><th>Вітер</th><th>Швидкість</th><th>Настрій</th><th>Нотатки</th></tr>
                ${records.map(r => `<tr><td>${r.d}.${this.month+1}.${this.year}</td><td><strong>${r.t}°C</strong></td>
                <td style="font-size:1.5rem">${r.w}</td><td>${r.wd||'—'}</td><td>${r.ws||0} м/с</td><td>${r.m||'—'}</td><td>${r.n||'—'}</td></tr>`).join('')}
                ${records.length===0?'<tr><td colspan="7" style="text-align:center;padding:20px;">Немає записів</td></tr>':''}
                </table>
                <div class="footer"><p>📋 Звіт створено в WeatherLab НУШ v2.1 | ${new Date().toLocaleDateString('uk-UA')}</p>
                <p>🌍 Предмет: Географія / Природничі науки | НУШ 5-6 класи</p></div></body></html>`;
                
                const w = window.open('', '_blank');
                w.document.write(html);
                w.document.close();
                setTimeout(() => w.print(), 500);
            }
            
            saveReportAsFile() {
                const name = localStorage.getItem('wl_student_name') || 'учень';
                const dim = new Date(this.year, this.month + 1, 0).getDate();
                
                let records = '', totalTemp = 0, count = 0;
                for (let d = 1; d <= dim; d++) {
                    const key = `wl_${this.year}_${this.month}_${d}`;
                    const data = JSON.parse(localStorage.getItem(key) || 'null');
                    if (data) { records += `${d}.${this.month+1}.${this.year};${data.t}°C;${data.w};${data.wd||''};${data.ws||0}м/с;${data.m||''};${data.n||''}\n`; totalTemp += data.t; count++; }
                }
                
                const csv = `Дата;Температура;Погода;Вітер;Швидкість;Настрій;Нотатки\n${records}`;
                const blob = new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8'});
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `Метеозвіт_${name}_${this.months[this.month]}_${this.year}.csv`;
                a.click();
                this.showToast('✅ Звіт збережено як CSV!');
            }
            
            printReport() { window.print(); }
            
            showToast(msg) {
                const t = document.createElement('div');
                t.className = 'toast';
                t.textContent = msg;
                document.body.appendChild(t);
                setTimeout(() => { t.remove(); }, 2500);
            }
            
            setupConnectivity() {
                const banner = document.getElementById('offline-banner');
                window.addEventListener('online', () => { banner.hidden = true; });
                window.addEventListener('offline', () => { banner.hidden = false; });
                if (!navigator.onLine) banner.hidden = false;
            }
        }
        
        // Запуск
        document.addEventListener('DOMContentLoaded', () => {
            window.app = new WeatherLabApp();
            
            // Service Worker
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('sw.js')
                    .then(r => console.log('✅ SW registered'))
                    .catch(e => console.log('SW registration failed:', e));
            }
            
            // Language switcher
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Close modal on overlay click
            document.getElementById('weather-modal').addEventListener('click', function(e) {
                if (e.target === this) app.closeModal();
            });
            
            // ESC to close modal
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') app.closeModal();
            });
        });
    </script>
</body>
</html>
