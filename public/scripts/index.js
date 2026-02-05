document.addEventListener('DOMContentLoaded', () => {
  // Initialize Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  const toggleMenu = (forceClose = false) => {
    const isOpen = forceClose ? true : mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenu.setAttribute('aria-hidden', 'true');
    } else {
      mobileMenu.classList.add('open');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  };

  menuBtn?.addEventListener('click', () => toggleMenu());

  // Navigation Logic (Smooth Scroll)
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-scroll');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Close menu if it's open
        toggleMenu(true);
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Logo Clicks (Back to top)
  const logos = [document.getElementById('logo-home'), document.getElementById('footer-logo')];
  logos.forEach(logo => {
    logo?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Waitlist Form Handling
  const leadForm = document.getElementById('lead-form');
  const successScreen = document.getElementById('success-screen');

  leadForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate submission
    leadForm.classList.add('hidden');
    successScreen?.classList.remove('hidden');
    
    // Smooth scroll into view if on mobile
    if (window.innerWidth < 1024) {
      successScreen.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});
