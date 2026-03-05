from math import e
from tkinter.filedialog import Directory
from urllib import response
from flask import Blueprint, request, jsonify
from models import MatchSession, Message, User
from dbConfig import db
from datetime import date, datetime

routes = Blueprint('routes', __name__)


@routes.route('/penzi', methods=['POST'])
def receive_sms():
    data = request.get_json()

    phone_number = data.get("phone_number")
    message = data.get("message")

    response_text = "Invalid command. Please try again."  # SAFE DEFAULT


    # Save the incoming message to the database
    incoming_message = Message(
        sender = phone_number,
        recipient ="Onfon",
        content = message,
        direction ="IN"
    )   
    db.session.add(incoming_message)
    db.session.commit()

    if message.upper() == "PENZI":
        response_text = (
                    "Welome to our dating service with 6000 potential dating partners! "
                      "To register SMS start#name#age#gender#county#town to 22141."
        )
        # Save the outgoing message to the database
        outgoing_message = Message(
            sender ="Onfon",
            recipient = phone_number,
            content = response_text,
            direction ="OUT"
        )
        db.session.add(outgoing_message)
        db.session.commit()

        return jsonify({
            "System" : response_text
        })
                        


    #START REGISTRATION
    elif message.lower().startswith("start"):
    
        parts = message.split("#")

        if len(parts) != 6:
            response_text = "Invalid registration format. Please use: start#name#age#gender#county#town"

            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()

            return jsonify({
                "System" : response_text
            }), 400
        
        _,name,age,gender,county,town= parts
        
        # Check if the user is already registered
        existing_user = User.query.filter_by(phone_number=phone_number).first()
        if existing_user:
            response_text = (
                f"Hi {existing_user.full_name}, you are already registered on Penzi. "
                "SMS details#... to update your profile or match#... to find a partner."
            )
            # Save the outgoing message
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()
            return jsonify({"System" : response_text}), 200

        #save user details to the database
        new_user = User(
            phone_number=phone_number,
            full_name=name,
            age=int(age),
            gender=gender,
            county=county,
            town=town
        )
        db.session.add(new_user)
        db.session.commit()

        response_text = (
             f"Your profile has been created successfully {name}. "
            "SMS details#levelOfEducation#profession#maritalStatus#religion#ethnicity to 22141."
        )
        # Save the outgoing message to the database
        outgoing_message = Message(
            sender ="Onfon",
            recipient = phone_number,
            content = response_text,
            direction ="OUT"
        )
        db.session.add(outgoing_message)
        db.session.commit()

        return jsonify({
            "System" : response_text})

    
    #DETAILS STAGE
    elif message.lower().startswith("details"):
        parts = message.split("#")
        #print(len(parts))
        if len(parts) == 2:
            response_text = (
                "To search for a MPENZI, SMS match#age#town to 22141 and meet the person of your dreams"
            )
            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()

            return jsonify({
                "System" : response_text
            })

        if len(parts) != 6:
            response_text = (
                "Invalid details format. Please use: details#levelOfEducation#profession " +
                "#maritalStatus#religion#ethnicity"
            )
            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()
            
            return jsonify({
                "System" : response_text
            }), 400
        
        _,level_of_education,profession,marital_status,religion,ethnicity = parts

        #update user details in the database
        user = User.query.filter_by(phone_number=phone_number).first()
        if not user:
            response_text = "You are not registered yet. Please SMS start#name#age#gender#county#town to 22141 first."
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()
            return jsonify({"System" : response_text}), 404

        user.level_of_education = level_of_education
        user.profession = profession
        user.marital_status = marital_status
        user.religion = religion
        user.ethnicity = ethnicity

        db.session.commit()

        response_text = (
            "This is the last stage of registration. "
            "SMS a brief description of yourself to 22141 starting with the word MYSELF." 
            "E.g., MYSELF chocolate, lovely, sexy etc."
        )
        # Save the outgoing message to the database
        outgoing_message = Message(
            sender ="Onfon",
            recipient = phone_number,
            content = response_text,
            direction ="OUT"
        )
        db.session.add(outgoing_message)
        db.session.commit()

        return jsonify({
            "System": response_text})
    
    #MYSELF STAGE
    if message.upper().startswith("MYSELF"):
        parts=message.split(" ")
        description = " ".join(parts[1:])  # Join all parts after "MYSELF"
        
        #update user self description in the database
        user = User.query.filter_by(phone_number=phone_number).first()
        if not user:
            response_text = "You are not registered yet. Please SMS start#name#age#gender#county#town to 22141 first."
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()
            return jsonify({"System" : response_text}), 404

        user.self_description = description
        db.session.commit()

        response_text = (
            "You are now registered for dating." +
            "To search for a MPENZI, SMS match#age#town to 22141 and meet the person of your dreams"
        )
        # Save the outgoing message to the database
        outgoing_message = Message(
            sender ="Onfon",
            recipient = phone_number,
            content = response_text,
            direction ="OUT"
        )
        db.session.add(outgoing_message)
        db.session.commit()

        return jsonify({
            "System": response_text
        })
    
    elif message.lower().startswith("match"):
        parts = message.split("#")
        if len(parts) != 3:
            response_text = (
                "Invalid match format. Please use: match#(26-30)#town"
            )

            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()

            return jsonify({
                "System" : response_text
            }), 400
        
        _,age_range,town = parts

        #parse age range
        try:
            if '-' not in age_range:
                response_text = "Invalid age range format. Please use: match#(26-30)#town"
                # Save the outgoing message to the database
                outgoing_message = Message(
                    sender ="Onfon",
                    recipient = phone_number,
                    content = response_text,
                    direction ="OUT"
                )
                db.session.add(outgoing_message)
                db.session.commit()
                return jsonify({
                    "System" : response_text})
            
            min_age, max_age = map(int, age_range.split('-'))
        except ValueError:
            response_text = "Invalid age range format. Please use: match#26-30#town"
            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()
            return jsonify({
                "System" : response_text
            }), 400
        #Get the person requesting the match
        sender_user = User.query.filter_by(phone_number=phone_number).first()
        if not sender_user:
            response_text = "User not found. Please register first by sending 'PENZI'."
            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()

            return jsonify({
                "System" : response_text
            }), 404
        
        # Determine opposite gender
        if sender_user.gender == "Male":
            opposite_gender = "Female"
        else:
            opposite_gender = "Male"

        batch_size = 3
        current_page = (sender_user.match_offset // batch_size) + 1
        offset_value = (current_page - 1) * batch_size

        #Query for potential matches based on age, town, and opposite gender
        matches_query = User.query.filter(
            User.age >= min_age,
            User.age <= max_age,
            User.gender == opposite_gender,
            User.town.ilike(f"%{town}%")
        ) 

        total_matches = matches_query.count()
        matches = matches_query.offset(offset_value).limit(batch_size).all()

        if total_matches == 0:
            response_text = "No matches found."
            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()
            return jsonify({
                "System" : response_text
            })
        else:
            remaining = total_matches - len(matches)
            response_text = f"We found {total_matches} match(es) for you.\n\n"
            for match in matches:
                response_text += f"{match.full_name}, aged {match.age} {match.phone_number}\n"

            if remaining > 0:
                response_text += f"\nSend NEXT to receive details of the remaining {remaining}."

            #Save to match_session table
            match_session = MatchSession(
                sender_phone=phone_number,
                message=message,
                page_no=1
            )
            db.session.add(match_session)
            db.session.commit()

            #SAVE SEARCH PARAMETERS TO USER TABLE FOR PAGINATION
            sender_user.last_min_age = min_age
            sender_user.last_max_age = max_age
            sender_user.last_town = town
            sender_user.match_offset = batch_size  # Set to 3 so next NEXT starts at offset 3
            sender_user.match_session_id = phone_number  # Track session
            sender_user.match_page_count = 1  # Start at page 1
            db.session.commit()

            # Save the outgoing message to the database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"

            )
            db.session.add(outgoing_message)
            db.session.commit()
            return jsonify({
                "System" : response_text
            })

    elif message.upper() == "NEXT":
        sender_user = User.query.filter_by(phone_number=phone_number).first()
    
        if not sender_user or sender_user.last_min_age is None:
            response_text = "No active match request. Please send match#(26-30)#town first."

            #save outgoing message
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()
            return jsonify({
                "System" : response_text
            })

    
        batch_size = 3
        current_page = (sender_user.match_offset // batch_size) + 1
        offset_value = (current_page - 1) * batch_size
    
        # Query for potential matches based on stored age range and town
        matches_query = User.query.filter(
            User.age >= sender_user.last_min_age,
            User.age <= sender_user.last_max_age,
            User.gender != sender_user.gender,
            User.town.ilike(f"%{sender_user.last_town}%")
            ).order_by(User.user_id)

        total_matches = matches_query.count()
        matches = matches_query.offset(offset_value).limit(batch_size).all()
    
        if not matches:
            response_text = "No more matches available."
            #save outgoing message to database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()

    
        remaining = total_matches - (offset_value + len(matches))
        response_text = ""
        for match in matches:
            response_text += f"{match.full_name}, aged {match.age}, {match.phone_number}\n"
    
        if remaining > 0:
            response_text += f"\nSend NEXT to 22141 to receive details of the remaining {remaining}"

            #increment page count
            sender_user.match_page_count += 1
            current_page =sender_user.match_page_count

            #save sesssion 
            match_session = MatchSession(
                sender_phone=phone_number,
                message=message,
                page_no=current_page
            )
            db.session.add(match_session)
            db.session.commit()

            #save outgoing message to database
            outgoing_message = Message(
                sender ="Onfon",
                recipient = phone_number,
                content = response_text,
                direction ="OUT"
            )
            db.session.add(outgoing_message)
            db.session.commit()

        # Increase offset for next NEXT request
        sender_user.match_offset += batch_size
        db.session.commit()
    
    return jsonify({"System": response_text})

@routes.route('/check-registration/<phone_number>', methods=['GET'])
def check_registration(phone_number):
    user = User.query.filter_by(phone_number=phone_number).first()
    return jsonify({
        "is_registered": user is not None,
        "full_name": user.full_name if user else None
    })

@routes.route('/dashboard/stats', methods=['GET'])
def get_stats():
    total_users = User.query.count()
    
    # Active today: users who sent a message today
    today_start = datetime.combine(date.today(), datetime.min.time())
    active_today = Message.query.filter(Message.date >= today_start, Message.direction == 'IN').with_entities(Message.sender).distinct().count()
    
    return jsonify({
        "total_users": total_users,
        "active_today": active_today
    })

