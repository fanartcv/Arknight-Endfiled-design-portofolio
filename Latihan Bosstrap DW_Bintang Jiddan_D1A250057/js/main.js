/**
 * ==========================================
 * MAIN.JS - Core Functionality
 * Portfolio Main Functions
 * ==========================================
 */

// ==========================================
// 1. MOBILE MENU TOGGLE
// ==========================================
class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById('menuToggle');
    this.navLinks = document.getElementById('navLinks');
    this.links = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    if (!this.menuToggle || !this.navLinks) return;

    // Toggle menu
    this.menuToggle.addEventListener('click', () => {
      this.toggle();
    });

    // Close menu when link clicked
    this.links.forEach(link => {
      link.addEventListener('click', () => {
        this.close();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.menuToggle.contains(e.target) && !this.navLinks.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.menuToggle.classList.toggle('active');
    this.navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  close() {
    this.menuToggle.classList.remove('active');
    this.navLinks.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}


// ==========================================
// 2. LAZY LOAD IMAGES
// ==========================================
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      this.images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      this.images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
}


// ==========================================
// 3. FORM VALIDATION & SUBMISSION
// ==========================================
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    const formData = new FormData(this.form);
    
    // Show loading state
    this.showLoading();

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      this.showSuccess();
      this.form.reset();
    }, 2000);
  }

  showLoading() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>SENDING...</span>';
    }
  }

  showSuccess() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>MESSAGE SENT!</span>';
      
      setTimeout(() => {
        submitBtn.innerHTML = '<span>SEND MESSAGE</span>';
      }, 3000);
    }

    this.showNotification('Message sent successfully!', 'success');
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);

    this.addNotificationStyles();
  }

  addNotificationStyles() {
    if (document.querySelector('#notification-styles')) return;

    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .notification {
        position: fixed;
        top: 100px;
        right: -300px;
        padding: 1rem 2rem;
        background: var(--yellow);
        color: var(--black);
        font-weight: 600;
        border-radius: 0;
        clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .notification.show {
        right: 20px;
      }
      .notification-success {
        background: var(--yellow);
        color: var(--black);
      }
      .notification-error {
        background: #ff4444;
        color: white;
      }
    `;
    document.head.appendChild(style);
  }
}


// ==========================================
// 4. KEYBOARD SHORTCUTS
// ==========================================
class KeyboardShortcuts {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      // ESC - Close mobile menu
      if (e.key === 'Escape') {
        const mobileMenu = new MobileMenu();
        mobileMenu.close();
      }

      // Ctrl/Cmd + K - Focus search (if you add search)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add search focus logic here
      }
    });
  }
}


// ==========================================
// 5. DETECT DEVICE & BROWSER
// ==========================================
class DeviceDetector {
  constructor() {
    this.init();
  }

  init() {
    // Detect mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      document.body.classList.add('is-mobile');
      // Disable custom cursor on mobile
      const cursor = document.getElementById('cursor');
      const follower = document.getElementById('cursor-follower');
      if (cursor) cursor.style.display = 'none';
      if (follower) follower.style.display = 'none';
    }

    // Detect touch support
    const hasTouch = 'ontouchstart' in window;
    if (hasTouch) {
      document.body.classList.add('has-touch');
    }

    // Detect browser
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    if (isFirefox) document.body.classList.add('is-firefox');
    if (isSafari) document.body.classList.add('is-safari');
  }
}


// ==========================================
// 6. PERFORMANCE MONITOR (Development)
// ==========================================
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Log performance metrics
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      
      console.group('%c⚡ Performance Metrics', 'color: #ffd700; font-weight: bold;');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd - perfData.navigationStart}ms`);
      console.log(`First Paint: ${perfData.responseStart - perfData.navigationStart}ms`);
      console.groupEnd();
    });
  }
}


// ==========================================
// 7. SCROLL PROGRESS INDICATOR
// ==========================================
class ScrollProgress {
  constructor() {
    this.createProgressBar();
    this.init();
  }

  createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);

    this.addProgressStyles();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.updateProgress();
    });
  }

  updateProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = scrolled + '%';
    }
  }

  addProgressStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 9999;
      }
      .progress-fill {
        height: 100%;
        background: var(--yellow);
        width: 0%;
        transition: width 0.1s ease;
      }
    `;
    document.head.appendChild(style);
  }
}


// ==========================================
// 8. BACK TO TOP BUTTON
// ==========================================
class BackToTop {
  constructor() {
    this.createButton();
    this.init();
  }

  createButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);

    this.addButtonStyles();
  }

  init() {
    const button = document.getElementById('back-to-top');
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        button.classList.add('show');
      } else {
        button.classList.remove('show');
      }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  addButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
      #back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--yellow);
        color: var(--black);
        border: none;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
      }
      #back-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      #back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(255, 215, 0, 0.3);
      }
      @media (max-width: 768px) {
        #back-to-top {
          bottom: 20px;
          right: 20px;
          width: 45px;
          height: 45px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}


// ==========================================
// 9. CONSOLE ART
// ==========================================
class ConsoleArt {
  constructor() {
    this.init();
  }

  init() {
    console.log('%c', 'font-size: 1px; padding: 50px 100px; background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZDcwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+UE9SVEZPTElPPC90ZXh0Pjwvc3ZnPg==);');
    console.log('%c🎮 Arknights: Endfield Inspired Portfolio', 'color: #ffd700; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
    console.log('%cMade with ❤️ and JavaScript', 'color: #ffffff; font-size: 14px;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ffd700;');
    console.log('%cLooking for something? 👀', 'color: #ffffff; font-size: 12px;');
    console.log('%cFeel free to explore the code!', 'color: #ffffff; font-size: 12px;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ffd700;');
  }
}


// ==========================================
// 10. EASTER EGG (Konami Code)
// ==========================================
class EasterEgg {
  constructor() {
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.konamiIndex = 0;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => {
      if (e.key === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        
        if (this.konamiIndex === this.konamiCode.length) {
          this.activate();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }

  activate() {
    console.log('%c🎉 KONAMI CODE ACTIVATED!', 'color: #ffd700; font-size: 24px; font-weight: bold;');
    
    // Add fun effect
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Remove after 5 seconds
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
}


// ==========================================
// 11. UTILITIES
// ==========================================
const Utils = {
  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Get scroll percentage
  getScrollPercentage() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (winScroll / height) * 100;
  }
};


// ==========================================
// INITIALIZE ALL CORE FUNCTIONALITY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core classes
  new MobileMenu();
  new LazyLoader();
  new ContactForm();
  new KeyboardShortcuts();
  new DeviceDetector();
  new PerformanceMonitor();
  new ScrollProgress();
  new BackToTop();
  new ConsoleArt();
  new EasterEgg();

  console.log('%c✅ Core Functionality Loaded!', 'color: #00ff00; font-size: 14px; font-weight: bold;');
});


// Export utils for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Utils };
}