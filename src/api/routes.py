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

