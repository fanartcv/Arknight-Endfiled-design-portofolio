// ==========================================
// 1. LOADING SCREEN ANIMATION
// ==========================================
class LoadingScreen {
  constructor() {
    this.loadingElement = document.getElementById('loading-screen');
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hide();
      }, 1500);
    });
  }

  hide() {
    this.loadingElement.classList.add('hidden');
    setTimeout(() => {
      this.loadingElement.style.display = 'none';
    }, 500);
  }
}


// ==========================================
// 2. CUSTOM CURSOR ANIMATION
// ==========================================
class CustomCursor {
  constructor() {
    this.cursor = document.getElementById('cursor');
    this.follower = document.getElementById('cursor-follower');
    this.cursorPos = { x: 0, y: 0 };
    this.followerPos = { x: 0, y: 0 };
    this.isHovering = false;
    
    if (this.cursor && this.follower) {
      this.init();
    }
  }

  init() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.cursorPos.x = e.clientX;
      this.cursorPos.y = e.clientY;
    });

    // Smooth follow animation
    this.animate();

    // Hover effects
    this.setupHoverEffects();
  }

  animate() {
    // Cursor follows mouse instantly
    this.cursor.style.left = this.cursorPos.x + 'px';
    this.cursor.style.top = this.cursorPos.y + 'px';

    // Follower lags behind
    this.followerPos.x += (this.cursorPos.x - this.followerPos.x) * 0.1;
    this.followerPos.y += (this.cursorPos.y - this.followerPos.y) * 0.1;

    this.follower.style.left = this.followerPos.x + 'px';
    this.follower.style.top = this.followerPos.y + 'px';

    requestAnimationFrame(() => this.animate());
  }

  setupHoverEffects() {
    const hoverElements = document.querySelectorAll('a, button, .project-card, .photo-card, .btn');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });

      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }
}


// ==========================================
// 3. PARALLAX SCROLL EFFECTS
// ==========================================
class ParallaxEffect {
  constructor() {
    this.elements = {
      decoBoxes: document.querySelectorAll('.deco-box'),
      decoLines: document.querySelectorAll('.deco-line'),
      floatingText: document.querySelectorAll('.floating-text'),
      diagonalLines: document.querySelector('.diagonal-lines')
    };
    
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => this.update());
    });
  }

  update() {
    const scrolled = window.pageYOffset;

    // Animate decorative boxes
    this.elements.decoBoxes.forEach((box, index) => {
      const speed = 0.3 + (index * 0.1);
      const yPos = scrolled * speed;
      const rotation = scrolled * 0.05;
      box.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
    });

    // Animate decorative lines
    this.elements.decoLines.forEach((line, index) => {
      const speed = 0.5 + (index * 0.15);
      const yPos = scrolled * speed;
      line.style.transform = `translateY(${yPos}px)`;
    });

    // Animate floating text
    this.elements.floatingText.forEach((text, index) => {
      const speed = 0.2 + (index * 0.1);
      const yPos = scrolled * speed;
      text.style.transform = `translateY(${yPos}px)`;
      text.style.opacity = Math.max(0, 1 - (scrolled / 500));
    });

    // Animate diagonal lines
    if (this.elements.diagonalLines) {
      const opacity = Math.max(0, 1 - (scrolled / 800));
      this.elements.diagonalLines.style.opacity = opacity;
    }
  }
}


// ==========================================
// 4. SCROLL REVEAL ANIMATIONS
// ==========================================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate]');
    this.observer = null;
    this.init();
  }

  init() {
    const options = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Unobserve after animation
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.forEach(el => {
      this.observer.observe(el);
    });
  }
}


