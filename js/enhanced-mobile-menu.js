/**
 * Enhanced Mobile Menu Controller for Quintessential Wellness
 * Provides smooth animations, accessibility support, and premium UX
 */

class QuintessentialMobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('wsnavtoggle');
        this.menu = document.querySelector('.wsmenu');
        this.menuList = document.querySelector('.wsmenu > .wsmenu-list');
        this.overlay = document.querySelector('.overlapblackbg');
        this.body = document.body;
        this.isOpen = false;
        this.focusableElements = [];
        this.firstFocusableElement = null;
        this.lastFocusableElement = null;
        
        this.init();
    }

    init() {
        this.addEventListeners();
        this.enhanceMenuItems();
        this.setupAccessibility();
        this.preventBodyScroll();
    }

    addEventListeners() {
        // Toggle menu
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMenu();
            });
        }

        // Close on overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.closeMenu();
            });
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991 && this.isOpen) {
                this.closeMenu();
            }
        });

        // Smooth scroll for anchor links
        this.handleSmoothScroll();
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.body.classList.add('wsactive');
        
        // Prevent body scroll
        this.body.style.overflow = 'hidden';
        
        // Set up focus management
        this.setupFocusManagement();
        
        // Add staggered animation to menu items
        this.animateMenuItems();
        
        // Trap focus in menu
        this.trapFocus();
    }

    closeMenu() {
        this.isOpen = false;
        this.body.classList.remove('wsactive');
        
        // Restore body scroll
        this.body.style.overflow = '';
        
        // Release focus trap
        this.releaseFocusTrap();
    }


    enhanceMenuItems() {
        const menuItems = this.menuList?.querySelectorAll('li > a');
        
        menuItems?.forEach((item, index) => {
            // Add click handler for navigation
            item.addEventListener('click', (e) => {
                // If it's an anchor link, handle smooth scroll
                const href = item.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.closeMenu();
                    
                    setTimeout(() => {
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, 300);
                } else if (href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                    // For internal pages, add slight delay for menu close animation
                    e.preventDefault();
                    this.closeMenu();
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });

            // Add hover effects
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(4px)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
            });
        });
    }

    setupAccessibility() {
        // Add ARIA attributes
        if (this.menuToggle) {
            this.menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            this.menuToggle.setAttribute('aria-expanded', 'false');
            this.menuToggle.setAttribute('aria-controls', 'mobile-menu');
        }

        if (this.menu) {
            this.menu.setAttribute('id', 'mobile-menu');
            this.menu.setAttribute('role', 'navigation');
            this.menu.setAttribute('aria-label', 'Main navigation');
        }
    }

    setupFocusManagement() {
        // Update ARIA attributes
        if (this.menuToggle) {
            this.menuToggle.setAttribute('aria-expanded', 'true');
        }

        // Get all focusable elements in menu
        this.focusableElements = this.menu?.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        ) || [];

        if (this.focusableElements.length > 0) {
            this.firstFocusableElement = this.focusableElements[0];
            this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
        }
    }

    trapFocus() {
        if (this.focusableElements.length === 0) return;

        // Focus first element
        this.firstFocusableElement?.focus();

        // Add keyboard trap
        this.focusTrapHandler = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === this.firstFocusableElement) {
                        e.preventDefault();
                        this.lastFocusableElement?.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === this.lastFocusableElement) {
                        e.preventDefault();
                        this.firstFocusableElement?.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', this.focusTrapHandler);
    }

    releaseFocusTrap() {
        if (this.menuToggle) {
            this.menuToggle.setAttribute('aria-expanded', 'false');
            this.menuToggle.focus();
        }

        if (this.focusTrapHandler) {
            document.removeEventListener('keydown', this.focusTrapHandler);
            this.focusTrapHandler = null;
        }
    }

    animateMenuItems() {
        const menuItems = this.menuList?.querySelectorAll('li');
        
        menuItems?.forEach((item, index) => {
            // Reset animation
            item.style.opacity = '0';
            item.style.transform = 'translateX(30px)';
            
            // Animate with delay
            setTimeout(() => {
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50 + 100);
        });
    }

    preventBodyScroll() {
        // Enhanced scroll prevention for iOS and other touch devices
        let startY = 0;
        let startX = 0;

        if (this.menu) {
            this.menu.addEventListener('touchstart', (e) => {
                startY = e.touches[0].clientY;
                startX = e.touches[0].clientX;
            }, { passive: true });

            this.menu.addEventListener('touchmove', (e) => {
                const currentY = e.touches[0].clientY;
                const currentX = e.touches[0].clientX;
                const element = this.menuList;
                
                if (!element) return;

                const scrollTop = element.scrollTop;
                const scrollHeight = element.scrollHeight;
                const clientHeight = element.clientHeight;

                // Prevent horizontal scroll
                if (Math.abs(currentX - startX) > Math.abs(currentY - startY)) {
                    e.preventDefault();
                    return;
                }

                // Prevent overscroll at top and bottom
                if ((scrollTop === 0 && currentY > startY) || 
                    (scrollTop + clientHeight >= scrollHeight && currentY < startY)) {
                    e.preventDefault();
                }
            }, { passive: false });
        }
    }

    handleSmoothScroll() {
        // Enhanced smooth scrolling for all anchor links
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a[href^="#"]');
            if (!target) return;

            const href = target.getAttribute('href');
            if (!href || href === '#') return;

            const element = document.querySelector(href);
            if (!element) return;

            e.preventDefault();

            // Close menu if it's open
            if (this.isOpen) {
                this.closeMenu();
            }

            // Smooth scroll with offset for fixed header
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const elementPosition = element.offsetTop - headerHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize enhanced mobile menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new QuintessentialMobileMenu();
});

// Handle page load for any late-loading elements
window.addEventListener('load', () => {
    // Re-initialize if needed
    if (!window.quintessentialMobileMenu) {
        window.quintessentialMobileMenu = new QuintessentialMobileMenu();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuintessentialMobileMenu;
}