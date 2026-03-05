import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    # Get credentials from environment variables
    db_user = os.getenv("DB_USER", "root")              # default for local dev
    db_password = os.getenv("DB_PASSWORD", "mypassword")
    db_host = os.getenv("DB_HOST", "localhost")         # 'db' inside Docker
    db_port = os.getenv("DB_PORT", "3306")
    db_name = os.getenv("DB_NAME", "smspenzi")

    # SQLAlchemy connection string
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize SQLAlchemy
    db.init_app(app)

    print("Database Connection Successful")