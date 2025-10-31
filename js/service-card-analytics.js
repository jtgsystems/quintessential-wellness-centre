/* SERVICE CARD PERFORMANCE OPTIMIZATION & ANALYTICS */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const ServiceCardAnalytics = {
        
        // Performance monitoring initialization
        init() {
            this.setupIntersectionObserver();
            this.setupPerformanceMonitoring();
            this.setupAccessibilityEnhancements();
            this.setupErrorHandling();
        },
        
        // Intersection Observer for lazy loading and analytics
        setupIntersectionObserver() {
            if ('IntersectionObserver' in window) {
                const cardObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const card = entry.target;
                            this.trackCardView(card);
                            this.preloadCardAssets(card);
                        }
                    });
                }, {
                    threshold: 0.5,
                    rootMargin: '50px'
                });
                
                // Observe all service cards
                document.querySelectorAll('.service-card-enhanced').forEach(card => {
                    cardObserver.observe(card);
                });
            }
        },
        
        // Performance metrics collection
        setupPerformanceMonitoring() {
            if ('PerformanceObserver' in window) {
                // Largest Contentful Paint (LCP) monitoring
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    
                    if (lastEntry.element && 
                        lastEntry.element.closest('.service-card-enhanced')) {
                        this.trackPerformanceMetric('LCP', lastEntry.startTime, {
                            cardId: lastEntry.element.closest('.service-card-enhanced').id || 'anonymous',
                            elementType: lastEntry.element.tagName
                        });
                    }
                });
                
                try {
                    lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
                } catch (e) {
                    console.warn('LCP observer not supported:', e);
                }
                
                // First Input Delay (FID) monitoring
                const fidObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                        this.trackPerformanceMetric('FID', entry.processingStart - entry.startTime);
                    });
                });
                
                try {
                    fidObserver.observe({entryTypes: ['first-input']});
                } catch (e) {
                    console.warn('FID observer not supported:', e);
                }
            }
        },
        
        // Accessibility enhancements
        setupAccessibilityEnhancements() {
            document.querySelectorAll('.service-card-enhanced').forEach(card => {
                // Keyboard navigation support
                card.setAttribute('tabindex', '0');
                
                // ARIA enhancements
                if (!card.getAttribute('aria-label')) {
                    const title = card.querySelector('.service-title-enhanced');
                    if (title) {
                        card.setAttribute('aria-label', 
                            `Service card: ${title.textContent.trim()}`);
                    }
                }
                
                // Focus management
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleCardInteraction(card, 'keyboard');
                    }
                });
                
                // Mouse interaction tracking
                card.addEventListener('click', () => {
                    this.handleCardInteraction(card, 'mouse');
                });
            });
        },
        
        // Error handling and resilience
        setupErrorHandling() {
            window.addEventListener('error', (e) => {
                if (e.target && e.target.closest('.service-card-enhanced')) {
                    this.trackError({
                        type: 'image_load_error',
                        card: e.target.closest('.service-card-enhanced').id || 'anonymous',
                        source: e.target.src || 'unknown',
                        message: e.message
                    });
                    
                    // Fallback handling for failed images
                    if (e.target.tagName === 'IMG') {
                        this.handleImageError(e.target);
                    }
                }
            }, true);
        },
        
        // Card view tracking
        trackCardView(card) {
            const cardData = this.extractCardData(card);
            
            // Analytics tracking (replace with your analytics service)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'card_view', {
                    event_category: 'service_cards',
                    event_label: cardData.title,
                    custom_map: {
                        card_type: cardData.type,
                        card_position: cardData.position
                    }
                });
            }
            
            // Performance timing
            performance.mark(`card-${cardData.id}-viewed`);
        },
        
        // Card interaction handling
        handleCardInteraction(card, method) {
            const cardData = this.extractCardData(card);
            
            // Track interaction
            this.trackInteraction(cardData, method);
            
            // Visual feedback
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Potential navigation (customize as needed)
            // window.location.href = `#${cardData.id}-details`;
        },
        
        // Asset preloading for performance
        preloadCardAssets(card) {
            const images = card.querySelectorAll('img[data-src]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        },
        
        // Image error handling with fallback
        handleImageError(img) {
            const card = img.closest('.service-card-enhanced');
            const fallbackColor = card.classList.contains('bg-color-03') ? 
                '#E8A798' : '#9BB4A3';
            
            // Create fallback placeholder
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, ${fallbackColor}, rgba(255,255,255,0.2));
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 3rem;
                border-radius: 15px;
            `;
            placeholder.innerHTML = '<i class="fas fa-spa"></i>';
            
            img.parentNode.replaceChild(placeholder, img);
        },
        
        // Data extraction utilities
        extractCardData(card) {
            const title = card.querySelector('.service-title-enhanced');
            const badge = card.querySelector('.badge-text');
            
            return {
                id: card.id || 'anonymous',
                title: title ? title.textContent.trim() : 'Unknown',
                type: badge ? badge.textContent.trim() : 'Unknown',
                position: Array.from(card.parentNode.children).indexOf(card) + 1
            };
        },
        
        // Performance metric tracking
        trackPerformanceMetric(metric, value, context = {}) {
            // Custom analytics implementation
            const data = {
                metric: metric,
                value: Math.round(value),
                context: context,
                timestamp: Date.now(),
                url: window.location.pathname
            };
            
            // Send to analytics service (customize endpoint)
            // this.sendAnalytics('performance', data);
            
            console.info(`Performance ${metric}:`, data);
        },
        
        // Interaction tracking
        trackInteraction(cardData, method) {
            const data = {
                action: 'card_interaction',
                method: method,
                card: cardData,
                timestamp: Date.now()
            };
            
            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'card_interaction', {
                    event_category: 'engagement',
                    event_label: cardData.title,
                    method: method
                });
            }
            
            console.info('Card interaction:', data);
        },
        
        // Error tracking
        trackError(errorData) {
            console.error('Service card error:', errorData);
            
            // Error reporting service integration
            // this.sendAnalytics('error', errorData);
        },
        
        // Analytics sender (implement with your service)
        sendAnalytics(type, data) {
            // Example implementation - replace with your analytics service
            /*
            fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, data })
            }).catch(console.error);
            */
        }
    };
    
    // Initialize on DOM ready
    ServiceCardAnalytics.init();
    
    // Global access for debugging
    window.ServiceCardAnalytics = ServiceCardAnalytics;
});
