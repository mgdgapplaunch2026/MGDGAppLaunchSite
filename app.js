/**
 * MGDG Institutional Portal - Frontend Logic
 * Path: /public/app.js
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("MGDG Protocol Initialized...");

    // 1. Dynamic Year for Footer
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 2. Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 3. Access Queue Form Validation
    const queueForm = document.querySelector('#queueForm');
    if (queueForm) {
        queueForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real scenario, you'd send this to your server.js API
            alert("MGDG Priority Queue Activated. Check your email dossier.");
        });
    }
});