from models.user import User
from shared import db
import re
from sqlalchemy.exc import SQLAlchemyError


def getUserByUsername(username):
    user = db.session.query(User).filter(User.username == username).first()
    return user


def getUserById(id):
    user = db.session.query(User).get(id)
    return user


def registerUser(userInfo):
    userId = userInfo.get("dataporten-userid_sec", None)[0]
    regex = re.compile(r'(?<=:)(\w+)(?=@)')
    username = regex.search(userId).group(0)
    user = User(username=username, sub=userInfo.get("sub"), email=userInfo.get("email"), fullname=userInfo.get("name"))
    db.session.add(user)
    db.session.commit()
    return user.to_json(), 201


def getUserFromSub(sub):
    user = db.session.query(User).filter(User.sub == sub).first()
    return user


def getApplicationByStudentNumber(studentNumber):
    user = db.session.query(User).filter(User.studentNumber == studentNumber).first()
    return user


def deleteUser(id):
    try:
        user = getUserById(id)
        db.session.delete(user)
        db.session.commit()
        return user.to_json(), 200
    except(SQLAlchemyError):
        return "", 400


def deleteAllUsers():
    rows = db.session.query(User).delete()
    return rows, 200
