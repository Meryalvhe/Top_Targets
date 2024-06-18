"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Criminals, MissingPersons, CommentsCriminals, CommentsMissingPersons, SavedCriminals, SavedMissingPersons, StoriesCriminals, StoriesMissingPersons
from openai import OpenAI
import os

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API
client = OpenAI(api_key= os.getenv("OPENAI_API_KEY"))

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    completion = client.chat.completions.create(model="gpt-3.5-turbo",
                                                messages=[{"role": "user", "content": "give me a sentence with 3 words"}])
    print(completion.choices[0].message)
    print(completion.choices[0].message.content)
    response_body["message"] = completion.choices[0].message.content
    return response_body, 200


@api.route('/signup', methods=['GET', 'POST'])
def signup():
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = Users()
    user.email = email
    user.password = password
    user.is_active = True
    user.is_admin = False
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={ 'user_id': user.id,
                                                  'user_is_admin': user.is_admin})
    response_body['message'] = 'User signed up'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route('/login', methods=['GET','POST'])
def login(): 
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if user: 
        access_token = create_access_token(identity={ 'user_id': user.id,
                                                      'user_is_admin': user.is_admin})
        response_body['message'] = 'User logued'
        response_body['access_token'] = access_token
        response_body['results'] = user.serialize()
        return response_body, 200
    response_body['message'] = 'bad username or password'
    return response_body, 401


@api.route('/users', methods=['GET'])
def handle_users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = 'User list'
    return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'DELETE', 'PUT'])
def handle_users_id(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'User found'
            return response_body, 200
        response_body['message'] = 'User not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.name = data['name']
            user.surname = data['surname']
            user.description = data['description']
            user.avatar = data['avatar']
            db.session.commit()
            response_body['message'] = 'Datos del usuario actualizados'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usuario no encontrado'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            db.session.delete(user)
            db.session.commit()
            response_body['message'] = 'User deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'User not found'
        response_body['results'] = {}
        return response_body, 404  
        

@api.route('/criminals', methods=['GET','POST'])  # Debemos modificar según clase del Lunes 17/06, ya que debemos traer la inf de la API del FBI
def handle_criminals(): 
    response_body = {}
    if request.method == 'POST':
        title = request.json.get("title", None)
        nationality = request.json.get("nationality", None)
        sex = request.json.get("sex", None)
        description = request.json.get("description", None)
        caution = request.json.get("caution", None)
        race = request.json.get("race", None)
        remarks = request.json.get("remarks", None)
        hair_raw = request.json.get("hair_raw", None)
        possible_countries = request.json.get("possible_countries", None)
        aliases = request.json.get("aliases", None)
        place_of_birth = request.json.get("place_of_birth", None)
        dates_of_birth_used = request.json.get("dates_of_birth_used", None)
        eyes = request.json.get("eyes", None)
        subjects = request.json.get("subjects", None)
        images = request.json.get("images", None)
        field_offices = request.json.get("field_offices", None)
        reward_text = request.json.get("reward_text", None)
        weight = request.json.get("weight", None)
        favourites_amount = request.json.get("favourites_amount", None)
        criminals = Criminals()
        criminals.title = title
        criminals.nationality = nationality
        criminals.sex = sex
        criminals.description = description
        criminals.caution = caution
        criminals.race = race
        criminals.remarks = remarks 
        criminals.hair_raw = hair_raw
        criminals.possible_countries = possible_countries
        criminals.aliases = aliases
        criminals.place_of_birth = place_of_birth
        criminals.dates_of_birth_used = dates_of_birth_used
        criminals.eyes = eyes
        criminals.subjects = subjects
        criminals.images = images
        criminals.field_offices = field_offices
        criminals.reward_text = reward_text
        criminals.weight = weight
        criminals.favourites_amount = favourites_amount
        db.session.add(criminals)
        db.session.commit()
        response_body['message'] = 'Criminal created'
        return response_body, 200
    if request.method == 'GET':
        rows = db.session.execute(db.select(Criminals)).scalars()
        results = [row.serialize() for row in rows]
        response_body ['results'] = results
        response_body ['message'] = 'List of criminals'
        return response_body, 200


@api.route('/missing-persons', methods=['GET','POST'])  # Debemos modificar según clase del Lunes 17/06, ya que debemos traer la inf de la API del FBI
def handle_missing_persons(): 
    response_body = {}
    if request.method == 'POST':
        title = request.json.get("title", None)
        nationality = request.json.get("nationality", None)
        sex = request.json.get("sex", None)
        description = request.json.get("description", None)
        race = request.json.get("race", None)
        remarks = request.json.get("remarks", None)
        hair_raw = request.json.get("hair_raw", None)
        possible_countries = request.json.get("possible_countries", None)
        place_of_birth = request.json.get("place_of_birth", None)
        dates_of_birth_used = request.json.get("dates_of_birth_used", None)
        eyes = request.json.get("eyes", None)
        subjects = request.json.get("subjects", None)
        images = request.json.get("images", None)
        field_offices = request.json.get("field_offices", None)
        reward_text = request.json.get("reward_text", None)
        weight = request.json.get("weight", None)
        favourites_amount = request.json.get("favourites_amount", None)
        missing_persons = MissingPersons()
        missing_persons.title = title
        missing_persons.nationality = nationality
        missing_persons.sex = sex
        missing_persons.description = description
        missing_persons.race = race
        missing_persons.remarks = remarks 
        missing_persons.hair_raw = hair_raw
        missing_persons.possible_countries = possible_countries
        missing_persons.place_of_birth = place_of_birth
        missing_persons.dates_of_birth_used = dates_of_birth_used
        missing_persons.eyes = eyes
        missing_persons.subjects = subjects
        missing_persons.images = images
        missing_persons.field_offices = field_offices
        missing_persons.reward_text = reward_text
        missing_persons.weight = weight
        missing_persons.favourites_amount = favourites_amount
        db.session.add(missing_persons)
        db.session.commit()
        response_body['message'] = 'Created Missing Person'
        return response_body, 200
    if request.method == 'GET':
            rows = db.session.execute(db.select(MissingPersons)).scalars()
            results = [row.serialize() for row in rows]
            response_body ['results'] = results
            response_body ['message'] = 'List of missing persons'
            return response_body, 200

""" @api.route('/profile', methods=['GET']) 
def handle_profile():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars() """

@api.route('/comments-criminal', methods=['GET','POST']) 
def handle_comments_criminals():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CommentsCriminals)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Comments list'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        user_id = request.json.get ("user_id", None)
        criminal_id = request.json.get ("criminal_id", None)
        comment = request.json.get ("comment", None)
        comment_date = request.json.get ("comment_date", None)   
        comments_criminal = CommentsCriminals()    
        comments_criminal.user_id = user_id
        comments_criminal.criminal_id = criminal_id
        comments_criminal.comment = comment
        comments_criminal.comment_date = comment_date
        db.session.add(comments_criminal)
        db.session.commit()
        response_body['message'] = 'Created comment'
        return response_body, 200

