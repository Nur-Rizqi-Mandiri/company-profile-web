window.initCookieConsent = function () {
    console.log("Initializing Cookie Consent...");
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const cookieName = 'cookieConsent_v1';

    if (!banner || !acceptBtn) {
        console.error("Cookie banner elements not found!");
        return;
    }

    // DEBUG: Removed localStorage check to force display
    // if (!localStorage.getItem(cookieName)) {
    console.log("Showing cookie banner...");
    setTimeout(() => {
        banner.classList.add('show');
    }, 500); // Reduced delay
    // }

    // Handle click
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem(cookieName, 'true');
        banner.classList.remove('show');
    });
};
