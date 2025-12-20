/**
 * Navigation and Mobile Menu Logic
 */

function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const navLinks = document.getElementById("navLinks");
    const menuOverlay = document.getElementById("menuOverlay");

    if (menuToggle && navLinks && menuOverlay) {
        const toggleMenu = () => {
            navLinks.classList.toggle("active");
            menuOverlay.classList.toggle("active");
            document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
        };

        const closeMenu = () => {
            navLinks.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.style.overflow = "";
        };

        menuToggle.addEventListener("click", toggleMenu);
        menuOverlay.addEventListener("click", closeMenu);

        if (menuClose) {
            menuClose.addEventListener("click", closeMenu);
        }

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", closeMenu);
        });
    }
}

function initVerticalNav() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.snap-section');

    if (dots.length === 0 || sections.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dots.forEach(dot => {
                    if (dot.getAttribute('data-section') === id) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Export functions to window object
window.initMobileMenu = initMobileMenu;
window.initVerticalNav = initVerticalNav;
