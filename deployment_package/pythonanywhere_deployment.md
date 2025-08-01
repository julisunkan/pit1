# PythonAnywhere Deployment Guide

## Pre-deployment Setup

1. **Upload Files**: Upload all project files to your PythonAnywhere account
2. **Install Dependencies**: In a bash console, run:
   ```bash
   pip3.11 install --user -r requirements_pythonanywhere.txt
   ```

## Configuration Steps

### 1. Update wsgi.py
Replace `/home/yourusername/mysite` in `wsgi.py` with your actual PythonAnywhere path:
- Example: `/home/john123/ethical-hacking-tutorial`

### 2. Web App Configuration
In PythonAnywhere Web tab:
- **Source code**: `/home/yourusername/mysite`
- **Working directory**: `/home/yourusername/mysite`
- **WSGI configuration file**: `/var/www/yourusername_pythonanywhere_com_wsgi.py`

### 3. Environment Variables
Set these in the WSGI configuration file:
```python
import os
os.environ['SESSION_SECRET'] = 'your-secure-session-secret-here'
os.environ['DATABASE_URL'] = 'sqlite:///ethical_hacking_tutorial.db'
```

### 4. Static Files Setup
In PythonAnywhere Web tab, add static files mapping:
- **URL**: `/static/`
- **Directory**: `/home/yourusername/mysite/static/`

## Database Setup

The app will automatically create the SQLite database on first run. Make sure the directory has write permissions.

## Security Notes

- Change the SESSION_SECRET to a strong, unique value
- The default SQLite database is suitable for educational purposes
- For production, consider upgrading to MySQL (available on paid PythonAnywhere plans)

## Testing

After deployment:
1. Visit your PythonAnywhere URL
2. Check that all 10 lessons load correctly
3. Test progress tracking functionality
4. Verify search functionality works
5. Ensure responsive design works on mobile devices

## Troubleshooting

- Check error logs in PythonAnywhere Web tab
- Ensure all dependencies are installed with Python 3.11
- Verify file paths are correct in wsgi.py
- Check that static files are properly mapped