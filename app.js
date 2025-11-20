// Health Quest - Main Application Logic
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
    completedTiles: 'hq_completedTiles'
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

    // Calculate current level
    gameState.currentLevel = Math.floor(gameState.totalXP / 100) + 1;

    // Load today's progress
    loadTodayProgress();

    // Load or initialize daily quest
    loadDailyQuest();

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

// ============================================================
// STREAK LOGIC
// ============================================================
function updateStreak() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    if (!gameState.lastPlayDate) {
        // First time playing
        gameState.streak = 1;
        gameState.lastPlayDate = today;
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
        } else {
            // More than one day, reset streak
            gameState.streak = 1;
        }
        gameState.lastPlayDate = today;
    }
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

    // Optional: Add a visual notification
    const levelLabel = document.getElementById('level-label');
    if (levelLabel) {
        levelLabel.classList.add('level-up-animate');
        setTimeout(() => {
            levelLabel.classList.remove('level-up-animate');
        }, 1000);
    }
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
        } else if (nodeIndex === gameState.currentNodeIndex) {
            node.classList.add('current');
        } else if (nodeIndex > gameState.currentNodeIndex) {
            node.classList.add('locked');
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
    // For each zone, render its daily quest tiles (if applicable)
    Object.keys(QUESTIONS).forEach(zoneName => {
        const container = document.querySelector(`.zone-question-list[data-zone="${zoneName}"]`);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Get questions for this zone
        const allZoneQuestions = QUESTIONS[zoneName];

        // Filter to only show daily quest tiles for the current node
        const currentNode = getCurrentNode();
        let questionsToShow = [];

        if (currentNode.zone === zoneName) {
            // Show daily quest tiles for current node's zone
            questionsToShow = allZoneQuestions.filter(q => dailyQuest.tiles.includes(q.id));
        } else if (currentNode.zone === 'mixed') {
            // For mixed nodes, show daily quest tiles from any zone
            questionsToShow = allZoneQuestions.filter(q => dailyQuest.tiles.includes(q.id));
        } else {
            // Not the current zone, show all zone questions but indicate they're locked
            // or show nothing - for now we'll show nothing
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
            feedbackElement.textContent = `Correct! +${currentQuestion.xpValue} XP\n\n${currentQuestion.explanation}`;
            feedbackElement.className = 'modal-feedback correct';
        } else {
            feedbackElement.textContent = `Correct! (Already completed)\n\n${currentQuestion.explanation}`;
            feedbackElement.className = 'modal-feedback correct';
        }
    } else {
        // Show incorrect feedback
        const correctAnswer = currentQuestion.options[currentQuestion.correctIndex];
        feedbackElement.textContent = `Not quite. The right answer is: "${correctAnswer}"\n\n${currentQuestion.explanation}`;
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
    // Journey node click handlers
    const journeyNodes = document.querySelectorAll('.journey-node');
    journeyNodes.forEach(node => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            handleJourneyNodeClick(node);
        });
    });

    // Zone cards - scroll to questions
    const zoneCards = document.querySelectorAll('.zone-card');
    zoneCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const zoneName = card.dataset.zone;
            scrollToZone(zoneName);
        });
    });

    // World strip icons - scroll to zone
    const worldStripIcons = document.querySelectorAll('.world-strip-icon');
    worldStripIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const zoneName = icon.dataset.zone;
            scrollToZone(zoneName);
        });
    });

    // Back to home buttons
    const backButtons = document.querySelectorAll('.back-to-home-button');
    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const homeView = document.querySelector('.home-view');
            if (homeView) {
                homeView.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Modal close button
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeQuestionModal);
    }

    // Modal backdrop (click to close)
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeQuestionModal);
    }
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
    // Load saved state
    loadGameState();

    // Initialize onboarding
    initializeOnboarding();
    checkOnboarding();

    // Render question tiles
    renderQuestionTiles();

    // Update all UI elements
    updateProgressDisplay();

    // Set up navigation
    initializeNavigation();

    console.log('App initialization complete');
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
