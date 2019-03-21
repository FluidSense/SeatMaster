from shared import db


class Seat(db.Model):
    __tablename__ = "seats"
    __table_args__ = (
        db.UniqueConstraint("room_id", "seat_id"),
    )

    room_id = db.Column(
        db.ForeignKey('rooms.room_id'),
        primary_key=True,
        )

    seat_id = db.Column(
        "seat_id",
        db.String(2),
        primary_key=True,
        unique=False)

    room = db.relationship(
        "Room",
        back_populates="seats")

    info = db.Column(
        "info",
        db.String(),
        nullable=True)

    assignedApplication = db.relationship(
        "Application",
        uselist=False,
        backref="Application"
    )

    def __init__(self, id, room, info):
        self.seat_id = id
        self.room = room
        self.info = info

    def to_json(self):
        return {
            "id": self.seat_id,
            "info": self.info,
            "roomId": self.room.id,
        }

    def __str__(self):
        return str(self.__class__) + ":" + str(self.__dict__)
