/**
 * Carousel Logic for Hero and Gallery
 */

// Hero Carousel Logic
let currentHeroSlide = 0;
let heroInterval;

window.setHeroSlide = function (index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentHeroSlide = index;
    if (currentHeroSlide >= slides.length) currentHeroSlide = 0;
    if (currentHeroSlide < 0) currentHeroSlide = slides.length - 1;

    if (slides[currentHeroSlide]) slides[currentHeroSlide].classList.add('active');
    if (dots[currentHeroSlide]) dots[currentHeroSlide].classList.add('active');

    // Reset interval on manual click
    clearInterval(heroInterval);
    startHeroAutoSlide();
}

function startHeroAutoSlide() {
    clearInterval(heroInterval);
    heroInterval = setInterval(() => {
        window.setHeroSlide(currentHeroSlide + 1);
    }, 5000);
}

window.startHeroAutoSlide = startHeroAutoSlide;

// Gallery Slider Logic
window.slideIndex = 1;

window.changeSlide = function (n) {
    showSlides(window.slideIndex += n);
}

window.showSlides = function (n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;

    if (n > slides.length) {
        window.slideIndex = 1
    }
    if (n < 1) {
        window.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove('active');
    }
    if (slides[window.slideIndex - 1]) {
        slides[window.slideIndex - 1].style.display = "block";
        slides[window.slideIndex - 1].classList.add('active');
    }
}

// Gallery Popup Slide Logic
let galleryIndex = 0;
window.changeGallerySlide = function (n) {
    const showcase = document.querySelector('.gallery-showcase');
    if (!showcase) return;
    const images = showcase.querySelectorAll('img');
    if (images.length === 0) return;

    images[galleryIndex].classList.remove('active');
    galleryIndex += n;

    if (galleryIndex >= images.length) galleryIndex = 0;
    if (galleryIndex < 0) galleryIndex = images.length - 1;

    images[galleryIndex].classList.add('active');

    // Update text based on slide index
    const title = document.getElementById('gallery-title');
    const desc = document.getElementById('gallery-desc');

    const contentDataID = [
        { t: "Gala Amal Tahunan 2024", d: "Momen berbagi kebahagiaan bersama anak yatim dalam rangka ulang tahun perusahaan yang ke-14. Terima kasih kepada seluruh partner yang telah mendukung acara ini." },
        { t: "Grand Opening Cabang Baru", d: "Perluasan jangkauan layanan kami di Jakarta Selatan dengan konsep dapur terbuka." },
        { t: "Masterclass dengan Chef Rizqi", d: "Sesi sharing knowledge tentang kuliner nusantara kepada talenta muda berbakat." }
    ];

    const contentDataEN = [
        { t: "Annual Charity Gala 2024", d: "A moment of sharing happiness with orphans in celebration of the company's 14th anniversary. Thank you to all partners who supported this event." },
        { t: "New Branch Grand Opening", d: "Expanding our service reach in South Jakarta with an open kitchen concept." },
        { t: "Masterclass with Chef Rizqi", d: "Knowledge sharing session about Indonesian cuisine to talented young minds." }
    ];

    const currentLang = localStorage.getItem('lang') || 'id';
    const contentData = currentLang === 'id' ? contentDataID : contentDataEN;

    if (title && desc && contentData[galleryIndex]) {
        title.innerText = contentData[galleryIndex].t;
        desc.innerText = contentData[galleryIndex].d;
    }
};
