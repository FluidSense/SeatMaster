from services import applicationService
from models.user import User
from models.application import Application
from shared import db


def setUp(mocker):
    user1 = User("Yoda", "sub", "email")
    user2 = User("Obi Wan", "sub", "email")
    app1 = Application(
        status="good",
        comments="whatever",
        needs="needs",
        user=user1,
        partnerUsername="Obi Wan",
        preferredRoom="d1",
        seatRollover=True,
    )
    app2 = Application(
        status="good",
        comments="whatever",
        needs="needs",
        user=user2,
        partnerUsername="Yoda",
        preferredRoom="d1",
        seatRollover=True,
    )
    mocker.patch.object(db.session, 'add')
    db.session.add.return_value = ""
    mocker.patch.object(db.session, 'commit')
    db.session.commit.return_value = ""
    return user1, user2, app1, app2


def test_application_connection_succeed(mocker):
    user1, user2, app1, app2 = setUp(mocker)
    mocker.patch.object(applicationService, 'getApplicationByUsername')
    applicationService.getApplicationByUsername.return_value = app2
    applicationService.connectApplication(app1)
    assert app1.partnerApplication == app2 and app2.partnerApplication == app1
    db.session.add.assert_called_with(app1, app2)
    db.session.commit.assert_called()


def test_application_connection_does_not_connect(mocker):
    user1, user2, app1, app2 = setUp(mocker)
    app2.partnerUsername = "Jar Jar Binks"
    mocker.patch.object(applicationService, 'getApplicationByUsername')
    applicationService.getApplicationByUsername.return_value = app2
    applicationService.connectApplication(app1)
    assert app1.partnerApplication != app2 and app2.partnerApplication != app1
    db.session.add.assert_not_called()
    db.session.commit.assert_not_called()
