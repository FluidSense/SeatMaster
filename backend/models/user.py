from ..shared import db
import json


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(
        "userid",
        db.Integer,
        primary_key=True)

    username = db.Column(
        "username",
        db.String(30),
        unique=True)

    application = db.relationship(
        "Application",
        uselist=False,
        back_populates="user")

    def __init__(self, username):
        self.username = username

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
        }

    def __str__(self):
        return json.dumps(self.to_json())
