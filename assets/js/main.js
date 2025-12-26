/**
 * Main Orchestration and I18n Logic
 */

// Language state
let currentLang = localStorage.getItem('lang') || 'id';

// List of sections to load in order
const sections = [
    { id: 'header-container', file: 'assets/page/header.html' },
    { id: 'hero-container', file: 'assets/page/hero.html' },
    { id: 'features-container', file: 'assets/page/features.html' },
    { id: 'stats-container', file: 'assets/page/stats.html' },
    { id: 'about-container', file: 'assets/page/about.html' },
    { id: 'services-container', file: 'assets/page/services.html' },
    { id: 'menu-container', file: 'assets/page/menu.html' },
    { id: 'packages-container', file: 'assets/page/packages.html' },
    { id: 'process-container', file: 'assets/page/process.html' },
    { id: 'videos-container', file: 'assets/page/videos.html' },
    { id: 'gallery-container', file: 'assets/page/gallery.html' },
    { id: 'moments-container', file: 'assets/page/moments.html' },
    { id: 'testimonials-container', file: 'assets/page/testimonials.html' },
    { id: 'trusted-container', file: 'assets/page/trusted.html' },
    { id: 'certifications-container', file: 'assets/page/certifications.html' },
    { id: 'faq-container', file: 'assets/page/faq.html' },
    { id: 'cta-container', file: 'assets/page/cta.html' },
    { id: 'contact-container', file: 'assets/page/contact.html' },
    { id: 'footer-container', file: 'assets/page/footer.html' },
    { id: 'floating-wa-container', file: 'assets/page/floating-wa.html' },
    { id: 'popup-promo-container', file: 'assets/page/popup-promo.html' },
    { id: 'video-modal-container', file: 'assets/page/video-modal.html' },
    { id: 'video-modal-container', file: 'assets/page/video-modal.html' },
    { id: 'popup-gallery-container', file: 'assets/page/popup-gallery.html' },
    { id: 'legal-modal-container', file: 'assets/page/legal-modal.html' },
    { id: 'cookie-consent-container', file: 'assets/page/cookie-consent.html' }
];

