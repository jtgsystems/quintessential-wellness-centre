/**
 * React Mobile Menu Handler
 * Adds mobile menu functionality to React navigation
 */

(function() {
  'use strict';
  
  function initMobileMenu() {
    // Wait for React to render
    setTimeout(() => {
      const header = document.querySelector('header') || document.querySelector('[role="banner"]');
      const nav = header?.querySelector('nav') || header?.querySelector('navigation');
      
      if (!header || !nav) {
        // Retry if elements not ready
        if (document.querySelector('#root').children.length === 0) {
          setTimeout(initMobileMenu, 500);
          return;
        }
      }
      
      // Create mobile menu toggle button
      if (!document.querySelector('.mobile-menu-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-menu-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle mobile menu');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = '<span></span>';
        
        if (header) {
          header.appendChild(toggleBtn);
        }
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
        
        // Toggle menu function
        const toggleMenu = () => {
          const isOpen = nav.classList.contains('mobile-open');
          
          if (isOpen) {
            nav.classList.remove('mobile-open');
            toggleBtn.classList.remove('active');
            overlay.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          } else {
            nav.classList.add('mobile-open');
            toggleBtn.classList.add('active');
            overlay.classList.add('active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
          }
        };
        
        // Event listeners
        toggleBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        // Close menu when clicking nav links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
              toggleMenu();
            }
          });
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
          if (window.innerWidth > 991 && nav.classList.contains('mobile-open')) {
            toggleMenu();
          }
        });
      }
    }, 1000);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
