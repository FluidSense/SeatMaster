from __tests__.conftest import Postgresql
from main import create_app
from models.user import User
from shared import db
import json
from unittest import TestCase
from flask import jsonify


class TestApplication(TestCase):
    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()

    def test_new_application_without_partner(self):
        testuser = User("Frank")
        db.session.add(testuser)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
        }
        response = self.app.test_client().post(
            'http://localhost:5000/application/registerApplication',
            headers=headers,
            data=json.dumps(dict(
                username=testuser.username,
                infoText="Pepsi is better than coke",
                partnerUsername="",
                )
            )
        )
        assert "201 CREATED" == response.status
        assert jsonify(
            username=testuser.username,
            infoText="Pepsi is better than coke",
            partnerUsername="",
        ).data == response.data

    # TODO
    def test_new_new_application_without_existing_partner(self):
        assert False

    # TODO
    def test_new_application_with_existing_partner(self):
        assert False

    # TODO
    def test_get_application_by_userid(self):
        assert False

    # TODO
    def test_get_application_by_application_id(self):
        assert False
    
    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()