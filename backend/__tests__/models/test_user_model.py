from models.user import User
from models.application import Application
from __tests__.testUtils.models import createApplication


def test_a_transaction(db_session):
    test_user = User(username="John Lajoie", sub="sub", email="email", fullname="Johnny McJohn")

    db_session.add(test_user)
    db_session.commit()

    assert test_user.username == db_session.query(User).one().username


def test_db_drop(db_session):
    test_user = db_session.query(User).first()
    assert test_user is None


def test_cascading(db_session):
    application = createApplication(db_session)
    assert not db_session.query(Application).first() is None
    assert not db_session.query(User).first() is None
    db_session.delete(application.user)
    db_session.commit()
    assert db_session.query(Application).first() is None
    assert db_session.query(User).first() is None
