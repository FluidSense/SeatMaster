from models.application import Application
from models.user import User
from shared import db
from sqlalchemy.exc import SQLAlchemyError
import json


def getApplicationById(id):
    userApplication = db.session.query(Application).get(id)
    return userApplication


def getApplicationByUserId(userid):
    userApplication = db.session.query(Application).filter(Application.User.id == userid).first()
    return userApplication


def getApplicationByUsername(username):
    userApplication = db.session.query(Application).filter(Application.User.username == username).first()
    return userApplication


def registerApplication(status, applicationText, username, partnerId):
    try:
        user = db.session.query(User).filter_by(username=username).one()
        application = Application(status, applicationText, user, partnerId)
        db.session.add(application)
        db.session.commit()
        return json.dumps(form), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400

# makes relation between two applications if their userids match
def connectApplication(application):
    partnerApplication = getApplicationByUsername(application.partnerUsername)
    if(partnerApplication.partnerUsername == application.User.username):
        application.partnerApplication = partnerApplication