@api.route('/comments-criminal/<int:comments_criminal_id>', methods=['GET', 'DELETE']) 
def handle_comments_criminals_id(comments_criminal_id):
    response_body = {}
    if request.method == 'GET':
        comments_criminal = db.session.execute(db.select(CommentsCriminals).where(CommentsCriminals.id == comments_criminal_id)).scalar()
        if comments_criminal:
            response_body['results'] = comments_criminal.serialize()
            response_body['message'] = 'Comment found'
            return response_body, 200
        response_body['message'] = 'Comment not found'
        response_body['results'] = {}
    if request.method == 'DELETE':
        comments_criminal = db.session.execute(db.select(CommentsCriminals).where(CommentsCriminals.id == comments_criminal_id)).scalar()
        if comments_criminal:
            db.session.delete(comments_criminal)
            db.session.commit()
            response_body['message'] = 'Comment deleted'
            response_body['results'] = {}
        response_body['message'] = 'Comment not found'
        response_body['results'] = {}
        return response_body, 200


@api.route('/comments-missing-persons', methods=['GET','POST']) 
def handle_comments_missing_persons():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CommentsMissingPersons)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Comments list'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        user_id = request.json.get ("user_id", None)
        missing_person_id = request.json.get ("criminal_id", None)
        comment = request.json.get ("comment", None)
        comment_date = request.json.get ("comment_date", None)   
        comments_missing_person = CommentsMissingPersons()    
        comments_missing_person.user_id = user_id
        comments_missing_person.missing_person_id = missing_person_id
        comments_missing_person.comment = comment
        comments_missing_person.comment_date = comment_date
        db.session.add(comments_missing_person)
        db.session.commit()
        response_body['message'] = 'Created comment'
        return response_body, 200
        

