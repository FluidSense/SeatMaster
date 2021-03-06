from models.seat import Seat
from models.room import Room
from models.user import User
from models.application import Application
from pytest import raises
from sqlalchemy.exc import IntegrityError
from utils.enums import Rank, ApplicationStatus
from __tests__.testUtils.models import createApplication


def test_add_seat_without_room(db_session):
    testuser1 = Seat("D1", None, "info")
    with raises(IntegrityError):
        db_session.add(testuser1)
        db_session.commit()


def test_add_seat_with_room(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        name="D1",
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
        name="D1",
        room=room,
        info="",)
    db_session.add(seat)
    db_session.commit()
    expectedJson = dict(id=seat.id, name=seat.seat_name, info=seat.info, roomId=seat.room_id, user=None)
    seat = db_session.query(Seat).first()
    assert seat.to_json() == expectedJson


def test_two_seats_same_id(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        name="D1",
        room=room,
        info="")
    db_session.add(seat)
    db_session.commit()
    seat2 = Seat(
        name="D1",
        room=room,
        info="hello im another object xP")
    db_session.add(seat2)
    db_session.commit()
    assert seat.id != seat2.id


def test_application_connect_to_seat(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        name="D1",
        room=room,
        info="")
    db_session.add(seat)
    user = User(username="yooyo", sub="sub", email="email", fullname="schnep schmep")
    db_session.add(user)
    application = createApplication()
    db_session.add(application)
    db_session.commit()
    seat.application = application
    db_session.add(seat)
    db_session.commit()
    assert application.seat == seat


def test_application_multiple_connect_to_seat(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        name="D1",
        room=room,
        info="")
    db_session.add(seat)
    user2 = User(username="yooyo2", sub="sub2", email="email2", fullname="schnep schmep2")
    application1 = createApplication(db_session)
    application2 = Application(
        needs="",
        comments="",
        user=user2,
        partnerUsername="",
        preferredRoom="d1",
        seatRollover=True,
        status=ApplicationStatus.SUBMITTED,
        rank=Rank.WRITING_MASTER,
        applicationSeason=application1.applicationSeason
    )
    db_session.add(application2)
    db_session.commit()
    seat.application = application1
    db_session.add(seat)
    db_session.commit()
    seat.application = application2
    db_session.add(seat)
    db_session.commit()
    assert not application1.seat == seat
    assert application2.seat == seat
    assert seat.application == application2


def test_cascading(db_session):
    room = Room(name="Alko", info="info")
    db_session.add(room)
    db_session.commit()
    seat = Seat(name="D1", room=room, info="info")
    seat2 = Seat(name="D2", room=room, info="info")
    user = User(username="name", sub="sub", email="email", fullname="Dudeman")
    application = createApplication()
    db_session.add(seat)
    db_session.add(seat2)
    db_session.add(user)
    db_session.add(application)
    application.seat_id = seat.id
    application.room_id = seat.room_id
    db_session.commit()
    db_session.expire_all()

    db_session.delete(seat)
    db_session.commit()

    dbroom = db_session.query(Room).first()
    assert dbroom == room
    assert dbroom.seats == [seat2]
    assert db_session.query(Application).first() == application
    assert application.seat is None
