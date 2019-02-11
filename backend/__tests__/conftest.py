import pytest
import testing.postgresql
from shared import db
from flask_sqlalchemy import SQLAlchemy
from main import create_app, register_blueprints


# Inititiate db with all tables
def handler(postgresql):
    app = create_app(db_url=postgresql.url())
    with app.app_context() as app:
        db.create_all()


Postgresql = testing.postgresql.PostgresqlFactory(cache_initialized_db=True, on_initialized=handler)


@pytest.fixture(scope='session')
def app(database):
    '''
    Create a Flask app context for the tests.
    '''
    app = create_app(db_url=database.url())
    register_blueprints(app)
    return app


@pytest.fixture(scope='session')
def _db(app):
    '''
    Provide the transactional fixtures with access to the database via a Flask-SQLAlchemy
    database connection.
    '''
    db = SQLAlchemy(app=app)
    db.create_all()
    db.session.commit()
    return db


@pytest.fixture(scope='session')
def database(request):
    postgres = Postgresql()

    @request.addfinalizer
    def drop_database():
        Postgresql.clear_cache()

    return postgres


@pytest.fixture
def client(app):
    # app = create_app()
    register_blueprints(app)
    client = app.test_client()
    return client