// Configurable Variable (Change this to 'gallery', 'promo', or 'none')
const ACTIVE_POPUP = 'promo';

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

        // Initialize Testimonials
        if (id === 'testimonials-container' && typeof window.initTestimonialsSmoothScroll === 'function') {
            window.initTestimonialsSmoothScroll();
        }

        // Initialize Contact Form
        if (id === 'contact-container' && typeof window.initContactForm === 'function') {
            window.initContactForm();
        }

        // Initialize Videos (Explicit Logic)
        if (id === 'videos-container' && typeof window.renderVideos === 'function') {
            window.renderVideos(document.getElementById(id));
        }

        // Initialize Certifications (Explicit Logic)
        if (id === 'certifications-container' && typeof window.renderCertifications === 'function') {
            window.renderCertifications(document.getElementById(id));
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
        CONFIG.menu_items.forEach((item) => {
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
        let controlsHtml;
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
            // Add click handler for preview
            div.style.cursor = 'pointer';
            div.onclick = () => openGalleryPreview(item.image, item.title, item.desc);

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

            // Add click for preview
            div.style.cursor = 'pointer';
            div.onclick = () => openGalleryPreview(imgData.url, 'Momen Berkesan', '');

            div.innerHTML = `
                <img src="${imgData.url}" loading="lazy" alt="${imgData.url}">
                <div class="chaos-overlay"></div>
            `;
            momentsContainer.appendChild(div);
        });
    }

    // 6. Render FAQ
    const faqContainer = container.querySelector('#faq-list-container');
    if (faqContainer && CONFIG.faq && CONFIG.faq.length > 0) {
        faqContainer.innerHTML = '';
        CONFIG.faq.forEach((item, index) => {
            const details = document.createElement('details');
            details.className = 'faq-item wow animate__animated animate__fadeInUp';
            details.setAttribute('data-wow-delay', `${index * 0.1}s`);
            details.innerHTML = `
                <summary>${item.q}</summary>
                <p>${item.a}</p>
            `;
            faqContainer.appendChild(details);
        });
    }

    // 7. Render Features
    const featuresContainer = container.querySelector('#features-grid-container');
    if (featuresContainer && CONFIG.features) {
        featuresContainer.innerHTML = '';
        CONFIG.features.forEach((item) => {
            const div = document.createElement('div');
            div.className = 'feature-card wow animate__animated animate__fadeInUp';
            div.innerHTML = `
                <div class="feature-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
            featuresContainer.appendChild(div);
        });
    }

    // 8. Render Services
    const servicesContainer = container.querySelector('#services-grid-container');
    if (servicesContainer && CONFIG.services) {
        servicesContainer.innerHTML = '';
        CONFIG.services.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'service-card wow animate__animated animate__fadeInUp';
            if (index > 0) div.setAttribute('data-wow-delay', `${index * 0.2}s`);
            div.innerHTML = `
                <div class="service-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
            servicesContainer.appendChild(div);
        });
    }

    // 9. Render Stats
    const statsContainer = container.querySelector('#stats-grid-container');
    if (statsContainer && CONFIG.stats) {
        statsContainer.innerHTML = '';
        CONFIG.stats.forEach((item) => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="stat-number">${item.number}</div>
                <p>${item.label}</p>
            `;
            statsContainer.appendChild(div);
        });
    }

    // 10. Render Process
    const processContainer = container.querySelector('#process-steps-container');
    if (processContainer && CONFIG.process) {
        processContainer.innerHTML = '';
        CONFIG.process.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'process-step wow animate__animated animate__fadeInUp';
            div.setAttribute('data-wow-delay', `${(index + 1) * 0.1}s`);
            div.innerHTML = `
                <div class="step-icon">
                    <i class="${item.icon}"></i>
                    <div class="step-number">${item.number}</div>
                </div>
                <div class="step-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            processContainer.appendChild(div);
        });
    }

    // 11. Render Testimonials
    const testimonialsContainer = container.querySelector('#testimonial-grid-container');
    if (testimonialsContainer && CONFIG.testimonials) {
        testimonialsContainer.innerHTML = '';

        const pastelColors = ['#FFD1DC', '#E0F7FA', '#F3E5F5', '#FFF9C4', '#E1F5FE', '#F1F8E9', '#FFE0B2', '#D1C4E9'];

        const getInitials = (name) => {
            const parts = name.split(' ');
            if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
            return (parts[0][0] + parts[1][0]).toUpperCase();
        };

        const renderTestimonial = (item) => {
            const div = document.createElement('div');
            div.className = 'testimonial-card wow animate__animated animate__fadeInUp';

            // Random color
            const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
            div.style.backgroundColor = randomColor;

            // Initials or Image
            // Use author name, strip everything after comma if present (e.g. "Rina, Klien")
            const cleanName = item.author.split(',')[0].trim();
            const initials = getInitials(cleanName);

            let avatarContent;
            if (item.image && item.image.trim() !== '') {
                avatarContent = `<img src="${item.image}" alt="${item.author}" loading="lazy">`;
            } else {
                avatarContent = initials;
            }

            div.innerHTML = `
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${avatarContent}</div>
                </div>
                <div class="testimonial-content">
                    <p>${item.text}</p>
                    <div class="testimonial-author">— ${item.author}</div>
                </div>
            `;
            return div;
        };

        CONFIG.testimonials.forEach((item) => {
            testimonialsContainer.appendChild(renderTestimonial(item));
        });


    }

    // Expose render functions for lazy loading
    window.renderVideos = function (container) {
        const videoContainer = container.querySelector('#video-grid-container');
        if (videoContainer && CONFIG.videos) {
            videoContainer.innerHTML = '';
            CONFIG.videos.forEach((video) => {
                const div = document.createElement('div');
                div.className = 'video-item wow animate__animated animate__fadeInUp';
                div.setAttribute('onclick', `openVideoModal('${video.id}')`);
                const thumbUrl = video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
                div.innerHTML = `
                <img src="${thumbUrl}" alt="${video.title}" loading="lazy">
                <div class="play-button"><span>▶</span></div>
            `;
                videoContainer.appendChild(div);
            });
        }
    }

    window.renderCertifications = function (container) {
        const certContainer = container.querySelector('#cert-grid-container');
        if (certContainer && CONFIG.certifications) {
            certContainer.innerHTML = '';
            CONFIG.certifications.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'cert-item wow animate__animated animate__fadeInUp';
                if (index > 0) div.setAttribute('data-wow-delay', `${index * 0.1}s`);
                const isImage = item.icon.includes('/') || item.icon.includes('.');
                const iconContent = isImage
                    ? `<img src="${item.icon}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain;">`
                    : `<div class="cert-icon">${item.icon}</div>`;
                div.innerHTML = `
                <div class="cert-badge">${item.badge}</div>
                <div class="cert-icon-wrapper">${iconContent}</div>
                <div class="cert-content">
                    <h4>${item.title}</h4>
                    <div class="cert-number">${item.number}</div>
                    <p class="cert-issuer">${item.issuer}</p>
                    <div class="cert-status"><span class="status-dot"></span> Terverifikasi</div>
                </div>
            `;
                certContainer.appendChild(div);
            });
        }
    }

    // Call them inside applyConfig if it's the right container, or just leave them exposed.
    // Ideally, we remove the logic from here and call the function.

    // 12. Render Videos
    window.renderVideos(container);

    // 13. Render Certifications
    window.renderCertifications(container);
}

