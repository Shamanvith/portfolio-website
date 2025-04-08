document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.site-nav a');
    const sections = document.querySelectorAll('section');
    const firstSection = document.getElementById('about'); // Specifically target the first section
    const otherSections = document.querySelectorAll('section:not(#about)'); // Target sections *other* than About
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.site-nav');
    const hamburger = document.querySelector('.hamburger-menu');

    let isAnimating = false;

    // --- INITIAL SETUP ---

    // Initially reveal the first section ALWAYS
    gsap.to(firstSection, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
    });

    // Optionally, hide *other* sections if needed (or do this in CSS)
    gsap.set(otherSections, {
        opacity: 0,
        y: 50
    });

    // --- SMOOTH SCROLL FUNCTION ---
    function smoothScroll(e) {
        e.preventDefault();
        if (isAnimating) return;

        isAnimating = true;

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const targetPosition = targetSection.offsetTop - 50;

        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: targetPosition,
                autoKill: false
            },
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.fromTo(targetSection, {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power2.out',
                        onComplete: () => {
                            isAnimating = false;
                        }
                    }
                );

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

        // If it's mobile, also close the menu after clicking
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            header.classList.remove('hidden'); // Show header
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // --- HAMBURGER MENU TOGGLE ---
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        header.classList.toggle('hidden'); // Toggle header visibility
    });

    // --- HEADER HIDE ON SCROLL (MOBILE & DESKTOP) ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });
});
