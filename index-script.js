





// Toggle switch logic from toggle.html, adapted for index.html
document.addEventListener('DOMContentLoaded', function() {
const checkbox = document.getElementById('checkbox');
const modeText = document.getElementById('mode-text');
const root = document.documentElement;
// 1. Check Local Storage for preference
if (localStorage.getItem('theme') === null) {
    // No preference stored, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    localStorage.setItem('theme', 'dark-mode');
    } else {
    localStorage.setItem('theme', 'light-mode');
    }
}
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark-mode') {
    root.classList.remove('light');
    checkbox.checked = true;
    modeText.textContent = 'Dark';
} else {
    root.classList.add('light');
    checkbox.checked = false;
    modeText.textContent = 'Light';
}
// 2. Event Listener for the toggle
checkbox.addEventListener('change', function() {
    if (this.checked) {
    root.classList.remove('light');
    localStorage.setItem('theme', 'dark-mode');
    modeText.textContent = 'Dark';
    // Analytics: Dark Mode
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        sendAnalyticsData(storedName, 'Dark Mode', '');
    }
    } else {
    root.classList.add('light');
    localStorage.setItem('theme', 'light-mode');
    modeText.textContent = 'Light';
    // Analytics: Light Mode
    const storedName = localStorage.getItem('userName');
    if (storedName) {
        sendAnalyticsData(storedName, 'Light Mode', '');
    }
    }
});
});




document.addEventListener('DOMContentLoaded', function() {
// Add analytics for social button clicks
const socialSelectors = [
    { selector: 'a[title="WhatsApp"]', type: 'WhatsApp' },
    { selector: 'a[title="Instagram"]', type: 'Instagram' },
    { selector: 'a[title="GitHub"]', type: 'GitHub' },
    { selector: 'a[title="Gmail"]', type: 'Email' }
];
socialSelectors.forEach(({ selector, type }) => {
    const btn = document.querySelector(selector);
    if (btn) {
    btn.addEventListener('click', function() {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
        sendAnalyticsData(storedName, type, '');
        }
    });
    }
});
});