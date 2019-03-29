from models.applicationSeason import ApplicationSeason
from models.user import User
from models.application import Application
from datetime import datetime, timedelta
from utils.enums import Rank, ApplicationStatus


def createBasicSeason(db_session=None):
    date1 = datetime.now().replace(microsecond=0)
    date2 = datetime.now().replace(microsecond=0) + timedelta(days=365)
    date3 = datetime.now().replace(microsecond=0) + timedelta(days=7)
    date4 = datetime.now().replace(microsecond=0) + timedelta(days=21)
    season = ApplicationSeason(date1, date2, date3, date4)
    if(db_session):
        db_session.add(season)
        db_session.commit()
    return season


def createApplication(db_session=None):
    season = createBasicSeason(db_session)
    user = createUser(db_session)
    application = Application(
        needs="needs",
        comments="comments",
        user=user,
        partnerUsername="Jar Jar Binks",
        preferredRoom="d1",
        seatRollover=True,
        status=ApplicationStatus.SUBMITTED,
        rank=Rank.WRITING_MASTER,
        applicationSeason=season,
    )
    if(db_session):
        db_session.add(application)
        db_session.commit()
    return application


def createUser(db_session=None):
    user = User(username="username",
                sub="55de7d71-4a25-4103-8e43-35df8c2d472a",
                email="email",
                fullname="fullname")
    if(db_session):
        db_session.add(user)
        db_session.commit()
    return user
