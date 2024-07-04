from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String, unique=False, nullable=True)
    surname = db.Column(db.String, unique=False, nullable=True)
    description = db.Column(db.String, unique=False, nullable=True)
    avatar = db.Column(db.String, unique=False, nullable=True)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.email}>'

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
    title = db.Column(db.String, unique=False, nullable=True)
    nationality = db.Column(db.String, unique=False, nullable=True)
    sex = db.Column(db.String, unique=False, nullable=True)
    description = db.Column(db.String, unique=False, nullable=True)
    caution = db.Column(db.String, unique=False, nullable=True)
    race = db.Column(db.String, unique=False, nullable=True)
    remarks = db.Column(db.Text, unique=False, nullable=True)
    hair_raw = db.Column(db.String, unique=False, nullable=True)
    possible_countries = db.Column(db.Text, unique=False, nullable=True) # Array to string
    aliases = db.Column(db.Text, unique=False, nullable=True) # Array to string
    place_of_birth = db.Column(db.Text, unique=False, nullable=True)
    dates_of_birth_used = db.Column(db.String, unique=False, nullable=True) # Array to string
    eyes = db.Column(db.String, unique=False, nullable=True)
    subjects = db.Column(db.Text, unique=False, nullable=True) # Array to string
    images = db.Column(db.Text, unique=False, nullable=True)
    field_offices = db.Column(db.Text, unique=False, nullable=True) # Array to string
    reward_text = db.Column(db.String, unique=False, nullable=True)
    weight =db.Column(db.String, unique=False, nullable=True)
    poster_classification = db.Column(db.String, unique=False, nullable=True)
    favourites_amount = db.Column(db.Integer, unique=False, nullable=True)
    poster_classification = db.Column(db.String, unique=False, nullable=True)

    def __repr__(self):
        return f'<Criminal: {self.title}>'

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
                'subjects': self.subjects,
                'images': self.images,
                'field_offices': self.field_offices,
                'reward_text': self.reward_text,
                'weight': self.weight,
                'favourites_amount': self.favourites_amount,
                'poster_classification': self.poster_classification}

    def public_serialize(self):
        return{
                'id_crime': self.id,
                'title_criminal': self.title,
                'nationality': self.nationality,
                'sex': self.sex,
                'description_criminal': self.description,
                'caution': self.caution,
                'race': self.race,
                'remarks': self.remarks,
                'hair_raw': self.hair_raw,
                'possible_countries': self.possible_countries,
                'aliases': self.aliases,
                'place_of_birth': self.place_of_birth,
                'dates_of_birth_used': self.dates_of_birth_used,
                'eyes': self.eyes,
                'subjects': self.subjects,
                'images': self.images,
                'field_offices': self.field_offices,
                'reward_text': self.reward_text,
                'weight': self.weight,
                'favourites_amount': self.favourites_amount,
                'poster_classification': self.poster_classification

        }


class MissingPersons(db.Model):
    __tablename__ = "missing_persons"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=True)
    nationality = db.Column(db.String, unique=False, nullable=True)
    sex = db.Column(db.String, unique=False, nullable=True)
    description = db.Column(db.String, unique=False, nullable=True)
    race = db.Column(db.String, unique=False, nullable=True)
    remarks = db.Column(db.String, unique=False, nullable=True)
    hair_raw = db.Column(db.String, unique=False, nullable=True)
    possible_countries = db.Column(db.Text, unique=False, nullable=True) # Array to string
    place_of_birth = db.Column(db.Text, unique=False, nullable=True)
    dates_of_birth_used = db.Column(db.String, unique=False, nullable=True) # Array to string
    eyes = db.Column(db.String, unique=False, nullable=True)
    subjects = db.Column(db.Text, unique=False, nullable=True) # Array to string
    details = db.Column(db.String, unique=False, nullable=True)
    images = db.Column(db.Text, unique=False, nullable=True)
    field_offices = db.Column(db.Text, unique=False, nullable=True) # Array to string
    reward_text = db.Column(db.String, unique=False, nullable=True)
    weight =db.Column(db.String, unique=False, nullable=True)
    poster_classification = db.Column(db.String, unique=False, nullable=True)
    favourites_amount = db.Column(db.Integer, unique=False, nullable=True)
    poster_classification = db.Column(db.String, unique=False, nullable=True)


    def __repr__(self):
        return f'<Missing_Persons: {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'nationality': self.nationality,
                'sex': self.sex,
                'description': self.description,
                'race': self.race,
                'remarks': self.remarks,
                'hair_raw': self.hair_raw,
                'possible_countries': self.possible_countries,
                'place_of_birth': self.place_of_birth,
                'dates_of_birth_used': self.dates_of_birth_used,
                'eyes': self.eyes,
                'subjects': self.subjects,
                'details' : self.details,
                'images': self.images,
                'field_offices': self.field_offices,
                'reward_text': self.reward_text,
                'weight': self.weight,
                'favourites_amount': self.favourites_amount,
                'poster_classification': self.poster_classification}


