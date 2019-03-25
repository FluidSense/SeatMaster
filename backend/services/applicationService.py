from models.application import Application
from models.user import User
from shared import db
from sqlalchemy.exc import SQLAlchemyError


def getAllApplications():
    applications = db.session.query(Application).all()
    return applications


def getApplicationById(id):
    userApplication = db.session.query(Application).get(id)
    return userApplication


def getApplicationByUserId(userid):
    userApplication = db.session.query(Application).filter(Application.userid == userid).first()
    return userApplication


def getApplicationByUsername(username):
    userApplication = db.session.query(Application).join(User).filter(User.username == username).first()
    return userApplication


def registerApplication(comments, needs, user, partnerUsername, seatRollover, preferredRoom, rank):
    try:
        application = Application(
            status="SUBMITTED",
            needs=needs,
            user=user,
            partnerUsername=partnerUsername,
            comments=comments,
            seatRollover=seatRollover,
            preferredRoom=preferredRoom,
            rank=rank,
        )
        db.session.add(application)
        db.session.commit()
        connectApplication(application)
        return application.to_json(), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400


# makes relation between two applications if their userids match
def connectApplication(application):
    partnerApplication = getApplicationByUsername(application.partnerUsername)
    if(not partnerApplication):
        return
    if(partnerApplication.partnerUsername == application.user.username):
        application.partnerApplication = partnerApplication
        partnerApplication.partnerApplication = application
        db.session.add(application, partnerApplication)
        db.session.commit()
