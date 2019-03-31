from shared import db


class Seat(db.Model):
    __tablename__ = "seats"

    id = db.Column(
        "seat_id",
        db.Integer,
        primary_key=True)

    room_id = db.Column(
        db.ForeignKey("rooms.room_id"),
        nullable=False,
    )

    seat_name = db.Column(
        "seat_name",
        db.String(10),
        unique=False)

    room = db.relationship(
        "Room",
        uselist=False,
        back_populates="seats")

    info = db.Column(
        "info",
        db.String(),
        nullable=True)

    application = db.relationship(
        "Application",
        uselist=False,
        back_populates="seat"
    )

    def __init__(self, name, room, info):
        self.seat_name = name
        self.room = room
        self.info = info

    def to_json(self, refer_user=True):
        seatDict = {
            "id": self.id,
            "name": self.seat_name,
            "info": self.info,
            "roomId": self.room.id,
        }
        if refer_user:
            seatDict["user"] = self.application.user.to_json() if self.application else None
        return seatDict

    def __str__(self):
        return str(self.__class__) + ":" + str(self.__dict__)
