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
        preferredRoom="d1",
        seatRollover=True,
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
        preferredRoom="d1",
        seatRollover=True,
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
        preferredRoom="d1",
        seatRollover=True,
    )
    application1 = Application(
        status="",
        needs="",
        comments="",
        user=testuser1,
        partnerUsername=testuser2.username,
        preferredRoom="d1",
        seatRollover=True,
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
        preferredRoom="d1",
        seatRollover=True,
    )
    db_session.add(application)
    db_session.commit()
    application.room_id = seat.room_id
    application.seat_id = seat.seat_id
    assert application.seat == seat


def test_cascading_user(db_session):
    user = User(username="yoo", sub="sub", email="email")
    application = Application(
        status="statusss",
        needs="needs",
        user=user,
        partnerUsername="partnerUsername",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True)
    db_session.add(user)
    db_session.add(application)
    db_session.commit()
    db_session.expire_all()
    db_session.delete(application)
    db_session.commit()
    dbuser = db_session.query(User).first()
    assert dbuser == user
    assert user.application is None


def test_cascading_partnerApplication(db_session):
    user1 = User(username="August", sub="sub", email="email")
    application1 = Application(
        status="statusss",
        needs="needs",
        user=user1,
        partnerUsername="Øggøst",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True)
    user2 = User(username="Øggøst", sub="sub2", email="email2")
    application2 = Application(
        status="statusss",
        needs="needs",
        user=user2,
        partnerUsername="August",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True)
    db_session.add(user1)
    db_session.add(user2)
    db_session.add(application1)
    db_session.add(application2)
    application1.partnerApplication = application2
    application2.partnerApplication = application1
    db_session.commit()
    db_session.expire_all()
    db_session.delete(application1)
    db_session.commit()
    dbapplication = db_session.query(Application).first()
    assert dbapplication == application2
    assert dbapplication.partnerApplication is None


def test_cascading_seat(db_session):
    user = User(username="yoo", sub="sub", email="email")
    application = Application(
        status="statusss",
        needs="needs",
        user=user,
        partnerUsername="partnerUsername",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True)
    room = Room(name="room", info="info")
    seat = Seat(id="d1", room=room, info="info")
    application.room_id = seat.room_id
    application.seat_id = seat.seat_id
    db_session.add(user)
    db_session.add(application)
    db_session.add(room)
    db_session.add(seat)
    db_session.commit()
    db_session.expire_all()
    db_session.delete(application)
    db_session.commit()
    dbseat = db_session.query(Seat).first()
    assert dbseat == seat
    assert user.application is None
