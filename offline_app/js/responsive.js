// Responsive utilities for mobile web app
class ResponsiveManager {
    constructor() {
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.updateViewportHeight();
        this.detectDeviceType();
        this.setupTouchOptimizations();
        this.handleOrientationChange();
    }

    setupEventListeners() {
        // Handle viewport changes
        window.addEventListener('resize', this.debounce(() => {
            this.updateViewportHeight();
            this.handleOrientationChange();
        }, 100));

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            // Delay to allow browser to update dimensions
            setTimeout(() => {
                this.updateViewportHeight();
                this.handleOrientationChange();
            }, 100);
        });

        // Handle visual viewport API if supported
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => {
                this.updateViewportHeight();
            });
        }

        // Handle touch events for better responsiveness
        document.addEventListener('touchstart', () => {}, { passive: true });
    }

    updateViewportHeight() {
        // Update CSS custom property with actual viewport height
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Update for dynamic viewport height
        const dvh = window.visualViewport ? window.visualViewport.height * 0.01 : vh;
        document.documentElement.style.setProperty('--dvh', `${dvh}px`);
    }

    detectDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        
        // Device detection
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i.test(userAgent);
        const isDesktop = !isMobile && !isTablet;
        
        // Screen size detection
        const isSmallScreen = screenWidth <= 576;
        const isMediumScreen = screenWidth > 576 && screenWidth <= 768;
        const isLargeScreen = screenWidth > 768;
        
        // Add classes to body
        document.body.classList.toggle('is-mobile', isMobile);
        document.body.classList.toggle('is-tablet', isTablet);
        document.body.classList.toggle('is-desktop', isDesktop);
        document.body.classList.toggle('is-small-screen', isSmallScreen);
        document.body.classList.toggle('is-medium-screen', isMediumScreen);
        document.body.classList.toggle('is-large-screen', isLargeScreen);
        
        // Add pixel ratio class
        const pixelRatio = window.devicePixelRatio || 1;
        document.body.classList.toggle('is-retina', pixelRatio > 1);
        
        // Set CSS custom properties for JS access
        document.documentElement.style.setProperty('--screen-width', `${screenWidth}px`);
        document.documentElement.style.setProperty('--screen-height', `${screenHeight}px`);
        document.documentElement.style.setProperty('--pixel-ratio', pixelRatio);
    }

    handleOrientationChange() {
        const orientation = window.screen?.orientation?.type || 
                           (window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
        
        document.body.classList.toggle('is-portrait', orientation.includes('portrait'));
        document.body.classList.toggle('is-landscape', orientation.includes('landscape'));
        
        // Handle keyboard visibility on mobile
        if (window.visualViewport && window.visualViewport.height < window.innerHeight * 0.75) {
            document.body.classList.add('keyboard-visible');
        } else {
            document.body.classList.remove('keyboard-visible');
        }
    }

    setupTouchOptimizations() {
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Add touch classes for better styling
        document.body.classList.add('touch-enabled');
        
        // Handle touch feedback
        const touchElements = document.querySelectorAll('button, .btn, .lesson-item, .action-btn, .mobile-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
    }

    // Utility function for debouncing
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
    }

    // Get current breakpoint
    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        if (width < 1400) return 'xl';
        return 'xxl';
    }

    // Check if current screen size matches breakpoint
    isBreakpoint(breakpoint) {
        return this.getCurrentBreakpoint() === breakpoint;
    }

    // Check if current screen size is at least the given breakpoint
    isBreakpointUp(breakpoint) {
        const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
        const currentIndex = breakpoints.indexOf(this.getCurrentBreakpoint());
        const targetIndex = breakpoints.indexOf(breakpoint);
        return currentIndex >= targetIndex;
    }

    // Check if current screen size is below the given breakpoint
    isBreakpointDown(breakpoint) {
        const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
        const currentIndex = breakpoints.indexOf(this.getCurrentBreakpoint());
        const targetIndex = breakpoints.indexOf(breakpoint);
        return currentIndex < targetIndex;
    }
}

// Initialize responsive manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.responsiveManager = new ResponsiveManager();
    
    // Make utilities globally available
    window.getCurrentBreakpoint = () => window.responsiveManager.getCurrentBreakpoint();
    window.isBreakpoint = (bp) => window.responsiveManager.isBreakpoint(bp);
    window.isBreakpointUp = (bp) => window.responsiveManager.isBreakpointUp(bp);
    window.isBreakpointDown = (bp) => window.responsiveManager.isBreakpointDown(bp);
});

// Handle PWA installation prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button if you have one
    const installButton = document.querySelector('#install-button');
    if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
            });
        });
    }
});

// Handle app installation
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    const installButton = document.querySelector('#install-button');
    if (installButton) {
        installButton.style.display = 'none';
    }
});

// Performance optimization: Preload critical resources
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical fonts
    const fontPreloads = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-solid-900.woff2',
    ];
    
    fontPreloads.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResponsiveManager;
}