@api.route('/comments-missing-persons/<int:comments_missing_person_id>', methods=['GET', 'DELETE']) 
def handle_comments_missing_persons_id(comments_missing_person_id):
    response_body = {}
    if request.method == 'GET':
        comments_missing_person= db.session.execute(db.select(CommentsMissingPersons).where(CommentsMissingPersons.id == comments_missing_persons_id)).scalar()
        if comments_missing_person:
            response_body['results'] = comments_missing_person.serialize()
            response_body['message'] = 'Comment found'
            return response_body, 200
        response_body['message'] = 'Comment not found'
        response_body['results'] = {}
    if request.method == 'DELETE':
        comments_missing_person = db.session.execute(db.select(CommentsMissingPersons).where(CommentsMissingPersons.id == comments_missing_person_id)).scalar()
        if comments_missing_person:
            db.session.delete(comments_missing_person)
            db.session.commit()
            response_body['message'] = 'Comment deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Comment not found'
        response_body['results'] = {}
        return response_body, 404


@api.route('/saved-criminals', methods=['GET','POST']) 
def handle_saved_criminals():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(SavedCriminals)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Saved Criminals list'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        criminal_id = request.json.get ("criminal_id", None)
        user_id = request.json.get ("user_id", None)
        saved_criminals = SavedCriminals()
        saved_criminals.criminal_id  = criminal_id
        saved_criminals.user_id  = user_id
        db.session.add(saved_criminals)
        db.session.commit()
        response_body['message'] = 'Saved criminal'
        return response_body, 200


@api.route('/saved-criminals/<int:saved_criminals_id>', methods=['GET', 'DELETE']) 
def handle_saved_criminals_id(saved_criminals_id):
    response_body = {}
    if request.method == 'GET':
        saved_criminals = db.session.execute(db.select(SavedCriminals).where(SavedCriminals.id == saved_criminals_id)).scalar()
        if saved_criminals:
            response_body['results'] = saved_criminals.serialize()
            response_body['message'] = 'Saved Criminal Found'
            return response_body, 200
        response_body['message'] = 'Saved Criminal Not Found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        saved_criminals = db.session.execute(db.select(SavedCriminals).where(SavedCriminals.id == saved_criminals_id)).scalar()
        if saved_criminals:
            db.session.delete(saved_criminals)
            db.session.commit()
            response_body['message'] = 'Saved Criminal Deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Saved Criminal Not Found'
        response_body['results'] = {}
        return response_body, 404


@api.route('/saved-missing-persons', methods=['GET','POST']) 
def handle_saved_missing_persons():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(SavedMissingPersons)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Saved Missing Persons list'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        missing_person_id = request.json.get ("missing_person_id", None)
        user_id = request.json.get ("user_id", None)
        saved_missing_person = SavedMissingPersons()
        saved_missing_person.missing_person_id  = missing_person_id
        saved_missing_person.user_id  = user_id
        db.session.add(saved_missing_person)
        db.session.commit()
        response_body['message'] = 'Saved Missing Person'
        return response_body, 200


@api.route('/saved-missing-persons/<int:saved_missing_person_id>', methods=['GET', 'DELETE']) 
def handle_saved_missing_persons_id(saved_missing_person_id):
    response_body = {}
    if request.method == 'GET':
        saved_missing_person = db.session.execute(db.select(SavedMissingPersons).where(SavedMissingPersons.id == saved_missing_person_id)).scalar()
        if saved_missing_person:
            response_body['results'] = saved_missing_person.serialize()
            response_body['message'] = 'Saved Missing Person Found'
            return response_body, 200
        response_body['message'] = 'Saved Missing Person Not Found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        saved_missing_person = db.session.execute(db.select(SavedMissingPersons).where(SavedMissingPersons.id == saved_missing_person_id)).scalar()
        if saved_missing_person:
            db.session.delete(saved_missing_person)
            db.session.commit()
            response_body['message'] = 'Saved Missing Person Deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Saved Missin Person Not Found'
        response_body['results'] = {}
        return response_body, 404


@api.route('/stories-criminals', methods=['GET', 'POST']) 
def handle_stories_criminals():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(StoriesCriminals)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Stories Criminals List'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        user_id = request.json.get ("user_id", None)
        criminal_id = request.json.get ("criminal_id", None)
        title = request.json.get ("title", None)
        body = request.json.get ("body", None)
        prompt = request.json.get ("prompt", None)
        description = request.json.get ("description", None)
        creation_date = request.json.get ("creation_date", None)
        modification_date = request.json.get ("modification_date", None)
        stories_criminals = StoriesCriminals()
        stories_criminals.user_id  = user_id
        stories_criminals.criminal_id = criminal_id
        stories_criminals.title = title
        stories_criminals.body = body
        stories_criminals.prompt = prompt
        stories_criminals.description = description
        stories_criminals.creation_date = creation_date
        stories_criminals.modification_date = modification_date
        db.session.add(stories_criminals)
        db.session.commit()
        response_body['message'] = 'Stories Criminal Created'
        return response_body, 200


