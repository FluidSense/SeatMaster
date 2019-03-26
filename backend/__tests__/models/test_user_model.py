from models.user import User
from models.application import Application
from utils.enums import ApplicationStatus, Rank


def test_a_transaction(db_session):
    test_user = User(username="John Lajoie", sub="sub", email="email", fullname="Johnny McJohn")

    db_session.add(test_user)
    db_session.commit()

    assert test_user.username == db_session.query(User).one().username


def test_db_drop(db_session):
    test_user = db_session.query(User).first()
    assert test_user is None


def test_cascading(db_session):
    user = User("hello", sub="sub", email="email", fullname="McHelloesen")
    application = Application(status=ApplicationStatus.SUBMITTED,
                              needs="needs",
                              user=user,
                              partnerUsername="partner",
                              comments="comments",
                              preferredRoom="pref",
                              seatRollover=True,
                              rank=Rank.WRITING_MASTER)
    db_session.add(user)
    db_session.add(application)
    db_session.commit()
    db_session.delete(user)
    assert db_session.query(Application).first() is None
