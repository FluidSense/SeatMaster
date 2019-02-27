from models.user import User
from shared import db
import re


def getUserByUsername(username):
    user = db.session.query(User).filter(username=username).first()
    return user


def registerUser(userInfo):
    userId = userInfo.get("dataporten-userid_sec", None)[0]
    regex = re.compile(r'(?<=:)(\w+)(?=@)')
    username = regex.search(userId).group(0)
    user = User(username=username, sub=userInfo.get("sub"), email=userInfo.get("email"))
    db.session.add(user)
    db.session.commit()
    return user.to_json(), 200


def getApplicationByStudentNumber(studentNumber):
    user = db.session.query(User).filter(studentNumber=studentNumber).first()
    return user
