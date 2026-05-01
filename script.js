document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const enterBtn = document.getElementById('enter-btn');
    const introOverlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');
    const giftBtn = document.getElementById('gift-btn');
    const finalModal = document.getElementById('final-modal');
    const closeModal = document.getElementById('close-modal');

    // 2. Intro Flow
    enterBtn.addEventListener('click', () => {
        // Move overlay up
        introOverlay.style.transform = 'translateY(-100%)';
        
        // Reveal content
        setTimeout(() => {
            mainContent.classList.remove('d-none');
            introOverlay.classList.add('d-none');
            
            // Trigger Hero Animations
            gsap.from(".main-bday-text", { opacity: 0, y: 50, duration: 1.5, ease: "power4.out" });
            gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1, delay: 0.5 });
            
            startHeartsRain();
            initStoryAnimations();
        }, 800);
    });

    // 3. Story Section Animations
    const initStoryAnimations = () => {
        const sections = document.querySelectorAll('.story-section');
        
        sections.forEach((section, index) => {
            const frame = section.querySelector('.premium-frame');
            const box = section.querySelector('.glass-message-box');
            
            // Image slide in
            gsap.from(frame, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                x: index % 2 === 0 ? -150 : 150,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out"
            });

            // Message box fade in
            gsap.from(box, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                opacity: 0,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out"
            });
        });

        // Final surprise entrance
        gsap.from(".surprise-reveal-box", {
            scrollTrigger: {
                trigger: ".final-section",
                start: "top 70%",
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.7)"
        });
    };

    // 4. Final Surprise Logic
    giftBtn.addEventListener('click', () => {
        // Gift animation
        gsap.to(".gift-lid", { y: -100, rotation: -20, opacity: 0, duration: 1 });
        
        setTimeout(() => {
            finalModal.classList.remove('d-none');
            triggerGrandCelebration();
        }, 800);
    });

    closeModal.addEventListener('click', () => {
        finalModal.classList.add('d-none');
    });

    // 5. Grand Celebration
    const triggerGrandCelebration = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 4000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    // 6. Floating Hearts Rain
    const startHeartsRain = () => {
        const layer = document.getElementById('hearts-layer');
        const icons = ['❤️', '💖', '🌸', '✨', '🌹', '🎀'];
        
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 4 + 's';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            layer.appendChild(heart);
            
            setTimeout(() => heart.remove(), 7000);
        }, 300);
    };

    // 7. Initialize Tilt
    VanillaTilt.init(document.querySelectorAll(".premium-frame"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
    });
});
