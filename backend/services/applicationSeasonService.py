from datetime import datetime
from shared import db
from sqlalchemy.exc import SQLAlchemyError
import json
from models.applicationSeason import ApplicationSeason

# dateFormat = ("%a %b %d %Y %H:%M:%S")
dateFormat = ("%Y-%m-%d %H:%M:%S.%f")


def getCurrentOrNext():
    comingSeasons = db.session.query(ApplicationSeason).filter(ApplicationSeason.end > datetime.today()).all()
    # Find season with closest application start date to today, by comparing date differences
    return min(comingSeasons, key=lambda season: season.applicationPeriodStart - datetime.today(), default=None)


def registerNewSeason(newPeriodEnd, newPeriodStart, newRoomEnd, newRoomStart):
    newPeriodEnd = datetime.strptime(newPeriodEnd, dateFormat)
    newPeriodStart = datetime.strptime(newPeriodStart, dateFormat)
    newRoomEnd = datetime.strptime(newRoomEnd, dateFormat)
    newRoomStart = datetime.strptime(newRoomStart, dateFormat)
    if newPeriodEnd < newPeriodStart:
        return "Application start period should not be later than application end period", 400
    if newRoomEnd < newRoomStart:
        return "Room start period should not be later than application end period", 400
    try:
        applicationSeason = ApplicationSeason(
            newRoomStart,
            newRoomEnd,
            newPeriodStart,
            newPeriodEnd
            )
        db.session.add(applicationSeason)
        db.session.commit()
        return applicationSeason.to_json, 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400
