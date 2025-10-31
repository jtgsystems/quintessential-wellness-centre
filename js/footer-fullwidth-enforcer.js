/* JavaScript Footer Content Position Enforcer - Corrected */
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.getElementById('footer-1');
    const bottomFooter = document.querySelector('.bottom-footer');
    
    function enforceProperLayout() {
        if (footer) {
            // Reset any problematic inline styles
            footer.style.left = 'auto';
            footer.style.right = 'auto';
            footer.style.marginLeft = '0';
            footer.style.marginRight = '0';
            footer.style.transform = 'none';
            footer.style.position = 'relative';
            footer.style.width = '100%';
            footer.style.maxWidth = 'none';
            
            // Ensure containers are properly centered
            const footerContainer = footer.querySelector('.container');
            if (footerContainer) {
                footerContainer.style.marginLeft = 'auto';
                footerContainer.style.marginRight = 'auto';
                footerContainer.style.left = 'auto';
                footerContainer.style.right = 'auto';
                footerContainer.style.transform = 'none';
                footerContainer.style.maxWidth = '1200px';
                footerContainer.style.width = 'auto';
                footerContainer.style.position = 'relative';
            }
        }
        
        if (bottomFooter) {
            // Reset bottom footer positioning
            bottomFooter.style.left = 'auto';
            bottomFooter.style.right = 'auto';
            bottomFooter.style.marginLeft = '0';
            bottomFooter.style.marginRight = '0';
            bottomFooter.style.transform = 'none';
            bottomFooter.style.position = 'relative';
            bottomFooter.style.width = '100%';
            
            const bottomContainer = bottomFooter.querySelector('.container');
            if (bottomContainer) {
                bottomContainer.style.marginLeft = 'auto';
                bottomContainer.style.marginRight = 'auto';
                bottomContainer.style.left = 'auto';
                bottomContainer.style.right = 'auto';
                bottomContainer.style.transform = 'none';
                bottomContainer.style.maxWidth = '1200px';
                bottomContainer.style.width = 'auto';
                bottomContainer.style.position = 'relative';
            }
        }
    }
    
    // Execute layout fixes
    enforceProperLayout();
    
    // Re-execute on window resize
    window.addEventListener('resize', enforceProperLayout);
    
    // Execute after potential DOM modifications
    setTimeout(enforceProperLayout, 100);
    setTimeout(enforceProperLayout, 500);
});
