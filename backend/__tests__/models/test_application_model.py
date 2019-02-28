from models.application import Application
from models.user import User
from models.room import Room
from models.seat import Seat


def test_add_application_without_partner(db_session):
    testuser1 = User("Powerking", "sub", "email")
    db_session.add(testuser1)
    db_session.commit()
    application = Application(
        status="",
        needs="",
        comments="",
        user=testuser1,
        partnerUsername=None,
    )
    db_session.add(application)
    db_session.commit()
    dbapplication = db_session.query(Application).first()
    assert dbapplication == application
    assert dbapplication.user == testuser1
    assert testuser1.application == dbapplication


def test_proper_user_serialization(db_session):
    testuser1 = User("Powerking", "sub", "email")
    db_session.add(testuser1)
    application = Application(
        status="",
        needs="",
        comments="",
        user=testuser1,
        partnerUsername=None,
    )
    db_session.add(application)
    db_session.commit()
    dbapplication = db_session.query(Application).first()
    assert testuser1.to_json() == dbapplication.to_json()['user']


def test_users_connect_each_other(db_session):
    testuser1 = User("Powerking", "sub", "email")
    testuser2 = User("Powerkings", "subs", "emails")
    db_session.add(testuser1)
    db_session.add(testuser2)
    application2 = Application(
        status="",
        needs="",
        comments="",
        user=testuser2,
        partnerUsername=testuser1.username,
    )
    application1 = Application(
        status="",
        needs="",
        comments="",
        user=testuser1,
        partnerUsername=testuser2.username,
    )
    application1.partnerApplication = application2
    application2.partnerApplication = application1
    db_session.add(application1)
    db_session.add(application2)
    db_session.commit()
    dbapp1 = db_session.query(Application).filter_by(user=testuser1).one()
    dbapp2 = db_session.query(Application).filter_by(user=testuser2).one()
    assert dbapp1.partnerApplication == application2
    assert dbapp2.partnerApplication == application1


def test_application_connect_to_seat(db_session):
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        id="D1",
        room=room,
        info="")
    db_session.add(seat)
    user = User("yooyo", "sub", "email")
    db_session.add(user)
    application = Application(
        status="",
        needs="",
        comments="",
        user=user,
        partnerUsername="",
    )
    db_session.add(application)
    db_session.commit()
    application.room_id = seat.room_id
    application.seat_id = seat.seat_id
    assert application.seat == seat
