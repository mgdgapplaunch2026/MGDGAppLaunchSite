document.addEventListener('DOMContentLoaded', () => {
    // Navbar interaction on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Form Handling
    const waitlistForm = document.getElementById('waitlistForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // UI State: Loading
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'VERIFYING IDENTITY...';
            submitBtn.style.opacity = '0.7';

            // Simulate API request
            try {
                await new Promise(resolve => setTimeout(resolve, 1800));
                
                // UI State: Success
                waitlistForm.style.display = 'none';
                formStatus.innerHTML = `
                    <div style="text-align: center; padding: 2rem 0;">
                        <div style="font-size: 2rem; color: var(--gold); margin-bottom: 1rem;">✓</div>
                        <h3 class="serif" style="margin-bottom: 1rem;">Registration Confirmed</h3>
                        <p style="color: var(--gray); font-size: 0.9rem;">You have been successfully added to the private allocation list. Expect your guide shortly.</p>
                    </div>
                `;
            } catch (error) {
                // UI State: Error
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                formStatus.style.color = '#e74c3c';
                formStatus.textContent = 'Connectivity error. Please try again.';
            }
        });
    }

    // Smooth scroll for nav links (Standard fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});