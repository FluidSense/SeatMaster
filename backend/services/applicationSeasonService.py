from datetime import datetime
from shared import db
from models.applicationSeason import ApplicationSeason

def getCurrentOrNext():
    comingSeasons = db.session.query(ApplicationSeason).filter(ApplicationSeason.end > datetime.today()).all()
   # lowestDiff = timedelta.max
   # currentClosest = None
   # for season in comingSeasons:
   #     diff = season.acceptEnd - datetime.today()
   #     if diff < lowestDiff:
   #         lowestDiff = diff
   #         currentClosest = season
    return min(comingSeasons, key=lambda season: season.applicationPeriodStart - datetime.today)
