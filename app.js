// Health Quest - Main Application Logic

// Application initialization
console.log('Health Quest app initialized');

// Get all zone cards
const zoneCards = document.querySelectorAll('.zone-card');

// Add click event listeners to zone cards
zoneCards.forEach(card => {
    card.addEventListener('click', () => {
        const zoneName = card.dataset.zone;
        console.log(`Zone clicked: ${zoneName}`);

        // Future: Navigate to zone detail view
    });
});

console.log(`Loaded ${zoneCards.length} zone cards`);
