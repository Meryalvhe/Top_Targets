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
    response_body['message'] = 'Usuario registrado'
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
        response_body['message'] = 'User logueado'
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
    response_body['message'] = 'Listado de Usuarios'
    return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'DELETE', 'PUT'])
def handle_users_id(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'Usuario encontrado'
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
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
            response_body['message'] = 'Usuario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Usuario no encontrado'
        response_body['results'] = {}
        return response_body, 200    
        

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
        response_body['message'] = 'Criminal creado'
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
        response_body['message'] = 'Missing Person creado'
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
        rows = db.session.execute(db.select(comments_criminals)).scalars()
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

#@api.route('/comments-criminal/<int: comments_criminals_id>', methods=['GET', 'DELETE']) 

@api.route('/comments-missing-persons', methods=['GET','POST']) 
def handle_comments_missing_persons():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(comments_missing_persons)).scalars()
        results = [row.serialize() for row in rows]
        

#@api.route('/comments-missing-persons/<int: comments_missing_person_id>', methods=['GET', 'DELETE']) 
#@api.route('/saved-criminals', methods=['GET','POST']) 
#@api.route('/saved-criminals/<int: saved_criminals_id>', methods=['GET', 'DELETE']) 
#@api.route('/saved-missing-persons', methods=['GET','POST']) 
#@api.route('/saved-missing-persons/<int: saved_missing_person_id>', methods=['GET', 'DELETE']) 
#@api.route('/stories-criminals', methods=['GET', 'POST']) 
#@api.route('/stories-criminals/<int: stories_criminals_id>', methods=['GET', 'PUT, 'DELETE']) 
#@api.route('/stories-missing-persons', methods=['GET', 'POST']) 
#@api.route('/stories-missing-persons/<int: missing_persons_id>', methods=['GET', 'PUT, 'DELETE']) 
