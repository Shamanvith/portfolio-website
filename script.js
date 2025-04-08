document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.site-nav a');
    const sections = document.querySelectorAll('section');

    // --- INITIAL SETUP ---
    // Hide sections initially
    gsap.set(sections, {
        opacity: 0,
        y: 50
    });

    // Show the first section immediately
    gsap.to(sections[0], {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    });
    let isAnimating = false; // Flag to prevent animation conflicts

    // --- SMOOTH SCROLL FUNCTION ---
    function smoothScroll(e) {
        e.preventDefault();
        if (isAnimating) return; // If animation is in progress, exit

        isAnimating = true; // Set flag to true

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const targetPosition = targetSection.offsetTop - 50;

        // --- SCROLL ANIMATION ---
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetPosition,
                autoKill: false
            },
            ease: 'power2.in
