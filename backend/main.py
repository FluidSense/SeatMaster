import json
import random
import os
from flask import Flask, Response, request, abort
from .shared import db
from flask_migrate import Migrate
from flask_cors import CORS
from .models.showcase import Showcase
from .controllers.applicationController import application
from .controllers.applicationSeasonController import applicationSeason

# You can change these values in the .env-file
USER = os.getenv("POSTGRES_USER")
PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB = os.getenv("POSTGRES_DB")
HOST = os.getenv("POSTGRES_HOST")

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
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})


def register_blueprints(app):
    app.register_blueprint(application)
    app.register_blueprint(applicationSeason, url_prefix="/season")


app = create_app()


@app.route("/", methods=["GET"])
def display():
    result = db.session.query(Showcase).all()
    return ", ".join(str(e.id) for e in result)


@app.route("/post", methods=["POST"])
def reveerb():
    if request.form:
        thing = Showcase(name=request.form.get("name"))
        db.session.add(thing)
        db.session.commit()
        return Response(request.form, status=201)


@app.route("/update", methods=["PUT"])
def skateboards():
    if request.data:
        data = json.loads(request.data)
        if not data.get("id") or not data.get("name"):
            return abort(400)
        dbthing = db.session.query(Showcase).get(data["id"])
        dbthing.name = data["name"]
        db.session.add(dbthing)
        db.session.commit()
        return Response("OK", status=202)


@app.route("/delete", methods=["DELETE"])
def tea():
    if request.data:
        data = json.loads(request.data)
        if not data.get("name"):
            return abort(400)
        dbthing = db.session.query(Showcase).filter_by(name=data["name"]).first()
        if not dbthing:
            return abort(404)
        db.session.delete(dbthing)
        db.session.commit()
        return Response("DELETED", status=202)


@app.route("/copypasta", methods=["GET"])
def copyPasta():
    with open("./static/reddit.txt") as f:
        output = f.read()
    output = output.split("\n\n")
    return json.dumps({'copyPasta': random.choice(output)})


if __name__ == '__main__':
    app.run(host='0.0.0.0')
