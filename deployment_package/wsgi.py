#!/usr/bin/python3.11

import sys
import os

# Add your project directory to sys.path
path = '/home/yourusername/mysite'
if path not in sys.path:
    sys.path.insert(0, path)

from main import app as application

if __name__ == "__main__":
    application.run()