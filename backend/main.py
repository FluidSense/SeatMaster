import os
from flask import Flask
from shared import db
from flask_migrate import Migrate
from flask_cors import CORS
from controllers.applicationController import application
from controllers.applicationSeasonController import applicationSeason
from controllers.roomController import room
from controllers.seatController import seat
from controllers.userController import user
from controllers.mailController import mail
# You can change these values in the .env-filen
USER = os.getenv("POSTGRES_USER")
PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB = os.getenv("POSTGRES_DB")
HOST = os.getenv("POSTGRES_HOST")
DEBUG = os.getenv("DEBUG")
# The f is for string insertion
database_file = f"postgresql://{USER}:{PASSWORD}@{HOST}:5432/{DB}"

migrate = Migrate()


def create_app(config_filename=None, db_url=database_file):
    app = Flask(__name__)
    if config_filename:
        app.config.from_pyfile(config_filename)
    init_extensions(app, db_url)
    register_blueprints(app)
    return app


def init_extensions(app, db_url):
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})


def register_blueprints(app):
    app.register_blueprint(application)
    app.register_blueprint(applicationSeason, url_prefix="/season")
    app.register_blueprint(room, url_prefix="/room")
    app.register_blueprint(seat)
    app.register_blueprint(user)
    app.register_blueprint(mail)


app = create_app()


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=bool(DEBUG))
