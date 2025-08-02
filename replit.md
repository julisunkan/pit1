# Ethical Hacking Tutorial Platform

## Overview

This is a Flask-based educational web application that provides a comprehensive 10-lesson course on ethical hacking and cybersecurity. The platform features interactive lessons, progress tracking, search functionality, and a responsive dark-themed interface designed to teach users about network security, penetration testing methodologies, web application security, and ethical considerations in cybersecurity.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Migration from Replit Agent (August 2, 2025)
- Successfully migrated project from Replit Agent to standard Replit environment
- Converted PWA icons from SVG to PNG format for proper PWA compliance
- All Flask routes, models, and static assets verified working
- Database connectivity confirmed with SQLite backend
- Application runs cleanly on port 5000 with gunicorn

### Offline Mobile App Creation (August 2, 2025)
- Created complete offline version of the ethical hacking tutorial
- Self-contained HTML app that works without any hosting
- All 10 lessons embedded with full content extracted from Flask templates
- Complete lesson content including interactive cards, code examples, and tables
- Original Flask templates folder included for reference and development
- Local progress tracking using browser localStorage
- Responsive design automatically adapts to any device screen
- PWA functionality with service worker for offline caching
- Packaged as downloadable tar.gz file for easy distribution
- Total offline app size: ~500KB including all dependencies and templates

## System Architecture

### Backend Architecture
- **Framework**: Flask web framework with SQLAlchemy ORM for database operations
- **Database Strategy**: SQLite for development with environment-configurable DATABASE_URL for production deployment
- **Session Management**: UUID-based session tracking for anonymous progress tracking without user authentication
- **Application Structure**: Modular design with separate files for models, routes, and application configuration

### Frontend Architecture
- **Template Engine**: Jinja2 templates with a base template inheritance pattern
- **UI Framework**: Bootstrap 5 with dark theme for consistent responsive design
- **Static Assets**: Custom CSS for theming enhancements and JavaScript for interactive features
- **Code Highlighting**: Prism.js integration for syntax highlighting in code examples
- **Icons**: Font Awesome for consistent iconography throughout the interface

### Data Models
- **LessonProgress**: Tracks completion status per session ID and lesson
- **SearchQuery**: Logs search queries with timestamps for analytics
- **Session Management**: Anonymous session-based tracking without requiring user registration

### Content Management
- **Lesson Structure**: Hardcoded lesson data in Python dictionary format for 10 comprehensive lessons
- **Progress Tracking**: Real-time completion status updates with visual progress indicators
- **Search Functionality**: Query-based lesson content search with result filtering

### Security Considerations
- **Session Security**: Configurable secret keys with development defaults
- **Proxy Support**: ProxyFix middleware for deployment behind reverse proxies
- **Database Security**: Connection pooling and health checks for reliability

## External Dependencies

### CDN Resources
- **Bootstrap CSS**: Dark theme variant for consistent UI styling
- **Prism.js**: Code syntax highlighting library
- **Font Awesome**: Icon library for enhanced visual elements

### Python Packages
- **Flask**: Core web framework
- **Flask-SQLAlchemy**: Database ORM integration
- **Werkzeug**: WSGI utilities and middleware support

### Database Requirements
- **SQLite**: Default development database (configurable via DATABASE_URL environment variable)
- **Production Ready**: Supports any SQLAlchemy-compatible database through environment configuration

### Deployment Configuration
- **Environment Variables**: SESSION_SECRET for security, DATABASE_URL for database configuration
- **WSGI Support**: Production-ready with ProxyFix middleware for reverse proxy deployment
- **Port Configuration**: Configurable host and port settings for various deployment scenarios
- **PythonAnywhere Ready**: Includes wsgi.py, requirements_pythonanywhere.txt, and deployment guide
- **Database Path Handling**: Automatic absolute path conversion for cross-platform compatibility