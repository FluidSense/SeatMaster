from unittest.mock import patch, Mock
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from models.user import User
from flask import jsonify
from unittest import TestCase
from jose import jwt
import json
from __tests__.testUtils.constants import token, decodedToken


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
        with patch.object(jwt, "decode", mock_decode):
            response = self.app.test_client().get(
                "http://localhost:5000/user/",
                headers={"Authorization": self.token})
            dbUser = user.to_json()
            dbUser["admin"] = False
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
                patch("utils.dataporten.getDataportenUserInfo", mock_dataporten):
            response = self.app.test_client().post(
                "http://localhost:5000/user/",
                headers=headers)
            user = db.session.query(User).first()
            dbUser = user.to_json()
            dbUser["admin"] = False
            assert response.status == "201 CREATED"
            assert user.username == "elevG"
            assert user.email == "4s8j0rng@ELEV_GGGGGG.no"
            assert response.data == jsonify(dbUser).data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
