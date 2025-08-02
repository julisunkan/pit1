from flask import render_template, request, session, jsonify, redirect, url_for, send_from_directory
from app import app, db
from models import LessonProgress, SearchQuery
import uuid

# Generate session ID if not exists
@app.before_request
def before_request():
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())

# Lesson data structure
LESSONS = {
    1: {
        'title': 'Introduction to Ethical Hacking',
        'description': 'Learn the fundamentals of ethical hacking, white hat vs black hat hackers, and the importance of cybersecurity.',
        'duration': '45 minutes'
    },
    2: {
        'title': 'Network Scanning & Reconnaissance',
        'description': 'Master network discovery techniques, port scanning, and information gathering methodologies.',
        'duration': '60 minutes'
    },
    3: {
        'title': 'Vulnerability Assessment',
        'description': 'Understand how to identify, classify, and prioritize security vulnerabilities in systems.',
        'duration': '55 minutes'
    },
    4: {
        'title': 'Web Application Security Testing',
        'description': 'Explore common web vulnerabilities like XSS, SQL injection, and CSRF attacks.',
        'duration': '70 minutes'
    },
    5: {
        'title': 'Wireless Network Security',
        'description': 'Learn about WiFi security protocols, wireless attack vectors, and protection methods.',
        'duration': '50 minutes'
    },
    6: {
        'title': 'Social Engineering Awareness',
        'description': 'Understand human psychology in cybersecurity and common social engineering tactics.',
        'duration': '40 minutes'
    },
    7: {
        'title': 'Penetration Testing Methodologies',
        'description': 'Master structured approaches to penetration testing and security assessments.',
        'duration': '65 minutes'
    },
    8: {
        'title': 'Security Tools & Frameworks',
        'description': 'Get hands-on with popular security tools like Nmap, Wireshark, Metasploit, and Burp Suite.',
        'duration': '80 minutes'
    },
    9: {
        'title': 'Incident Response & Reporting',
        'description': 'Learn how to respond to security incidents and create professional security reports.',
        'duration': '55 minutes'
    },
    10: {
        'title': 'Legal & Ethical Considerations',
        'description': 'Understand the legal framework, ethics, and professional responsibilities in cybersecurity.',
        'duration': '45 minutes'
    }
}

@app.route('/')
def index():
    """Main dashboard showing all lessons with progress"""
    session_id = session.get('session_id')
    completed_lessons = []
    
    if session_id:
        progress = LessonProgress.query.filter_by(
            session_id=session_id, 
            completed=True
        ).all()
        completed_lessons = [p.lesson_id for p in progress]
    
    return render_template('index.html', 
                         lessons=LESSONS, 
                         completed_lessons=completed_lessons)

@app.route('/lesson/<int:lesson_id>')
def lesson(lesson_id):
    """Display individual lesson"""
    if lesson_id not in LESSONS:
        return redirect(url_for('index'))
    
    session_id = session.get('session_id')
    is_completed = False
    
    if session_id:
        progress = LessonProgress.query.filter_by(
            session_id=session_id,
            lesson_id=lesson_id
        ).first()
        is_completed = progress.completed if progress else False
    
    lesson_data = LESSONS[lesson_id]
    
    return render_template(f'lesson{lesson_id}.html',
                         lesson=lesson_data,
                         lesson_id=lesson_id,
                         lessons=LESSONS,
                         is_completed=is_completed,
                         total_lessons=len(LESSONS))

@app.route('/complete/<int:lesson_id>', methods=['POST'])
def complete_lesson(lesson_id):
    """Mark lesson as completed"""
    session_id = session.get('session_id')
    
    if not session_id or lesson_id not in LESSONS:
        return jsonify({'success': False})
    
    # Check if already exists
    progress = LessonProgress.query.filter_by(
        session_id=session_id,
        lesson_id=lesson_id
    ).first()
    
    if progress:
        progress.completed = True
    else:
        progress = LessonProgress()
        progress.session_id = session_id
        progress.lesson_id = lesson_id
        progress.completed = True
        db.session.add(progress)
    
    db.session.commit()
    return jsonify({'success': True})

@app.route('/search')
def search():
    """Search functionality across lessons"""
    query = request.args.get('q', '').strip()
    results = []
    
    if query:
        # Log search query
        search_log = SearchQuery()
        setattr(search_log, 'query', str(query))
        db.session.add(search_log)
        db.session.commit()
        
        # Simple search through lesson titles and descriptions
        for lesson_id, lesson_data in LESSONS.items():
            if (query.lower() in lesson_data['title'].lower() or 
                query.lower() in lesson_data['description'].lower()):
                results.append({
                    'id': lesson_id,
                    'title': lesson_data['title'],
                    'description': lesson_data['description']
                })
    
    return render_template('index.html', 
                         lessons=LESSONS, 
                         search_query=query,
                         search_results=results)

@app.route('/reset-progress', methods=['POST'])
def reset_progress():
    """Reset all lesson progress for current session"""
    session_id = session.get('session_id')
    
    if session_id:
        LessonProgress.query.filter_by(session_id=session_id).delete()
        db.session.commit()
    
    return redirect(url_for('index'))

@app.errorhandler(404)
def not_found(error):
    return render_template('index.html', 
                         lessons=LESSONS, 
                         error="Page not found"), 404

# PWA Routes
@app.route('/manifest.json')
def manifest():
    """Serve the web app manifest"""
    return send_from_directory('static', 'manifest.json', mimetype='application/manifest+json')

@app.route('/sw.js')
def service_worker():
    """Serve the service worker"""
    return send_from_directory('static', 'sw.js', mimetype='application/javascript')

@app.route('/offline')
def offline():
    """Offline fallback page"""
    return render_template('index.html', 
                         lessons=LESSONS, 
                         offline=True)

@app.route('/api/offline-sync', methods=['POST'])
def offline_sync():
    """Handle offline data synchronization"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    session_id = session.get('session_id')
    if not session_id:
        return jsonify({'error': 'No session'}), 400
    
    # Process offline lesson completions
    if 'completions' in data:
        for completion in data['completions']:
            lesson_id = completion.get('lessonId')
            if lesson_id and lesson_id in LESSONS:
                # Check if already completed
                existing = LessonProgress.query.filter_by(
                    session_id=session_id,
                    lesson_id=lesson_id
                ).first()
                
                if not existing:
                    progress = LessonProgress()
                    setattr(progress, 'session_id', str(session_id))
                    setattr(progress, 'lesson_id', int(lesson_id))
                    setattr(progress, 'completed', True)
                    db.session.add(progress)
        
        db.session.commit()
    
    return jsonify({'status': 'success', 'message': 'Data synchronized'})

@app.route('/api/cache-status')
def cache_status():
    """Return cache status for PWA"""
    # Get completed lessons for current session
    session_id = session.get('session_id')
    completed_lessons = []
    
    if session_id:
        progress = LessonProgress.query.filter_by(
            session_id=session_id,
            completed=True
        ).all()
        completed_lessons = [p.lesson_id for p in progress]
    
    return jsonify({
        'cached_lessons': list(LESSONS.keys()),
        'completed_lessons': completed_lessons,
        'total_lessons': len(LESSONS),
        'offline_ready': True
    })
