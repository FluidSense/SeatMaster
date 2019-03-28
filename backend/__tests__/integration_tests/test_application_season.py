from unittest import TestCase
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from __tests__.controllers.test_application_season_controller import createBasicSeason
from flask import jsonify
from datetime import datetime, timedelta
import json
from __tests__.testUtils.authentication import mock_authentication_context
from __tests__.testUtils.constants import token, accessToken


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
        self.dateFormat = ("%Y-%m-%d %H:%M:%S.%f")
        self.token = f'Bearer {token}'
        self.accessToken = f'Bearer {accessToken}'

    def test_application_season(self):
        response = self.app.test_client().get('/season/')
        assert response.status == "200 OK"
        assert response.data == b'{}'

    def test_application_season_with_data(self):
        season = createBasicSeason()
        db.session.add(season)
        db.session.commit()
        response = self.app.test_client().get('/season/')
        assert response.status == "200 OK"
        assert response.data == jsonify(season.to_json()).data

    # Used to format date to match model
    def formatDate(self, date):
        return datetime.strptime(str(date), self.dateFormat)

    @mock_authentication_context
    def test_new_application_season(self):
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'Authorization': self.token,
            'AccessToken': self.accessToken
        }
        starttime = datetime.now() + timedelta(days=+5)
        endtime = starttime + timedelta(days=+150)
        acceptstart = starttime
        acceptend = starttime + timedelta(days=+7)
        response = self.app.test_client().post(
            '/season/',
            headers=headers,
            data=json.dumps(dict(
                newPeriodEnd=self.formatDate(acceptend),
                newPeriodStart=self.formatDate(acceptstart),
                newRoomEnd=self.formatDate(endtime),
                newRoomStart=self.formatDate(starttime)),
                default=str))
        assert "201 CREATED" == response.status
        assert jsonify(
            applicationPeriodEnd=str(acceptend),
            applicationPeriodStart=str(acceptstart),
            end=str(endtime),
            start=str(starttime),
            id="1").data == response.data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
