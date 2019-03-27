from models.application import Application
from models.user import User
from models.room import Room
from models.seat import Seat
from models.applicationSeason import ApplicationSeason
from utils.enums import Rank, ApplicationStatus
from __tests__.testUtils.models import createBasicSeason


def test_add_application_without_partner(db_session):
    season = createBasicSeason(db_session)
    testuser1 = User(username="Powerking", sub="sub", email="email", fullname="Asbjørn ELEVG baby")
    db_session.add(testuser1)
    db_session.commit()
    application = Application(
        needs="",
        comments="",
        user=testuser1,
        partnerUsername=None,
        preferredRoom="d1",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )
    db_session.add(application)
    db_session.commit()
    dbapplication = db_session.query(Application).first()
    assert dbapplication == application
    assert dbapplication.user == testuser1
    assert testuser1.application == dbapplication


def test_proper_user_serialization(db_session):
    season = createBasicSeason(db_session)
    testuser1 = User(username="Powerking", sub="sub", email="email", fullname="Asbjørn ELEVG baby")
    db_session.add(testuser1)
    application = Application(
        needs="",
        comments="",
        user=testuser1,
        partnerUsername=None,
        preferredRoom="d1",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )
    db_session.add(application)
    db_session.commit()
    dbapplication = db_session.query(Application).first()
    assert testuser1.to_json() == dbapplication.to_json()['user']


def test_users_connect_each_other(db_session):
    season = createBasicSeason(db_session)
    testuser1 = User(username="Powerking", sub="sub", email="email", fullname="Asbjørn ELEVG baby")
    testuser2 = User(username="Powerkings", sub="subs", email="emails", fullname="Asbjørns ELEVGs babys")
    db_session.add(testuser1)
    db_session.add(testuser2)
    application2 = Application(
        needs="",
        comments="",
        user=testuser2,
        partnerUsername=testuser1.username,
        preferredRoom="d1",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )
    application1 = Application(
        needs="",
        comments="",
        user=testuser1,
        partnerUsername=testuser2.username,
        preferredRoom="d1",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
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
    season = createBasicSeason(db_session)
    room = Room("D1", "kek")
    db_session.add(room)
    seat = Seat(
        id="D1",
        room=room,
        info="")
    db_session.add(seat)
    user = User(username="yoyoyo", sub="sub", email="email", fullname="schnep scmep")
    db_session.add(user)
    application = Application(
        needs="",
        comments="",
        user=user,
        partnerUsername="",
        preferredRoom="d1",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )
    db_session.add(application)
    db_session.commit()
    application.room_id = seat.room_id
    application.seat_id = seat.seat_id
    assert application.seat == seat


def test_application_connect_to_season(db_session):
    season = createBasicSeason(db_session)
    user = User(username="yoyoyo", sub="sub", email="email", fullname="schnep scmep")
    db_session.add(user)
    application = Application(
        needs="",
        comments="",
        user=user,
        partnerUsername="",
        preferredRoom="d1",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )
    db_session.add(season)
    db_session.add(application)
    db_session.commit()
    dbseason = db_session.query(ApplicationSeason).first()
    assert application.applicationSeason == season
    assert dbseason.applications == [application]


def test_cascading_user(db_session):
    season = createBasicSeason(db_session)
    user = User(username="yoo", sub="sub", email="email", fullname="Dudeman")
    application = Application(
        needs="needs",
        user=user,
        partnerUsername="partnerUsername",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )

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
    season = createBasicSeason(db_session)
    user1 = User(username="August", sub="sub", email="email", fullname="Solvæng")
    application1 = Application(
        needs="needs",
        user=user1,
        partnerUsername="Øggøst",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )
    user2 = User(username="Øggøst", sub="sub2", email="email2", fullname="Sålvong")
    application2 = Application(
        needs="needs",
        user=user2,
        partnerUsername="August",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
        )
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
    season = createBasicSeason(db_session)
    user = User(username="yoo", sub="sub", email="email", fullname="Man Man McMan")
    application = Application(
        needs="needs",
        user=user,
        partnerUsername="partnerUsername",
        comments="comments",
        preferredRoom="pref",
        seatRollover=True,
        rank=Rank.WRITING_MASTER,
        status=ApplicationStatus.SUBMITTED,
        applicationSeason=season
    )
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
