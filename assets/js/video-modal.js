/**
 * Video Modal Player Logic
 */

window.openVideoModal = function (videoId) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoIframeContainer');

    if (!modal || !container) return;

    // Inject iframe
    container.innerHTML = `
        <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>
    `;

    // Show modal
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Prevent scrolling
    document.body.style.overflow = 'hidden';
};

window.closeVideoModal = function () {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('videoIframeContainer');

    if (!modal || !container) return;

    // Hide modal
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        // Remove iframe to stop video
        container.innerHTML = '';
    }, 300);

    // Restore scrolling if mobile menu is not active
    const navLinks = document.getElementById('navLinks');
    if (!navLinks || !navLinks.classList.contains('active')) {
        document.body.style.overflow = '';
    }
};

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeVideoModal();
    }
});
