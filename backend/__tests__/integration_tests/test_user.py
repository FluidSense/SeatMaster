from unittest.mock import patch, Mock
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from models.user import User
from flask import jsonify
from unittest import TestCase
from jose import jwt
import json
from __tests__.testUtils.constants import token, decodedToken, testGroups
from __tests__.testUtils.authentication import mock_authentication_context


def createUser():
    user = User(
        username="asbjorn_elevg",
        sub="55de7d71-4a25-4103-8e43-35df8c2d472a",
        email="noreply@feide.no",
        fullname="Asbjørn ELEVG baby"
    )
    db.session.add(user)
    db.session.commit()
    return user


def mock_jwt_decode():
    mock_decode = Mock(name="decode")
    mock_decode.return_value = decodedToken
    return mock_decode


class TestRoom(TestCase):

    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()
        self.token = f"Bearer {token}"

    def test_get_self_success(self):
        user = createUser()
        mock_decode = mock_jwt_decode()
        with patch.object(jwt, "decode", mock_decode), \
                patch("utils.dataporten.getDataportenGroups", lambda x: testGroups):
            response = self.app.test_client().get(
                "http://localhost:5000/user/",
                headers={"Authorization": self.token})
            dbUser = user.to_json()
            dbUser["admin"] = True
            assert response.data == jsonify(dbUser).data

    def test_create_should_fail(self):
        mock_decode = mock_jwt_decode()
        mock_dataporten = Mock(name="mock_dataporten")
        mock_dataporten.return_value = {
            "sub": "76a7a061-3c55-430d-8ee0-6f82ec42501f",
            "dataporten-userid_sec": [
                "feide:elevG@uninett.no"
            ],
            "name": "Asbjørn ELEVG baby",
            "email": "4s8j0rng@ELEV_GGGGGG.no",
            "email_verified": True,
            "picture": "https://auth.dataporten.no/openid/userinfo/v1/user/media/p:a3019954-902f-45a3-b4ee-bca7b48ab507"
        }
        data = {
            "accessToken": "123"
        }
        headers = {
            "Authorization": self.token,
            "Content-type": "application/json"
        }

        with patch.object(jwt, "decode", mock_decode), \
                patch("utils.dataporten.getDataportenUserInfo", mock_dataporten):
            response = self.app.test_client().post(
                "http://localhost:5000/user/",
                headers=headers,
                data=json.dumps(data))
            assert response.status == "401 UNAUTHORIZED"

    def test_create_should_succeed(self):
        mock_decode = mock_jwt_decode()
        mock_dataporten = Mock(name="mock_dataporten")
        mock_dataporten.return_value = {
            "sub": "55de7d71-4a25-4103-8e43-35df8c2d472a",
            "dataporten-userid_sec": [
                "feide:elevG@uninett.no"
            ],
            "name": "Asbjørn ELEVG baby",
            "email": "4s8j0rng@ELEV_GGGGGG.no",
            "email_verified": True,
            "picture": "https://auth.dataporten.no/openid/userinfo/v1/user/media/p:a3019954-902f-45a3-b4ee-bca7b48ab507"
        }
        headers = {
            "AccessToken": "123",
            "Authorization": self.token,
            "Content-type": "application/json"
        }

        with patch.object(jwt, "decode", mock_decode), \
                patch("utils.dataporten.getDataportenUserInfo", mock_dataporten), \
                patch("utils.dataporten.getDataportenGroups", lambda x: testGroups):
            response = self.app.test_client().post(
                "http://localhost:5000/user/",
                headers=headers)
            user = db.session.query(User).first()
            dbUser = user.to_json()
            dbUser["admin"] = True
            assert response.status == "201 CREATED"
            assert user.username == "elevG"
            assert user.email == "4s8j0rng@ELEV_GGGGGG.no"
            assert json.loads(response.data) == json.loads(jsonify(dbUser).data)

    @mock_authentication_context
    def test_delete_all_students(self):
        user1 = createUser()
        user2 = User(username="name2", sub="sub2", email="email2", fullname="hei")
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()
        headers = {
            "Authorization": self.token,
            "Content-type": "application/json",
            "AccessToken": "123"
        }

        response = self.app.test_client().delete(
            "http://localhost:5000/user/deleteAll",
            headers=headers)
        user = db.session.query(User).first()
        assert response.status == "200 OK"
        assert user is None

    @mock_authentication_context
    def test_delete_single_student(self):
        user1 = createUser()
        user2 = User(username="name2", sub="sub2", email="email2", fullname="sad")
        db.session.add(user1)
        db.session.add(user2)
        db.session.commit()
        headers = {
            "Authorization": self.token,
            "Content-type": "application/json",
            "AccessToken": "123"
        }

        response = self.app.test_client().delete(
            "http://localhost:5000/user/1",
            headers=headers)
        user = db.session.query(User).all()
        assert response.status == "200 OK"
        assert user == [user2]

    @mock_authentication_context
    def test_delete_self(self):
        user = createUser()
        db.session.add(user)
        db.session.commit()
        headers = {
            "Authorization": self.token,
            "Content-type": "application/json",
            "AccessToken": "123"
        }

        response = self.app.test_client().delete(
            "http://localhost:5000/user/",
            headers=headers)
        user = db.session.query(User).all()
        assert response.status == "200 OK"
        assert user == []

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
