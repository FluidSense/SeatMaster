from models.seat import Seat
from models.room import Room


def createRoomWithSeats(db_session):
    room = Room(name="Alke", info="stuff")
    seat1 = Seat(name="D1", room=room, info="its a seat")
    seat2 = Seat(name="D2", room=room, info="its a seat")
    db_session.add(room)
    db_session.add(seat1)
    db_session.add(seat2)
    db_session.commit()
    return room, seat1, seat2


def test_rooms_are_connected_to_seats(db_session):
    room, seat1, seat2 = createRoomWithSeats(db_session)
    assert room.seats == [seat1, seat2]
    assert seat1.room == room


def test_cascading(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        name="D1",
        room=room,
        info="",
    )
    db_session.add(seat)
    db_session.commit()
    db_session.expire_all()
    db_session.delete(room)
    dbseat = db_session.query(Seat).first()
    dbroom = db_session.query(Room).first()
    assert dbseat is None
    assert dbroom is None
