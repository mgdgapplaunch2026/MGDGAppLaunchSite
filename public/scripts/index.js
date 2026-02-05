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


const GOLD_API_KEY = "goldapi-cmzeglsml8zuwsr-io";
const CACHE_KEY = "mgdg_gold_data";
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

async function updateGoldPrice() {
    const priceDisplay = document.querySelector('.dash-value');
    const now = Date.now();
    
    // 1. Try to get data from LocalStorage
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const { price, timestamp } = JSON.parse(cached);
        // If the data is less than 12 hours old, use it and STOP
        if (now - timestamp < CACHE_DURATION) {
            console.log("MGDG: Using cached market data to save API credits.");
            priceDisplay.innerText = `$${price.toLocaleString()} / oz`;
            return;
        }
    }

    // 2. If no cache or cache expired, fetch from GoldAPI
    console.log("MGDG: Cache expired. Fetching live market data...");
    try {
        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
            headers: {
                "x-access-token": GOLD_API_KEY,
                "Content-Type": "application/json"
            }
        });
        
        const data = await response.json();
        
        if (data.price) {
            const currentPrice = data.price;
            priceDisplay.innerText = `$${currentPrice.toLocaleString()} / oz`;
            
            // 3. Save to LocalStorage for next time
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                price: currentPrice,
                timestamp: now
            }));
        }
    } catch (error) {
        console.error("MGDG Market Feed Error:", error);
        // If it fails, the HTML stays at your default $2,742.15
    }
}

// Only run once when the page loads
updateGoldPrice();
