import testing.postgresql
import shutil
from flask_migrate import init, upgrade, migrate
from ...models import User
from ...main import create_app
from ...shared import db


def test_user_submittion():
    with testing.postgresql.Postgresql() as new_psql:
        app = create_app(db_url=new_psql.url())
        with app.app_context() as app:
            db.create_all()
            new_user = User("Boost")
            db.session.add(new_user)
            db.session.commit()
            assert new_user.username == db.session.query(User).one().username
