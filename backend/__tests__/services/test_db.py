import testing.postgresql
import shutil
from flask_migrate import init, upgrade, migrate
from ...models import User
from ...main import create_app
from ...shared import db

def cleanUp():
    shutil.rmtree("./migrations")

cleanUp()

with testing.postgresql.Postgresql() as new_psql:
    app = create_app(db_url=new_psql.url())
    with app.app_context() as app:
        init()
        migrate()
        upgrade()
        new_user = User("Boost")
        db.session.add(new_user)
        db.session.commit()
        assert new_user.username == db.session.query(User).one().username
