from email import message
from email.policy import default

from dbConfig import db 
from datetime import datetime



class User(db.Model):
    __tablename__ ='users'

    user_id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    phone_number=db.Column(db.String(10), unique=True, nullable=False)
    full_name=db.Column(db.String(100), nullable=False)
    age=db.Column(db.Integer, nullable=False)
    gender=db.Column(db.Enum('Male', 'Female'), nullable=False)
    county=db.Column(db.String(50), nullable=False)
    town=db.Column(db.String(50), nullable=False)

    level_of_education=db.Column(db.String(50), nullable=True)
    profession=db.Column(db.String(100), nullable=True)
    marital_status=db.Column(db.String(20), nullable=True)
    religion=db.Column(db.String(50), nullable=True)
    ethnicity=db.Column(db.String(50), nullable=True)

    self_description=db.Column(db.Text, nullable=True)
    date=db.Column(db.DateTime, default=datetime.utcnow)

    # Match session tracking
    last_min_age = db.Column(db.Integer, nullable=True)
    last_max_age = db.Column(db.Integer, nullable=True)
    last_town = db.Column(db.String(50), nullable=True)
    match_offset = db.Column(db.Integer, default=0)
    match_session_id = db.Column(db.String(50), nullable=True)  #  Track session
    match_page_count = db.Column(db.Integer, default=0)  # Track pages sent in current session


#converts User object into a Python dictionary
    def to_dict (self):
        return{
            "user_id" : self.user_id,
            "age" : self.age,
            "gender" : self.gender,
            "county" : self.county,
            "town" : self.town,
            "level_of_education" : self.level_of_education,
            "profession" : self.profession,
            "marital_status" : self.marital_status,
            "religion" : self.religion,
            "ethnicity" : self.ethnicity,
            "self_description" : self.self_description,
            "date" : self.date,
            "last_min_age" : self.last_min_age,
            "last_max_age" : self.last_max_age,
            "last_town" : self.last_town,
            "match_offset" : self.match_offset,
            "match_session_id" : self.match_session_id,
            "match_page_count" : self.match_page_count

            
        }

class Message(db.Model):
    __tablename__='message'

    id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    sender=db.Column(db.String(50), nullable=False)
    recipient=db.Column(db.String(50), nullable=False)
    content=db.Column(db.Text, nullable=False)
    direction=db.Column(db.Enum('IN', 'OUT'), nullable=False)
    date=db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return{
            "id" : self.id,
            "sender" : self.sender,
            "recipient" : self.recipient,
            "content" : self.content,
            "direction" : self.direction,
            "date" : self.date
        }
    
class MatchSession(db.Model):
    __tablename__='match_session'

    id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    sender_phone=db.Column(db.String(50), nullable=False)
    message=db.Column(db.Text, nullable=False)
    page_no=db.Column(db.Integer, default=1)
    date=db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return{
            "id" : self.id,
            "sender_phone" : self.sender_phone,
            "message" : self.message,
            "page_no" : self.page_no,
            "date" : self.date
        }