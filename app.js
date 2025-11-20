// Health Quest - Main Application Logic
import { QUESTIONS } from './data.js';

// Application initialization
console.log('Health Quest app initialized');

// Check and show onboarding modal on first visit
function checkOnboarding() {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');

    if (!hasSeenOnboarding) {
        // Show the onboarding modal
        const modal = document.getElementById('onboarding-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }
}

// Handle onboarding modal "Let's start" button
function initializeOnboarding() {
    const startButton = document.getElementById('start-button');
    const modal = document.getElementById('onboarding-modal');

    if (startButton && modal) {
        startButton.addEventListener('click', () => {
            // Hide the modal
            modal.style.display = 'none';

            // Save the flag in localStorage
            localStorage.setItem('hasSeenOnboarding', 'true');
            console.log('Onboarding completed and saved');
        });
    }
}

// State management
let currentView = 'home';
let selectedZone = null;
let currentQuestion = null;

// Game progress state with localStorage
let gameState = {
    totalXP: 0,
    answeredQuestions: [], // Array of question ids
    streak: 0, // Daily streak counter
    lastDate: null // Last date user answered a question (YYYY-MM-DD format)
};

// Load game state from localStorage
function loadGameState() {
    const savedState = localStorage.getItem('healthQuestState');
    if (savedState) {
        try {
            gameState = JSON.parse(savedState);
            console.log('Game state loaded:', gameState);
        } catch (e) {
            console.error('Error loading game state:', e);
            gameState = { totalXP: 0, answeredQuestions: [], streak: 0, lastDate: null };
        }
    }
}

// Save game state to localStorage
function saveGameState() {
    try {
        localStorage.setItem('healthQuestState', JSON.stringify(gameState));
        console.log('Game state saved:', gameState);
    } catch (e) {
        console.error('Error saving game state:', e);
    }
}

// Update daily streak based on the current date
function updateStreak() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    if (!gameState.lastDate) {
        // First time answering a question
        gameState.streak = 1;
        gameState.lastDate = today;
    } else if (gameState.lastDate === today) {
        // Already answered today, streak stays the same
        return;
    } else {
        // Calculate days difference
        const lastDate = new Date(gameState.lastDate);
        const currentDate = new Date(today);
        const daysDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

        if (daysDiff === 1) {
            // Exactly one day after, increase streak
            gameState.streak += 1;
        } else {
            // More than one day, reset streak
            gameState.streak = 1;
        }
        gameState.lastDate = today;
    }
}

// Load state on app initialization
loadGameState();

// Initialize onboarding modal functionality
initializeOnboarding();

// Check and show onboarding modal if needed
checkOnboarding();

// Get all zone cards
const zoneCards = document.querySelectorAll('.zone-card');
const homeView = document.querySelector('.home-view');

// Function to update progress display on the home screen
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
    zoneCards.forEach(card => {
        const zoneName = card.dataset.zone;
        const capitalizedZoneName = zoneName.charAt(0).toUpperCase() + zoneName.slice(1);

        // Filter questions by zone
        const zoneQuestions = QUESTIONS.filter(q => q.zone === capitalizedZoneName);
        const completedCount = zoneQuestions.filter(q => gameState.answeredQuestions.includes(q.id)).length;
        const totalCount = zoneQuestions.length;

        // Update progress text
        const progressElement = card.querySelector('.zone-progress');
        if (progressElement) {
            progressElement.textContent = `${completedCount} / ${totalCount} tiles completed`;
        }
    });
}

// Function to animate XP increase
function animateXPIncrease() {
    const xpElement = document.getElementById('total-xp');
    if (xpElement) {
        // Add animation class
        xpElement.classList.add('xp-animate');

        // Remove animation class after animation completes
        setTimeout(() => {
            xpElement.classList.remove('xp-animate');
        }, 600);
    }
}

// Initialize progress display on load
updateProgressDisplay();

