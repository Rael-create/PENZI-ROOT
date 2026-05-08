import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    # Get credentials from environment variables
    db_user = os.getenv("MYSQL_USER")              
    db_password = os.getenv("MYSQL_PASSWORD")
    db_host = os.getenv("MYSQL_HOST")         
    db_port = os.getenv("MYSQL_PORT")
    db_name = os.getenv("MYSQL_DATABASE")

    # SQLAlchemy connection string
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize SQLAlchemy
    db.init_app(app)

    print("Database Connection Successful")