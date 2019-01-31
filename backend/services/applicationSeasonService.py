from datetime import datetime
from shared import db
from models.applicationSeason import ApplicationSeason

def getCurrentOrNext():
    comingSeasons = db.session.query(ApplicationSeason).filter(ApplicationSeason.end > datetime.today()).all()
    return min(comingSeasons, key=lambda season: season.applicationPeriodStart - datetime.today(), default=None)
