from shared import db
from models.seat import Seat
from utils.enums import Rank, ApplicationStatus
import json


class Application(db.Model):
    __tablename__ = "application"

    id = db.Column(
        "application_id",
        db.Integer,
        primary_key=True)

    needs = db.Column(
        "needs",
        db.String(),
        nullable=False)

    status = db.Column(
        "status",
        db.Enum(ApplicationStatus),
        nullable=False)

    rank = db.Column(
        "rank",
        db.Enum(Rank)
    )

    comments = db.Column(
        "comments",
        db.String(100))

    applicationSeasonId = db.Column(
        "applicationSeasonId",
        db.ForeignKey("application_season.application_season_id")
    )

    applicationSeason = db.relationship(
        "ApplicationSeason",
        back_populates="applications",
    )

    queuePlacement = db.Column(
        "queuePlacement",
        db.Integer()
    )

    db.UniqueConstraint(
        'applicationSeasonId',
        'queuePlacement',
        name='uix_1')

    userid = db.Column(
        db.Integer,
        db.ForeignKey("users.userid")
    )

    user = db.relationship(
        "User",
        uselist=False,
        back_populates="application")

    partnerUsername = db.Column(
        "applies_with",
        db.String(50),
        nullable=True)

    partnerApplicationId = db.Column(
        db.Integer,
        db.ForeignKey("application.application_id"))

    partnerApplication = db.relationship(
        "Application",
        uselist=False,
        backref='partnersApplication',
        remote_side="Application.id",
        post_update=True)

    preferredRoom = db.Column(
        "preferredRoom",
        db.String(50)
    )

    seatRollover = db.Column(
        "seatRollover",
        db.Boolean()
    )

    room_id = db.Column(db.Integer)

    seat_id = db.Column(db.String)

    __table_args__ = (
        db.ForeignKeyConstraint(
            [room_id, seat_id],
            [Seat.room_id, Seat.seat_id]),
        {}
    )

    seat = db.relationship(
        Seat,
        uselist=False,
        foreign_keys='[Seat.room_id, Seat.seat_id]',
        primaryjoin='Application.room_id==Seat.room_id and Application.seat_id == Seat.seat_id')

    def __init__(self, status, needs, user, partnerUsername, preferredRoom,
                 seatRollover, applicationSeason, comments, rank=Rank.OTHER):
        self.status = status
        self.user = user
        self.needs = needs
        self.comments = comments
        self.preferredRoom = preferredRoom
        self.seatRollover = seatRollover
        self.partnerUsername = partnerUsername
        self.rank = rank
        self.applicationSeason = applicationSeason

    def to_json(self, self_referred=False):
        applicationDict = {
            "id": self.id,
            "status": self.status.name,
            "comments": self.comments,
            "needs": self.needs,
            "rank": self.rank.name,
            "preferredRoom": self.preferredRoom,
            "seatRollover": self.seatRollover,
            "seat": self.seat.to_json(False) if self.seat else None,
            "user": self.user.to_json() if self.user else None,
        }
        # Do not return partnerApplication if jsoning through a partner application.
        if not self_referred:
            applicationDict["partnerApplication"] = (self.partnerApplication.to_json(self_referred=True)
                                                     if self.partnerApplication else {})
            applicationDict["seat"] = self.seat.to_json() if self.seat else None

        return applicationDict

    def __str__(self):
        return json.dumps(self.to_json())

    def userEditableFields(self):
        return ["comments", "needs", "preferredRoom", "seatRollover"]
