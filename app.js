// Health Quest - Main Application Logic
//
// DEBUGGING INSTRUCTIONS:
// 1. Open the browser console (F12 or Right-click > Inspect > Console)
// 2. Look for initialization messages showing game state and element counts
// 3. Click on any element - you should see detailed click logs
// 4. Run window.debugClickability() in the console to check element states
// 5. All clicks are logged with element details and potential blocking issues
//
import { QUESTIONS } from './data.js';
import { triggerConfetti } from './confetti.js';

// ============================================================
// LOCALSTORAGE KEYS & STATE
// ============================================================
const STORAGE_KEYS = {
    totalXP: 'hq_totalXP',
    completedQuestions: 'hq_completedQuestions',
    lastPlayDate: 'hq_lastPlayDate',
    streak: 'hq_streak',
    hasSeenOnboarding: 'hasSeenOnboarding',
    todayHistory: 'hq_todayHistory',
    currentNodeIndex: 'hq_currentNodeIndex',
    completedNodes: 'hq_completedNodes',
    dailyQuestDate: 'hq_dailyQuestDate',
    dailyQuestTiles: 'hq_dailyQuestTiles',
    completedTiles: 'hq_completedTiles',
    unlockedAchievements: 'hq_unlockedAchievements',
    playDates: 'hq_playDates',
    weeklyBossDate: 'hq_weeklyBossDate'
};

let gameState = {
    totalXP: 0,
    completedQuestions: [],
    lastPlayDate: null,
    streak: 0,
    currentLevel: 1,
    currentNodeIndex: 0,
    completedNodes: [],
    completedTiles: [] // Track tiles that have been completed correctly at least once
};

// Track today's daily quest
let dailyQuest = {
    date: null,
    tiles: [] // Array of 3 tile IDs for today
};

// Track today's progress
let todayProgress = {
    tilesCompleted: 0,
    xpEarned: 0
};

// ============================================================
// ACHIEVEMENTS SYSTEM
// ============================================================
const ACHIEVEMENTS = {
    sleepRookie: {
        id: 'sleepRookie',
        name: 'Sleep Rookie',
        description: 'Complete 3 sleep tiles',
        icon: '😴',
        checkUnlock: () => {
            const sleepTiles = QUESTIONS['sleep'] || [];
            const completedSleepCount = sleepTiles.filter(q => gameState.completedTiles.includes(q.id)).length;
            return completedSleepCount >= 3;
        }
    },
    hydrationHero: {
        id: 'hydrationHero',
        name: 'Hydration Hero',
        description: 'Complete 10 hydration tiles',
        icon: '💦',
        checkUnlock: () => {
            const hydrationTiles = QUESTIONS['hydration'] || [];
            const completedHydrationCount = hydrationTiles.filter(q => gameState.completedTiles.includes(q.id)).length;
            return completedHydrationCount >= 10;
        }
    },
    sevenDayStreak: {
        id: 'sevenDayStreak',
        name: 'Seven Day Streak',
        description: 'Reach a 7-day daily streak',
        icon: '🔥',
        checkUnlock: () => gameState.streak >= 7
    },
    firstMapClear: {
        id: 'firstMapClear',
        name: 'First Map Clear',
        description: 'Clear all 10 nodes',
        icon: '🏆',
        checkUnlock: () => gameState.completedNodes.length >= 10
    }
};

let unlockedAchievements = [];
let playDates = []; // Track unique play dates for weekly boss eligibility

// ============================================================
// INITIALIZATION
// ============================================================
console.log('Health Quest app initialized');

// Load game state from localStorage
function loadGameState() {
    gameState.totalXP = parseInt(localStorage.getItem(STORAGE_KEYS.totalXP)) || 0;
    gameState.completedQuestions = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedQuestions) || '[]');
    gameState.lastPlayDate = localStorage.getItem(STORAGE_KEYS.lastPlayDate) || null;
    gameState.streak = parseInt(localStorage.getItem(STORAGE_KEYS.streak)) || 0;
    gameState.currentNodeIndex = parseInt(localStorage.getItem(STORAGE_KEYS.currentNodeIndex)) || 0;
    gameState.completedNodes = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedNodes) || '[]');
    gameState.completedTiles = JSON.parse(localStorage.getItem(STORAGE_KEYS.completedTiles) || '[]');

    // Load achievements
    unlockedAchievements = JSON.parse(localStorage.getItem(STORAGE_KEYS.unlockedAchievements) || '[]');

    // Load play dates
    playDates = JSON.parse(localStorage.getItem(STORAGE_KEYS.playDates) || '[]');

    // Calculate current level
    gameState.currentLevel = Math.floor(gameState.totalXP / 100) + 1;

    // Load today's progress
    loadTodayProgress();

    // Load or initialize daily quest
    loadDailyQuest();

    // Track today as a play date
    trackPlayDate();

    console.log('Game state loaded:', gameState);
}

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem(STORAGE_KEYS.totalXP, gameState.totalXP.toString());
    localStorage.setItem(STORAGE_KEYS.completedQuestions, JSON.stringify(gameState.completedQuestions));
    localStorage.setItem(STORAGE_KEYS.lastPlayDate, gameState.lastPlayDate || '');
    localStorage.setItem(STORAGE_KEYS.streak, gameState.streak.toString());
    localStorage.setItem(STORAGE_KEYS.currentNodeIndex, gameState.currentNodeIndex.toString());
    localStorage.setItem(STORAGE_KEYS.completedNodes, JSON.stringify(gameState.completedNodes));
    localStorage.setItem(STORAGE_KEYS.completedTiles, JSON.stringify(gameState.completedTiles));

    // Save achievements
    localStorage.setItem(STORAGE_KEYS.unlockedAchievements, JSON.stringify(unlockedAchievements));

    // Save play dates
    localStorage.setItem(STORAGE_KEYS.playDates, JSON.stringify(playDates));

    // Save today's progress
    saveTodayProgress();

    console.log('Game state saved:', gameState);
}

