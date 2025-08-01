import os

class Config:
    """Base configuration class"""
    SECRET_KEY = os.environ.get('SESSION_SECRET', 'dev-secret-key-change-in-production')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_recycle": 300,
        "pool_pre_ping": True,
    }

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    database_path = os.environ.get("DATABASE_URL", "sqlite:///ethical_hacking_tutorial.db")
    if database_path.startswith("sqlite:///") and not database_path.startswith("sqlite:////"):
        db_file = database_path.replace("sqlite:///", "")
        if not os.path.isabs(db_file):
            database_path = f"sqlite:///{os.path.abspath(db_file)}"
    SQLALCHEMY_DATABASE_URI = database_path

class ProductionConfig(Config):
    """Production configuration for PythonAnywhere"""
    DEBUG = False
    database_path = os.environ.get("DATABASE_URL", "sqlite:///ethical_hacking_tutorial.db")
    if database_path.startswith("sqlite:///") and not database_path.startswith("sqlite:////"):
        db_file = database_path.replace("sqlite:///", "")
        if not os.path.isabs(db_file):
            database_path = f"sqlite:///{os.path.abspath(db_file)}"
    SQLALCHEMY_DATABASE_URI = database_path

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}