// Mobile App JavaScript for Ethical Hacking Tutorial

class MobileApp {
    constructor() {
        this.init();
    }

    init() {
        this.updateStatusTime();
        this.initializeEventListeners();
        this.initializeSwipeGestures();
        this.initializePWA();
        this.startStatusTimeUpdate();
        
        console.log('Mobile App initialized successfully');
    }

    // Update status bar time
    updateStatusTime() {
        const timeElement = document.getElementById('statusTime');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            timeElement.textContent = timeString;
        }
    }

    // Start updating time every minute
    startStatusTimeUpdate() {
        setInterval(() => {
            this.updateStatusTime();
        }, 60000); // Update every minute
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Handle dark mode toggle
        this.initializeDarkModeToggle();

        // Handle search overlay
        window.toggleSearch = () => {
            const overlay = document.getElementById('searchOverlay');
            const isActive = overlay.classList.contains('active');
            
            if (isActive) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Focus search input after animation
                setTimeout(() => {
                    const searchInput = overlay.querySelector('.search-input');
                    if (searchInput) searchInput.focus();
                }, 100);
            }
        };

        // Handle progress modal
        window.showProgressModal = () => {
            const progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
            progressModal.show();
        };

        // Handle settings modal
        window.showSettingsModal = () => {
            const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
            settingsModal.show();
        };

        // Handle lesson completion
        window.completeLesson = (lessonId) => {
            const button = document.querySelector(`[onclick="completeLesson(${lessonId})"]`);
            if (button) {
                button.classList.add('loading');
                button.disabled = true;
            }

            fetch(`/complete/${lessonId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.showNotification('Lesson completed!', 'success');
                    // Update UI
                    if (button) {
                        button.innerHTML = '<i class="fas fa-check me-2"></i>Completed';
                        button.classList.remove('btn-primary');
                        button.classList.add('btn-success');
                        button.disabled = true;
                    }
                } else {
                    this.showNotification('Failed to complete lesson', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                this.showNotification('Network error', 'error');
            })
            .finally(() => {
                if (button) {
                    button.classList.remove('loading');
                    button.disabled = false;
                }
            });
        };

        // Handle back button
        this.handleBackButton();

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // ESC key closes search overlay
            if (e.key === 'Escape') {
                const overlay = document.getElementById('searchOverlay');
                if (overlay && overlay.classList.contains('active')) {
                    window.toggleSearch();
                }
            }
            
            // Ctrl/Cmd + K opens search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                window.toggleSearch();
            }
        });

        // Handle form submissions
        this.initializeFormHandlers();
    }

    // Initialize swipe gestures
    initializeSwipeGestures() {
        let startX = null;
        let startY = null;
        const threshold = 100; // Minimum distance for swipe
        const restraint = 100; // Maximum perpendicular distance

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const touch = e.changedTouches[0];
            const distX = touch.clientX - startX;
            const distY = touch.clientY - startY;

            // Check if horizontal swipe
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                if (distX > 0) {
                    // Swipe right - go back
                    if (window.location.pathname !== '/') {
                        this.handleSwipeBack();
                    }
                } else {
                    // Swipe left - next lesson (if applicable)
                    this.handleSwipeNext();
                }
            }

            startX = null;
            startY = null;
        }, { passive: true });
    }

    // Handle swipe back
    handleSwipeBack() {
        const backButton = document.querySelector('.back-btn');
        if (backButton) {
            // Add visual feedback
            backButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backButton.style.transform = '';
                window.history.back();
            }, 150);
        }
    }

    // Handle swipe next
    handleSwipeNext() {
        const currentLessonId = this.getCurrentLessonId();
        if (currentLessonId && currentLessonId < 10) {
            window.location.href = `/lesson/${currentLessonId + 1}`;
        }
    }

    // Get current lesson ID
    getCurrentLessonId() {
        const path = window.location.pathname;
        const match = path.match(/\/lesson\/(\d+)/);
        return match ? parseInt(match[1]) : null;
    }

    // Handle back button behavior
    handleBackButton() {
        window.addEventListener('popstate', (e) => {
            // Custom back button behavior if needed
            console.log('Back button pressed');
        });
    }

    // Initialize form handlers
    initializeFormHandlers() {
        // Search form
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                const input = searchForm.querySelector('.search-input');
                if (input && !input.value.trim()) {
                    e.preventDefault();
                    this.showNotification('Please enter a search term', 'warning');
                }
            });
        }

        // Progress reset form
        const resetForm = document.querySelector('form[action*="reset-progress"]');
        if (resetForm) {
            resetForm.addEventListener('submit', (e) => {
                if (!confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
                    e.preventDefault();
                }
            });
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)} me-2"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: calc(var(--status-bar-height) + var(--header-height) + 16px);
            left: 50%;
            transform: translateX(-50%);
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 2001;
            max-width: calc(100% - 32px);
            animation: slideDown 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Get notification icon
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Get notification color
    getNotificationColor(type) {
        const colors = {
            success: '#198754',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#0dcaf0'
        };
        return colors[type] || '#0dcaf0';
    }

    // Initialize PWA features
    initializePWA() {
        this.registerServiceWorker();
        this.handleInstallPrompt();
        this.handleOnlineOffline();
        this.initializeBackgroundSync();
    }

    // Register service worker
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/static/sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully:', registration);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                this.showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });

            // Listen for messages from service worker
            navigator.serviceWorker.addEventListener('message', event => {
                this.handleServiceWorkerMessage(event.data);
            });
        }
    }

    // Handle install prompt
    handleInstallPrompt() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            this.showInstallBanner(deferredPrompt);
        });

        window.addEventListener('appinstalled', (e) => {
            console.log('PWA installed successfully');
            this.showNotification('App installed! Access it from your home screen', 'success');
            this.hideInstallBanner();
        });
    }

    // Handle online/offline status
    handleOnlineOffline() {
        window.addEventListener('online', () => {
            this.showNotification('Connection restored - syncing data', 'success');
            this.syncOfflineData();
        });

        window.addEventListener('offline', () => {
            this.showNotification('You are offline - cached content available', 'warning');
        });

        // Initial status check
        if (!navigator.onLine) {
            setTimeout(() => {
                this.showNotification('Offline mode - limited functionality', 'info');
            }, 1000);
        }
    }

    // Initialize background sync
    initializeBackgroundSync() {
        if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
            navigator.serviceWorker.ready.then(registration => {
                return registration.sync.register('background-sync');
            }).catch(error => {
                console.log('Background sync registration failed:', error);
            });
        }
    }

    // Show install banner
    showInstallBanner(deferredPrompt) {
        const banner = document.createElement('div');
        banner.id = 'install-banner';
        banner.className = 'install-banner';
        banner.innerHTML = `
            <div class="install-content">
                <div class="install-icon">
                    <i class="fas fa-download"></i>
                </div>
                <div class="install-text">
                    <h6>Install App</h6>
                    <small>Add to home screen for quick access</small>
                </div>
                <div class="install-actions">
                    <button class="btn btn-primary btn-sm" id="install-btn">Install</button>
                    <button class="btn btn-outline-secondary btn-sm" id="dismiss-btn">Not Now</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Handle install button
        banner.querySelector('#install-btn').addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                this.hideInstallBanner();
            });
        });

        // Handle dismiss button
        banner.querySelector('#dismiss-btn').addEventListener('click', () => {
            this.hideInstallBanner();
        });

        // Auto hide after 10 seconds
        setTimeout(() => {
            this.hideInstallBanner();
        }, 10000);
    }

    // Hide install banner
    hideInstallBanner() {
        const banner = document.getElementById('install-banner');
        if (banner) {
            banner.classList.add('fade-out');
            setTimeout(() => banner.remove(), 300);
        }
    }

    // Show update notification
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.className = 'update-notification';
        notification.innerHTML = `
            <div class="update-content">
                <i class="fas fa-sync-alt"></i>
                <span>New version available!</span>
                <button class="btn btn-sm btn-primary" onclick="location.reload()">Update</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto hide after 8 seconds
        setTimeout(() => {
            notification.remove();
        }, 8000);
    }

    // Handle service worker messages
    handleServiceWorkerMessage(data) {
        switch (data.type) {
            case 'BACKGROUND_SYNC':
                this.showNotification(data.message, 'info');
                break;
            case 'CACHE_UPDATED':
                this.showNotification('Content updated for offline use', 'success');
                break;
            case 'OFFLINE_READY':
                this.showNotification('App ready for offline use', 'success');
                break;
        }
    }

    // Sync offline data
    syncOfflineData() {
        // Sync any offline lesson completions or progress
        const offlineData = localStorage.getItem('offlineData');
        if (offlineData) {
            try {
                const data = JSON.parse(offlineData);
                // Process offline completions
                if (data.completions && data.completions.length > 0) {
                    data.completions.forEach(completion => {
                        this.syncLessonCompletion(completion);
                    });
                }
                // Clear synced data
                localStorage.removeItem('offlineData');
            } catch (error) {
                console.error('Error syncing offline data:', error);
            }
        }
    }

    // Sync lesson completion
    async syncLessonCompletion(completion) {
        try {
            const response = await fetch(`/complete/${completion.lessonId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ offline: true })
            });
            
            if (response.ok) {
                console.log(`Synced completion for lesson ${completion.lessonId}`);
            }
        } catch (error) {
            console.error('Error syncing lesson completion:', error);
        }
    }

    // Cache lesson for offline access
    cacheLessonForOffline(lessonId) {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.active.postMessage({
                    type: 'CACHE_LESSON',
                    lessonId: lessonId
                });
            });
        }
    }

    // Show install prompt
    showInstallPrompt() {
        // You can add a custom install button here
        console.log('App can be installed');
    }

    // Haptic feedback (if supported)
    hapticFeedback(type = 'medium') {
        if (navigator.vibrate) {
            const patterns = {
                light: [10],
                medium: [20],
                heavy: [30],
                double: [20, 10, 20]
            };
            navigator.vibrate(patterns[type] || patterns.medium);
        }
    }

    // Handle network status
    initializeNetworkHandling() {
        window.addEventListener('online', () => {
            this.showNotification('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('No internet connection', 'warning');
        });
    }

    // Lazy load images
    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Handle focus trap for modals
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }

    // Handle dynamic content loading
    loadContent(url, container) {
        const loader = document.createElement('div');
        loader.className = 'loading-spinner';
        loader.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        container.appendChild(loader);

        return fetch(url)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                this.initializeNewContent(container);
            })
            .catch(error => {
                console.error('Error loading content:', error);
                container.innerHTML = '<p>Error loading content</p>';
            });
    }

    // Initialize new dynamic content
    initializeNewContent(container) {
        // Re-initialize any needed features for new content
        this.initializeLazyLoading();
        
        // Add fade-in animation
        container.classList.add('fade-in');
    }

    // Initialize dark mode toggle
    initializeDarkModeToggle() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const darkModeIcon = document.getElementById('darkModeIcon');
        const darkModeDescription = document.getElementById('darkModeDescription');
        
        if (!darkModeToggle) return;

        // Get current theme preference
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const isDark = currentTheme === 'dark';
        
        // Set initial state
        darkModeToggle.checked = isDark;
        this.updateThemeUI(isDark, darkModeIcon, darkModeDescription);
        this.applyTheme(currentTheme);

        // Handle toggle change
        darkModeToggle.addEventListener('change', (e) => {
            const isDarkMode = e.target.checked;
            const theme = isDarkMode ? 'dark' : 'light';
            
            // Save preference
            localStorage.setItem('theme', theme);
            
            // Apply theme
            this.applyTheme(theme);
            this.updateThemeUI(isDarkMode, darkModeIcon, darkModeDescription);
            
            // Show feedback
            this.showNotification(
                `${isDarkMode ? 'Dark' : 'Light'} mode enabled`, 
                'success'
            );
            
            // Haptic feedback
            this.hapticFeedback('light');
        });
    }

    // Apply theme to the document
    applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;
        
        if (theme === 'dark') {
            html.setAttribute('data-bs-theme', 'dark');
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            html.setAttribute('data-bs-theme', 'light');
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
    }

    // Update theme UI elements
    updateThemeUI(isDark, iconElement, descriptionElement) {
        if (iconElement) {
            iconElement.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = isDark 
                ? 'Dark theme for cybersecurity focus'
                : 'Light theme for better visibility';
        }
    }
}

// Initialize the mobile app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mobileApp = new MobileApp();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
    
    .loading-spinner {
        text-align: center;
        padding: 20px;
        color: var(--primary-color);
        font-size: 24px;
    }
`;
document.head.appendChild(style);

// Export for use in other scripts
window.MobileApp = MobileApp;