// Health Quest - Main Application Logic
import { QUESTIONS } from './data.js';

// ============================================================
// LOCALSTORAGE KEYS & STATE
// ============================================================
const STORAGE_KEYS = {
    totalXP: 'hq_totalXP',
    completedQuestions: 'hq_completedQuestions',
    lastPlayDate: 'hq_lastPlayDate',
    streak: 'hq_streak',
    hasSeenOnboarding: 'hasSeenOnboarding'
};

let gameState = {
    totalXP: 0,
    completedQuestions: [],
    lastPlayDate: null,
    streak: 0
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

    console.log('Game state loaded:', gameState);
}

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem(STORAGE_KEYS.totalXP, gameState.totalXP.toString());
    localStorage.setItem(STORAGE_KEYS.completedQuestions, JSON.stringify(gameState.completedQuestions));
    localStorage.setItem(STORAGE_KEYS.lastPlayDate, gameState.lastPlayDate || '');
    localStorage.setItem(STORAGE_KEYS.streak, gameState.streak.toString());

    console.log('Game state saved:', gameState);
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

    // First time completing - award XP
    gameState.completedQuestions.push(question.id);
    gameState.totalXP += question.xpValue;

    // Update streak
    updateStreak();

    // Save state
    saveGameState();

    // Update UI
    updateProgressDisplay();
    animateXPIncrease();

    return true;
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

    // Update daily streak display
    const streakElement = document.getElementById('daily-streak');
    if (streakElement) {
        streakElement.textContent = gameState.streak || 0;
    }

    // Update each zone card with completion count
    const zoneCards = document.querySelectorAll('.zone-card');
    zoneCards.forEach(card => {
        const zoneName = card.dataset.zone;

        // Get questions for this zone
        const zoneQuestions = QUESTIONS[zoneName] || [];
        const completedCount = zoneQuestions.filter(q => gameState.completedQuestions.includes(q.id)).length;
        const totalCount = zoneQuestions.length;

        // Update progress text
        const progressElement = card.querySelector('.zone-progress');
        if (progressElement) {
            progressElement.textContent = `${completedCount} / ${totalCount} tiles completed`;
        }
    });
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
    // For each zone, render its questions
    Object.keys(QUESTIONS).forEach(zoneName => {
        const container = document.querySelector(`.zone-question-list[data-zone="${zoneName}"]`);
        if (!container) return;

        const questions = QUESTIONS[zoneName];

        // Clear existing content
        container.innerHTML = '';

        // Render each question as a tile
        questions.forEach((question, index) => {
            const tile = document.createElement('div');
            tile.className = 'question-tile';
            tile.dataset.questionId = question.id;

            // Check if completed
            const isCompleted = gameState.completedQuestions.includes(question.id);
            if (isCompleted) {
                tile.classList.add('completed');
            }

            // Build tile HTML
            tile.innerHTML = `
                <div class="question-tile-header">
                    <span class="question-number">Question ${index + 1}</span>
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
    // Zone cards - scroll to questions
    const zoneCards = document.querySelectorAll('.zone-card');
    zoneCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const zoneName = card.dataset.zone;
            console.log(`Zone clicked: ${zoneName}`);

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
