from models.user import User


def test_a_transaction(db_session):
    test_user = User(username="John Lajoie", sub="sub", email="email", fullname="Johnny McJohn")

    db_session.add(test_user)
    db_session.commit()

    assert test_user.username == db_session.query(User).one().username


def test_db_drop(db_session):
    test_user = db_session.query(User).first()
    assert test_user is None
