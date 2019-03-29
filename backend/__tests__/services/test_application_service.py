from services import applicationService
from models.user import User
from models.application import Application
from shared import db
from __tests__.testUtils.models import createApplication


def setUp(mocker):
    app1 = createApplication()
    user2 = User(username=app1.partnerUsername, sub="sub", email="email", fullname="Obidobie")
    app2 = Application(
        status="good",
        comments="whatever",
        needs="needs",
        user=user2,
        partnerUsername=app1.user.username,
        preferredRoom="d1",
        seatRollover=True,
        applicationSeason=app1.applicationSeason
    )
    mocker.patch.object(db.session, 'add')
    db.session.add.return_value = ""
    mocker.patch.object(db.session, 'commit')
    db.session.commit.return_value = ""
    return app1, app2


def test_application_connection_succeed(mocker):
    app1, app2 = setUp(mocker)
    mocker.patch.object(applicationService, 'getApplicationByUsername')
    applicationService.getApplicationByUsername.return_value = app2
    applicationService.connectApplication(app1)
    assert app1.partnerApplication == app2 and app2.partnerApplication == app1
    db.session.add.assert_called_with(app1, app2)
    db.session.commit.assert_called()


def test_application_connection_does_not_connect(mocker):
    app1, app2 = setUp(mocker)
    app2.partnerUsername = "Jar Jar Binks"
    mocker.patch.object(applicationService, 'getApplicationByUsername')
    applicationService.getApplicationByUsername.return_value = app2
    applicationService.connectApplication(app1)
    assert app1.partnerApplication != app2 and app2.partnerApplication != app1
    db.session.add.assert_not_called()
    db.session.commit.assert_not_called()
