from datetime import datetime
from shared import db
from models.applicationSeason import ApplicationSeason

def getCurrentOrNext():
    comingSeasons = db.session.query(ApplicationSeason).filter(ApplicationSeason.end > datetime.today()).all()
    lowestDiff = 1000
    currentClosest = None
    for season in comingSeasons:
        diff = season.acceptend - datetime.today()
        if diff < lowestDiff:
            lowestDiff = diff
            currentClosest = season
    return currentClosest
