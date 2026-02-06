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

    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value
        };

        try {
            const response = await fetch('/api/v1/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                leadForm.classList.add('hidden');
                successScreen.classList.remove('hidden');
                console.log("MGDG Reserve: New entry verified.");
            } else {
                alert(result.message); // Handle 'already exists' or errors
            }
        } catch (error) {
            console.error("MGDG Protocol Error:", error);
        }
    });
});


const GOLD_API_KEY = "goldapi-cmzeglsml8zuwsr-io";
const CACHE_KEY = "mgdg_gold_market_data";
const CACHE_HOURS = 12;

async function updateInstitutionalValuation() {
    const priceDisplay = document.querySelector('.dash-value');
    if (!priceDisplay) return;

    const now = Date.now();
    const cachedData = localStorage.getItem(CACHE_KEY);

    // 1. Check for valid cache
    if (cachedData) {
        const { price, timestamp } = JSON.parse(cachedData);
        if (now - timestamp < CACHE_HOURS * 60 * 60 * 1000) {
            console.log("MGDG Protocol: Utilizing cached sovereign-grade market data.");
            displayPrice(price, priceDisplay);
            return;
        }
    }

    // 2. Fetch if no cache or expired
    try {
        console.log("MGDG Protocol: Establishing secure link to GoldAPI.io...");
        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
            headers: {
                "x-access-token": GOLD_API_KEY,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error('API Rate Limit or Connection Error');

        const data = await response.json();
        
        if (data.price) {
            displayPrice(data.price, priceDisplay);
            
            // 3. Update Cache
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                price: data.price,
                timestamp: now
            }));
        }
    } catch (error) {
        console.error("MGDG Alert: Market Feed Interrupted.", error);
        // Fallback is handled by the static HTML value ($2,742.15)
    }
}

function displayPrice(price, element) {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
    
    element.innerText = `${formatted} / oz`;
}

// Execute on load
document.addEventListener('DOMContentLoaded', updateInstitutionalValuation);