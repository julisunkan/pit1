import os
import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from werkzeug.middleware.proxy_fix import ProxyFix

# Set up logging
logging.basicConfig(level=logging.DEBUG)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

# Configure the database - use absolute path for PythonAnywhere compatibility
database_path = os.environ.get("DATABASE_URL", "sqlite:///ethical_hacking_tutorial.db")
if database_path.startswith("sqlite:///") and not database_path.startswith("sqlite:////"):
    # Convert relative path to absolute for better compatibility
    db_file = database_path.replace("sqlite:///", "")
    if not os.path.isabs(db_file):
        database_path = f"sqlite:///{os.path.abspath(db_file)}"
app.config["SQLALCHEMY_DATABASE_URI"] = database_path
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
    "pool_recycle": 300,
    "pool_pre_ping": True,
}

# Initialize the app with the extension
db.init_app(app)

with app.app_context():
    # Import models and routes
    import models
    import routes
    
    # Create all tables
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