// ============================================================
// TODAY'S PROGRESS TRACKING
// ============================================================
function loadTodayProgress() {
    const today = new Date().toISOString().split('T')[0];
    const savedHistory = localStorage.getItem(STORAGE_KEYS.todayHistory);

    if (savedHistory) {
        try {
            const history = JSON.parse(savedHistory);
            if (history.date === today) {
                todayProgress = history;
            } else {
                // Reset for new day
                todayProgress = { date: today, tilesCompleted: 0, xpEarned: 0 };
            }
        } catch (e) {
            todayProgress = { date: today, tilesCompleted: 0, xpEarned: 0 };
        }
    } else {
        todayProgress = { date: today, tilesCompleted: 0, xpEarned: 0 };
    }
}

function saveTodayProgress() {
    const today = new Date().toISOString().split('T')[0];
    todayProgress.date = today;
    localStorage.setItem(STORAGE_KEYS.todayHistory, JSON.stringify(todayProgress));
}

// ============================================================
// PLAY DATE TRACKING FOR WEEKLY BOSS
// ============================================================
function trackPlayDate() {
    const today = new Date().toISOString().split('T')[0];
    if (!playDates.includes(today)) {
        playDates.push(today);
        // Keep only last 30 days for efficiency
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        playDates = playDates.filter(date => new Date(date) >= thirtyDaysAgo);
        localStorage.setItem(STORAGE_KEYS.playDates, JSON.stringify(playDates));
    }
}

function getUniqueDaysInLastWeek() {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return playDates.filter(date => {
        const playDate = new Date(date);
        return playDate >= sevenDaysAgo && playDate <= today;
    }).length;
}

// ============================================================
// ACHIEVEMENTS SYSTEM FUNCTIONS
// ============================================================
function checkAchievements() {
    let newlyUnlocked = [];

    Object.values(ACHIEVEMENTS).forEach(achievement => {
        // Skip if already unlocked
        if (unlockedAchievements.includes(achievement.id)) {
            return;
        }

        // Check if criteria met
        if (achievement.checkUnlock()) {
            unlockedAchievements.push(achievement.id);
            newlyUnlocked.push(achievement);
        }
    });

    // Save if any new achievements unlocked
    if (newlyUnlocked.length > 0) {
        localStorage.setItem(STORAGE_KEYS.unlockedAchievements, JSON.stringify(unlockedAchievements));

        // Show toast for each new achievement
        newlyUnlocked.forEach(achievement => {
            showAchievementToast(achievement);
        });

        // Update achievements UI
        updateAchievementsDisplay();
    }
}

