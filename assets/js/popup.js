/**
 * Popup Logic for Promo and Gallery
 */

window.openPromoPopup = function () {
    const popup = document.getElementById('promo-popup');
    if (popup) {
        popup.style.display = 'flex';
        // Trigger reflow
        popup.offsetHeight;
        popup.classList.add('show');
    }
};

window.closePopup = function () {
    const popup = document.getElementById('promo-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 400); // Wait for transition
    }
}

window.openGalleryPopup = function () {
    const popup = document.getElementById('gallery-popup');
    if (popup) {
        popup.style.display = 'flex';
        // Trigger reflow
        popup.offsetHeight;
        popup.classList.add('show');
    }
};

window.closeGalleryPopup = function () {
    const popup = document.getElementById('gallery-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.style.display = 'none';
        }, 400);
    }
};

function initPopupTrigger(activePopup) {
    setTimeout(() => {
        const configPopup = activePopup || 'none';
        if (configPopup === 'none') return;

        const hasSeenKey = `hasSeenPopup_${configPopup}`;
        const hasSeen = sessionStorage.getItem(hasSeenKey);

        if (!hasSeen) {
            if (configPopup === 'promo' && typeof window.openPromoPopup === 'function') {
                window.openPromoPopup();
                sessionStorage.setItem(hasSeenKey, 'true');
            } else if (configPopup === 'gallery' && typeof window.openGalleryPopup === 'function') {
                window.openGalleryPopup();
                sessionStorage.setItem(hasSeenKey, 'true');
            }
        }
    }, 3000); // Show after 3 seconds
}

window.initPopupTrigger = initPopupTrigger;
