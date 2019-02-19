from shared import db
from models.seat import Seat


class Room(db.Model):
    __tablename__ = "rooms"
    id = db.Column(
        "room_id",
        db.Integer,
        primary_key=True)

    info = db.Column(
        "info",
        db.String(),
        nullable=True)

    name = db.Column(
        "name",
        db.String(50),
        nullable=False)

    seats = db.relationship(
        'Seat',
        back_populates="room",
        foreign_keys=[Seat.room_id, Seat.seat_id]
    )

    def __init__(self, name, info):
        self.name = name
        self.info = info

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "info": self.info,
        }

    def __str__(self):
        return str(self.__class__) + ":" + str(self.__dict__)
