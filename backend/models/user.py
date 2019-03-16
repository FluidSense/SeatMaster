from shared import db
import json


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(
        "userid",
        db.Integer,
        primary_key=True)

    sub = db.Column(
        "sub",
        db.String(),
        unique=True,
    )

    username = db.Column(
        "username",
        db.String(60),
        unique=True)

    fullname = db.Column(
        "fullname",
        db.String(60),
        unique=False)

    email = db.Column(
        "email",
        db.String(30),
        nullable=True)

    application = db.relationship(
        "Application",
        uselist=False,
        back_populates="user")

    def __init__(self, username, sub, email, fullname):
        self.username = username
        self.fullname = fullname
        self.sub = sub
        self.email = email

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "fullname": self.fullname,
            "email": self.email
        }

    def __str__(self):
        return json.dumps(self.to_json())
