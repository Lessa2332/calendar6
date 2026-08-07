// ============================================================
// WEATHERLAB НУШ — Classroom Manager v2.0
// ============================================================
// Manages multi-user classroom projects
// ============================================================

const Classroom = {
    // Current classroom state
    currentClassroom: JSON.parse(localStorage.getItem('weatherlab_classroom_data') || 'null'),
    students: JSON.parse(localStorage.getItem('weatherlab_classroom_students') || '[]'),
    classRecords: JSON.parse(localStorage.getItem('weatherlab_classroom_records') || '{}'),
    
    /**
     * Create a new classroom
     * @param {string} name - Classroom name
     * @param {string} teacherName - Teacher's name
     * @returns {Object} Classroom data with unique code
     */
    createClassroom(name, teacherName) {
        const classCode = this.generateClassCode();
        
        const classroom = {
            id: Date.now().toString(),
            code: classCode,
            name: name,
            teacherName: teacherName,
            createdAt: new Date().toISOString(),
            studentCount: 0,
            totalRecords: 0,
            settings: {
                allowStudentComparison: true,
                requireLocation: false,
                dailyReminder: true
            }
        };
        
        this.currentClassroom = classroom;
        this.students = [{
            id: 'teacher',
            name: teacherName,
            role: 'teacher',
            joinedAt: new Date().toISOString(),
            avatar: '👩‍🏫',
            recordCount: 0
        }];
        
        this.saveState();
        return classroom;
    },
    
    /**
     * Join an existing classroom
     * @param {string} classCode - 6-character class code
     * @param {string} studentName - Student's name
     * @param {string} avatar - Student's avatar emoji
     * @returns {Object|null} Classroom data or null if not found
     */
    joinClassroom(classCode, studentName, avatar = '🧒') {
        // In a real app, this would query a server
        // For MVP/local version, we simulate with localStorage
        
        const storedClassroom = JSON.parse(
            localStorage.getItem(`weatherlab_class_${classCode}`) || 'null'
        );
        
        if (!storedClassroom) {
            // For demo: auto-create if joining own class
            if (classCode === this.currentClassroom?.code) {
                storedClassroom = this.currentClassroom;
            } else {
                return null; // Class not found
            }
        }
        
        // Add student
        const student = {
            id: Date.now().toString(),
            name: studentName,
            role: 'student',
            joinedAt: new Date().toISOString(),
            avatar: avatar,
            recordCount: 0,
            lastActive: new Date().toISOString()
        };
        
        // Check if student already exists
        const existingIndex = this.students.findIndex(
            s => s.name === studentName && s.role === 'student'
        );
        
        if (existingIndex >= 0) {
            this.students[existingIndex] = student;
        } else {
            this.students.push(student);
        }
        
        this.currentClassroom = storedClassroom;
        this.currentClassroom.studentCount = this.getStudentCount();
        
        localStorage.setItem('weatherlab_classroom', classCode);
        this.saveState();
        
        return this.currentClassroom;
    },
    
    /**
     * Leave current classroom
     */
    leaveClassroom() {
        localStorage.removeItem('weatherlab_classroom');
        this.currentClassroom = null;
        this.students = [];
        this.classRecords = {};
        this.saveState();
    },
    
    /**
     * Sync a weather record to the classroom
     * @param {number} day - Day of month
     * @param {Object} record - Weather record data
     */
    syncRecord(day, record) {
        if (!this.currentClassroom) return;
        
        const studentName = localStorage.getItem('weatherlab_student_name') || 'Анонім';
        const dateKey = `${record.date || `${day}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`}`;
        
        if (!this.classRecords[dateKey]) {
            this.classRecords[dateKey] = {};
        }
        
        this.classRecords[dateKey][studentName] = {
            ...record,
            syncedAt: new Date().toISOString()
        };
        
        // Update student record count
        const student = this.students.find(s => s.name === studentName);
        if (student) {
            student.recordCount = Object.values(this.classRecords)
                .filter(dayRecords => dayRecords[studentName])
                .length;
            student.lastActive = new Date().toISOString();
        }
        
        // Update classroom total
        this.currentClassroom.totalRecords = this.getTotalClassRecords();
        
        this.saveState();
    },
    
    /**
     * Get classroom dashboard data
     * @returns {Object} Dashboard statistics
     */
    getDashboard() {
        if (!this.currentClassroom) return null;
        
        const students = this.getStudentList();
        const totalRecords = this.getTotalClassRecords();
        const today = new Date();
        const currentMonthDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        
        // Calculate class averages
        let totalTemp = 0;
        let tempCount = 0;
        const weatherCounts = {};
        const dailyParticipation = {};
        
        Object.values(this.classRecords).forEach(dayRecords => {
            Object.values(dayRecords).forEach(record => {
                if (record.temp !== undefined) {
                    totalTemp += record.temp;
                    tempCount++;
                }
                if (record.weather) {
                    weatherCounts[record.weather] = (weatherCounts[record.weather] || 0) + 1;
                }
            });
            
            const dateKey = Object.keys(dayRecords)[0];
            if (dateKey) {
                const day = parseInt(dateKey.split('.')[0]);
                dailyParticipation[day] = Object.keys(dayRecords).length;
            }
        });
        
        // Find most active student
        let mostActive = null;
        let maxRecords = 0;
        students.forEach(student => {
            if (student.recordCount > maxRecords) {
                maxRecords = student.recordCount;
                mostActive = student;
            }
        });
        
        // Find most common weather
        let mostCommonWeather = null;
        let maxWeatherCount = 0;
        Object.entries(weatherCounts).forEach(([weather, count]) => {
            if (count > maxWeatherCount) {
                maxWeatherCount = count;
                mostCommonWeather = weather;
            }
        });
        
        return {
            classroom: this.currentClassroom,
            studentCount: students.length,
            totalRecords,
            averageTemp: tempCount > 0 ? (totalTemp / tempCount).toFixed(1) : null,
            mostCommonWeather,
            mostActiveStudent: mostActive,
            dailyParticipation,
            weatherDistribution: weatherCounts,
            completionRate: students.length > 0 
                ? Math.round((totalRecords / (students.length * currentMonthDays)) * 100) 
                : 0,
            lastUpdated: new Date().toISOString()
        };
    },
    
    /**
     * Get list of students
     * @returns {Array} Student list
     */
    getStudentList() {
        return this.students.filter(s => s.role === 'student');
    },
    
    /**
     * Get student count (excluding teacher)
     * @returns {number}
     */
    getStudentCount() {
        return this.students.filter(s => s.role === 'student').length;
    },
    
    /**
     * Get total records across all students
     * @returns {number}
     */
    getTotalClassRecords() {
        let total = 0;
        Object.values(this.classRecords).forEach(dayRecords => {
            total += Object.keys(dayRecords).length;
        });
        return total;
    },
    
    /**
     * Get records for a specific day
     * @param {number} day - Day of month
     * @returns {Object} Day records by student
     */
    getDayRecords(day) {
        const today = new Date();
        const dateKey = `${day}.${today.getMonth() + 1}.${today.getFullYear()}`;
        return this.classRecords[dateKey] || {};
    },
    
    /**
     * Compare student data with real weather
     * @returns {Object} Comparison results per student
     */
    compareWithRealData() {
        const results = {};
        
        this.getStudentList().forEach(student => {
            let totalDiff = 0;
            let compareCount = 0;
            
            Object.values(this.classRecords).forEach(dayRecords => {
                const studentRecord = dayRecords[student.name];
                if (studentRecord && studentRecord.realTemp) {
                    totalDiff += Math.abs(studentRecord.temp - studentRecord.realTemp);
                    compareCount++;
                }
            });
            
            results[student.name] = {
                records: student.recordCount,
                compared: compareCount,
                averageDifference: compareCount > 0 
                    ? (totalDiff / compareCount).toFixed(1) 
                    : null,
                accuracy: compareCount > 0 
                    ? Math.round((1 - totalDiff / (compareCount * 10)) * 100) 
                    : null
            };
        });
        
        return results;
    },
    
    /**
     * Export classroom report
     * @param {string} format - 'json' | 'csv' | 'pdf'
     * @returns {string|Blob} Report data
     */
    exportReport(format = 'json') {
        const dashboard = this.getDashboard();
        if (!dashboard) return null;
        
        switch (format) {
            case 'json':
                return JSON.stringify(dashboard, null, 2);
            
            case 'csv':
                return this.generateCSVReport(dashboard);
            
            case 'pdf':
                // PDF generation would require additional library
                return this.generatePrintableReport(dashboard);
            
            default:
                return JSON.stringify(dashboard, null, 2);
        }
    },
    
    /**
     * Generate CSV report
     */
    generateCSVReport(dashboard) {
        let csv = 'Student,Records,Last Active\n';
        
        this.getStudentList().forEach(student => {
            csv += `${student.name},${student.recordCount},${student.lastActive}\n`;
        });
        
        csv += `\nClassroom: ${dashboard.classroom.name}\n`;
        csv += `Code: ${dashboard.classroom.code}\n`;
        csv += `Total Records: ${dashboard.totalRecords}\n`;
        csv += `Average Temperature: ${dashboard.averageTemp || 'N/A'}°C\n`;
        csv += `Completion Rate: ${dashboard.completionRate}%\n`;
        
        return csv;
    },
    
    /**
     * Generate printable HTML report
     */
    generatePrintableReport(dashboard) {
        const students = this.getStudentList();
        
        return `
            <html>
            <head>
                <title>Class Report - ${dashboard.classroom.name}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #0277bd; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f5f5f5; }
                    .stat { font-size: 24px; font-weight: bold; color: #0277bd; }
                </style>
            </head>
            <body>
                <h1>📊 Classroom Report: ${dashboard.classroom.name}</h1>
                <p>Code: ${dashboard.classroom.code}</p>
                <p>Teacher: ${dashboard.classroom.teacherName}</p>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                
                <h2>Summary</h2>
                <p>Students: <span class="stat">${dashboard.studentCount}</span></p>
                <p>Total Records: <span class="stat">${dashboard.totalRecords}</span></p>
                <p>Average Temp: <span class="stat">${dashboard.averageTemp || 'N/A'}°C</span></p>
                <p>Completion Rate: <span class="stat">${dashboard.completionRate}%</span></p>
                
                <h2>Students</h2>
                <table>
                    <tr><th>Name</th><th>Records</th><th>Last Active</th></tr>
                    ${students.map(s => `
                        <tr>
                            <td>${s.avatar} ${s.name}</td>
                            <td>${s.recordCount}</td>
                            <td>${new Date(s.lastActive).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </table>
            </body>
            </html>
        `;
    },
    
    /**
     * Generate unique 6-character class code
     * @returns {string}
     */
    generateClassCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding confusing chars
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },
    
    /**
     * Save classroom state to localStorage
     */
    saveState() {
        localStorage.setItem('weatherlab_classroom_data', JSON.stringify(this.currentClassroom));
        localStorage.setItem('weatherlab_classroom_students', JSON.stringify(this.students));
        localStorage.setItem('weatherlab_classroom_records', JSON.stringify(this.classRecords));
        
        // Also save to shared storage key for other "students" to find
        if (this.currentClassroom) {
            localStorage.setItem(
                `weatherlab_class_${this.currentClassroom.code}`,
                JSON.stringify(this.currentClassroom)
            );
        }
    },
    
    /**
     * Clear all classroom data
     */
    reset() {
        this.currentClassroom = null;
        this.students = [];
        this.classRecords = {};
        localStorage.removeItem('weatherlab_classroom_data');
        localStorage.removeItem('weatherlab_classroom_students');
        localStorage.removeItem('weatherlab_classroom_records');
        localStorage.removeItem('weatherlab_classroom');
    }
};
