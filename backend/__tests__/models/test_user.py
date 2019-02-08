from ...models import User


def test_a_transaction(db_session):
    test_user = User("John Lajoie")

    db_session.add(test_user)
    db_session.commit()

    assert test_user.username == db_session.query(User).one().username


def test_db_drop(db_session):
    test_user = db_session.query(User).first()
    assert test_user is None
