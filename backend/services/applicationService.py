from ..models.application import Application
from ..models.user import User
from ..shared import db
from sqlalchemy.exc import SQLAlchemyError
import json


def getApplicationById(id):
    userApplication = db.session.query(Application).get(id)
    return userApplication


def getApplicationByUserId(userid):
    userApplication = db.session.query(Application).filter(Application.userid == userid).first()
    return userApplication


def registerApplication(form):
    status = form.get('status')
    applicationText = form.get("applicationtext")
    user = form.get("username")
    try:
        user = db.session.query(User).filter_by(username=user).one()
        application = Application(status, applicationText, user)
        db.session.add(application)
        db.session.commit()
        return json.dumps(form), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400
