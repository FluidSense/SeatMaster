from models.user import User
from shared import db


def getUserByUsername(username):
    user = db.session.query(User).filter(username=username).first()
    return user


def getApplicationByStudentNumber(studentNumber):
    user = db.session.query(User).filter(studentNumber=studentNumber).first()
    return user
