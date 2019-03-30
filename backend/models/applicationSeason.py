from shared import db
from datetime import datetime


class ApplicationSeason(db.Model):
    __tablename__ = "application_season"
    id = db.Column(
        "application_season_id",
        db.Integer,
        primary_key=True)

    start = db.Column(
        "starttime",
        db.DateTime,
        default=datetime.today())

    end = db.Column(
        "endtime",
        db.DateTime,
        nullable=False)

    applicationPeriodStart = db.Column(
        "applicationperiodstart",
        db.DateTime,
        default=datetime.today())

    applicationPeriodEnd = db.Column(
        "applicationperiodend",
        db.DateTime,
        nullable=False
    )

    applications = db.relationship(
        "Application",
        back_populates="applicationSeason",
        cascade="all, delete",
    )

    def __init__(self, start, end, applicationPeriodStart, applicationPeriodEnd):
        self.start = start
        self.end = end
        self.applicationPeriodStart = applicationPeriodStart
        self.applicationPeriodEnd = applicationPeriodEnd

    def to_json(self):
        return {
            "start": str(self.start),
            "end": str(self.end),
            "applicationPeriodStart": str(self.applicationPeriodStart),
            "applicationPeriodEnd": str(self.applicationPeriodEnd),
            "id": str(self.id),
        }

    def __str__(self):
        return str(self.__class__) + ":" + str(self.__dict__)
