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
import requests
import json
import time

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
    response_body['message'] = 'User Signed Up'
    response_body['access_token'] = access_token
    response_body['results']=user.serialize()
    return response_body, 200


@api.route('/login', methods=['POST'])
def login(): 
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    print(user)
    if user: 
        access_token = create_access_token(identity={ 'user_id': user.id,
                                                      'user_is_admin': user.is_admin})
        response_body['message'] = 'User logged in'
        response_body['access_token'] = access_token
        response_body['results'] = user.serialize()
        # Nos hace falta devolver los favoritos del usuario. Incluyendo el ID del favorito y el ID del criminal.
        rows = db.session.execute(db.select(SavedCriminals).where(SavedCriminals.user_id == user.id)).scalars()
        results = [row.public_serialize() for row in rows]
        response_body['saved_criminals'] = results
        return response_body, 200
    response_body['message'] = 'Wrong Username Or Password'
    return response_body, 401


@api.route('/users', methods=['GET'])
def handle_users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    results = [row.serialize() for row in rows]
    response_body['results'] = results
    response_body['message'] = 'User List'
    return response_body, 200


@api.route('/users/<int:user_id>', methods=['GET', 'DELETE', 'PUT'])
def handle_users_id(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'User Found'
            return response_body, 200
        response_body['message'] = 'User Not Found'
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
        response_body['message'] = 'User Profile Updated'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            db.session.delete(user)
            db.session.commit()
            response_body['message'] = 'User Deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'User Not Found'
        response_body['results'] = {}
        return response_body, 404  


def fetch_data_from_api():
    url = 'https://api.fbi.gov/wanted/v1/list'
    page = 1
    rate_limit = 2  # Tiempo en segundos entre las solicitudes

    while True:
        response = requests.get(f'{url}?page={page}')
        if response.status_code != 200:
            break
        data = response.json()
        if 'items' not in data or not data['items']:
            break
        for row in data['items']:
            if row['poster_classification'] != 'missing':
                criminals = Criminals()
                criminals.title = row.get('title','')
                criminals.nationality = row["nationality"]
                criminals.sex = row["sex"]
                criminals.description = row["description"]
                criminals.caution = row["caution"]
                criminals.race = row["race"]
                criminals.remarks = str(row["remarks"])
                criminals.hair_raw = row["hair_raw"]
                criminals.possible_countries = str(row["possible_countries"])
                criminals.aliases = str(row["aliases"])
                criminals.place_of_birth = row["place_of_birth"]
                criminals.dates_of_birth_used = str(row["dates_of_birth_used"])
                criminals.eyes = row["eyes"]
                criminals.subjects = str(row["subjects"])
                criminals.images = row["images"][0]["original"]
                criminals.field_offices = str(row["field_offices"])
                criminals.reward_text = row["reward_text"]
                criminals.weight = row["weight"]
                criminals.poster_classification = row['poster_classification']
                db.session.add(criminals)
        db.session.commit()
        page += 1
        time.sleep(rate_limit) 


def fetch_data_api():
    url = 'https://api.fbi.gov/wanted/v1/list'
    page = 1
    rate_limit = 2  # Tiempo en segundos entre las solicitudes

    while True:
        response = requests.get(f'{url}?page={page}')
        if response.status_code != 200:
            break
        data = response.json()
        if 'items' not in data or not data['items']:
            break
        for row in data['items']:
            if row['poster_classification'] == 'missing':
                missing_persons = MissingPersons()
                missing_persons.title = row['title']
                missing_persons.nationality = row['nationality']
                missing_persons.sex = row['sex']
                missing_persons.description = row['description']
                missing_persons.race = row['race']
                missing_persons.remarks = row['remarks']
                missing_persons.hair_raw = row['hair_raw']
                missing_persons.possible_countries = row['possible_countries']
                missing_persons.place_of_birth = row['place_of_birth']
                missing_persons.dates_of_birth_used = json.dumps(row['dates_of_birth_used'])
                missing_persons.eyes = row['eyes']
                missing_persons.subjects = json.dumps(row['subjects'])
                missing_persons.details = row['details']
                missing_persons.images = row["images"][0]["original"]
                missing_persons.field_offices = json.dumps(row['field_offices'])
                missing_persons.reward_text = row['reward_text']
                missing_persons.weight = row['weight']
                missing_persons.poster_classification = row['poster_classification']
                db.session.add(missing_persons)
        db.session.commit()
        page += 1
        time.sleep(rate_limit) 


@api.route('/data-criminals', methods=['GET'])
def handle_data_Criminals():
     fetch_data_from_api()
     return 'data update'
"""     response_body = {}
    all_data = []
    response = requests.get("https://api.fbi.gov/wanted/v1/list")
    if response.status_code == 200:
        data = response.json()
        all_data.extend(data["items"])
        time.sleep(0.5)
    else:
       print(f"Error en la página {page}: {response.status_code} - {response.reason}")
    for row in all_data:
        criminals = Criminals()
        criminals.title = row["title"]
        criminals.nationality = row["nationality"]
        criminals.sex = row["sex"]
        criminals.description = row["description"]
        criminals.caution = row["caution"]
        criminals.race = row["race"]
        criminals.remarks = str(row["remarks"])
        criminals.hair_raw = row["hair_raw"]
        criminals.possible_countries = str(row["possible_countries"])
        criminals.aliases = str(row["aliases"])
        criminals.place_of_birth = row["place_of_birth"]
        criminals.dates_of_birth_used = str(row["dates_of_birth_used"])
        criminals.eyes = row["eyes"]
        criminals.subjects = str(row["subjects"])
        criminals.images = row["images"][0]["original"]
        criminals.field_offices = str(row["field_offices"])
        criminals.reward_text = row["reward_text"]
        criminals.weight = row["weight"]
        criminals.poster_classification = row['poster_classification']
        db.session.add(criminals)
        db.session.commit()
    response_body['results'] = all_data
    return response_body, 200 """


@api.route('/data-missing', methods=['GET'])
def handle_data_Missing():
    fetch_data_api()
    return 'Data update'

@api.route('/criminals', methods=['GET','POST'])  # Debemos modificar según clase del Lunes 17/06, ya que debemos traer la inf de la API del FBI
def handle_criminals():     
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
        response_body['message'] = 'Criminal Created'
        return response_body, 200
    
    if request.method == 'GET':
        response_body = {}
        rows = db.session.execute(db.select(Criminals)).scalars()
        results = [row.serialize() for row in rows]
        response_body ['results'] = results
        response_body ['message'] = 'List Of Criminals'
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
            response_body ['message'] = 'List Of Missing Persons'
            return response_body, 200


@api.route('/profile/<int:user_id>', methods=['GET']) 
def handle_profile(user_id):
    response_body = {}
    profile = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
    stories_criminals = db.session.execute(db.select(StoriesCriminals).where(StoriesCriminals.user_id == user_id)).scalar()
    stories_missing_persons = db.session.execute(db.select(StoriesMissingPersons).where(StoriesMissingPersons.user_id == user_id)).scalar()
    saved_criminals = db.session.execute(db.select(SavedCriminals).where(SavedCriminals.user_id == user_id)).scalar()
    saved_missing_persons = db.session.execute(db.select(SavedMissingPersons).where(SavedMissingPersons.user_id == user_id)).scalar()
    if profile:
        response_body['Message'] = 'User Found'
        response_body['Profile'] = profile.serialize()
        response_body['Criminal Stories Created'] = stories_criminals.serialize()
        response_body['Missing Persons Stories Created'] = stories_missing_persons.serialize()
        response_body['Saved Criminals'] = saved_criminals.serialize()
        response_body['Saved Missing Persons'] = saved_missing_persons.serialize()
        return response_body, 200
    response_body['message'] = 'User Not Found'
    response_body['results'] = {}
    return response_body, 404


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
        response_body['message'] = 'Created Comment'
        return response_body, 200


@api.route('/comments-criminal/<int:comments_criminal_id>', methods=['GET', 'DELETE']) 
def handle_comments_criminals_id(comments_criminal_id):
    response_body = {}
    if request.method == 'GET':
        comments_criminal = db.session.execute(db.select(CommentsCriminals).where(CommentsCriminals.id == comments_criminal_id)).scalar()
        if comments_criminal:
            response_body['results'] = comments_criminal.serialize()
            response_body['message'] = 'Comment Found'
            return response_body, 200
        response_body['message'] = 'Comment Not Found'
        response_body['results'] = {}
    if request.method == 'DELETE':
        comments_criminal = db.session.execute(db.select(CommentsCriminals).where(CommentsCriminals.id == comments_criminal_id)).scalar()
        if comments_criminal:
            db.session.delete(comments_criminal)
            db.session.commit()
            response_body['message'] = 'Comment Deleted'
            response_body['results'] = {}
        response_body['message'] = 'Comment Not Found'
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
        response_body['results'] = saved_criminals.serialize()
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

@api.route('/users/<int:user_id>/saved-criminals', methods=['GET'])
def handle_users_saved_criminals(user_id):
    response_body = {}
    saved_criminals = db.session.execute(db.select(SavedCriminals).where(SavedCriminals.user_id == user_id)).scalars()
    results = [row.serialize() for row in saved_criminals]
    response_body['results'] = results
    response_body['message'] = 'Saved Criminals'
    return response_body, 200

@api.route('/criminals/<int:criminal_id>/comments', methods = ['GET'])
def handle_criminal_comments(criminal_id):
    response_body = {}
    criminal_comments = db.session.execute(db.select(CommentsCriminals).where(CommentsCriminals.criminal_id == criminal_id)).scalars()
    results = [row.serialize() for row in criminal_comments]
    response_body['results'] = results
    response_body['message'] = 'Criminal comments'
    return response_body, 200

@api.route('/missing-persons/<int:missing_person_id>/comments', methods = ['GET'])
def handle_missing_persons_comments(missing_person_id):
    response_body = {}
    missing_person_comments = db.session.execute(db.select(CommentsMissingPersons).where(CommentsMissingPersons.missing_person_id == missing_person_id)).scalars()
    results = [row.serialize() for row in missing_person_comments]
    response_body['results'] = results
    response_body['message'] = 'Missing Person comments'
    return response_body, 200

@api.route('/saved-missing-persons', methods=['GET','POST']) 
def handle_saved_missing_persons():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(SavedMissingPersons)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Saved Missing Persons List'
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
        response_body['results'] =  saved_missing_person.serialize()
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
        response_body['message'] = 'Story Criminals List'
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
        response_body['message'] = 'Story Criminal Created'
        return response_body, 200

@api.route('/stories-criminals/<int:stories_criminals_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_stories_criminals_id(stories_criminals_id):
    response_body = {}
    if request.method == 'GET':
        stories_criminals = db.session.execute(db.select(StoriesCriminals).where(StoriesCriminals.id == stories_criminals_id)).scalar()
        if stories_criminals:
            response_body['results'] = stories_criminals.serialize()
            response_body['message'] = 'Story Found'
            return response_body, 200
        response_body['message'] = 'Story Not Found'
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
            response_body['message'] = 'Criminal Story Modified'
            response_body['results'] = stories_criminals.serialize()
            return response_body, 200
        response_body['message'] = 'Criminal Story Not Found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        stories_criminals = db.session.execute(db.select(StoriesCriminals).where(StoriesCriminals.id == stories_criminals_id)).scalar()
        if stories_criminals:
            db.session.delete(stories_criminals)
            db.session.commit()
            response_body['message'] = 'Story Criminal Deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Story Criminal Not Found'
        response_body['results'] = {}
        return response_body, 404  

@api.route('/stories-missing-persons', methods=['GET', 'POST']) 
def handle_stories_missing_person():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(StoriesMissingPersons)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Story Missing Persons List'
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
        response_body['message'] = 'Story Missing Person Created'
        return response_body, 200

@api.route('/stories-missing-persons/<int:stories_missing_persons_id>', methods=['GET', 'PUT', 'DELETE']) 
def handle_stories_missing_persons_id(stories_missing_persons_id):
    response_body = {}
    if request.method == 'GET':
        stories_missing_persons = db.session.execute(db.select(StoriesMissingPersons).where(StoriesMissingPersons.id == stories_missing_persons_id)).scalar()
        if stories_missing_persons:
            response_body['results'] = stories_missing_persons.serialize()
            response_body['message'] = 'Story Found'
            return response_body, 200
        response_body['message'] = 'Story Not found'
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
            response_body['message'] = 'Criminal Story Modified'
            response_body['results'] = stories_missing_persons.serialize()
            return response_body, 200
        response_body['message'] = 'Missing Person Story Not Found'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        stories_missing_persons = db.session.execute(db.select(StoriesMissingPersons).where(StoriesMissingPersons.id == stories_missing_persons_id)).scalar()
        if stories_missing_persons:
            db.session.delete(stories_missing_persons)
            db.session.commit()
            response_body['message'] = 'Story Missing Person deleted'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'Story Missing Person Not Found'
        response_body['results'] = {}
        return response_body, 404   


@api.route('/missing-persons/<int:missing_person_id>', methods=['GET']) 
def handle_missing_persons_id(missing_person_id):
    response_body = {}
    if request.method == 'GET':
        missing_person = db.session.execute(db.select(MissingPersons).where(MissingPersons.id == missing_person_id)).scalar()
        if missing_person:
            response_body['results'] = missing_person.serialize()
            response_body['message'] = 'Missing Person Found'
            return response_body, 200
        response_body['message'] = 'Missing Person Not Found'
        response_body['results'] = {}
        return response_body, 404


@api.route('/criminals/<int:criminals_id>', methods=['GET']) 
def handle_criminals_id(criminals_id):
    response_body = {}
    if request.method == 'GET':
        criminals = db.session.execute(db.select(Criminals).where(Criminals.id == criminals_id)).scalar()
        if criminals:
            response_body['results'] = criminals.serialize()
            response_body['message'] = 'Criminal Found'
            return response_body, 200
        response_body['message'] = 'Criminal Not Found'
        response_body['results'] = {}
        return response_body, 404

