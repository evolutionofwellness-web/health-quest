// Lightweight confetti animation for level-ups
function triggerConfetti() {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Create confetti from two positions
        createConfettiParticles(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        createConfettiParticles(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

function createConfettiParticles(options) {
    const colors = ['#FFD700', '#FFA500', '#FF6B35', '#28a745', '#3498DB', '#F39C12'];
    const particleCount = options.particleCount || 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${(options.origin.x * 100)}%;
            top: ${(options.origin.y * 100 + 100)}%;
            z-index: ${options.zIndex};
            pointer-events: none;
            border-radius: 50%;
        `;

        document.body.appendChild(particle);

        const angle = randomInRange(0, 360);
        const velocity = randomInRange(20, 40);
        const decay = randomInRange(0.9, 0.99);

        animateParticle(particle, angle, velocity, decay);
    }
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function animateParticle(particle, angle, velocity, decay) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let vx = Math.cos(angle * Math.PI / 180) * velocity;
    let vy = Math.sin(angle * Math.PI / 180) * velocity;
    let opacity = 1;

    function animate() {
        x += vx;
        y += vy;
        vy += 0.5; // gravity
        vx *= decay;
        vy *= decay;
        opacity -= 0.01;

        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.opacity = opacity;

        if (opacity > 0 && y < 150) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    requestAnimationFrame(animate);
}

export { triggerConfetti };
