from shared import db
from datetime import datetime


class ApplicationSeason(db.Model):
    __tablename__ = "application_season"
    id = db.Column("application_season_id", db.Integer, primary_key=True)
    start = db.Column("starttime", db.DateTime, default=datetime.today())
    end = db.Column("endtime", db.DateTime, nullable=False)
    acceptStart = db.Column("acceptstart", db.DateTime, default=datetime.today())
    acceptEnd = db.Column("acceptend", db.DateTime, nullable=False)


