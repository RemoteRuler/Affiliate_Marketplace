/**
 * COPYRIGHT REMOTE RULER. ALL RIGHTS RESERVED.
 * UNAUTHORIZED COPYING, USE, OR DISTRIBUTION IS STRICTLY PROHIBITED.
 */
const Utils = {
    // Format currency based on code (BDT/USD)
    formatMoney: (amount, currency = 'BDT') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(amount);
    },

    // LocalStorage Wrapper
    Store: {
        get: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
        set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
        remove: (key) => localStorage.removeItem(key)
    },

    // Theme Manager
    Theme: {
        init: () => {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            const updateTheme = (e) => {
                const isDark = e ? e.matches : mediaQuery.matches;
                document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            };

            // Listen for changes
            mediaQuery.addEventListener('change', updateTheme);

            // Initial call
            updateTheme();
        }
    },

    // URL Param helper
    getQueryParam: (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // YouTube Embed Helper
    getYouTubeEmbed: (url) => {
        if (!url) return null;
        // Regex to catch v=ID, embed/ID, youtu.be/ID, or shorts/ID
        const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}?rel=0`;
        }
        return null;
    }
};

window.Utils = Utils;
