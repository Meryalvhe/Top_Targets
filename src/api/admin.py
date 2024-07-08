import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Criminals, MissingPersons, CommentsCriminals, CommentsMissingPersons, SavedCriminals, SavedMissingPersons, StoriesCriminals, StoriesMissingPersons


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    admin.add_view(ModelView(Users, db.session))  
    admin.add_view(ModelView(Criminals, db.session)) 
    admin.add_view(ModelView(MissingPersons, db.session)) 
    admin.add_view(ModelView(CommentsCriminals, db.session)) 
    admin.add_view(ModelView(CommentsMissingPersons, db.session)) 
    admin.add_view(ModelView(SavedCriminals, db.session)) 
    admin.add_view(ModelView(SavedMissingPersons, db.session)) 
    admin.add_view(ModelView(StoriesCriminals, db.session)) 
    admin.add_view(ModelView(StoriesMissingPersons, db.session)) 
