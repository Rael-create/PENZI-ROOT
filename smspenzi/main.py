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

# Create tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
