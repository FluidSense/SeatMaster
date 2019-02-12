from unittest import TestCase
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from __tests__.controllers.test_application_season_controller import createBasicSeason
from flask import jsonify
from datetime import datetime, timedelta
import json

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
        self.dateFormat = ("%a %b %d %Y %H:%M:%S")

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

    # Used to format date to match model
    def formatDate(self, date):
       return datetime.strptime(str(date), self.dateFormat)

    def test_new_application_season(self):
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        starttime = datetime.now().replace(microsecond=0) + timedelta(days=+5)
        endtime = starttime + timedelta(days=+150)
        acceptstart = starttime
        acceptend = starttime + timedelta(days=+7)
        response = self.app.test_client().post('/season/createSeason',
                                               headers=headers,
                                               data=json.dumps(dict(
                                                   newPeriodEnd=self.formatDate(acceptend),
                                                   newPeriodStart=self.formatDate(acceptstart),
                                                   newRoomEnd=self.formatDate(starttime),
                                                   newRoomStart=self.formatDate(endtime))))
        assert "201 CREATED" == response.status
        assert jsonify(
            newPeriodEnd=str(acceptend),
            newPeriodStart=str(acceptstart),
            newRoomEnd=str(starttime),
            newRoomStart=str(endtime)).data == response.data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
