from __tests__.conftest import Postgresql
from main import create_app
from models.user import User
from models.application import Application
from shared import db
import json
from unittest import TestCase
from flask import jsonify, make_response
from __tests__.testUtils.authentication import mock_authentication_context
from __tests__.testUtils.constants import token, accessToken, decodedToken
from controllers.applicationController import filterOnStatus
from utils.enums import Rank, ApplicationStatus


class TestApplication(TestCase):
    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()
        self.token = f'Bearer {token}'
        self.accessToken = f'Bearer {accessToken}'

    @mock_authentication_context
    def test_new_application_without_partner(self):
        testuser = User(username="Frank", sub=decodedToken.get("sub"), email="email", fullname="Franky Frank")
        db.session.add(testuser)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'Authorization': self.token,
            'AccessToken': self.accessToken
        }
        response = self.app.test_client().post(
            'http://localhost:5000/application/',
            headers=headers,
            data=json.dumps(dict(
                username=testuser.username,
                needs="Pepsi is better than coke",
                comments="Not Pepsi, but Pepsi Max",
                partnerUsername="",
                preferredRoom="d1",
                seatRollover=True,
            )
            )
        )
        expectedResponse = make_response(jsonify(
            needs="Pepsi is better than coke",
            comments="Not Pepsi, but Pepsi Max",
            id=1,
            status="SUBMITTED",
            user={"id": 1, "username": testuser.username, "email": "email", "fullname": "Franky Frank"},
            partnerApplication={},
            rank="WRITING_MASTER",
            preferredRoom="d1",
            seatRollover=True,
        ), 201)
        assert expectedResponse.status == response.status
        assert json.loads(expectedResponse.data) == json.loads(response.data)

    @mock_authentication_context
    def test_new_application_without_existing_partner(self):
        testuser = User(username="Frank", sub=decodedToken.get("sub"), email="email", fullname="Franky Frank")
        db.session.add(testuser)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'Authorization': self.token,
            'AccessToken': self.accessToken
        }
        response = self.app.test_client().post(
            'http://localhost:5000/application/',
            headers=headers,
            data=json.dumps(dict(
                username=testuser.username,
                needs="Pepsi is better than coke",
                comments="Not Pepsi, but Pepsi Max",
                partnerUsername="Elon",
                preferredRoom="d1",
                seatRollover=True,
            )
            )
        )
        expectedApplicationResponse = make_response(jsonify(
            needs="Pepsi is better than coke",
            comments="Not Pepsi, but Pepsi Max",
            id=1,
            status="SUBMITTED",
            user={"id": 1, "username": testuser.username, "email": "email", "fullname": "Franky Frank"},
            partnerApplication={},
            preferredRoom="d1",
            seatRollover=True,
            rank="WRITING_MASTER",
        ), 201)
        getApplication = self.app.test_client().get('http://localhost:5000/application/byUser/1', headers=headers)
        assert expectedApplicationResponse.status == response.status
        assert json.loads(expectedApplicationResponse.data) == json.loads(response.data)
        assert getApplication.status == "200 OK"
        assert filterOnStatus(json.loads(getApplication.data)) == json.loads(expectedApplicationResponse.data)

    @mock_authentication_context
    def test_new_application_with_existing_partner(self):
        testuser1 = User(username="Frank", sub=decodedToken.get("sub"), email="email", fullname="Franky Frank")
        testuser2 = User(username="Monster", sub="sub", email="emails", fullname="Schmemails")
        testApplication = Application(
            ApplicationStatus.SUBMITTED,
            "Pepsi is better than coke",
            user=testuser2,
            partnerUsername="Frank",
            preferredRoom="d1",
            seatRollover=True,
            comments="Not Pepsi, but Pepsi Max")
        db.session.add(testuser1)
        db.session.add(testuser2)
        db.session.add(testApplication)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'Authorization': self.token,
            'AccessToken': self.accessToken
        }
        user1Response = self.app.test_client().post(
            'http://localhost:5000/application/',
            headers=headers,
            data=json.dumps(dict(
                username=testuser1.username,
                needs="Fanta is better than solo",
                comments="Bruh wtf",
                partnerUsername=testuser2.username,
                preferredRoom="d1",
                seatRollover=True,
            )
            )
        )
        user1expectedResponse = make_response(jsonify(
            needs="Fanta is better than solo",
            comments="Bruh wtf",
            id=2,
            status="SUBMITTED",
            user={"id": 1, "username": testuser1.username, "email": testuser1.email, "fullname": testuser1.fullname},
            preferredRoom="d1",
            rank="WRITING_MASTER",
            seatRollover=True,
            partnerApplication={
                "needs": "Pepsi is better than coke",
                "comments": "Not Pepsi, but Pepsi Max",
                "id": 1,
                "status": "SUBMITTED",
                "rank": "OTHER",
                "user": {
                    "id": 2,
                    "username": testuser2.username,
                    "email": testuser2.email,
                    "fullname": testuser2.fullname
                },
                "preferredRoom": "d1",
                "seatRollover": True,
            },
        ), 201)

        expectedConnectedApplication = jsonify(
            needs="Pepsi is better than coke",
            comments="Not Pepsi, but Pepsi Max",
            id=1,
            status="SUBMITTED",
            user={"id": 2, "username": testuser2.username, "email": testuser2.email, "fullname": testuser2.fullname},
            preferredRoom="d1",
            seatRollover=True,
            seat=None,
            rank="OTHER",
            partnerApplication={
                "needs": "Fanta is better than solo",
                "comments": "Bruh wtf",
                "id": 2,
                "status": "SUBMITTED",
                "preferredRoom": "d1",
                "seatRollover": True,
                "rank": "WRITING_MASTER",
                "seat": None,
                "user": {
                    "id": 1,
                    "username": testuser1.username,
                    "email": testuser1.email,
                    "fullname": testuser1.fullname
                },
            },
        )
        getApplication = self.app.test_client().get('http://localhost:5000/application/byUser/2', headers=headers)
        assert user1expectedResponse.status == user1Response.status
        assert json.loads(user1expectedResponse.data) == json.loads(user1Response.data)
        assert getApplication.status == "200 OK"
        assert json.loads(expectedConnectedApplication.data) == json.loads(getApplication.data)

    @mock_authentication_context
    def test_get_all_applications(self):
        headers = {
            'Authorization': self.token,
            'AccessToken': self.accessToken
        }
        testuser1 = User(username="Frank", sub="sub", email="email", fullname="Franky Frank")
        testuser2 = User(username="Monster", sub="uuid", email="email", fullname="Schmemail")
        db.session.add(testuser1)
        db.session.add(testuser2)
        db.session.commit()
        testApplication1 = Application(
            ApplicationStatus.SUBMITTED,
            "Fanta is better than solo",
            user=testuser1,
            partnerUsername="Frank",
            preferredRoom="d1",
            seatRollover=True,
            comments="Not Pepsi, but Pepsi Max")
        testApplication2 = Application(
            ApplicationStatus.SUBMITTED,
            "Fanta is better than solo",
            user=testuser2,
            partnerUsername="Monster",
            preferredRoom="d1",
            seatRollover=True,
            comments="Not Pepsi, but Pepsi Max")
        db.session.add(testApplication1)
        db.session.add(testApplication2)
        db.session.commit()
        allApplications = self.app.test_client().get('http://localhost:5000/application/all', headers=headers)
        assert allApplications.status == "200 OK"
        assert allApplications.data == jsonify([testApplication1.to_json(), testApplication2.to_json()]).data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
