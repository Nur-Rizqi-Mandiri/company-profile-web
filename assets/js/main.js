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
    { id: 'video-modal-container', file: 'assets/page/video-modal.html' },
    { id: 'popup-gallery-container', file: 'assets/page/popup-gallery.html' },
    { id: 'cookie-consent-container', file: 'assets/page/cookie-consent.html' }
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

        // Apply configuration values
        applyConfig(document.getElementById(id));

        // Initialize carousel if hero is loaded
        if (id === 'hero-container' && typeof window.startHeroAutoSlide === 'function') {
            window.startHeroAutoSlide();
        }

        // Initialize video grid if videos are loaded
        if (id === 'videos-container' && typeof window.initVideoGrid === 'function') {
            window.initVideoGrid();
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


// Configuration Injection Logic
function applyConfig(container = document) {
    if (typeof CONFIG === 'undefined') return;

    // Helper to safely set text content
    const setText = (id, value) => {
        const el = container.querySelector(`#${id}`);
        if (el) el.textContent = value;
    };

    // Helper to safely set attribute
    const setAttr = (id, attr, value) => {
        const el = container.querySelector(`#${id}`);
        if (el) el.setAttribute(attr, value);
    };

    // Apply Company Info
    setText('company-name', CONFIG.company.name);
    setText('company-desc', CONFIG.company.description);
    setText('footer-company-name', CONFIG.company.name);
    setText('footer-desc', CONFIG.company.description);

    // Apply Contact Info
    setText('contact-address', CONFIG.contact.address);
    setText('contact-phone', CONFIG.contact.phone_display);
    setText('contact-email', CONFIG.contact.email);
    setText('footer-address', CONFIG.contact.address);
    setText('footer-phone', CONFIG.contact.phone);
    setText('footer-email', CONFIG.contact.email);

    // Apply Hours
    setText('contact-hours', CONFIG.hours.text);
    setText('contact-hours-sat', CONFIG.hours.saturday);

    // Apply WhatsApp Link
    const waLinks = container.querySelectorAll('.floating-wa, #wa-link');
    waLinks.forEach(link => {
        link.href = `https://wa.me/${CONFIG.contact.whatsapp}`;
    });

    // Apply Certifications
    setText('cert-halal', CONFIG.certifications.halal);
    setText('cert-hygiene', CONFIG.certifications.hygiene);
    setText('cert-apji', CONFIG.certifications.apji);

    // Apply Trusted Logos
    const trustedContainer = container.querySelector('#trusted-logo-container');
    if (trustedContainer && CONFIG.trusted_by.length > 0) {
        trustedContainer.innerHTML = ''; // Clear existing
        CONFIG.trusted_by.forEach(partner => {
            const img = document.createElement('img');
            img.src = partner.url;
            img.alt = partner.name;
            trustedContainer.appendChild(img);
        });
    }

    // --- Dynamic Section Rendering ---

    // 1. Render Hero Slides
    const heroContainer = container.querySelector('#hero-slides-container');
    const heroDots = container.querySelector('#hero-dots-container');
    if (heroContainer && heroDots && CONFIG.hero_slides.length > 0) {
        heroContainer.innerHTML = '';
        heroDots.innerHTML = '';
        CONFIG.hero_slides.forEach((slide, index) => {
            // Slide
            const slideDiv = document.createElement('div');
            slideDiv.className = `hero-slide ${index === 0 ? 'active' : ''}`;
            slideDiv.innerHTML = `<div class="main-image-frame"><img src="${slide.image}" alt="${slide.alt}" loading="${index === 0 ? 'eager' : 'lazy'}"></div>`;
            heroContainer.appendChild(slideDiv);

            // Dot
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.onclick = () => window.setHeroSlide(index);
            heroDots.appendChild(dot);
        });
    }

    // 2. Render Menu Grid
    const menuContainer = container.querySelector('#menu-grid-container');
    if (menuContainer && CONFIG.menu_items.length > 0) {
        menuContainer.innerHTML = '';
        CONFIG.menu_items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'menu-item wow animate__animated animate__fadeInUp';
            // Simple delay stagger
            // div.setAttribute('data-wow-delay', `${index * 0.1}s`);
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="menu-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            menuContainer.appendChild(div);
        });
    }

    // 3. Render Packages
    if (CONFIG.packages) {
        const renderPkgTab = (tabId, pkgData) => {
            const pkgContainer = container.querySelector(`#pkg-${tabId}-container`);
            if (pkgContainer && pkgData) {
                pkgContainer.innerHTML = '';
                pkgData.forEach((pkg, index) => {
                    const isFeatured = pkg.badge ? 'featured' : '';
                    const featuresHtml = pkg.features.map(f => `<li>${f}</li>`).join('');
                    const badgeHtml = pkg.badge ? `<div class="pkg-badge">${pkg.badge}</div>` : '';

                    const div = document.createElement('div');
                    div.className = `package-card ${isFeatured} wow animate__animated animate__zoomIn`;
                    if (index === 1) div.setAttribute('data-wow-delay', '0.2s');

                    div.innerHTML = `
                        ${badgeHtml}
                        <div class="pkg-header">${pkg.name}</div>
                        <ul class="pkg-features">${featuresHtml}</ul>
                        <a href="#contact" class="btn-cta small" data-i18n="packages.btn">Pilih Paket</a>
                    `;
                    pkgContainer.appendChild(div);
                });
            }
        };
        renderPkgTab('wedding', CONFIG.packages.wedding);
        renderPkgTab('corporate', CONFIG.packages.corporate);
        renderPkgTab('social', CONFIG.packages.social);
    }

    // 4. Render Gallery Slider
    const galleryContainer = container.querySelector('#gallery-slider-container');
    if (galleryContainer && CONFIG.gallery_items.length > 0) {
        // Keep controls
        const controls = galleryContainer.querySelectorAll('.prev, .next');
        let controlsHtml = '';
        if (controls.length === 0) {
            controlsHtml = `
            <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
            <a class="next" onclick="changeSlide(1)">&#10095;</a>`;
        } else {
            controls.forEach(c => c.remove()); // Re-add at end
            controlsHtml = `
            <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
            <a class="next" onclick="changeSlide(1)">&#10095;</a>`;
        }

        galleryContainer.innerHTML = '';
        CONFIG.gallery_items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = `slide ${index === 0 ? 'active' : ''}`;
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="slide-caption wow animate__animated animate__fadeInUp">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            galleryContainer.appendChild(div);
        });
        galleryContainer.insertAdjacentHTML('beforeend', controlsHtml);
    }

    // 5. Render Moments
    const momentsContainer = container.querySelector('#moments-grid-container');
    if (momentsContainer && CONFIG.moments_images.length > 0) {
        momentsContainer.innerHTML = '';
        CONFIG.moments_images.forEach((imgData, index) => {
            const div = document.createElement('div');
            div.className = `chaos-item ${imgData.class} wow animate__animated animate__fadeIn`;
            div.setAttribute('data-wow-delay', `${(index * 0.1) + 0.1}s`);
            div.innerHTML = `
                <img src="${imgData.url}" loading="lazy">
                <div class="chaos-overlay"></div>
            `;
            momentsContainer.appendChild(div);
        });
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

    // Scroll to Top Logic
    initScrollTop();

    // Cookie Consent Logic
    if (typeof window.initCookieConsent === 'function') {
        window.initCookieConsent();
    }
}

function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (!scrollTopBtn) return;

    // Show/Hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top on click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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

    // Critical sections to load immediately
    const criticalSections = ['header-container', 'hero-container', 'popup-promo-container', 'floating-wa-container', 'cookie-consent-container'];

    for (const sectionId of criticalSections) {
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            await loadSection(section.id, section.file);
        }
    }

    // Initialize scripts for critical content
    initScripts();

    // Lazy load the rest of the sections
    const lazySections = sections.filter(s => !criticalSections.includes(s.id));

    const observerOptions = {
        root: null,
        rootMargin: '200px', // Load slightly before they enter viewport
        threshold: 0.01
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const section = lazySections.find(s => s.id === sectionId);
                if (section) {
                    loadSection(section.id, section.file);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    lazySections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el) {
            sectionObserver.observe(el);
        }
    });

    if (typeof window.initVerticalNav === 'function') {
        window.initVerticalNav();
    }

    // Init WOW.js for animations
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
}

document.addEventListener('DOMContentLoaded', loadAll);
