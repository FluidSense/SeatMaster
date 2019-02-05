from shared import db
import json


class Application(db.Model):
    __tablename__ = "application"
    id = db.Column("application_id", db.Integer, primary_key=True)
    applicationtext = db.Column("application_text", db.String(), nullable=False)
    status = db.Column("status", db.String(50), nullable=False)
    comments = db.Column("comments", db.String(100))
    userid = db.Column(db.Integer, db.ForeignKey("users.userid"))
    user = db.relationship("User", uselist=False, cascade="all, delete", back_populates="application")
    partnerUsername = db.Column("applies_with", db.String(50), nullable=True)
    partnerApplication = db.relationship("Application", uselist=False, cascade="all, delete", nullable=True)

    def __init__(self, status, applicationtext, user):
        self.status = status
        self.user = user
        self.applicationtext = applicationtext

    def to_json(self):
        return {
            "id": self.id,
            "status": self.status,
            "comments": self.comments,
            "user": self.user.to_json() if self.user else None,
        }

    def __str__(self):
        return json.dumps(self.to_json())
    