// ==========================================
// 5. PHOTO CARD 3D TILT EFFECT
// ==========================================
class PhotoCardTilt {
  constructor() {
    this.cards = document.querySelectorAll('[data-tilt]');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleTilt(e, card));
      card.addEventListener('mouseleave', () => this.resetTilt(card));
    });
  }

  handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale3d(1.05, 1.05, 1.05)
    `;

    // Move yellow stripes
    const stripes = card.querySelectorAll('.yellow-stripe');
    stripes.forEach((stripe, index) => {
      const moveX = ((x - centerX) / centerX) * (10 + index * 5);
      const moveY = ((y - centerY) / centerY) * (10 + index * 5);
      stripe.style.transform = `translate(${moveX}px, ${moveY}px) skewX(-10deg)`;
    });
  }

  resetTilt(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    const stripes = card.querySelectorAll('.yellow-stripe');
    stripes.forEach(stripe => {
      stripe.style.transform = 'translate(0, 0) skewX(-10deg)';
    });
  }
}


// ==========================================
// 6. PHOTO CARD HOVER ANIMATION
// ==========================================
class PhotoCardAnimation {
  constructor() {
    this.cards = document.querySelectorAll('.photo-card');
    this.init();
  }

  init() {
    this.cards.forEach((card, index) => {
      // Stagger initial animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);

      // Hover effects
      card.addEventListener('mouseenter', () => this.onHover(card));
      card.addEventListener('mouseleave', () => this.onLeave(card));
    });
  }

  onHover(card) {
    const img = card.querySelector('.photo-img');
    const barcode = card.querySelector('.photo-barcode');
    
    // Image zoom
    if (img) {
      img.style.transform = 'scale(1.15) rotate(2deg)';
    }

    // Barcode glitch effect
    if (barcode) {
      this.glitchEffect(barcode);
    }
  }

  onLeave(card) {
    const img = card.querySelector('.photo-img');
    
    if (img) {
      img.style.transform = 'scale(1) rotate(0)';
    }
  }

  glitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '||||| |||| ||| || | |||| |||';
    let iterations = 0;

    const interval = setInterval(() => {
      element.textContent = glitchChars;
      iterations++;

      if (iterations >= 3) {
        clearInterval(interval);
        element.textContent = originalText;
      }
    }, 100);
  }
}


// ==========================================
// 7. STATS COUNTER ANIMATION
// ==========================================
class StatsCounter {
  constructor() {
    this.stats = document.querySelectorAll('.stat-number');
    this.hasAnimated = false;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
        }
      });
    }, { threshold: 0.5 });

    this.stats.forEach(stat => observer.observe(stat));
  }

  animateCounters() {
    this.stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const counter = setInterval(() => {
        current += step;
        
        if (current >= target) {
          stat.textContent = target + '+';
          clearInterval(counter);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
}


// ==========================================
// 8. PROJECT CARD ANIMATIONS
// ==========================================
class ProjectCardAnimation {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.cards.forEach((card, index) => {
      // Initial state
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px)';

      // Observe for scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.transition = 'all 0.8s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 200);
            observer.unobserve(card);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(card);

      // Hover effects
      this.setupHoverEffects(card);
    });
  }

  setupHoverEffects(card) {
    const img = card.querySelector('.project-image img');
    const tag = card.querySelector('.project-tag');

    card.addEventListener('mouseenter', () => {
      // Image scale
      if (img) {
        img.style.transform = 'scale(1.2) rotate(2deg)';
      }

      // Tag slide
      if (tag) {
        tag.style.transform = 'translateX(5px)';
      }

      // Add glow effect
      card.style.boxShadow = '0 10px 40px rgba(255, 215, 0, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
      if (img) {
        img.style.transform = 'scale(1) rotate(0)';
      }

      if (tag) {
        tag.style.transform = 'translateX(0)';
      }

      card.style.boxShadow = 'none';
    });
  }
}


// ==========================================
// 9. TEXT TYPING EFFECT (Hero Title)
// ==========================================
class TypingEffect {
  constructor() {
    this.elements = document.querySelectorAll('.title-line');
    this.init();
  }

  init() {
    this.elements.forEach((element, index) => {
      const text = element.textContent;
      element.textContent = '';
      element.style.opacity = '1';

      setTimeout(() => {
        this.typeText(element, text, 50);
      }, index * 1000);
    });
  }

  typeText(element, text, speed) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }
}


// ==========================================
// 10. NAVBAR SCROLL EFFECTS
// ==========================================
class NavbarAnimation {
  constructor() {
    this.nav = document.getElementById('main-nav');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add scrolled class
      if (currentScroll > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }

      // Hide on scroll down, show on scroll up
      if (currentScroll > this.lastScroll && currentScroll > 100) {
        this.nav.style.transform = 'translateY(-100%)';
      } else {
        this.nav.style.transform = 'translateY(0)';
      }

      this.lastScroll = currentScroll;
    });
  }
}


// ==========================================
// 11. SMOOTH SCROLL TO SECTION
// ==========================================
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href === '#' || !href) return;

        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}


// ==========================================
// 12. ACTIVE NAV LINK ON SCROLL
// ==========================================
class ActiveNavLink {
  constructor() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
    });
  }

  updateActiveLink() {
    const scrollY = window.pageYOffset;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}


// ==========================================
// 13. GRID ANIMATION SPEED VARIATION
// ==========================================
class GridAnimation {
  constructor() {
    this.grid = document.querySelector('.hero-grid');
    this.init();
  }

  init() {
    if (!this.grid) return;

    window.addEventListener('scroll', () => {
      const scrollSpeed = window.pageYOffset * 0.5;
      this.grid.style.transform = `translate(${scrollSpeed}px, ${scrollSpeed}px)`;
    });
  }
}


// ==========================================
// 14. IMAGE FRAME CORNER ANIMATION
// ==========================================
class CornerAnimation {
  constructor() {
    this.frames = document.querySelectorAll('.image-frame');
    this.init();
  }

  init() {
    this.frames.forEach(frame => {
      const corners = frame.querySelectorAll('.corner-accent');

      frame.addEventListener('mouseenter', () => {
        corners.forEach((corner, index) => {
          setTimeout(() => {
            corner.style.transform = 'scale(1.5)';
            corner.style.borderColor = 'var(--yellow)';
          }, index * 50);
        });
      });

      frame.addEventListener('mouseleave', () => {
        corners.forEach(corner => {
          corner.style.transform = 'scale(1)';
          corner.style.borderColor = 'var(--yellow)';
        });
      });
    });
  }
}


// ==========================================
// 15. BUTTON RIPPLE EFFECT
// ==========================================
class ButtonRipple {
  constructor() {
    this.buttons = document.querySelectorAll('.btn');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple CSS
    this.addRippleStyles();
  }

  addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .btn {
        position: relative;
        overflow: hidden;
      }
      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}


// ==========================================
// INITIALIZE ALL ANIMATIONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animation classes
  new LoadingScreen();
  new CustomCursor();
  new ParallaxEffect();
  new ScrollReveal();
  new PhotoCardTilt();
  new PhotoCardAnimation();
  new StatsCounter();
  new ProjectCardAnimation();
  new TypingEffect();
  new NavbarAnimation();
  new SmoothScroll();
  new ActiveNavLink();
  new GridAnimation();
  new CornerAnimation();
  new ButtonRipple();

  console.log('%c✨ All Animations Initialized!', 'color: #ffd700; font-size: 16px; font-weight: bold;');
});