function showAchievementToast(achievement) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <div class="achievement-toast-icon">${achievement.icon}</div>
        <div class="achievement-toast-content">
            <div class="achievement-toast-title">Achievement Unlocked!</div>
            <div class="achievement-toast-name">${achievement.name}</div>
        </div>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function updateAchievementsDisplay() {
    const container = document.getElementById('achievements-list');
    if (!container) return;

    container.innerHTML = '';

    Object.values(ACHIEVEMENTS).forEach(achievement => {
        const isUnlocked = unlockedAchievements.includes(achievement.id);

        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        item.innerHTML = `
            <div class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-info">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;

        container.appendChild(item);
    });

    // Update achievement count
    const countElement = document.getElementById('achievements-count');
    if (countElement) {
        const total = Object.keys(ACHIEVEMENTS).length;
        countElement.textContent = `${unlockedAchievements.length} / ${total}`;
    }
}

// ============================================================
// WEEKLY BOSS QUIZ
// ============================================================
let weeklyBossQuiz = {
    questions: [],
    currentQuestionIndex: 0,
    correctAnswers: 0,
    isActive: false
};

function isWeeklyBossAvailable() {
    const uniqueDays = getUniqueDaysInLastWeek();
    return uniqueDays >= 5;
}

function hasCompletedWeeklyBossThisWeek() {
    const lastCompletedDate = localStorage.getItem(STORAGE_KEYS.weeklyBossDate);
    if (!lastCompletedDate) return false;

    const today = new Date();
    const lastCompleted = new Date(lastCompletedDate);
    const daysSince = Math.floor((today - lastCompleted) / (1000 * 60 * 60 * 24));

    return daysSince < 7;
}

function updateWeeklyBossButton() {
    const button = document.getElementById('weekly-boss-button');
    if (!button) return;

    const isAvailable = isWeeklyBossAvailable();
    const hasCompleted = hasCompletedWeeklyBossThisWeek();

    if (isAvailable && !hasCompleted) {
        button.style.display = 'block';
        button.disabled = false;
    } else {
        button.style.display = 'none';
    }
}

function startWeeklyBoss() {
    // Generate 5 random questions from any category
    const allQuestions = [];
    Object.values(QUESTIONS).forEach(zoneQuestions => {
        allQuestions.push(...zoneQuestions);
    });

    // Shuffle and select 5
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    weeklyBossQuiz.questions = shuffled.slice(0, 5);
    weeklyBossQuiz.currentQuestionIndex = 0;
    weeklyBossQuiz.correctAnswers = 0;
    weeklyBossQuiz.isActive = true;

    // Show weekly boss modal
    showWeeklyBossQuestion();
}

function showWeeklyBossQuestion() {
    const modal = document.getElementById('weekly-boss-modal');
    const questionText = document.getElementById('boss-question-text');
    const optionsContainer = document.getElementById('boss-options');
    const feedbackElement = document.getElementById('boss-feedback');
    const progressElement = document.getElementById('boss-progress');

    const currentQuestion = weeklyBossQuiz.questions[weeklyBossQuiz.currentQuestionIndex];

    // Update progress
    progressElement.textContent = `Question ${weeklyBossQuiz.currentQuestionIndex + 1} of 5`;

    // Set question text
    questionText.textContent = currentQuestion.text;

    // Clear previous options and feedback
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    feedbackElement.className = 'boss-feedback';

    // Render options
    currentQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'boss-option-btn';
        btn.textContent = option;
        btn.dataset.optionIndex = index;

        btn.addEventListener('click', () => {
            handleBossAnswer(index, btn);
        });

        optionsContainer.appendChild(btn);
    });

    // Show modal
    modal.classList.remove('hidden');
}

function handleBossAnswer(selectedIndex, selectedButton) {
    const currentQuestion = weeklyBossQuiz.questions[weeklyBossQuiz.currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    const feedbackElement = document.getElementById('boss-feedback');
    const optionButtons = document.querySelectorAll('.boss-option-btn');

    // Disable all buttons
    optionButtons.forEach(btn => btn.disabled = true);

    // Highlight answers
    selectedButton.classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
        optionButtons[currentQuestion.correctIndex].classList.add('correct');
    }

    if (isCorrect) {
        weeklyBossQuiz.correctAnswers++;
        feedbackElement.textContent = 'Correct!';
        feedbackElement.className = 'boss-feedback correct';
    } else {
        feedbackElement.textContent = `Wrong. The answer is: ${currentQuestion.options[currentQuestion.correctIndex]}`;
        feedbackElement.className = 'boss-feedback incorrect';
    }

    // Show next button after 1.5 seconds
    setTimeout(() => {
        weeklyBossQuiz.currentQuestionIndex++;

        if (weeklyBossQuiz.currentQuestionIndex < 5) {
            // Show next question
            showWeeklyBossQuestion();
        } else {
            // Show completion
            showWeeklyBossCompletion();
        }
    }, 1500);
}

function showWeeklyBossCompletion() {
    const modal = document.getElementById('weekly-boss-modal');
    const content = modal.querySelector('.boss-modal-content-inner');

    const score = weeklyBossQuiz.correctAnswers;
    const bonusXP = score * 20; // 20 XP per correct answer

    content.innerHTML = `
        <h2 class="boss-completion-title">Weekly Challenge Complete!</h2>
        <div class="boss-score">
            <div class="boss-score-number">${score} / 5</div>
            <div class="boss-score-label">Correct Answers</div>
        </div>
        <div class="boss-reward">
            <div class="boss-reward-icon">⚡</div>
            <div class="boss-reward-text">+${bonusXP} Bonus XP</div>
            <div class="boss-badge">🏅 Weekly Champion</div>
        </div>
        <button id="boss-close-btn" class="boss-close-button">Claim Reward</button>
    `;

    // Add XP
    gameState.totalXP += bonusXP;
    gameState.currentLevel = Math.floor(gameState.totalXP / 100) + 1;

    // Mark as completed this week
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEYS.weeklyBossDate, today);

    saveGameState();
    updateProgressDisplay();

    // Set up close button
    const closeBtn = document.getElementById('boss-close-btn');
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        weeklyBossQuiz.isActive = false;
        updateWeeklyBossButton();
    });
}

// ============================================================
// DAILY QUEST SYSTEM
// ============================================================
function loadDailyQuest() {
    const today = new Date().toISOString().split('T')[0];
    const savedDate = localStorage.getItem(STORAGE_KEYS.dailyQuestDate);
    const savedTiles = localStorage.getItem(STORAGE_KEYS.dailyQuestTiles);

    if (savedDate === today && savedTiles) {
        // Use existing daily quest for today
        try {
            dailyQuest.date = savedDate;
            dailyQuest.tiles = JSON.parse(savedTiles);
            console.log('Loaded existing daily quest:', dailyQuest);
        } catch (e) {
            // If parsing fails, generate new quest
            generateDailyQuest();
        }
    } else {
        // Generate new daily quest for today
        generateDailyQuest();
    }
}

function generateDailyQuest() {
    const today = new Date().toISOString().split('T')[0];
    dailyQuest.date = today;

    // Get the current node's zone(s)
    const currentNode = getCurrentNode();
    let availableQuestions = [];

    if (currentNode.zone === 'mixed') {
        // For mixed nodes, get questions from all zones
        const zones = ['sleep', 'stress', 'nutrition', 'movement', 'hydration', 'mindset'];
        zones.forEach(zone => {
            const zoneQuestions = QUESTIONS[zone] || [];
            availableQuestions = availableQuestions.concat(zoneQuestions);
        });
    } else {
        // For regular nodes, get questions from that zone
        availableQuestions = QUESTIONS[currentNode.zone] || [];
    }

    // Filter by difficulty based on current level
    availableQuestions = filterQuestionsByLevel(availableQuestions);

    // Apply no-repeat logic: prefer tiles not yet completed
    const uncompletedTiles = availableQuestions.filter(q => !gameState.completedTiles.includes(q.id));

    // If we have uncompleted tiles, use those; otherwise use all available
    const poolForSelection = uncompletedTiles.length > 0 ? uncompletedTiles : availableQuestions;

    // Randomly select 3 tiles (or fewer if not enough available)
    const selectedTiles = [];
    const tilesToSelect = Math.min(3, poolForSelection.length);
    const shuffled = [...poolForSelection].sort(() => Math.random() - 0.5);

    for (let i = 0; i < tilesToSelect; i++) {
        selectedTiles.push(shuffled[i].id);
    }

    dailyQuest.tiles = selectedTiles;

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.dailyQuestDate, dailyQuest.date);
    localStorage.setItem(STORAGE_KEYS.dailyQuestTiles, JSON.stringify(dailyQuest.tiles));

    console.log('Generated new daily quest:', dailyQuest);
}

function getCurrentNode() {
    const nodeIndex = gameState.currentNodeIndex;
    const journeyNodes = [
        { zone: 'sleep', label: 'Sleep Camp' },
        { zone: 'stress', label: 'Stress Peak' },
        { zone: 'nutrition', label: 'Nutrition Forest' },
        { zone: 'movement', label: 'Movement Trail' },
        { zone: 'hydration', label: 'Hydration Spring' },
        { zone: 'mindset', label: 'Mindset Summit' },
        { zone: 'mixed', label: 'Mixed 1' },
        { zone: 'mixed', label: 'Mixed 2' },
        { zone: 'mixed', label: 'Mixed 3' },
        { zone: 'mixed', label: 'Mixed 4' }
    ];

    return journeyNodes[Math.min(nodeIndex, journeyNodes.length - 1)];
}

function filterQuestionsByLevel(questions) {
    const level = gameState.currentLevel;

    if (level <= 2) {
        // Level 1-2: mostly basic tiles (but include all if not enough basic)
        const basic = questions.filter(q => q.difficulty === 'basic');
        return basic.length >= 3 ? basic : questions;
    } else if (level <= 4) {
        // Level 3-4: mix of basic and core
        return questions.filter(q => q.difficulty === 'basic' || q.difficulty === 'core');
    } else {
        // Level 5+: include all difficulty tiers
        return questions;
    }
}

function checkNodeCompletion() {
    const currentNode = getCurrentNode();

    if (currentNode.zone === 'mixed') {
        // For mixed nodes, check if all 3 daily tiles are completed
        const allDailyTilesCompleted = dailyQuest.tiles.every(tileId =>
            gameState.completedTiles.includes(tileId)
        );

        if (allDailyTilesCompleted && dailyQuest.tiles.length > 0) {
            markNodeAsCompleted();
        }
    } else {
        // For regular nodes, check if all tiles in that zone are completed
        const zoneQuestions = QUESTIONS[currentNode.zone] || [];
        const allZoneTilesCompleted = zoneQuestions.every(q =>
            gameState.completedTiles.includes(q.id)
        );

        if (allZoneTilesCompleted && zoneQuestions.length > 0) {
            markNodeAsCompleted();
        }
    }
}

function markNodeAsCompleted() {
    const nodeIndex = gameState.currentNodeIndex;

    if (!gameState.completedNodes.includes(nodeIndex)) {
        gameState.completedNodes.push(nodeIndex);

        // Show node cleared toast
        showNodeClearedToast();

        // Advance to next node if available
        if (nodeIndex < 9) {
            gameState.currentNodeIndex = nodeIndex + 1;
            // Generate new daily quest for the new node
            generateDailyQuest();
        }

        saveGameState();
        updateJourneyMap();

        console.log(`Node ${nodeIndex} completed! Advanced to node ${gameState.currentNodeIndex}`);
    }
}

function showNodeClearedToast() {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <div class="achievement-toast-icon">✅</div>
        <div class="achievement-toast-content">
            <div class="achievement-toast-title">Progress</div>
            <div class="achievement-toast-name">You cleared this stop on the map. The next area just opened.</div>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// ============================================================
// STREAK LOGIC
// ============================================================
function updateStreak() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    let streakChanged = false;

    if (!gameState.lastPlayDate) {
        // First time playing
        gameState.streak = 1;
        gameState.lastPlayDate = today;
        streakChanged = true;
    } else if (gameState.lastPlayDate === today) {
        // Already played today, streak stays the same
        return;
    } else {
        // Calculate days difference
        const lastDate = new Date(gameState.lastPlayDate);
        const currentDate = new Date(today);
        const daysDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
            // Exactly one day after, increase streak
            gameState.streak += 1;
            streakChanged = true;
        } else {
            // More than one day, reset streak
            gameState.streak = 1;
            streakChanged = true;
        }
        gameState.lastPlayDate = today;
    }

    // Show streak toast only if it's a continuing streak (not reset to 1)
    if (streakChanged && gameState.streak > 1) {
        showStreakToast();
    }
}

function showStreakToast() {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <div class="achievement-toast-icon">🔥</div>
        <div class="achievement-toast-content">
            <div class="achievement-toast-title">Daily Streak</div>
            <div class="achievement-toast-name">Streak updated: ${gameState.streak} days in a row.</div>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// ============================================================
// XP & PROGRESS MANAGEMENT
// ============================================================
function awardXP(question) {
    // Check if this question was already completed
    if (gameState.completedQuestions.includes(question.id)) {
        // Already completed - don't award XP again
        return false;
    }

    // Store previous level to detect level-up
    const previousLevel = gameState.currentLevel;

    // First time completing - award XP
    gameState.completedQuestions.push(question.id);

    // Track this tile as completed (for no-repeat logic)
    if (!gameState.completedTiles.includes(question.id)) {
        gameState.completedTiles.push(question.id);
    }

    gameState.totalXP += question.xpValue;

    // Update current level
    gameState.currentLevel = Math.floor(gameState.totalXP / 100) + 1;

    // Update today's progress
    todayProgress.tilesCompleted += 1;
    todayProgress.xpEarned += question.xpValue;

    // Update streak
    updateStreak();

    // Save state
    saveGameState();

    // Check if node should be completed
    checkNodeCompletion();

    // Check for achievements
    checkAchievements();

    // Update UI
    updateProgressDisplay();
    animateXPIncrease();

    // Check for level-up
    if (gameState.currentLevel > previousLevel) {
        triggerLevelUp();
    }

    return true;
}

function triggerLevelUp() {
    console.log('Level up!', gameState.currentLevel);
    triggerConfetti();

    // Show level-up toast
    showLevelUpToast();

    // Add a visual notification
    const levelLabel = document.getElementById('level-label');
    if (levelLabel) {
        levelLabel.classList.add('level-up-animate');
        setTimeout(() => {
            levelLabel.classList.remove('level-up-animate');
        }, 1000);
    }
}

function showLevelUpToast() {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <div class="achievement-toast-icon">⬆️</div>
        <div class="achievement-toast-content">
            <div class="achievement-toast-title">Level Up</div>
            <div class="achievement-toast-name">You just unlocked a higher challenge tier.</div>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// ============================================================
// UI UPDATE FUNCTIONS
// ============================================================
function updateProgressDisplay() {
    // Update total XP display
    const xpElement = document.getElementById('total-xp');
    if (xpElement) {
        xpElement.textContent = gameState.totalXP;
    }

    // Update level display
    updateLevelDisplay();

    // Update daily streak display
    const streakElement = document.getElementById('daily-streak');
    if (streakElement) {
        streakElement.textContent = gameState.streak || 0;
    }

    // Update today's summary
    updateTodaySummary();

    // Update world strip
    updateWorldStrip();

    // Update journey map
    updateJourneyMap();

    // Update each zone card with completion count
    const zoneCards = document.querySelectorAll('.zone-card');
    zoneCards.forEach(card => {
        const zoneName = card.dataset.zone;

        // Get questions for this zone
        const zoneQuestions = QUESTIONS[zoneName] || [];
        const completedCount = zoneQuestions.filter(q => gameState.completedTiles.includes(q.id)).length;
        const totalCount = zoneQuestions.length;

        // Update progress text
        const progressElement = card.querySelector('.zone-progress');
        if (progressElement) {
            progressElement.textContent = `${completedCount} / ${totalCount} tiles completed`;
        }

        // Update completion badge
        const badge = card.querySelector('.zone-badge');
        if (badge) {
            if (completedCount === totalCount && totalCount > 0) {
                badge.textContent = '⭐';
                badge.classList.add('visible');
            } else {
                badge.textContent = '';
                badge.classList.remove('visible');
            }
        }
    });
}

function updateLevelDisplay() {
    const level = gameState.currentLevel;
    const progressInLevel = gameState.totalXP % 100;

    // Update level label
    const levelLabel = document.getElementById('level-label');
    if (levelLabel) {
        levelLabel.textContent = `Level ${level}`;
    }

    // Update progress bar
    const progressFill = document.getElementById('level-progress-fill');
    if (progressFill) {
        progressFill.style.width = `${progressInLevel}%`;
    }

    // Update progress text
    const progressText = document.getElementById('level-progress-text');
    if (progressText) {
        progressText.textContent = `(${progressInLevel}/100 XP)`;
    }
}

function updateTodaySummary() {
    const summaryText = document.getElementById('today-summary-text');
    if (summaryText) {
        summaryText.textContent = `Today: ${todayProgress.tilesCompleted} tiles completed · +${todayProgress.xpEarned} XP`;
    }
}

function updateWorldStrip() {
    const zones = ['sleep', 'stress', 'nutrition', 'movement', 'hydration', 'mindset'];

    zones.forEach(zoneName => {
        const zoneQuestions = QUESTIONS[zoneName] || [];
        const completedCount = zoneQuestions.filter(q => gameState.completedTiles.includes(q.id)).length;
        const totalCount = zoneQuestions.length;

        const worldIcon = document.querySelector(`.world-strip-icon[data-zone="${zoneName}"]`);
        if (worldIcon) {
            if (completedCount === totalCount && totalCount > 0) {
                worldIcon.classList.add('completed');
            } else {
                worldIcon.classList.remove('completed');
            }
        }
    });
}

// ============================================================
// JOURNEY MAP MANAGEMENT
// ============================================================
function updateJourneyMap() {
    console.log('Updating journey map, current node index:', gameState.currentNodeIndex);
    const journeyNodes = document.querySelectorAll('.journey-node');
    const zones = ['sleep', 'stress', 'nutrition', 'movement', 'hydration', 'mindset'];

    journeyNodes.forEach((node, index) => {
        const nodeIndex = parseInt(node.dataset.nodeIndex);
        const zoneName = node.dataset.zone;

        // Remove all state classes
        node.classList.remove('current', 'completed', 'locked');

        // Determine node state
        if (gameState.completedNodes.includes(nodeIndex)) {
            node.classList.add('completed');
            console.log(`  Node ${nodeIndex} marked as completed`);
        } else if (nodeIndex === gameState.currentNodeIndex) {
            node.classList.add('current');
            console.log(`  Node ${nodeIndex} marked as current`);
        } else if (nodeIndex > gameState.currentNodeIndex) {
            node.classList.add('locked');
            console.log(`  Node ${nodeIndex} marked as locked`);
        } else {
            console.log(`  Node ${nodeIndex} is available (past node)`);
        }

        // For regular zones, check if zone is completed to mark node as completed
        if (nodeIndex < 6 && zoneName !== 'mixed') {
            const zoneQuestions = QUESTIONS[zoneName] || [];
            const completedCount = zoneQuestions.filter(q => gameState.completedTiles.includes(q.id)).length;
            const totalCount = zoneQuestions.length;

            if (completedCount === totalCount && totalCount > 0 && !gameState.completedNodes.includes(nodeIndex)) {
                // Auto-complete this node and advance to next
                gameState.completedNodes.push(nodeIndex);
                if (gameState.currentNodeIndex === nodeIndex) {
                    gameState.currentNodeIndex = Math.min(nodeIndex + 1, 9);
                }
                saveGameState();
            }
        }
    });

    console.log('Journey map update complete');
}

function advanceJourneyNode() {
    // Called when a zone is completed - advance to the next node
    if (gameState.currentNodeIndex < 9) {
        if (!gameState.completedNodes.includes(gameState.currentNodeIndex)) {
            gameState.completedNodes.push(gameState.currentNodeIndex);
        }
        gameState.currentNodeIndex++;
        saveGameState();
        updateJourneyMap();
    }
}

function animateXPIncrease() {
    const xpElement = document.getElementById('total-xp');
    if (xpElement) {
        xpElement.classList.add('xp-animate');
        setTimeout(() => {
            xpElement.classList.remove('xp-animate');
        }, 600);
    }
}

// ============================================================
// QUESTION TILE RENDERING
// ============================================================
function renderQuestionTiles() {
    console.log('Rendering question tiles for current node...');
    const currentNode = getCurrentNode();
    console.log('Current node:', currentNode);

    // For each zone, render its daily quest tiles (if applicable)
    Object.keys(QUESTIONS).forEach(zoneName => {
        const container = document.querySelector(`.zone-question-list[data-zone="${zoneName}"]`);
        if (!container) {
            console.warn(`Container not found for zone: ${zoneName}`);
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        // Get questions for this zone
        const allZoneQuestions = QUESTIONS[zoneName];

        // Filter to only show daily quest tiles for the current node
        let questionsToShow = [];

        if (currentNode.zone === zoneName) {
            // Show daily quest tiles for current node's zone
            questionsToShow = allZoneQuestions.filter(q => dailyQuest.tiles.includes(q.id));
            console.log(`Zone ${zoneName} is current node - showing ${questionsToShow.length} daily quest tiles`);
        } else if (currentNode.zone === 'mixed') {
            // For mixed nodes, show daily quest tiles from any zone
            questionsToShow = allZoneQuestions.filter(q => dailyQuest.tiles.includes(q.id));
            if (questionsToShow.length > 0) {
                console.log(`Mixed node - showing ${questionsToShow.length} tiles from ${zoneName}`);
            }
        } else {
            // Not the current zone, show nothing
            questionsToShow = [];
        }

        // Render each question as a tile
        questionsToShow.forEach((question, index) => {
            const tile = document.createElement('div');
            tile.className = 'question-tile';
            tile.dataset.questionId = question.id;

            // Check if completed
            const isCompleted = gameState.completedTiles.includes(question.id);
            if (isCompleted) {
                tile.classList.add('completed');
            }

            // Add difficulty indicator
            const difficultyEmoji = {
                'basic': '⭐',
                'core': '⭐⭐',
                'challenge': '⭐⭐⭐'
            };

            // Build tile HTML
            tile.innerHTML = `
                <div class="question-tile-header">
                    <span class="question-number">${difficultyEmoji[question.difficulty] || ''} Question ${dailyQuest.tiles.indexOf(question.id) + 1}</span>
                    <span class="question-xp">${isCompleted ? 'Completed' : `XP +${question.xpValue}`}</span>
                </div>
                <div class="question-preview">${question.text}</div>
            `;

            // Add click handler
            tile.addEventListener('click', () => {
                console.log(`Question tile clicked: ${question.id}`);
                openQuestionModal(question);
            });

            container.appendChild(tile);
        });

        // If no questions to show, add a message
        if (questionsToShow.length === 0) {
            const message = document.createElement('div');
            message.className = 'no-questions-message';
            message.textContent = currentNode.zone === zoneName
                ? 'Complete today\'s daily quest tiles to progress!'
                : 'Visit the current node to see today\'s quest tiles.';
            container.appendChild(message);
        }
    });

    console.log('Question tiles rendering complete');
}

// ============================================================
// MODAL LOGIC
// ============================================================
let currentQuestion = null;

function openQuestionModal(question) {
    currentQuestion = question;

    const modal = document.getElementById('question-modal');
    const questionText = document.getElementById('modal-question-text');
    const optionsContainer = document.getElementById('modal-options');
    const feedbackElement = document.getElementById('modal-feedback');

    // Set question text
    questionText.textContent = question.text;

    // Clear previous options and feedback
    optionsContainer.innerHTML = '';
    feedbackElement.textContent = '';
    feedbackElement.className = 'modal-feedback';

    // Render options
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'modal-option-btn';
        btn.textContent = option;
        btn.dataset.optionIndex = index;

        btn.addEventListener('click', () => {
            handleAnswerSelection(index);
        });

        optionsContainer.appendChild(btn);
    });

    // Show modal
    modal.classList.remove('hidden');
}

function closeQuestionModal() {
    const modal = document.getElementById('question-modal');
    modal.classList.add('hidden');
    currentQuestion = null;

    // Re-render tiles to reflect any changes
    renderQuestionTiles();
}

function handleAnswerSelection(selectedIndex) {
    if (!currentQuestion) return;

    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    const feedbackElement = document.getElementById('modal-feedback');
    const optionButtons = document.querySelectorAll('.modal-option-btn');

    // Disable all buttons after selection
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });

    // Highlight selected answer
    optionButtons[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
        // Show correct feedback
        const wasNewCompletion = awardXP(currentQuestion);

        if (wasNewCompletion) {
            feedbackElement.textContent = `Correct. +${currentQuestion.xpValue} XP.\n\n${currentQuestion.explanation}`;
            feedbackElement.className = 'modal-feedback correct';
        } else {
            feedbackElement.textContent = `Correct. (Already completed)\n\n${currentQuestion.explanation}`;
            feedbackElement.className = 'modal-feedback correct';
        }
    } else {
        // Show incorrect feedback
        const correctAnswer = currentQuestion.options[currentQuestion.correctIndex];
        feedbackElement.textContent = `Not quite. Check the explanation and try again.\n\n${currentQuestion.explanation}`;
        feedbackElement.className = 'modal-feedback incorrect';

        // Also highlight the correct answer
        optionButtons[currentQuestion.correctIndex].classList.add('correct');
    }
}

// ============================================================
// ONBOARDING MODAL
// ============================================================
function checkOnboarding() {
    const hasSeenOnboarding = localStorage.getItem(STORAGE_KEYS.hasSeenOnboarding);

    if (!hasSeenOnboarding) {
        const modal = document.getElementById('onboarding-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
}

function initializeOnboarding() {
    const startButton = document.getElementById('start-button');
    const modal = document.getElementById('onboarding-modal');

    if (startButton && modal) {
        startButton.addEventListener('click', () => {
            modal.style.display = 'none';
            localStorage.setItem(STORAGE_KEYS.hasSeenOnboarding, 'true');
            console.log('Onboarding completed');
        });
    }
}

// ============================================================
// NAVIGATION
// ============================================================
function initializeNavigation() {
    console.log('Initializing navigation...');

    // Journey node click handlers
    const journeyNodes = document.querySelectorAll('.journey-node');
    console.log(`Found ${journeyNodes.length} journey nodes`);
    journeyNodes.forEach((node, index) => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Journey node ${index} clicked`);
            handleJourneyNodeClick(node);
        });

        // Add hover handlers for tooltips
        node.addEventListener('mouseenter', (e) => {
            showNodeTooltip(node);
        });

        node.addEventListener('mouseleave', (e) => {
            hideAllTooltips();
        });
    });

    // Zone cards - scroll to questions
    const zoneCards = document.querySelectorAll('.zone-card');
    console.log(`Found ${zoneCards.length} zone cards`);
    zoneCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const zoneName = card.dataset.zone;
            console.log(`Zone card ${index} (${zoneName}) clicked`);
            scrollToZone(zoneName);
        });
    });

    // World strip icons - scroll to zone (if they exist)
    const worldStripIcons = document.querySelectorAll('.world-strip-icon');
    if (worldStripIcons.length > 0) {
        console.log(`Found ${worldStripIcons.length} world strip icons`);
        worldStripIcons.forEach((icon, index) => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                const zoneName = icon.dataset.zone;
                console.log(`World strip icon ${index} (${zoneName}) clicked`);
                scrollToZone(zoneName);
            });
        });
    }

    // Back to home buttons
    const backButtons = document.querySelectorAll('.back-to-home-button');
    console.log(`Found ${backButtons.length} back buttons`);
    backButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Back button ${index} clicked`);
            const homeView = document.querySelector('.home-view');
            if (homeView) {
                homeView.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Modal close button
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            console.log('Modal close button clicked');
            closeQuestionModal();
        });
        console.log('Modal close button handler attached');
    } else {
        console.warn('Modal close button not found');
    }

    // Modal backdrop (click to close)
    const modalBackdrop = document.querySelector('#question-modal .modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => {
            console.log('Modal backdrop clicked');
            closeQuestionModal();
        });
        console.log('Modal backdrop handler attached');
    } else {
        console.warn('Modal backdrop not found');
    }

    console.log('Navigation initialization complete');
}

function handleJourneyNodeClick(node) {
    const nodeIndex = parseInt(node.dataset.nodeIndex);
    const zoneName = node.dataset.zone;
    const tooltip = document.getElementById('locked-tooltip');

    // Check if node is locked (future node)
    if (nodeIndex > gameState.currentNodeIndex && !gameState.completedNodes.includes(nodeIndex)) {
        // Show tooltip
        if (tooltip) {
            const rect = node.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.bottom + 10}px`;
            tooltip.classList.remove('hidden');

            // Hide tooltip after 2 seconds
            setTimeout(() => {
                tooltip.classList.add('hidden');
            }, 2000);
        }
        return;
    }

    // If it's current or past node, scroll to the zone
    if (zoneName && zoneName !== 'mixed') {
        scrollToZone(zoneName);
    } else if (zoneName === 'mixed') {
        // For mixed nodes, scroll to a random zone or show mixed questions
        // For now, just show a message or scroll to home
        const homeView = document.querySelector('.home-view');
        if (homeView) {
            homeView.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

function showNodeTooltip(node) {
    const nodeIndex = parseInt(node.dataset.nodeIndex);
    const lockedTooltip = document.getElementById('locked-tooltip');
    const currentTooltip = document.getElementById('current-tooltip');

    // Hide all tooltips first
    hideAllTooltips();

    // Check if node is locked (future node)
    if (nodeIndex > gameState.currentNodeIndex && !gameState.completedNodes.includes(nodeIndex)) {
        if (lockedTooltip) {
            const rect = node.getBoundingClientRect();
            lockedTooltip.style.left = `${rect.left + rect.width / 2}px`;
            lockedTooltip.style.top = `${rect.bottom + 10}px`;
            lockedTooltip.classList.remove('hidden');
        }
    } else if (nodeIndex === gameState.currentNodeIndex) {
        // Current node
        if (currentTooltip) {
            const rect = node.getBoundingClientRect();
            currentTooltip.style.left = `${rect.left + rect.width / 2}px`;
            currentTooltip.style.top = `${rect.bottom + 10}px`;
            currentTooltip.classList.remove('hidden');
        }
    }
}

function hideAllTooltips() {
    const lockedTooltip = document.getElementById('locked-tooltip');
    const currentTooltip = document.getElementById('current-tooltip');

    if (lockedTooltip) {
        lockedTooltip.classList.add('hidden');
    }
    if (currentTooltip) {
        currentTooltip.classList.add('hidden');
    }
}

function scrollToZone(zoneName) {
    console.log(`Scrolling to zone: ${zoneName}`);

    const questionSection = document.getElementById(`${zoneName}-questions`);
    if (questionSection) {
        questionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Add highlight animation
        const heading = questionSection.querySelector('.zone-questions-title');
        if (heading) {
            heading.classList.add('highlight-flash');
            setTimeout(() => {
                heading.classList.remove('highlight-flash');
            }, 800);
        }
    }
}

// ============================================================
// APP INITIALIZATION
// ============================================================
function initializeApp() {
    try {
        console.log('Starting app initialization...');
        console.log('Current URL:', window.location.href);
        console.log('Document ready state:', document.readyState);

        // Load saved state
        loadGameState();
        console.log('Game state loaded:', {
            totalXP: gameState.totalXP,
            currentLevel: gameState.currentLevel,
            currentNodeIndex: gameState.currentNodeIndex,
            completedNodes: gameState.completedNodes,
            completedTiles: gameState.completedTiles.length
        });

        // Initialize onboarding
        initializeOnboarding();
        checkOnboarding();
        console.log('Onboarding initialized');

        // Render question tiles
        renderQuestionTiles();
        console.log('Question tiles rendered');

        // Update all UI elements
        updateProgressDisplay();
        console.log('Progress display updated');

        // Update achievements display
        updateAchievementsDisplay();
        console.log('Achievements display updated');

        // Update weekly boss button visibility
        updateWeeklyBossButton();
        console.log('Weekly boss button updated');

        // Set up navigation
        initializeNavigation();
        console.log('Navigation initialized');

        // Set up weekly boss button click handler
        const weeklyBossBtn = document.getElementById('weekly-boss-button');
        if (weeklyBossBtn) {
            weeklyBossBtn.addEventListener('click', () => {
                console.log('Weekly boss button clicked');
                startWeeklyBoss();
            });
            console.log('Weekly boss button handler attached');
        }

        // Set up achievements toggle
        const achievementsToggle = document.getElementById('achievements-toggle');
        const achievementsContent = document.getElementById('achievements-content');
        if (achievementsToggle && achievementsContent) {
            achievementsToggle.addEventListener('click', () => {
                console.log('Achievements toggle clicked');
                achievementsContent.classList.toggle('collapsed');
                const icon = achievementsToggle.querySelector('.toggle-icon');
                if (icon) {
                    icon.textContent = achievementsContent.classList.contains('collapsed') ? '▼' : '▲';
                }
            });
            console.log('Achievements toggle handler attached');
        } else {
            console.warn('Achievements toggle or content element not found');
        }

        // Set up help button
        const helpButton = document.getElementById('help-button');
        const helpModal = document.getElementById('help-modal');
        const helpCloseBtn = document.getElementById('help-close-btn');

        if (helpButton && helpModal) {
            helpButton.addEventListener('click', () => {
                console.log('Help button clicked');
                helpModal.classList.remove('hidden');
            });
            console.log('Help button handler attached');
        } else {
            console.warn('Help button or modal not found');
        }

        if (helpCloseBtn && helpModal) {
            helpCloseBtn.addEventListener('click', () => {
                console.log('Help modal closed');
                helpModal.classList.add('hidden');
            });

            // Also close on backdrop click
            const helpBackdrop = helpModal.querySelector('.modal-backdrop');
            if (helpBackdrop) {
                helpBackdrop.addEventListener('click', () => {
                    console.log('Help modal backdrop clicked');
                    helpModal.classList.add('hidden');
                });
            }
            console.log('Help close handler attached');
        }

        // Verify all modals are properly hidden
        const questionModal = document.getElementById('question-modal');
        const weeklyBossModal = document.getElementById('weekly-boss-modal');
        const onboardingModal = document.getElementById('onboarding-modal');

        console.log('Modal states:', {
            questionModal: questionModal ? questionModal.classList.contains('hidden') : 'not found',
            weeklyBossModal: weeklyBossModal ? weeklyBossModal.classList.contains('hidden') : 'not found',
            onboardingModal: onboardingModal ? onboardingModal.style.display : 'not found'
        });

        // Add global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error caught:', event.error);
        });

        // Add unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
        });

        console.log('App initialization complete - all event listeners attached');
        console.log('You should now be able to click on elements. Check console for click events.');
    } catch (error) {
        console.error('Error during app initialization:', error);
        console.error('Stack trace:', error.stack);
        alert('There was an error initializing the app. Please refresh the page. Error: ' + error.message);
    }
}

