document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle logic
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

    // Social button analytics logic
    const socialSelectors = [
        { selector: 'a[title="WhatsApp"]', type: 'WhatsApp' },
        { selector: 'a[title="Instagram"]', type: 'Instagram' },
        { selector: 'a[title="GitHub"]', type: 'GitHub' },
        { selector: 'a[title="Gmail"]', type: 'Email' }
    ];

    window.addEventListener('load', function() {
        const footerTitle = document.getElementById('footer-title');
        const footerText = document.getElementById('footer-text');
        socialSelectors.forEach(({selector, type }) => {
            const btn = document.querySelector(selector);
            setTimeout(function(){
                btn.classList.add('change-color');
                btn.classList.add('transform');
                setTimeout(function(){
                    btn.classList.remove('transform');
                },650)
                setTimeout(function(){
                    btn.classList.remove('change-color');
                },1000)
                setTimeout(function(){
                    footerTitle.classList.add('change');
                    setTimeout(function(){
                        footerText.classList.add('change');
                        btn.classList.add('change-color');
                    },1000)
                    setTimeout(function(){
                        footerTitle.classList.remove('change');
                    },1000)
                },1000)
                
            },1000)
        });
    });

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