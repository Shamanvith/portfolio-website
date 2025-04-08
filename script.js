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
            ease: 'power2.inOut',
            onComplete: () => {
                // --- SECTION APPEARANCE ANIMATION ---
                gsap.fromTo(targetSection, {
                        opacity: 0,
                        y: 50
                    }, // From
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power2.out',
                        onComplete: () => {
                            isAnimating = false;
                        } // Reset flag when done
                    }
                );

                // --- FADE OUT OTHER SECTIONS ---
                sections.forEach(section => {
                    if (section !== targetSection && gsap.getProperty(section, "opacity") === 1) {
                        gsap.to(section, {
                            opacity: 0,
                            y: 50,
                            duration: 0.5,
                            ease: 'power1.in'
                        });
                    }
                });
            }
        });
    }

    // --- EVENT LISTENERS ---
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // --- MOBILE HEADER MINIMIZATION ---
    if (window.innerWidth <= 768) { // Check if it's a mobile device
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let header = document.querySelector('.site-header');

            console.log('ScrollTop:', scrollTop, 'LastScrollTop:', lastScrollTop); // Debugging

            if (scrollTop > lastScrollTop && scrollTop > 50) { // Scrolling down (and past 50px)
                header.classList.add('minimized');
                console.log('Header minimized'); // Debugging
            } else { // Scrolling up (or at the top)
                header.classList.remove('minimized');
                console.log('Header restored'); // Debugging
            }
            lastScrollTop = scrollTop;
        });
    }
});
