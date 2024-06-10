from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String, unique=False, nullable=False)
    surname = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=False)
    avatar = db.Column(db.String, unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'name': self.name,
                'surname': self.surname,
                'description': self.description,
                'avatar': self.avatar,
                'is_admin': self.is_admin}


class Criminals(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    nationality = db.Column(db.String, unique=False, nullable=False)
    sex = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=False)
    caution = db.Column(db.String, unique=False, nullable=False)
    race = db.Column(db.String, unique=False, nullable=False)
    remarks = db.Column(db.String, unique=False, nullable=False)
    hair_raw = db.Column(db.String, unique=False, nullable=False)
    possible_countries = db.Column(db.String, unique=False, nullable=False) # Array to string
    aliases = db.Column(db.String, unique=False, nullable=False) # Array to string
    place_of_birth = db.Column(db.String, unique=False, nullable=False)
    dates_of_birth_used = db.Column(db.String, unique=False, nullable=False) # Array to string
    eyes = db.Column(db.String, unique=False, nullable=False)
    subjects = db.Column(db.String, unique=False, nullable=False) # Array to string
    images = db.Column(db.String, unique=False, nullable=False)
    field_offices = db.Column(db.String, unique=False, nullable=False) # Array to string
    reward_text = db.Column(db.String, unique=False, nullable=False)
    weight =db.Column(db.String, unique=False, nullable=False)
    favourites_amount = db.Column(db.Integer, unique=False, nullable=False)

    def __repr__(self):
        return f'<Criminal {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'nationality': self.nationality,
                'sex': self.sex,
                'description': self.description,
                'caution': self.caution,
                'race': self.race,
                'remarks': self.remarks,
                'hair_raw': self.hair_raw,
                'possible_countries': self.possible_countries,
                'aliases': self.aliases,
                'place_of_birth': self.place_of_birth,
                'dates_of_birth_used': self.dates_of_birth_used,
                'eyes': self.eyes,
                'suspects': self.suspects,
                'images': self.images,
                'field_offices': self.images,
                'reward_text': self.reward_text,
                'weight': self.weight,
                'favourites_amount': self.favourites_amount}


class Stories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    body = db.Column(db.String, unique=False, nullable=False)
    prompt = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=False)
    creation_date =db.Column(db.Date, unique=False, nullable=False)
    modification_date = db.Column(db.Date, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship('Users',foreign_keys = [user_id])
    criminal_id = db.Column(db.Integer, db.ForeignKey("criminals.id"))
    criminal_to = db.relationship('Criminals',foreign_keys = [criminal_id])

    def __repr__(self):
        return f'<Title {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'body': self.body,
                'prompt': self.prompt,
                'description': self.description,
                'creation_date': self.creation_date,
                'modification_date': self.modification_date,
                'user_id': self.user_id,
                'criminal_id': self.criminal_id}


class Saved_Criminals(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship('Users',foreign_keys = [user_id])
    criminal_id = db.Column(db.Integer, db.ForeignKey("criminals.id"))
    criminal_to = db.relationship('Criminals',foreign_keys = [criminal_id])

    def __repr__(self):
        return f'<Criminal_id {self.criminal_id}>' # Preguntar a Hector

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'criminal_id': self.criminal_id}


class Commentaries(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user_to = db.relationship('Users',foreign_keys = [user_id])
    criminal_id = db.Column(db.Integer, db.ForeignKey("criminals.id"))
    criminal_to = db.relationship('Criminals',foreign_keys = [criminal_id])
    comment = db.Column(db.String, unique=False, nullable=False)
    comment_date = db.Column(db.Date, unique=False, nullable=False)

    def __repr__(self):
        return f'<Comment {self.comment}>'

    def serialize(self):
        return {'id': self.id,
                'comment': self.comment,
                'comment_date': self.comment_date,
                'criminal_id': self.criminal_id,
                'user_id': self.user_id}
    
    
