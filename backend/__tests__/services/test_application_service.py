from ...services import applicationService
from ...models import User, Application


def setUp():
    user1 = User("Yoda")
    user2 = User("Obi Wan")
    app1 = Application("good","whatever", user1, "Obi Wan")    
    app2 = Application("good","whatever", user2, "Yoda")    
    return user1, user2, app1, app2 

def test_application_connection_fails(mocker, db_session):
    user1, user2, app1, app2 = setUp()
    mocker.patch.object(applicationService, 'getApplicationByUsername')
    applicationService.getApplicationByUsername.return_value = app2
    applicationService.connectApplication(app1)
    assert app1.partnerApplication == app2 and app2.partnerApplication == app1 


def test_application_registration_succeed(mocker, db_session):
    user1, user2, app1, app2 = setUp()
    app1.partnerUsername = "Jar Jar binks"
    mocker.patch.object(applicationService, 'getApplicationByUsername')
    applicationService.getApplicationByUsername.return_value = app2
    applicationService.connectApplication(app1)
    assert app1.partnerApplication != app2 and app2.partnerApplication != app1 
