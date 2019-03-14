from models.seat import Seat
from models.room import Room


def createRoomWithSeats(db_session):
    room = Room(name="Alke", info="stuff")
    seat1 = Seat(id="D1", room=room, info="its a seat")
    seat2 = Seat(id="D2", room=room, info="its a seat")
    db_session.add(room)
    db_session.add(seat1)
    db_session.add(seat2)
    db_session.commit()
    return room, seat1, seat2


def test_rooms_are_connected_to_seats(db_session):
    room, seat1, seat2 = createRoomWithSeats(db_session)
    assert room.seats == [seat1, seat2]


def test_cascading(db_session):
    room, seat1, seat2 = createRoomWithSeats(db_session)
    db_session.delete(room)
    db_session.commit()
    assert db_session.query(Seat).all() is None
