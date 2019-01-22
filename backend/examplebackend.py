from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from models import showcase 

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bachelor:07idistudadm@localhost:5432/bachelor'


@app.route("/")
def hello():
    return "Suk my dik"

@app.route("/getExample", methods = ['GET'])
def new():
    if request.method == 'GET':
        result = showcase.query.all()
        return result