class StoriesCriminals(db.Model):
    __tablename__ = "stories_criminals"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    body = db.Column(db.String, unique=False, nullable=False)
    prompt = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    creation_date =db.Column(db.Date, unique=False, nullable=True)
    modification_date = db.Column(db.Date, unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users',foreign_keys = [user_id])
    criminal_id = db.Column(db.Integer, db.ForeignKey("criminals.id"), nullable=False)
    criminal_to = db.relationship('Criminals',foreign_keys = [criminal_id])

    def __repr__(self):
        return f'<Title: {self.title}>'

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
    def public_serialize(self):
        return{
                'story_id': self.id,
                'title_story': self.title,
                'body_story': self.body,
                'prompt_story': self.prompt,
                'description': self.description,
                'creation_date': self.creation_date,
                'modification_date': self.modification_date,
                'user_id': self.user_id,
                'criminal_id': self.criminal_id
        }


class StoriesMissingPersons(db.Model):
    __tablename__ = "stories_missing_persons"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    body = db.Column(db.String, unique=False, nullable=False)
    prompt = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    creation_date =db.Column(db.Date, unique=False, nullable=True)
    modification_date = db.Column(db.Date, unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users',foreign_keys = [user_id])
    missing_person_id = db.Column(db.Integer, db.ForeignKey("missing_persons.id"), nullable=False)
    missing_person_to = db.relationship('MissingPersons',foreign_keys = [missing_person_id])

    def __repr__(self):
        return f'<Title: {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'body': self.body,
                'prompt': self.prompt,
                'description': self.description,
                'creation_date': self.creation_date,
                'modification_date': self.modification_date,
                'user_id': self.user_id,
                'missing_person_id': self.missing_person_id}


class SavedCriminals(db.Model):
    __tablename__ = "saved_criminals"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users',foreign_keys = [user_id])
    criminal_id = db.Column(db.Integer, db.ForeignKey("criminals.id"), nullable=False)
    criminal_to = db.relationship('Criminals',foreign_keys = [criminal_id])

    def __repr__(self):
        return f'< User: {self.user_id} Criminal_id: {self.criminal_id}>' # Esto es lo que se enseña cuando hacemos print

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'criminal_id': self.criminal_id}
    
    def public_serialize (self):
        return {'id_save_criminal': self.id,
                'criminal_id': self.criminal_id}


class SavedMissingPersons(db.Model):
    __tablename__ = "saved_missing_persons"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users',foreign_keys = [user_id])
    missing_person_id = db.Column(db.Integer, db.ForeignKey("missing_persons.id"), nullable=False)
    missing_person_to = db.relationship('MissingPersons',foreign_keys = [missing_person_id])

    def __repr__(self):
        return f'< User: {self.user_id} Missing_person_id: {self.missing_person_id}>'

    def serialize(self):
        return {'id': self.id,
                'user_id': self.user_id,
                'missing_person_id': self.missing_person_id}


class CommentsCriminals(db.Model):
    __tablename__ = "comments_criminals"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users',foreign_keys = [user_id])
    criminal_id = db.Column(db.Integer, db.ForeignKey("criminals.id"), nullable=False)
    criminal_to = db.relationship('Criminals',foreign_keys = [criminal_id])
    comment = db.Column(db.String, unique=False, nullable=False)
    comment_date = db.Column(db.Date, unique=False, nullable=False)

    def __repr__(self):
        return f'< User: {self.user_id} Criminal_id: {self.criminal_id}>'

    def serialize(self):
        return {'id': self.id,
                'comment': self.comment,
                'comment_date': self.comment_date,
                'criminal_id': self.criminal_id,
                'user_id': self.user_id}


class CommentsMissingPersons(db.Model):
    __tablename__ = "comments_missing_persons"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    user_to = db.relationship('Users',foreign_keys = [user_id])
    missing_person_id = db.Column(db.Integer, db.ForeignKey("missing_persons.id"), nullable=False)
    missing_person_to = db.relationship('MissingPersons',foreign_keys = [missing_person_id])
    comment = db.Column(db.String, unique=False, nullable=False)
    comment_date = db.Column(db.Date, unique=False, nullable=False)

    def __repr__(self):
        return f'< User: {self.user_id} Missing_person_id: {self.missing_person_id}>'

    def serialize(self):
        return {'id': self.id,
                'comment': self.comment,
                'comment_date': self.comment_date,
                'missing_person_id': self.missing_person_id,
                'user_id': self.user_id}
    