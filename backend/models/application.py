from shared import db
import json


class Application(db.Model):
    __tablename__ = "application"

    id = db.Column(
        "application_id",
        db.Integer,
        primary_key=True)

    infoText = db.Column(
        "info_text",
        db.String(),
        nullable=False)

    status = db.Column(
        "status",
        db.String(50),
        nullable=False)

    comments = db.Column(
        "comments",
        db.String(100))

    userid = db.Column(
        db.Integer,
        db.ForeignKey("users.userid"))

    user = db.relationship(
        "User",
        uselist=False,
        cascade="all, delete",
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
        cascade="all, delete",
        backref='partnersApplication',
        remote_side="Application.id",
        post_update=True)

    def __init__(self, status, infoText, user, partnerUsername):
        self.status = status
        self.user = user
        self.infoText = infoText
        self.partnerUsername = partnerUsername

    def to_json(self, self_referred=False):
        applicationDict = {
            "id": self.id,
            "status": self.status,
            "comments": self.infoText,
            "user": self.user.to_json() if self.user else None,
        }
        # Do not return partnerApplication if jsoning through a partner application.
        if not self_referred:
            applicationDict["partnerApplication"] = (self.partnerApplication.to_json(self_referred=True)
                                                     if self.partnerApplication else {})

        return applicationDict

    def __str__(self):
        return json.dumps(self.to_json())
