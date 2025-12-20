/**
 * Main Orchestration and I18n Logic
 */

// Language state
let currentLang = localStorage.getItem('lang') || 'id';

// List of sections to load in order
const sections = [
    { id: 'header-container', file: 'assets/page/header.html' },
    { id: 'hero-container', file: 'assets/page/hero.html' },
    { id: 'popup-promo-container', file: 'assets/page/popup-promo.html' },
    { id: 'about-container', file: 'assets/page/about.html' },
    { id: 'videos-container', file: 'assets/page/videos.html' },
    { id: 'services-container', file: 'assets/page/services.html' },
    { id: 'menu-container', file: 'assets/page/menu.html' },
    { id: 'packages-container', file: 'assets/page/packages.html' },
    { id: 'gallery-container', file: 'assets/page/gallery.html' },
    { id: 'moments-container', file: 'assets/page/moments.html' },
    { id: 'faq-container', file: 'assets/page/faq.html' },
    { id: 'trusted-container', file: 'assets/page/trusted.html' },
    { id: 'certifications-container', file: 'assets/page/certifications.html' },
    { id: 'contact-container', file: 'assets/page/contact.html' },
    { id: 'features-container', file: 'assets/page/features.html' },
    { id: 'stats-container', file: 'assets/page/stats.html' },
    { id: 'testimonials-container', file: 'assets/page/testimonials.html' },
    { id: 'cta-container', file: 'assets/page/cta.html' },
    { id: 'footer-container', file: 'assets/page/footer.html' },
    { id: 'floating-wa-container', file: 'assets/page/floating-wa.html' },
    { id: 'popup-gallery-container', file: 'assets/page/popup-gallery.html' }
];

// Configurable Variable (Change this to 'gallery', 'promo', or 'none')
const ACTIVE_POPUP = 'none';

// Function to load a single HTML file
async function loadSection(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        document.getElementById(id).innerHTML = await response.text();

        // Apply translations to the newly loaded section
        applyTranslations(document.getElementById(id));

        // Initialize carousel if hero is loaded
        if (id === 'hero-container' && typeof window.startHeroAutoSlide === 'function') {
            window.startHeroAutoSlide();
        }
    } catch (error) {
        console.error(error);
        document.getElementById(id).innerHTML = `<p>Error loading section: ${file}. Note: You must run this via a local server (e.g. Live Server).</p>`;
    }
}

// Language Switcher Function
window.switchLanguage = function (lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    applyTranslations();
}

window.toggleLanguage = function () {
    const nextLang = currentLang === 'id' ? 'en' : 'id';
    window.switchLanguage(nextLang);
}

// Translation Injection Logic
function applyTranslations(container = document) {
    if (typeof translations === 'undefined') return;

    const elements = container.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            const translation = translations[currentLang][key];

            // Handle different element types
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else if (el.tagName === 'SELECT') {
                if (el.options[0] && el.options[0].getAttribute('data-i18n') === key) {
                    el.options[0].text = translation;
                }
            } else {
                el.innerHTML = translation;
            }
        }
    });

    // Update language toggle button text
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLang === 'id' ? 'EN' : 'ID';
    }
}

// Initialize scripts after content is loaded
function initScripts() {
    // Dynamic Year
    const yearElem = document.getElementById("copyright-year");
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear() + '';
    }

    // Mobile Menu
    if (typeof window.initMobileMenu === 'function') {
        window.initMobileMenu();
    }

    // Theme Toggle
    if (typeof window.initThemeToggle === 'function') {
        window.initThemeToggle();
    }

    // Slider Logic
    if (document.getElementsByClassName("slide").length > 0 && typeof window.showSlides === 'function') {
        window.slideIndex = 1;
        window.showSlides(window.slideIndex);
    }

    // Popup Logic Trigger
    if (typeof window.initPopupTrigger === 'function') {
        window.initPopupTrigger(ACTIVE_POPUP);
    }
}

// Load all sections sequentially then init scripts
async function loadAll() {
    // Ensure translations object exists
    if (typeof translations === 'undefined') {
        console.warn('Translations not loaded yet, retrying in 100ms...');
        setTimeout(loadAll, 100);
        return;
    }

    document.documentElement.lang = currentLang;
    for (const section of sections) {
        await loadSection(section.id, section.file);
    }
    initScripts();
    if (typeof window.initVerticalNav === 'function') {
        window.initVerticalNav();
    }

    // Init WOW.js for animations
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
}

document.addEventListener('DOMContentLoaded', loadAll);
