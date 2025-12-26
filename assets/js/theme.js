/**
 * Theme Management System
 * Handles light/dark mode switching and persistence
 */

function initTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme as soon as possible to prevent FOUC
initTheme();

/**
 * Initialize the theme toggle button event listener.
 * This should be called after the header is loaded into the DOM.
 */
window.initThemeToggle = function () {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Remove existing listener if any to prevent duplicates
        themeToggle.removeEventListener('click', toggleTheme);
        themeToggle.addEventListener('click', toggleTheme);
    }
};

// Also attempt to initialize on DOMContentLoaded for safety,
// though for this project it's mainly handled in initScripts()
document.addEventListener('DOMContentLoaded', window.initThemeToggle);
