from models.application import Application
from models.user import User
from shared import db
from sqlalchemy.exc import SQLAlchemyError
from utils.enums import ApplicationStatus
from services.applicationSeasonService import getCurrentOrNext


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
        season = getCurrentOrNext()
        application = Application(
            status=ApplicationStatus.SUBMITTED,
            needs=needs,
            user=user,
            partnerUsername=partnerUsername,
            comments=comments,
            seatRollover=seatRollover,
            preferredRoom=preferredRoom,
            rank=rank,
            applicationSeason=season,
        )
        db.session.add(application)
        db.session.commit()
        connectApplication(application)
        return application.to_json(), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def updateApplication(userid, form):
    try:
        application = getApplicationByUserId(userid)
        for field in form.keys():
            if(field in application.userEditableFields()):
                setattr(application, field, form[field])
        db.session.add(application)
        db.session.commit()
        if ("partnerUsername" in form.keys()):
            connectApplication(application)
        return application.to_json(), 200
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def updateApplicationById(id, form):
    try:
        application = getApplicationById(id)
        for field in form.keys():
            setattr(application, field, form[field])
        db.session.add(application)
        db.session.commit()
        if ("partnerUsername" in form.keys()):
            connectApplication(application)
        return application.to_json(), 200
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def approveApplicationsByIds(ids):
    try:
        applications = []
        for id in ids:
            application = getApplicationById(id)
            application.status = ApplicationStatus.APPROVED
            db.session.add(application)
            applications.append(application)
        db.session.commit()
        return applications, 200
    except (SQLAlchemyError, AttributeError) as err:
        print(err)
        return "", 400


def setWaitingListByIds(ids):
    try:
        applications = []
        for id in ids:
            application = getApplicationById(id)
            application.status = ApplicationStatus.WAITING_LIST
            db.session.add(application)
            applications.append(application)
        db.session.commit()
        return applications, 200
    except (SQLAlchemyError, AttributeError) as err:
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
