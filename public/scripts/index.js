// Initialize Lucide Icons
lucide.createIcons();

// Smooth Scrolling Function
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons(); // Re-render icons
}

menuToggle.addEventListener('click', toggleMenu);

// Form Submission Logic
const leadForm = document.getElementById('leadForm');
const successMessage = document.getElementById('successMessage');

leadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real app, you would send data to a server here
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    console.log("Form Submitted:", { name, email });

    // Hide form and show success message
    leadForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
});

// Optional: Change Navbar opacity on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(12, 10, 9, 0.95)';
    } else {
        navbar.style.background = 'rgba(12, 10, 9, 0.8)';
    }
});