// Open Legal Modal logic
window.openLegalModal = async function (type) {
    const modal = document.getElementById('legal-modal');
    const titleEl = document.getElementById('legal-title');
    const bodyEl = document.getElementById('legal-body');
    const overlay = document.querySelector('.legal-modal-overlay');

    if (!modal || !titleEl || !bodyEl) {
        console.error('Legal modal elements not found');
        return;
    }

    // Set Title
    titleEl.textContent = type === 'terms' ? 'Syarat & Ketentuan' : 'Kebijakan Privasi';

    // Show Loading
    bodyEl.innerHTML = '<div class="loading-spinner">Loading...</div>';
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Lock scroll

    // Fetch Content
    const file = type === 'terms' ? 'assets/page/content-terms.html' : 'assets/page/content-privacy.html';
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error('Failed to load content');
        const html = await response.text();
        bodyEl.innerHTML = html;
    } catch (error) {
        console.error(error);
        bodyEl.innerHTML = '<p>Maaf, konten gagal dimuat. Silakan coba lagi nanti.</p>';
    }
}

window.closeLegalModal = function () {
    const overlay = document.querySelector('.legal-modal-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        document.body.style.overflow = ''; // Unlock scroll
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

    // Contact Form Notification - Moved to loadSection
    // initContactForm();

    // Testimonials Infinite Scroll - Moved to loadSection
    // initTestimonialsSmoothScroll();

    // Global Image Preview
    initGlobalImagePreview();

    // Check URL params for Direct Linking (Legal Modal)
    const urlParams = new URLSearchParams(window.location.search);
    const legalParam = urlParams.get('legal');
    if (legalParam === 'terms' || legalParam === 'privacy') {
        // Small delay to ensure DOM is ready and transition is smooth
        setTimeout(() => {
            window.openLegalModal(legalParam);
        }, 500);
    }
}

function initContactForm() {
    const form = document.querySelector('#contact-container form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate sending
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.');
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
}

function initTestimonialsSmoothScroll() {
    const track = document.getElementById('testimonial-grid-container');
    if (!track) return;

    // Clone items for infinite loop illusion
    const items = Array.from(track.children);
    if (items.length === 0) return;

    // Clone enough items to fill twice the screen width
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });
    // Do it again just to be safe for large screens
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    let x = 0;
    let speed = 0.5; // Pixels per frame
    let animationId;
    let isPaused = false;
    let startX = 0;
    let isDragging = false;
    let scrollLeftAtStart = 0;

    const animate = () => {
        if (!isPaused) {
            x -= speed;
            // Reset if moved past the width of original content
            // Approximate width check: simpler to just check scrollWidth/3
            if (Math.abs(x) >= track.scrollWidth / 3) {
                x = 0;
            }
            track.style.transform = `translateX(${x}px)`;
        }
        animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Touch/Hover Interaction
    track.addEventListener('mouseenter', () => isPaused = true);
    track.addEventListener('mouseleave', () => isPaused = false);

    let startY = 0;

    track.addEventListener('touchstart', (e) => {
        isPaused = true;
        isDragging = true;
        startX = e.touches[0].pageX - x;
        startY = e.touches[0].pageY; // Track Y to detect vertical scroll
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].pageX;
        const currentY = e.touches[0].pageY;

        const diffX = Math.abs(currentX - (startX + x)); // approximate delta
        const diffY = Math.abs(currentY - startY);

        // If vertical movement is greater than horizontal, allow native scroll
        if (diffY > diffX && diffY > 10) {
            isDragging = false; // Stop custom dragging
            return;
        }

        e.preventDefault(); // Lock scroll for horizontal swiping
        x = currentX - startX;
        track.style.transform = `translateX(${x}px)`;
    }, { passive: false });

    track.addEventListener('touchend', () => {
        isDragging = false;
        // Introduce a small delay before resuming to prevent "jump"
        setTimeout(() => {
            isPaused = false;
        }, 500);
    });

    // CRITICAL: Handle touchcancel (e.g. when scrolling page vertically)
    track.addEventListener('touchcancel', () => {
        isDragging = false;
        isPaused = false;
    });
}

