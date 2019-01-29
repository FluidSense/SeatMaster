import json
import os
from flask import Flask, Response, request, abort
from shared import db
from flask_migrate import Migrate
from flask_cors import CORS
from models.showcase import Showcase

#You can change these values in the .env-file
USER = os.getenv("POSTGRES_USER")
PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB = os.getenv("POSTGRES_DB")
HOST = os.getenv("POSTGRES_HOST")

#The f is for string insertion
database_file = f"postgresql://{USER}:{PASSWORD}@{HOST}:5432/{DB}"

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db.init_app(app)
migrate = Migrate(app, db)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})

@app.route("/", methods=["GET"])
def display():
    result = Showcase.query.all()
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


if __name__ == '__main__':
    app.run(host='0.0.0.0')
