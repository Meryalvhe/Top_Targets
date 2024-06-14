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


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/signup', methods=['POST'])
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


@api.route('/login', methods=['POST'])
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


@api.route('/criminals', methods=['POST'])  # Debemos modificar según clase del Lunes 17/06, ya que debemos traer la inf de la API del FBI
def handle_criminals(): 
    response_body = {}
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


@api.route('/missing-persons', methods=['POST'])  # Debemos modificar según clase del Lunes 17/06, ya que debemos traer la inf de la API del FBI
def handle_missing_persons(): 
    response_body = {}
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