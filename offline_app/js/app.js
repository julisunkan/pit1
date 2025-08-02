/**
 * Ethical Hacking Tutorial - Main JavaScript Application
 * Provides enhanced user experience and interactivity
 */

// Main application object
const EthicalHackingApp = {
    // Configuration
    config: {
        animationDuration: 300,
        scrollOffset: 80,
        progressUpdateDelay: 100
    },

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.initializeProgressTracking();
        this.initializeCodeSyntaxHighlighting();
        this.initializeSearchEnhancements();
        this.initializeNavigationEnhancements();
        this.initializeLessonInteractivity();
        this.initializeAccessibility();
        console.log('Ethical Hacking Tutorial App initialized');
    },

    // Set up global event listeners
    setupEventListeners() {
        // Handle page load
        document.addEventListener('DOMContentLoaded', () => {
            this.handlePageLoad();
        });

        // Handle scroll events for navigation
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 100));

        // Handle resize events
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Handle focus management
        document.addEventListener('focusin', (e) => {
            this.handleFocusManagement(e);
        });
    },

    // Handle page load events
    handlePageLoad() {
        // Animate elements on page load
        this.animateElementsOnLoad();
        
        // Initialize tooltips
        this.initializeTooltips();
        
        // Check for any pending animations
        this.checkPendingAnimations();
        
        // Update progress indicators
        this.updateProgressIndicators();
        
        // Initialize code copy functionality
        this.initializeCodeCopyButtons();
    },

    // Initialize progress tracking functionality
    initializeProgressTracking() {
        // Animate progress bars
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, this.config.progressUpdateDelay);
        });

        // Track lesson completion
        this.trackLessonProgress();
    },

    // Initialize code syntax highlighting enhancements
    initializeCodeSyntaxHighlighting() {
        // Wait for Prism.js to load
        if (typeof Prism !== 'undefined') {
            // Re-highlight any dynamically added code
            Prism.highlightAll();
            
            // Add line numbers if needed
            this.addLineNumbers();
        }
    },

    // Initialize search functionality enhancements
    initializeSearchEnhancements() {
        const searchInput = document.querySelector('input[name="q"]');
        if (searchInput) {
            // Add search suggestions
            this.initializeSearchSuggestions(searchInput);
            
            // Add search highlighting
            this.initializeSearchHighlighting();
            
            // Improve search UX
            this.enhanceSearchExperience(searchInput);
        }
    },

    // Initialize navigation enhancements
    initializeNavigationEnhancements() {
        // Smooth scrolling for anchor links
        this.initializeSmoothScrolling();
        
        // Mobile navigation improvements
        this.improveMobileNavigation();
        
        // Breadcrumb navigation
        this.initializeBreadcrumbs();
        
        // Back to top button
        this.initializeBackToTop();
    },

    // Initialize lesson-specific interactivity
    initializeLessonInteractivity() {
        // Collapsible sections
        this.initializeCollapsibleSections();
        
        // Interactive code examples
        this.initializeInteractiveCode();
        
        // Lesson completion tracking
        this.initializeLessonCompletion();
        
        // Exercise checklist functionality
        this.initializeExerciseChecklists();
    },

    // Initialize accessibility features
    initializeAccessibility() {
        // Skip links
        this.initializeSkipLinks();
        
        // Focus management
        this.improveFocusManagement();
        
        // Screen reader enhancements
        this.enhanceScreenReaderSupport();
        
        // Keyboard navigation
        this.improveKeyboardNavigation();
    },

    // Animate elements on page load
    animateElementsOnLoad() {
        const animatedElements = document.querySelectorAll('.card, .alert, .badge');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = `opacity ${this.config.animationDuration}ms ease, transform ${this.config.animationDuration}ms ease`;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 50);
        });
    },

    // Initialize tooltips
    initializeTooltips() {
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        // Add tooltips to code examples
        this.addCodeTooltips();
    },

    // Add tooltips to code examples
    addCodeTooltips() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.setAttribute('title', 'Click to select all code');
            block.style.cursor = 'pointer';
            
            block.addEventListener('click', () => {
                this.selectAllText(block);
                this.showTemporaryTooltip(block, 'Code selected!');
            });
        });
    },

    // Initialize code copy buttons
    initializeCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach(block => {
            const copyButton = document.createElement('button');
            copyButton.className = 'btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Copy code';
            
            block.style.position = 'relative';
            block.appendChild(copyButton);
            
            copyButton.addEventListener('click', () => {
                const code = block.querySelector('code');
                if (code) {
                    this.copyToClipboard(code.textContent);
                    this.showCopyFeedback(copyButton);
                }
            });
        });
    },

    // Copy text to clipboard
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                console.log('Code copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    },

    // Fallback copy method
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            console.log('Code copied to clipboard (fallback)');
        } catch (err) {
            console.error('Fallback copy failed: ', err);
        }
        
        document.body.removeChild(textArea);
    },

    // Show copy feedback
    showCopyFeedback(button) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check text-success"></i>';
        button.classList.add('btn-success');
        button.classList.remove('btn-outline-secondary');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('btn-success');
            button.classList.add('btn-outline-secondary');
        }, 1500);
    },

    // Initialize search suggestions
    initializeSearchSuggestions(searchInput) {
        const suggestions = [
            'SQL injection', 'XSS', 'Network scanning', 'Penetration testing',
            'Vulnerability assessment', 'Wireless security', 'Social engineering',
            'Metasploit', 'Nmap', 'Burp Suite', 'OWASP', 'Incident response',
            'Legal considerations', 'Ethical hacking', 'Security tools'
        ];

        const suggestionsList = document.createElement('div');
        suggestionsList.className = 'search-suggestions position-absolute bg-dark border rounded mt-1 d-none';
        suggestionsList.style.zIndex = '1000';
        suggestionsList.style.width = '100%';
        
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(suggestionsList);

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 0) {
                const matches = suggestions.filter(s => 
                    s.toLowerCase().includes(query)
                ).slice(0, 5);

                if (matches.length > 0) {
                    suggestionsList.innerHTML = matches.map(match => 
                        `<div class="search-suggestion p-2 text-light" style="cursor: pointer;">${match}</div>`
                    ).join('');
                    suggestionsList.classList.remove('d-none');

                    // Add click handlers
                    suggestionsList.querySelectorAll('.search-suggestion').forEach(item => {
                        item.addEventListener('click', () => {
                            searchInput.value = item.textContent;
                            suggestionsList.classList.add('d-none');
                            searchInput.form.submit();
                        });

                        item.addEventListener('mouseenter', () => {
                            item.classList.add('bg-secondary');
                        });

                        item.addEventListener('mouseleave', () => {
                            item.classList.remove('bg-secondary');
                        });
                    });
                } else {
                    suggestionsList.classList.add('d-none');
                }
            } else {
                suggestionsList.classList.add('d-none');
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
                suggestionsList.classList.add('d-none');
            }
        });
    },

    // Initialize smooth scrolling
    initializeSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - this.config.scrollOffset;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Initialize back to top button
    initializeBackToTop() {
        const backToTopButton = document.createElement('button');
        backToTopButton.className = 'btn btn-info position-fixed bottom-0 end-0 m-3 rounded-circle d-none';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.style.width = '50px';
        backToTopButton.style.height = '50px';
        backToTopButton.style.zIndex = '1000';
        backToTopButton.title = 'Back to top';
        
        document.body.appendChild(backToTopButton);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('d-none');
            } else {
                backToTopButton.classList.add('d-none');
            }
        });

        // Scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },

    // Initialize lesson completion functionality
    initializeLessonCompletion() {
        const completeButtons = document.querySelectorAll('[onclick*="completeLesson"]');
        completeButtons.forEach(button => {
            // Add loading state
            const originalOnClick = button.getAttribute('onclick');
            button.removeAttribute('onclick');
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLessonCompletion(button, originalOnClick);
            });
        });
    },

    // Handle lesson completion with enhanced UX
    handleLessonCompletion(button, originalFunction) {
        // Show loading state
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Completing...';
        button.disabled = true;

        // Extract lesson ID from original function
        const lessonIdMatch = originalFunction.match(/completeLesson\((\d+)\)/);
        if (lessonIdMatch) {
            const lessonId = parseInt(lessonIdMatch[1]);
            
            fetch(`/complete/${lessonId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success state
                    button.innerHTML = '<i class="fas fa-check me-1"></i>Completed!';
                    button.classList.remove('btn-success');
                    button.classList.add('btn-outline-success');
                    
                    // Show celebration animation
                    this.showCompletionCelebration();
                    
                    // Reload after delay
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } else {
                    throw new Error('Completion failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                button.innerHTML = originalHTML;
                button.disabled = false;
                this.showErrorMessage('Failed to mark lesson as complete. Please try again.');
            });
        }
    },

    // Show completion celebration
    showCompletionCelebration() {
        // Create confetti effect or celebration message
        const celebration = document.createElement('div');
        celebration.className = 'position-fixed top-50 start-50 translate-middle';
        celebration.style.zIndex = '9999';
        celebration.innerHTML = `
            <div class="alert alert-success border-0 shadow-lg text-center">
                <i class="fas fa-trophy fa-2x text-warning mb-2"></i>
                <h5 class="mb-1">Lesson Completed!</h5>
                <p class="mb-0 small">Great job! Keep up the excellent work.</p>
            </div>
        `;

        document.body.appendChild(celebration);

        // Animate in
        celebration.style.opacity = '0';
        celebration.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            celebration.style.transition = 'all 0.3s ease';
            celebration.style.opacity = '1';
            celebration.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            celebration.style.opacity = '0';
            celebration.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(celebration);
            }, 300);
        }, 3000);
    },

    // Show error message
    showErrorMessage(message) {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x';
        errorAlert.style.zIndex = '9999';
        errorAlert.style.marginTop = '20px';
        errorAlert.innerHTML = `
            <i class="fas fa-exclamation-triangle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(errorAlert);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorAlert.parentNode) {
                errorAlert.remove();
            }
        }, 5000);
    },

    // Initialize exercise checklists
    initializeExerciseChecklists() {
        const exerciseItems = document.querySelectorAll('.card .card-body li');
        exerciseItems.forEach(item => {
            if (item.textContent.includes('☐')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    if (item.textContent.includes('☐')) {
                        item.innerHTML = item.innerHTML.replace('☐', '☑️');
                        item.classList.add('text-success');
                    } else if (item.textContent.includes('☑️')) {
                        item.innerHTML = item.innerHTML.replace('☑️', '☐');
                        item.classList.remove('text-success');
                    }
                });
            }
        });
    },

    // Handle keyboard navigation
    handleKeyboardNavigation(e) {
        // Ctrl/Cmd + / for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            const searchInput = document.querySelector('input[name="q"]');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Arrow keys for lesson navigation
        if (e.altKey) {
            if (e.key === 'ArrowLeft') {
                const prevButton = document.querySelector('.btn:contains("Previous")');
                if (prevButton) prevButton.click();
            } else if (e.key === 'ArrowRight') {
                const nextButton = document.querySelector('.btn:contains("Next")');
                if (nextButton) nextButton.click();
            }
        }

        // Escape to close modals or overlays
        if (e.key === 'Escape') {
            const searchSuggestions = document.querySelector('.search-suggestions');
            if (searchSuggestions) {
                searchSuggestions.classList.add('d-none');
            }
        }
    },

    // Handle scroll events
    handleScroll() {
        // Update navigation highlighting
        this.updateNavigationHighlighting();
        
        // Show/hide floating elements
        this.handleFloatingElements();
    },

    // Handle resize events
    handleResize() {
        // Recalculate layouts
        this.recalculateLayouts();
        
        // Update mobile navigation
        this.updateMobileNavigation();
    },

    // Utility function: throttle
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Utility function: debounce
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Select all text in element
    selectAllText(element) {
        if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    },

    // Show temporary tooltip
    showTemporaryTooltip(element, message) {
        const tooltip = document.createElement('div');
        tooltip.className = 'position-absolute bg-dark text-light p-2 rounded small';
        tooltip.textContent = message;
        tooltip.style.zIndex = '9999';
        tooltip.style.top = '-40px';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 2000);
    },

    // Check for pending animations
    checkPendingAnimations() {
        // Check if any elements need delayed animations
        const delayedElements = document.querySelectorAll('[data-animation-delay]');
        delayedElements.forEach(element => {
            const delay = parseInt(element.getAttribute('data-animation-delay'));
            setTimeout(() => {
                element.classList.add('animate-in');
            }, delay);
        });
    },

    // Update progress indicators
    updateProgressIndicators() {
        const progressElements = document.querySelectorAll('[data-progress]');
        progressElements.forEach(element => {
            const progress = parseInt(element.getAttribute('data-progress'));
            this.animateProgressBar(element, progress);
        });
    },

    // Animate progress bar
    animateProgressBar(element, targetProgress) {
        let currentProgress = 0;
        const increment = targetProgress / 50; // 50 steps
        
        const timer = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                clearInterval(timer);
            }
            
            element.style.width = `${currentProgress}%`;
            if (element.textContent !== '') {
                element.textContent = `${Math.round(currentProgress)}%`;
            }
        }, 20);
    },

    // Additional helper methods for future enhancements
    trackLessonProgress() {
        // Track time spent on lesson
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Date.now() - startTime;
            localStorage.setItem(`lesson_time_${window.location.pathname}`, timeSpent);
        });
    },

    addLineNumbers() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            const lines = block.textContent.split('\n');
            if (lines.length > 5) { // Only add line numbers for longer code blocks
                const numberedLines = lines.map((line, index) => 
                    `<span class="line-number">${(index + 1).toString().padStart(2, '0')}</span>${line}`
                ).join('\n');
                
                // Only add if not already numbered
                if (!block.innerHTML.includes('line-number')) {
                    block.innerHTML = numberedLines;
                }
            }
        });
    },

    initializeSearchHighlighting() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
        
        if (searchQuery) {
            this.highlightSearchTerms(searchQuery);
        }
    },

    highlightSearchTerms(query) {
        const regex = new RegExp(`(${query})`, 'gi');
        const textNodes = this.getTextNodes(document.body);
        
        textNodes.forEach(node => {
            if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
                const highlightedText = node.textContent.replace(regex, '<mark class="bg-warning text-dark">$1</mark>');
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedText;
                node.parentNode.replaceChild(wrapper, node);
            }
        });
    },

    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip script and style elements
                    const parent = node.parentElement;
                    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        return textNodes;
    },

    enhanceSearchExperience(searchInput) {
        // Add search shortcuts
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                // Add loading state
                const form = searchInput.closest('form');
                if (form) {
                    const button = form.querySelector('button[type="submit"]');
                    if (button) {
                        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    }
                }
            }
        });
    },

    improveMobileNavigation() {
        // Add mobile-specific navigation improvements
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            let lastScrollY = window.scrollY;
            
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollY = currentScrollY;
            });
        }
    },

    initializeBreadcrumbs() {
        // Auto-generate breadcrumbs if needed
        const currentPath = window.location.pathname;
        if (currentPath.includes('/lesson/')) {
            const lessonMatch = currentPath.match(/\/lesson\/(\d+)/);
            if (lessonMatch) {
                const lessonNumber = lessonMatch[1];
                this.updateBreadcrumb(lessonNumber);
            }
        }
    },

    updateBreadcrumb(lessonNumber) {
        // Update page title with lesson info
        const lessonTitle = document.querySelector('h1')?.textContent;
        if (lessonTitle) {
            document.title = `${lessonTitle} - Ethical Hacking Tutorial`;
        }
    },

    initializeCollapsibleSections() {
        // Enhance existing accordion functionality
        const accordionButtons = document.querySelectorAll('.accordion-button');
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Add smooth animation
                const target = button.getAttribute('data-bs-target');
                const targetElement = document.querySelector(target);
                
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 350); // After Bootstrap animation
                }
            });
        });
    },

    initializeInteractiveCode() {
        // Add interactive features to code examples
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            // Add double-click to select all
            block.addEventListener('dblclick', () => {
                this.selectAllText(block);
            });
        });
    },

    initializeSkipLinks() {
        // Add skip to content link for accessibility
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'visually-hidden-focusable position-absolute top-0 start-0 bg-info text-white p-2 text-decoration-none';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.zIndex = '9999';
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content ID if not exists
        const mainContent = document.querySelector('main') || document.querySelector('.container');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
        }
    },

    improveFocusManagement() {
        // Improve focus management for better accessibility
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = Array.from(document.querySelectorAll(focusableElements));
                const index = focusable.indexOf(document.activeElement);
                
                if (e.shiftKey) {
                    // Shift + Tab (backward)
                    if (index <= 0) {
                        e.preventDefault();
                        focusable[focusable.length - 1].focus();
                    }
                } else {
                    // Tab (forward)
                    if (index >= focusable.length - 1) {
                        e.preventDefault();
                        focusable[0].focus();
                    }
                }
            }
        });
    },

    enhanceScreenReaderSupport() {
        // Add ARIA labels and descriptions where needed
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach((block, index) => {
            block.setAttribute('role', 'region');
            block.setAttribute('aria-label', `Code example ${index + 1}`);
        });
        
        // Add progress information
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const value = bar.style.width;
            bar.setAttribute('aria-valuenow', value.replace('%', ''));
            bar.setAttribute('aria-valuemin', '0');
            bar.setAttribute('aria-valuemax', '100');
        });
    },

    improveKeyboardNavigation() {
        // Add custom keyboard shortcuts info
        const shortcutsInfo = document.createElement('div');
        shortcutsInfo.className = 'visually-hidden';
        shortcutsInfo.innerHTML = `
            <h2>Keyboard Shortcuts</h2>
            <ul>
                <li>Ctrl/Cmd + / : Focus search</li>
                <li>Alt + Left Arrow : Previous lesson</li>
                <li>Alt + Right Arrow : Next lesson</li>
                <li>Escape : Close overlays</li>
            </ul>
        `;
        document.body.appendChild(shortcutsInfo);
    },

    handleFocusManagement(e) {
        // Add focus indicators for better visibility
        if (e.target.matches('button, a, input, select, textarea')) {
            e.target.classList.add('focus-visible');
            
            e.target.addEventListener('blur', () => {
                e.target.classList.remove('focus-visible');
            }, { once: true });
        }
    },

    updateNavigationHighlighting() {
        // Update active navigation items based on scroll position
        const sections = document.querySelectorAll('h3, h4');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.textContent;
            }
        });
        
        // Update navigation highlighting if applicable
        navLinks.forEach(link => {
            if (link.textContent.includes(currentSection)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    handleFloatingElements() {
        // Handle floating elements based on scroll
        const floatingElements = document.querySelectorAll('.position-fixed');
        floatingElements.forEach(element => {
            if (window.scrollY > 200) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    },

    recalculateLayouts() {
        // Recalculate layouts on resize
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            // Force reflow for proper sizing
            card.style.height = 'auto';
        });
    },

    updateMobileNavigation() {
        // Update mobile navigation state
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
        }
    }
};

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        EthicalHackingApp.init();
    });
} else {
    EthicalHackingApp.init();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EthicalHackingApp;
}

// Add global completeLesson function for backwards compatibility
window.completeLesson = function(lessonId) {
    EthicalHackingApp.handleLessonCompletion(
        event.target,
        `completeLesson(${lessonId})`
    );
};

// Add CSS for enhanced features
const additionalStyles = `
    .focus-visible {
        outline: 2px solid var(--bs-info) !important;
        outline-offset: 2px;
    }
    
    .search-suggestions {
        max-height: 200px;
        overflow-y: auto;
    }
    
    .search-suggestion:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
    }
    
    .line-number {
        display: inline-block;
        width: 2em;
        margin-right: 1em;
        color: #666;
        font-size: 0.8em;
    }
    
    .navbar {
        transition: transform 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .mobile-view .card {
            margin-bottom: 1rem;
        }
        
        .mobile-view .btn {
            font-size: 0.875rem;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.5s ease;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .visible {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .position-fixed:not(.visible) {
        opacity: 0.7;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log('Ethical Hacking Tutorial JavaScript loaded successfully');