@api.route('/stories-criminals/<int:stories_criminals_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_stories_criminals_id(stories_criminals_id):
    response_body = {}
    if request.method == 'GET':
        stories_criminals = db.session.execute(db.select(StoriesCriminals).where(StoriesCriminals.id == stories_criminals_id)).scalar()
        if stories_criminals:
            response_body['results'] = stories_criminals.serialize()
            response_body['message'] = 'Storie Found'
            return response_body, 200
        response_body['message'] = 'Storie not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        stories_criminals = db.session.execute(db.select(StoriesCriminals).where(StoriesCriminals.id == stories_criminals_id)).scalar()
        if stories_criminals:
            stories_criminals.user_id = data['user_id']
            stories_criminals.criminal_id = data['criminal_id']
            stories_criminals.title = data['title']
            stories_criminals.body = data['body']
            stories_criminals.prompt = data['prompt']
            stories_criminals.description = data['description']
            stories_criminals.creation_date = data['creation_date']
            stories_criminals.modification_date = data['modification_date']
            db.session.commit()
            response_body['message'] = 'Criminal storie modified'
            response_body['results'] = stories_criminals.serialize()
            return response_body, 200
        response_body['message'] = 'Criminal storie not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        stories_criminals = db.session.execute(db.select(StoriesCriminals).where(StoriesCriminals.id == stories_criminals_id)).scalar()
        if stories_criminals:
            db.session.delete(stories_criminals)
            db.session.commit()
            response_body['message'] = 'Storie Criminal deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Storie Criminal not found'
        response_body['results'] = {}
        return response_body, 404  


@api.route('/stories-missing-persons', methods=['GET', 'POST']) 
def handle_stories_missing_person():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(StoriesMissingPersons)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Stories Missing Persons List'
        return response_body, 200
    if request.method == 'POST':
        response_body = {}
        user_id = request.json.get ("user_id", None)
        missing_person_id = request.json.get ("missing_person_id", None)
        title = request.json.get ("title", None)
        body = request.json.get ("body", None)
        prompt = request.json.get ("prompt", None)
        description = request.json.get ("description", None)
        creation_date = request.json.get ("creation_date", None)
        modification_date = request.json.get ("modification_date", None)
        stories_missing_person = StoriesMissingPersons()
        stories_missing_person.user_id  = user_id
        stories_missing_person.missing_person_id = missing_person_id
        stories_missing_person.title = title
        stories_missing_person.body = body
        stories_missing_person.prompt = prompt
        stories_missing_person.description = description
        stories_missing_person.creation_date = creation_date
        stories_missing_person.modification_date = modification_date
        db.session.add(stories_missing_person)
        db.session.commit()
        response_body['message'] = 'Stories Missing Person Created'
        return response_body, 200

@api.route('/stories-missing-persons/<int:stories_missing_persons_id>', methods=['GET', 'PUT', 'DELETE']) 
def handle_stories_missing_persons_id(stories_missing_persons_id):
    response_body = {}
    if request.method == 'GET':
        stories_missing_persons = db.session.execute(db.select(StoriesMissingPersons).where(StoriesMissingPersons.id == stories_missing_persons_id)).scalar()
        if stories_missing_persons:
            response_body['results'] = stories_missing_persons.serialize()
            response_body['message'] = 'Storie Found'
            return response_body, 200
        response_body['message'] = 'Storie not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        stories_missing_persons = db.session.execute(db.select(StoriesMissingPersons).where(StoriesMissingPersons.id == stories_missing_persons_id)).scalar()
        if stories_missing_persons:
            stories_missing_persons.user_id = data['user_id']
            stories_missing_persons.missing_person_id = data['missing_person_id']
            stories_missing_persons.title = data['title']
            stories_missing_persons.body = data['body']
            stories_missing_persons.prompt = data['prompt']
            stories_missing_persons.description = data['description']
            stories_missing_persons.creation_date = data['creation_date']
            stories_missing_persons.modification_date = data['modification_date']
            db.session.commit()
            response_body['message'] = 'Criminal storie modified'
            response_body['results'] = stories_missing_persons.serialize()
            return response_body, 200
        response_body['message'] = 'Missing Person storie not found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        stories_missing_persons = db.session.execute(db.select(StoriesMissingPersons).where(StoriesMissingPersons.id == stories_missing_persons_id)).scalar()
        if stories_missing_persons:
            db.session.delete(stories_missing_persons)
            db.session.commit()
            response_body['message'] = 'Storie Missing Person deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Storie Missing Person not found'
        response_body['results'] = {}
        return response_body, 404   