// Health Quest - Main Application Logic
import { QUESTIONS } from './data.js';

// Application initialization
console.log('Health Quest app initialized');

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

// Initialize progress display on load
updateProgressDisplay();

// Add click event listeners to zone cards
zoneCards.forEach(card => {
    card.addEventListener('click', () => {
        const zoneName = card.dataset.zone;
        console.log(`Zone clicked: ${zoneName}`);

        // Capitalize zone name to match data
        selectedZone = zoneName.charAt(0).toUpperCase() + zoneName.slice(1);
        showZoneQuestions(selectedZone);
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
    heading.style.marginTop = '2rem';
    heading.style.marginBottom = '1rem';
    questionList.appendChild(heading);

    // Create list of questions
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';

    zoneQuestions.forEach((question, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${question.question}`;
        listItem.style.padding = '1rem';
        listItem.style.marginBottom = '0.5rem';
        listItem.style.backgroundColor = '#f0f0f0';
        listItem.style.borderRadius = '8px';
        listItem.style.cursor = 'pointer';
        listItem.style.transition = 'background-color 0.2s';

        listItem.addEventListener('mouseenter', () => {
            listItem.style.backgroundColor = '#e0e0e0';
        });

        listItem.addEventListener('mouseleave', () => {
            listItem.style.backgroundColor = '#f0f0f0';
        });

        listItem.addEventListener('click', () => {
            showQuestionView(question);
        });

        list.appendChild(listItem);
    });

    questionList.appendChild(list);

    // Add back button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Home';
    backButton.style.marginTop = '1rem';
    backButton.style.padding = '0.5rem 1rem';
    backButton.style.backgroundColor = '#007bff';
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.borderRadius = '4px';
    backButton.style.cursor = 'pointer';

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
    questionView.style.padding = '2rem';
    questionView.style.maxWidth = '600px';
    questionView.style.margin = '0 auto';

    // Question text
    const questionText = document.createElement('h2');
    questionText.textContent = question.question;
    questionText.style.marginBottom = '2rem';
    questionView.appendChild(questionText);

    // Answer choices
    const choicesContainer = document.createElement('div');
    choicesContainer.className = 'choices-container';
    choicesContainer.style.display = 'flex';
    choicesContainer.style.flexDirection = 'column';
    choicesContainer.style.gap = '1rem';

    question.choices.forEach((choice, index) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.style.padding = '1rem';
        choiceButton.style.fontSize = '1rem';
        choiceButton.style.backgroundColor = '#f8f9fa';
        choiceButton.style.border = '2px solid #dee2e6';
        choiceButton.style.borderRadius = '8px';
        choiceButton.style.cursor = 'pointer';
        choiceButton.style.textAlign = 'left';
        choiceButton.style.transition = 'all 0.2s';

        choiceButton.addEventListener('mouseenter', () => {
            choiceButton.style.backgroundColor = '#e9ecef';
            choiceButton.style.borderColor = '#adb5bd';
        });

        choiceButton.addEventListener('mouseleave', () => {
            choiceButton.style.backgroundColor = '#f8f9fa';
            choiceButton.style.borderColor = '#dee2e6';
        });

        choiceButton.addEventListener('click', () => {
            handleAnswerSelection(index);
        });

        choicesContainer.appendChild(choiceButton);
    });

    questionView.appendChild(choicesContainer);

    // Back button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Questions';
    backButton.style.marginTop = '2rem';
    backButton.style.padding = '0.5rem 1rem';
    backButton.style.backgroundColor = '#6c757d';
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.borderRadius = '4px';
    backButton.style.cursor = 'pointer';

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

            alert(`Correct! +${currentQuestion.xpReward} XP\n\n${currentQuestion.explanation}\n\nTotal XP: ${gameState.totalXP}`);

            // Update UI to reflect new progress
            updateProgressDisplay();
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
