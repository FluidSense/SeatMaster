from models.seat import Seat
from models.room import Room
from pytest import raises
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm.exc import FlushError


def test_add_room_without_room(db_session):
    testuser1 = Seat("D1", None, "info")
    with raises(IntegrityError):
        db_session.add(testuser1)
        db_session.commit()


def test_add_seat_with_room(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        id="D1",
        room=room,
        info="",
    )
    db_session.add(seat)
    db_session.commit()
    dbseat = db_session.query(Seat).first()
    dbroom = db_session.query(Room).first()
    assert seat == dbseat
    assert dbseat.room == room
    assert dbroom.seats == [seat]


def test_seat_serialization(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        id="D1",
        room=room,
        info="",)
    db_session.add(seat)
    db_session.commit()
    expectedJson = dict(id=seat.seat_id, info=seat.info, roomId=seat.room_id)
    seat = db_session.query(Seat).first()
    assert seat.to_json() == expectedJson


def test_users_connect_each_other(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        id="D1",
        room=room,
        info="")
    db_session.add(seat)
    db_session.commit()
    seat2 = Seat(
        id="D1",
        room=room,
        info="hello im another object xP")
    with raises(FlushError):
        db_session.add(seat2)
        db_session.commit()