// ============================================================
// DEBUGGING AND DIAGNOSTIC TOOLS
// ============================================================
// Add click detection for debugging
document.addEventListener('click', (e) => {
    console.log('Click detected on:', e.target);
    console.log('  - Tag:', e.target.tagName);
    console.log('  - Classes:', e.target.className);
    console.log('  - ID:', e.target.id);
    console.log('  - Data attributes:', Object.keys(e.target.dataset).length > 0 ? e.target.dataset : 'none');

    // Check if click is being blocked by z-index issues
    const rect = e.target.getBoundingClientRect();
    const elementAtPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    if (elementAtPoint !== e.target) {
        console.warn('  ⚠️ Click may be blocked! Element at point:', elementAtPoint);
    }
}, true); // Use capture phase to catch all clicks

// Diagnostic function to check element clickability
window.debugClickability = () => {
    console.log('=== CLICKABILITY DIAGNOSTIC ===');

    const elements = {
        'Journey Nodes': document.querySelectorAll('.journey-node'),
        'Zone Cards': document.querySelectorAll('.zone-card'),
        'Question Tiles': document.querySelectorAll('.question-tile'),
        'Back Buttons': document.querySelectorAll('.back-to-home-button'),
        'Achievements Toggle': document.querySelectorAll('#achievements-toggle'),
        'Modal Close Button': document.querySelectorAll('#modal-close-btn')
    };

    Object.entries(elements).forEach(([name, nodeList]) => {
        console.log(`\n${name}: ${nodeList.length} found`);
        nodeList.forEach((el, i) => {
            const styles = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            const topElement = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);

            console.log(`  [${i}]:`, {
                visible: styles.display !== 'none' && styles.visibility !== 'hidden',
                pointerEvents: styles.pointerEvents,
                zIndex: styles.zIndex,
                cursor: styles.cursor,
                topElementSame: topElement === el,
                topElement: topElement ? `${topElement.tagName}.${topElement.className}` : 'none'
            });
        });
    });

    console.log('\n=== MODAL STATES ===');
    ['question-modal', 'weekly-boss-modal', 'onboarding-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            const styles = window.getComputedStyle(modal);
            console.log(`${id}:`, {
                display: styles.display,
                classList: Array.from(modal.classList),
                zIndex: styles.zIndex
            });
        }
    });

    console.log('\n=== END DIAGNOSTIC ===');
};

console.log('Diagnostic tools loaded. Run window.debugClickability() to check element states.');

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