// Add click event listeners to zone cards for smooth scrolling to question sections
zoneCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const zoneName = card.dataset.zone;
        console.log(`Zone clicked: ${zoneName}`);

        // Scroll to the corresponding question section
        const questionSection = document.getElementById(`${zoneName}-questions`);
        if (questionSection) {
            questionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Add highlight animation to the section heading
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

// Add click handlers to "Back to Home" buttons
const backToHomeButtons = document.querySelectorAll('.back-to-home-button');
backToHomeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll back to the zone grid at the top
        const homeView = document.querySelector('.home-view');
        if (homeView) {
            homeView.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add click handlers to question items in the new sections
const questionItems = document.querySelectorAll('.zone-question-item');
questionItems.forEach(item => {
    item.addEventListener('click', () => {
        const questionId = item.dataset.questionId;
        // Find the question in the QUESTIONS array
        const question = QUESTIONS.find(q => q.id === questionId);
        if (question) {
            showQuestionView(question);
        }
    });
});

// Show questions for a specific zone
function showZoneQuestions(zone) {
    // Filter questions by zone
    const zoneQuestions = QUESTIONS.filter(q => q.zone === zone);

    // Remove existing question list if any
    const existingList = document.querySelector('.question-list');
    if (existingList) {
        existingList.remove();
    }

    // Create question list container
    const questionList = document.createElement('div');
    questionList.className = 'question-list';

    const heading = document.createElement('h2');
    heading.textContent = `${zone} Questions`;
    questionList.appendChild(heading);

    // Create list of questions
    const list = document.createElement('ul');

    zoneQuestions.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${question.question}`;
        listItem.className = `question-item zone-${zone.toLowerCase()}`;

        listItem.addEventListener('click', () => {
            showQuestionView(question);
        });

        list.appendChild(listItem);
    });

    questionList.appendChild(list);

    // Add back button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Home';
    backButton.className = 'back-button';

    backButton.addEventListener('click', () => {
        questionList.remove();
        currentView = 'home';
    });

    questionList.appendChild(backButton);

    // Append to home view
    homeView.appendChild(questionList);
    currentView = 'zone-questions';
}

// Show question detail view
function showQuestionView(question) {
    currentQuestion = question;

    // Hide home view content
    homeView.style.display = 'none';

    // Create question view
    const questionView = document.createElement('div');
    questionView.className = 'question-view';

    // Question text
    const questionText = document.createElement('h2');
    questionText.textContent = question.question;
    questionView.appendChild(questionText);

    // Answer choices
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choices-container';

    question.choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.className = 'choice-button';

        choiceButton.addEventListener('click', () => {
            handleAnswerSelection(index);
        });

        choicesContainer.appendChild(choiceButton);
    });

    questionView.appendChild(choicesContainer);

    // Back button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Questions';
    backButton.className = 'back-button';
    backButton.style.backgroundColor = '#6c757d';

    backButton.addEventListener('click', () => {
        questionView.remove();
        homeView.style.display = 'block';
        currentView = 'zone-questions';
    });

    questionView.appendChild(backButton);

    // Add to page (append to body, not to main which is hidden)
    document.body.appendChild(questionView);
    currentView = 'question';
}

// Handle answer selection
function handleAnswerSelection(selectedIndex) {
    const isCorrect = selectedIndex === currentQuestion.correctIndex;

    if (isCorrect) {
        // Update streak whenever a correct answer is given
        updateStreak();

        // Award XP only if this question hasn't been answered before
        if (!gameState.answeredQuestions.includes(currentQuestion.id)) {
            gameState.totalXP += currentQuestion.xpReward;
            gameState.answeredQuestions.push(currentQuestion.id);
            saveGameState();

            // Update UI to reflect new progress
            updateProgressDisplay();

            // Animate XP increase
            animateXPIncrease();

            alert(`Correct! +${currentQuestion.xpReward} XP\n\n${currentQuestion.explanation}\n\nTotal XP: ${gameState.totalXP}`);
        } else {
            saveGameState(); // Save streak update even if question was already answered
            alert(`Correct! (Already completed)\n\n${currentQuestion.explanation}`);
            updateProgressDisplay(); // Update to show new streak
        }
    } else {
        alert(`Incorrect. ✗\n\nThe correct answer was: "${currentQuestion.choices[currentQuestion.correctIndex]}"\n\n${currentQuestion.explanation}`);
    }
}

console.log(`Loaded ${zoneCards.length} zone cards`);
