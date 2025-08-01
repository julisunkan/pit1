#!/usr/bin/env python3
"""
Deployment preparation script for PythonAnywhere
Run this script to prepare your files for PythonAnywhere deployment
"""

import os
import shutil
import zipfile

def create_deployment_package():
    """Create a deployment package for PythonAnywhere"""
    
    # Files and directories to include in deployment
    include_files = [
        'app.py',
        'main.py',
        'models.py',
        'routes.py',
        'wsgi.py',
        'config.py',
        'requirements_pythonanywhere.txt',
        'pythonanywhere_deployment.md',
        'static/',
        'templates/'
    ]
    
    # Create deployment directory
    deploy_dir = 'deployment_package'
    if os.path.exists(deploy_dir):
        shutil.rmtree(deploy_dir)
    os.makedirs(deploy_dir)
    
    print("Creating deployment package...")
    
    # Copy files and directories
    for item in include_files:
        src = item
        dst = os.path.join(deploy_dir, item)
        
        if os.path.isfile(src):
            shutil.copy2(src, dst)
            print(f"✓ Copied {src}")
        elif os.path.isdir(src):
            shutil.copytree(src, dst)
            print(f"✓ Copied {src}/")
        else:
            print(f"⚠ Warning: {src} not found")
    
    # Create zip file for easy upload
    zip_filename = 'ethical_hacking_tutorial_pythonanywhere.zip'
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(deploy_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arc_name = os.path.relpath(file_path, deploy_dir)
                zipf.write(file_path, arc_name)
    
    print(f"\n✓ Deployment package created: {zip_filename}")
    print("\nNext steps:")
    print("1. Upload the zip file to your PythonAnywhere account")
    print("2. Extract it in your desired directory")
    print("3. Follow the instructions in pythonanywhere_deployment.md")
    print("4. Set up your web app configuration")
    
    return zip_filename

if __name__ == "__main__":
    create_deployment_package()