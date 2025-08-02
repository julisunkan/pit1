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
        
        # Find the lesson content section
        start_marker = '<!-- Lesson Content -->'
        start_pos = content.find(start_marker)
        if start_pos == -1:
            return ""
        
        # Extract content after the marker
        content_section = content[start_pos + len(start_marker):]
        
        # Find the end of the content section
        end_markers = ['{% endblock %}', '</div>\n    </div>\n</div>']
        end_pos = len(content_section)
        
        for marker in end_markers:
            pos = content_section.find(marker)
            if pos != -1 and pos < end_pos:
                end_pos = pos
        
        lesson_content = content_section[:end_pos]
        
        # Clean up the content
        # Remove template syntax
        lesson_content = re.sub(r'{%.*?%}', '', lesson_content)
        lesson_content = re.sub(r'{{.*?}}', '', lesson_content)
        
        # Remove wrapper divs
        lesson_content = lesson_content.replace('<div class="card">', '')
        lesson_content = lesson_content.replace('<div class="card-body">', '')
        
        # Clean up excessive </div> tags at the end
        lesson_content = re.sub(r'(\s*</div>\s*){2,}$', '', lesson_content)
        
        # Strip whitespace
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
    
    # Update lessons 3-10 with real content
    lesson_updates = {
        3: '''            3: {
                title: 'Vulnerability Assessment',
                description: 'Understand how to identify, classify, and prioritize security vulnerabilities in systems.',
                duration: '55 minutes',
                content: `''' + lessons_content.get(3, '').replace('`', '\\`') + '''`
            },''',
        4: '''            4: {
                title: 'Web Application Security Testing',
                description: 'Explore common web vulnerabilities like XSS, SQL injection, and CSRF attacks.',
                duration: '70 minutes',
                content: `''' + lessons_content.get(4, '').replace('`', '\\`') + '''`
            },''',
        5: '''            5: {
                title: 'Wireless Network Security',
                description: 'Learn about WiFi security protocols, wireless attack vectors, and protection methods.',
                duration: '50 minutes',
                content: `''' + lessons_content.get(5, '').replace('`', '\\`') + '''`
            },''',
        6: '''            6: {
                title: 'Social Engineering Awareness',
                description: 'Understand human psychology in cybersecurity and common social engineering tactics.',
                duration: '40 minutes',
                content: `''' + lessons_content.get(6, '').replace('`', '\\`') + '''`
            },''',
        7: '''            7: {
                title: 'Penetration Testing Methodologies',
                description: 'Master structured approaches to penetration testing and security assessments.',
                duration: '65 minutes',
                content: `''' + lessons_content.get(7, '').replace('`', '\\`') + '''`
            },''',
        8: '''            8: {
                title: 'Security Tools & Frameworks',
                description: 'Get hands-on with popular security tools like Nmap, Wireshark, Metasploit, and Burp Suite.',
                duration: '80 minutes',
                content: `''' + lessons_content.get(8, '').replace('`', '\\`') + '''`
            },''',
        9: '''            9: {
                title: 'Incident Response & Reporting',
                description: 'Learn how to respond to security incidents and create professional security reports.',
                duration: '55 minutes',
                content: `''' + lessons_content.get(9, '').replace('`', '\\`') + '''`
            },''',
        10: '''            10: {
                title: 'Legal & Ethical Considerations',
                description: 'Understand the legal framework, ethics, and professional responsibilities in cybersecurity.',
                duration: '45 minutes',
                content: `''' + lessons_content.get(10, '').replace('`', '\\`') + '''`
            }'''
    }
    
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