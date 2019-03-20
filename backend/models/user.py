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

    email = db.Column(
        "email",
        db.String(30),
        nullable=True)

    application = db.relationship(
        "Application",
        uselist=False,
        cascade="all, delete",
        back_populates="user")

    def __init__(self, username, sub, email):
        self.username = username
        self.sub = sub
        self.email = email

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

    def __str__(self):
        return json.dumps(self.to_json())
