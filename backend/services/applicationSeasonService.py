from datetime import datetime
from shared import db
from sqlalchemy.exc import SQLAlchemyError
import json
from models.applicationSeason import ApplicationSeason


def getCurrentOrNext():
    comingSeasons = db.session.query(ApplicationSeason).filter(ApplicationSeason.end > datetime.today()).all()
    # Find season with closest application start date to today, by comparing date differences
    return min(comingSeasons, key=lambda season: season.applicationPeriodStart - datetime.today(), default=None)

def registerNewSeason(form):
    newPeriodEnd = form.get("newPeriodEnd")
    newPeriodStart = form.get("newPeriodStart")
    newRoomEnd = form.get("newRoomStart")
    newRoomStart = form.get("newRoomEnd")
    try:
        applicationSeason = ApplicationSeason(
            newRoomStart,
            newRoomEnd,
            newPeriodStart,
            newPeriodEnd
            )
        db.session.add(applicationSeason)
        db.session.commit()
        return json.dumps(form), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400
