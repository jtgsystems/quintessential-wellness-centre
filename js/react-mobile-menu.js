/**
 * React Mobile Menu Handler for Quintessential Wellness
 * Ensures proper mobile menu functionality within React SPA
 */

class ReactMobileMenuHandler {
    constructor() {
        this.initialized = false;
        this.menuActive = false;
        this.init();
    }

    init() {
        // Wait for jQuery and DOM to be ready
        this.waitForDependencies(() => {
            this.setupMobileMenu();
            this.addEventListeners();
            this.initialized = true;
        });
    }

    waitForDependencies(callback) {
        const checkDependencies = () => {
            if (window.jQuery && document.querySelector('.wsmobileheader')) {
                callback();
            } else {
                setTimeout(checkDependencies, 100);
            }
        };
        checkDependencies();
    }

    setupMobileMenu() {
        const $ = window.jQuery;
        
        // Ensure menu container exists
        if (!$('.wsmenucontainer').length) {
            $('body').wrapInner('<div class="wsmenucontainer" />');
        }
        
        // Ensure overlay exists
        if (!$('.overlapblackbg').length) {
            $('<div class="overlapblackbg"></div>').prependTo('.wsmenu');
        }
        
        // Add sub-menu arrows if they don't exist
        if (!$('.wsmenu-click').length) {
            $('.wsmenu > .wsmenu-list > li').has('.sub-menu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
            $('.wsmenu > .wsmenu-list > li').has('.wsmegamenu').prepend('<span class="wsmenu-click"><i class="wsmenu-arrow"></i></span>');
        }
        
        // Ensure proper mobile header structure
        this.fixMobileHeader();
    }

    fixMobileHeader() {
        const mobileHeader = document.querySelector('.wsmobileheader');
        if (!mobileHeader) return;

        // Ensure mobile header has proper structure
        const logo = mobileHeader.querySelector('.smllogo');
        const toggle = mobileHeader.querySelector('#wsnavtoggle');

        if (logo && !logo.querySelector('img')) {
            logo.innerHTML = '<img src="/images/logo-01.png" width="170" height="50" alt="Quintessential Wellness Mobile Logo" loading="lazy" />';
        }

        if (toggle && !toggle.querySelector('span')) {
            toggle.innerHTML = '<span></span>';
        }

        // Add proper classes
        if (!toggle.classList.contains('wsanimated-arrow')) {
            toggle.classList.add('wsanimated-arrow');
        }
    }

    addEventListeners() {
        const $ = window.jQuery;

        // Remove existing handlers to prevent duplicates
        $('#wsnavtoggle').off('click.reactMenu');
        $('.overlapblackbg').off('click.reactMenu');
        $('.wsmenu-click').off('click.reactMenu');
        $(window).off('resize.reactMenu');

        // Mobile menu toggle
        $('#wsnavtoggle').on('click.reactMenu', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });

        // Close on overlay click
        $('.overlapblackbg').on('click.reactMenu', () => {
            this.closeMenu();
        });

        // Sub-menu toggles
        $('.wsmenu-click').on('click.reactMenu', function() {
            const $this = $(this);
            $this.toggleClass('ws-activearrow')
                .parent().siblings().children().removeClass('ws-activearrow');
            
            $('.wsmenu > .wsmenu-list > li > .sub-menu, .wsmegamenu')
                .not($this.siblings('.sub-menu, .wsmegamenu'))
                .slideUp('slow');
            
            $this.siblings('.sub-menu').slideToggle('slow');
            $this.siblings('.wsmegamenu').slideToggle('slow');
        });

        // Handle window resize
        $(window).on('resize.reactMenu', () => {
            if (window.innerWidth >= 992 && this.menuActive) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        $(document).on('keydown.reactMenu', (e) => {
            if (e.key === 'Escape' && this.menuActive) {
                this.closeMenu();
            }
        });

        // Handle navigation clicks
        $('.wsmenu a').on('click.reactMenu', (e) => {
            const href = e.currentTarget.getAttribute('href');
            
            // If it's an internal link, close the menu
            if (href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                setTimeout(() => {
                    this.closeMenu();
                }, 100);
            }
        });
    }

    toggleMenu() {
        if (this.menuActive) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        const $ = window.jQuery;
        
        this.menuActive = true;
        $('body').addClass('wsactive');
        
        // Prevent body scroll
        $('body').css('overflow', 'hidden');
        
        // Add ARIA attributes
        $('#wsnavtoggle').attr('aria-expanded', 'true');
        
        // Animate menu items
        this.animateMenuItems();
        
        // Focus management
        setTimeout(() => {
            const firstMenuItem = $('.wsmenu .wsmenu-list li:first-child a')[0];
            if (firstMenuItem) {
                firstMenuItem.focus();
            }
        }, 300);
    }

    closeMenu() {
        const $ = window.jQuery;
        
        this.menuActive = false;
        $('body').removeClass('wsactive');
        
        // Restore body scroll
        $('body').css('overflow', '');
        
        // Update ARIA attributes
        $('#wsnavtoggle').attr('aria-expanded', 'false');
        
        // Return focus to toggle button
        setTimeout(() => {
            $('#wsnavtoggle')[0]?.focus();
        }, 100);
    }

    animateMenuItems() {
        const $ = window.jQuery;
        const menuItems = $('.wsmenu .wsmenu-list > li');
        
        menuItems.each(function(index) {
            const $item = $(this);
            $item.css({
                'opacity': '0',
                'transform': 'translateX(30px)'
            });
            
            setTimeout(() => {
                $item.css({
                    'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    'opacity': '1',
                    'transform': 'translateX(0)'
                });
            }, index * 50 + 100);
        });
    }

    // Public method to reinitialize (useful for React route changes)
    reinitialize() {
        if (this.initialized) {
            this.closeMenu();
            setTimeout(() => {
                this.setupMobileMenu();
                this.addEventListeners();
            }, 100);
        } else {
            this.init();
        }
    }

    // Public method to close menu (useful for React navigation)
    forceClose() {
        this.closeMenu();
    }
}

// Initialize the mobile menu handler
let reactMobileMenu;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    reactMobileMenu = new ReactMobileMenuHandler();
});

// Reinitialize on page load (for any late-loading content)
window.addEventListener('load', () => {
    if (!reactMobileMenu) {
        reactMobileMenu = new ReactMobileMenuHandler();
    } else {
        reactMobileMenu.reinitialize();
    }
});

// Make it globally available for React components
window.ReactMobileMenu = {
    getInstance: () => reactMobileMenu,
    reinitialize: () => reactMobileMenu?.reinitialize(),
    close: () => reactMobileMenu?.forceClose()
};

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    if (reactMobileMenu) {
        reactMobileMenu.forceClose();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReactMobileMenuHandler;
}