from __tests__.conftest import Postgresql
from main import create_app
from models.user import User
from models.application import Application
from shared import db
import json
from unittest import TestCase
from flask import jsonify, make_response


class TestApplication(TestCase):
    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()

    def test_new_application_without_partner(self):
        testuser = User("Frank", "sub", "email")
        db.session.add(testuser)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        response = self.app.test_client().post(
            'http://localhost:5000/application/',
            headers=headers,
            data=json.dumps(dict(
                username=testuser.username,
                needs="Pepsi is better than coke",
                comments="Not Pepsi, but Pepsi Max",
                partnerUsername="",
                )
            )
        )
        expectedResponse = make_response(jsonify(
            needs="Pepsi is better than coke",
            comments="Not Pepsi, but Pepsi Max",
            id=1,
            status="SUBMITTED",
            user={"id": 1, "username": testuser.username, "email": "email"},
            partnerApplication={},
            ), 201)
        assert expectedResponse.status == response.status
        assert expectedResponse.data == response.data

    def test_new_application_without_existing_partner(self):
        testuser = User("Frank", "sub", "email")
        db.session.add(testuser)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        response = self.app.test_client().post(
            'http://localhost:5000/application/',
            headers=headers,
            data=json.dumps(dict(
                username=testuser.username,
                needs="Pepsi is better than coke",
                comments="Not Pepsi, but Pepsi Max",
                partnerUsername="Elon",
                )
            )
        )
        expectedApplicationResponse = make_response(jsonify(
            needs="Pepsi is better than coke",
            comments="Not Pepsi, but Pepsi Max",
            id=1,
            status="SUBMITTED",
            user={"id": 1, "username": testuser.username, "email": "email"},
            partnerApplication={}
        ), 201)
        getApplication = self.app.test_client().get('http://localhost:5000/application/byUser/1')
        assert expectedApplicationResponse.status == response.status
        assert expectedApplicationResponse.data == response.data
        assert getApplication.status == "200 OK"
        assert getApplication.data == expectedApplicationResponse.data

    def test_new_application_with_existing_partner(self):
        testuser1 = User("Frank", "sub", "email")
        testuser2 = User("Monster", "sub2", "emails")
        db.session.add(testuser1)
        db.session.add(testuser2)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        user1Response = self.app.test_client().post(
            'http://localhost:5000/application/',
            headers=headers,
            data=json.dumps(dict(
                username=testuser1.username,
                needs="Pepsi is better than coke",
                comments="Not Pepsi, but Pepsi Max",
                partnerUsername=testuser2.username,
                )
            )
        )
        user2Response = self.app.test_client().post(
            'http://localhost:5000/application/',
            headers=headers,
            data=json.dumps(dict(
                username=testuser2.username,
                needs="Fanta is better than solo",
                comments="Bruh wtf",
                partnerUsername=testuser1.username,
                )
            )
        )
        user1expectedResponse = make_response(jsonify(
            needs="Pepsi is better than coke",
            comments="Not Pepsi, but Pepsi Max",
            id=1,
            status="SUBMITTED",
            user={"id": 1, "username": testuser1.username, "email": testuser1.email},
            partnerApplication={}
        ), 201)
        user2expectedResponse = make_response(jsonify(
            needs="Fanta is better than solo",
            comments="Bruh wtf",
            id=2,
            status="SUBMITTED",
            user={"id": 2, "username": testuser2.username, "email": testuser2.email},
            partnerApplication={
                "needs": "Pepsi is better than coke",
                "comments": "Not Pepsi, but Pepsi Max",
                "id": 1,
                "status": "SUBMITTED",
                "user": {"id": 1, "username": testuser1.username, "email": testuser1.email}
            },
        ), 201)
        expectedConnectedApplication = jsonify(
            needs="Fanta is better than solo",
            comments="Bruh wtf",
            id=2,
            status="SUBMITTED",
            user={"id": 2, "username": testuser2.username, "email": testuser2.email},
            partnerApplication={
                "needs": "Pepsi is better than coke",
                "comments": "Not Pepsi, but Pepsi Max",
                "id": 1,
                "status": "SUBMITTED",
                "user": {"id": 1, "username": testuser1.username, "email": testuser1.email}
            },
        )
        getApplication = self.app.test_client().get('http://localhost:5000/application/byUser/2')
        assert user1expectedResponse.status == user1Response.status
        assert user2expectedResponse.status == user2Response.status
        assert user2expectedResponse.data == user2Response.data
        assert user1expectedResponse.data == user1Response.data
        assert getApplication.status == "200 OK"
        assert getApplication.data == expectedConnectedApplication.data

    def test_get_all_applications(self):
        testuser1 = User("Frank", "sub", "email")
        testuser2 = User("Monster", "uuid", "email")
        db.session.add(testuser1)
        db.session.add(testuser2)
        db.session.commit()
        testapplication1 = Application("SUBMITTED", "", testuser1, None, "")
        testapplication2 = Application("SUBMITTED", "needs", testuser2, None, "comments")
        db.session.add(testapplication1)
        db.session.add(testapplication2)
        db.session.commit()
        allApplications = self.app.test_client().get('http://localhost:5000/application/')
        assert allApplications.status == "200 OK"
        assert allApplications.data == jsonify([testapplication1.to_json(), testapplication2.to_json()]).data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
