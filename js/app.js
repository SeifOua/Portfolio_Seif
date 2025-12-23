import translations from './translations.js';

class Portfolio {
    constructor() {
        this.lang = 'en';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateLanguage();
        this.setupRevealAnimations();
    }

    setupEventListeners() {
        const langToggle = document.getElementById('lang-toggle');
        langToggle.addEventListener('click', () => {
            this.lang = this.lang === 'en' ? 'fr' : 'en';
            langToggle.textContent = this.lang === 'en' ? 'FR' : 'EN';
            this.updateLanguage();
        });

        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    updateLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.lang][key]) {
                el.textContent = translations[this.lang][key];
            }
        });

        const attrElements = document.querySelectorAll('[data-i18n-attr]');
        attrElements.forEach(el => {
            const attrData = el.getAttribute('data-i18n-attr');
            const [key, attr] = attrData.split(':');
            if (translations[this.lang][key]) {
                el.setAttribute(attr, translations[this.lang][key]);
            }
        });

        document.documentElement.lang = this.lang;
    }

    setupRevealAnimations() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section, .skill-category, .project-card').forEach(el => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
