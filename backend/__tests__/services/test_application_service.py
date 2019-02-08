from services import applicationService
from models.user import User
from models.application import Application
from shared import db


def setUp(mocker):
    user1 = User("Yoda")
    user2 = User("Obi Wan")
    app1 = Application("good", "whatever", user1, "Obi Wan")
    app2 = Application("good", "whatever", user2, "Yoda")
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


def test_application_connection_fails(mocker):
    user1, user2, app1, app2 = setUp(mocker)
    app2.partnerUsername = "Jar Jar Binks"
    mocker.patch.object(applicationService, 'getApplicationByUsername')
    applicationService.getApplicationByUsername.return_value = app2
    applicationService.connectApplication(app1)
    assert app1.partnerApplication != app2 and app2.partnerApplication != app1
