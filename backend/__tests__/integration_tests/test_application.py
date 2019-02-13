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
        expectedResponseData = jsonify(
            comments="Pepsi is better than coke",
            id=1,
            status="Unprocessed",
            user={"id": 1, "username": testuser.username},
            partnerApplication={},
            )
        assert "201 CREATED" == response.status
        assert expectedResponseData.data == response.data

    def test_new_application_without_existing_partner(self):
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
                partnerUsername="Elon",
                )
            )
        )
        expectedApplication = jsonify(
            comments="Pepsi is better than coke",
            id=1,
            status="Unprocessed",
            user={"id": 1, "username": testuser.username},
            partnerApplication={}
        )
        getApplication = self.app.test_client().get('http://localhost:5000/application/user/1')
        assert "201 CREATED" == response.status
        assert expectedApplication.data == response.data
        assert getApplication.status == "200 OK"
        assert getApplication.data == expectedApplication.data

    def test_new_application_with_existing_partner(self):
        testuser1 = User("Frank")
        testuser2 = User("Monster")
        db.session.add(testuser1)
        db.session.add(testuser2)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        user1Response = self.app.test_client().post(
            'http://localhost:5000/application/registerApplication',
            headers=headers,
            data=json.dumps(dict(
                username=testuser1.username,
                infoText="Pepsi is better than coke",
                partnerUsername=testuser2.username,
                )
            )
        )
        user2Response = self.app.test_client().post(
            'http://localhost:5000/application/registerApplication',
            headers=headers,
            data=json.dumps(dict(
                username=testuser2.username,
                infoText="Fanta is better than solo",
                partnerUsername=testuser1.username,
                )
            )
        )
        user1expectedApplication = jsonify(
            comments="Pepsi is better than coke",
            id=1,
            status="Unprocessed",
            user={"id": 1, "username": testuser1.username},
            partnerApplication={}
        )
        user2expectedApplication = jsonify(
            comments="Fanta is better than solo",
            id=2,
            status="Unprocessed",
            user={"id": 2, "username": testuser2.username},
            partnerApplication={}
        )
        expectedConnectedApplication = jsonify(
            comments="Fanta is better than solo",
            id=2,
            status="Unprocessed",
            user={"id": 2, "username": testuser2.username},
            partnerApplication={
                "comments": "Pepsi is better than coke",
                "id": 1,
                "status": "Unprocessed",
                "user": {"id": 1, "username": testuser1.username}
            },
        )
        getApplication = self.app.test_client().get('http://localhost:5000/application/user/2')
        assert "201 CREATED" == user1Response.status
        assert "201 CREATED" == user2Response.status
        assert user2expectedApplication.data == user2Response.data
        assert user1expectedApplication.data == user1Response.data
        assert getApplication.status == "200 OK"
        assert getApplication.data == expectedConnectedApplication.data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
