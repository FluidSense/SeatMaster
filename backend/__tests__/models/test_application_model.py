from models.application import Application
from models.user import User


def test_add_application_without_partner(db_session):
    testuser1 = User("Powerking")
    db_session.add(testuser1)
    application = Application(
        status="",
        infoText="",
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
    testuser1 = User("Powerking")
    db_session.add(testuser1)
    application = Application(
        status="",
        infoText="",
        user=testuser1,
        partnerUsername=None,
    )
    db_session.add(application)
    db_session.commit()
    dbapplication = db_session.query(Application).first()
    assert testuser1.to_json() == dbapplication.to_json()['user']


def test_users_connect_each_other(db_session):
    testuser1 = User("Powerking")
    testuser2 = User("Powerking Sugarfree")
    db_session.add(testuser1)
    db_session.add(testuser2)
    application2 = Application(
        status="",
        infoText="",
        user=testuser2,
        partnerUsername=testuser1.username,
    )
    application1 = Application(
        status="",
        infoText="",
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
