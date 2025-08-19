# Configuration file for Video Downloader Pro
import os

class Config:
    # Server Configuration
    HOST = '0.0.0.0'
    PORT = 5000
    DEBUG = True
    
    # Security
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key_change_in_production'
    
    # Facebook API Configuration
    FACEBOOK_API_URL = "https://myapi-2f5b.onrender.com/fbvideo/search"
    
    # Download Configuration
    DOWNLOAD_FOLDER = "Downloads"
    TEMP_FOLDER = "temp"
    
    # Instagram Configuration
    INSTAGRAM_SAFE_MODE = True  # Only download public content
    
    # YouTube Configuration
    YOUTUBE_CLIENT = 'WEB'
    
    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
