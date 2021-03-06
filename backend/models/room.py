from shared import db


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
        cascade="all, delete"
    )

    def __init__(self, name, info):
        self.name = name
        self.info = info

    def get_seat_list(self):
        seat_list = list(map(lambda x: x.to_json(), self.seats))
        sorted_seat_list = sorted(seat_list, key=lambda x: x['id'])
        return sorted_seat_list

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "info": self.info,
            "seats": {
                "count": len(self.seats),
                "seats": self.get_seat_list(),
            },
        }

    def __str__(self):
        return str(self.__class__) + ":" + str(self.__dict__)
