import time
import sys
from flask import Flask
from dbConfig import db, init_db
from routes import routes
from flask_cors import CORS

app = Flask(__name__)

# Initialize database configuration
init_db(app)

# Enable CORS
CORS(app)

# Register routes
app.register_blueprint(routes)

def wait_for_db(max_retries=30, delay=1):

    print(" Waiting for MySQL database to be ready...")
    
    for attempt in range(1, max_retries + 1):
        try:
            with app.app_context():
                # Test connection by executing simple query
                db.session.execute("SELECT 1")
                print(f" Database connected successfully on attempt {attempt}")
                return True
        except Exception as e:
            if attempt == max_retries:
                print(f" Failed to connect to database after {max_retries} attempts")
                print(f"   Last error: {str(e)}")
                return False
            
            print(f" Database not ready yet... (attempt {attempt}/{max_retries})")
            time.sleep(delay)
    
    return False

if __name__ == "__main__":
    print(" Starting SMSPenzi Backend Application...")
    
    # Wait for database to be ready
    if not wait_for_db():
        print(" Cannot start application - database connection failed")
        sys.exit(1)
    
    # Create tables
    print(" Creating/verifying database tables...")
    with app.app_context():
        try:
            db.create_all()
            print(" Database tables created/verified successfully")
        except Exception as e:
            print(f" Error creating tables: {str(e)}")
            sys.exit(1)
    
    print(" Backend application ready to serve requests")
    print(" Running on http://0.0.0.0:5000")
    
    # Run Flask app
    app.run(debug=False, host='0.0.0.0', port=5000)