// Global function for Gallery Preview
window.openGalleryPreview = function (src, title, desc) {
    const popup = document.getElementById('gallery-popup');
    if (!popup) return;

    // Inject content directly for preview
    // Inject content directly for preview
    const showcaseImg = popup.querySelector('.gallery-showcase img');
    if (showcaseImg) {
        showcaseImg.src = src;
        showcaseImg.alt = title || 'Gallery Preview';
    }

    // Show popup
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Click outside to close
    popup.onclick = function (e) {
        if (e.target === popup) {
            closeGalleryPopup();
        }
    }
}

window.closeGalleryPopup = function () {
    const popup = document.getElementById('gallery-popup');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function initGlobalImagePreview() {
    document.body.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName !== 'IMG') return;

        // 1. Check direct exclusions (Classes on img)
        if (target.classList.contains('logo') ||
            target.classList.contains('icon') ||
            target.classList.contains('active')) { // 'active' is used by the popup image itself
            return;
        }

        // 2. Check parent exclusions
        const parent = target.closest('div, a, button'); // Check immediate relevant parents

        // Exclude hyperlinks to other pages
        const link = target.closest('a');
        if (link && link.href && !link.href.includes('#') && !link.href.includes('javascript')) {
            return;
        }

        // Exclude specific containers
        if (target.closest('.logo-carousel') ||
            target.closest('.testimonial-avatar') ||
            target.closest('.feature-icon') ||
            target.closest('.service-icon') ||
            target.closest('.step-icon') ||
            target.closest('.cert-icon-wrapper') ||
            target.closest('.video-item') || // Videos handle their own click
            target.closest('.popup-gallery-content')) { // Don't click image inside popup
            return;
        }

        // If we are here, it's likely a content image.
        // Prevent default action (if any)
        e.preventDefault();
        e.stopPropagation();

        openGalleryPreview(target.src, target.alt, '');
    });
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
    const criticalSections = ['header-container', 'hero-container', 'popup-promo-container', 'floating-wa-container', 'cookie-consent-container', 'popup-gallery-container', 'legal-modal-container'];

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
