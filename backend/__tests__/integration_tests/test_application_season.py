from unittest import TestCase
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from __tests__.controllers.test_application_season_controller import createBasicSeason
from flask import jsonify


# Class-based test to keep test db alive during all tests,
# else testing.postgresql takes it down.
class TestApplicationSeason(TestCase):
    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()

    def test_application_season(self):
        response = self.app.test_client().get('/season/getSeason')
        assert response.status == "200 OK"
        assert response.data == b'{}'

    def test_application_season_with_data(self):
        season = createBasicSeason()
        db.session.add(season)
        db.session.commit()
        response = self.app.test_client().get('/season/getSeason')
        assert response.status == "200 OK"
        assert response.data == jsonify(season.to_json()).data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
