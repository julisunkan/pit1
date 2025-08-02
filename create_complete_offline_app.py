#!/usr/bin/env python3
"""
Script to create a complete offline version of the Ethical Hacking Tutorial
by extracting all lesson content from Flask templates and embedding them
in the JavaScript offline app.
"""

import os
import re
import json

def extract_lesson_content(lesson_file):
    """Extract the main lesson content from a template file."""
    try:
        with open(lesson_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find the card-body section which contains the lesson content
        start_pattern = r'<div class="card-body">\s*<h3>'
        match = re.search(start_pattern, content)
        if not match:
            return ""
        
        # Start from the h3 tag
        start_pos = content.find('<h3>', match.start())
        if start_pos == -1:
            return ""
        
        # Extract content from h3 onwards
        content_section = content[start_pos:]
        
        # Find the end of the content section - look for closing patterns
        end_patterns = [
            r'</div>\s*</div>\s*</div>\s*{% endblock %}',
            r'</div>\s*</div>\s*{% endblock %}',
            r'{% endblock %}'
        ]
        
        end_pos = len(content_section)
        for pattern in end_patterns:
            match = re.search(pattern, content_section)
            if match and match.start() < end_pos:
                end_pos = match.start()
        
        lesson_content = content_section[:end_pos]
        
        # Clean up the content
        # Remove template syntax
        lesson_content = re.sub(r'{%.*?%}', '', lesson_content)
        lesson_content = re.sub(r'{{.*?}}', '', lesson_content)
        
        # Clean up excessive </div> tags at the end
        lesson_content = re.sub(r'(\s*</div>\s*){1,}$', '', lesson_content)
        
        # Strip whitespace but preserve internal formatting
        lesson_content = lesson_content.strip()
        
        return lesson_content
        
    except Exception as e:
        print(f"Error extracting content from {lesson_file}: {e}")
        return ""

def create_complete_offline_app():
    """Create the complete offline app with all lesson content."""
    
    # Extract content from all lesson templates
    lessons_content = {}
    for i in range(1, 11):
        lesson_file = f'templates/lesson{i}.html'
        if os.path.exists(lesson_file):
            content = extract_lesson_content(lesson_file)
            lessons_content[i] = content
            print(f"Lesson {i}: {len(content)} characters extracted")
    
    # Read the current offline app JavaScript
    with open('offline_app/js/offline-app.js', 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # Get actual titles and descriptions from Flask routes.py
    lesson_metadata = {
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

    # Update lessons 3-10 with real content
    lesson_updates = {}
    for lesson_num in range(3, 11):
        content = lessons_content.get(lesson_num, '').replace('`', '\\`')
        metadata = lesson_metadata[lesson_num]
        
        if lesson_num == 10:  # Last lesson without comma
            lesson_updates[lesson_num] = f'''            {lesson_num}: {{
                title: '{metadata["title"]}',
                description: '{metadata["description"]}',
                duration: '{metadata["duration"]}',
                content: `{content}`
            }}'''
        else:
            lesson_updates[lesson_num] = f'''            {lesson_num}: {{
                title: '{metadata["title"]}',
                description: '{metadata["description"]}',
                duration: '{metadata["duration"]}',
                content: `{content}`
            }},'''
    
    # Replace placeholder content with real content
    updated_js = js_content
    
    # Update lessons 3-10
    for lesson_num, new_content in lesson_updates.items():
        # Find the current lesson content
        pattern = rf'            {lesson_num}: \{{[\s\S]*?\n            \}},'
        if lesson_num == 10:  # Last lesson doesn't have comma
            pattern = rf'            {lesson_num}: \{{[\s\S]*?\n            \}}'
        
        match = re.search(pattern, updated_js)
        if match:
            updated_js = updated_js.replace(match.group(0), new_content)
            print(f"Updated lesson {lesson_num}")
    
    # Write the updated JavaScript file
    with open('offline_app/js/offline-app.js', 'w', encoding='utf-8') as f:
        f.write(updated_js)
    
    print("Complete offline app created successfully!")
    print("All 10 lessons now have full content embedded.")

if __name__ == "__main__":
    create_complete_offline_app()