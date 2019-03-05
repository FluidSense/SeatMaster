from unittest.mock import patch, Mock
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from models.user import User
from flask import jsonify
from unittest import TestCase
from jose import jwt


def createUser():
    user = User("asbjorn_elevg", "55de7d71-4a25-4103-8e43-35df8c2d472a", "noreply@feide.no")
    db.session.add(user)
    db.session.commit()
    return user


class TestRoom(TestCase):

    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()
        self.token = "Bearer eyJ1eXAiOiJKV1QiLCJhbGciOiJSUzI0NiIsImtpZCI6ImIwMGE1MDYxYzMxMTQxMjA5Y2RmMjlkYWM3NjYwMTkxMWI2N2M4YWQifQ.eyJpc3MiOiJodHRwczpcL1wvYXV0aC5kYXRhcG9ydGVuLm5vIiwiYXVkIjoiNzdlZTMzY2QtY2M3Zi00YjdhLWJjZTktMjQxYzk2NDU4ZjE0Iiwic3ViIjoiNTVkZTdkNzEtNGEyNS00MTAzLThlNDMtMzVkZjhjMmQ0NzJhIiwiaWF0IjoxNTUxNDMyODY4LCJleHAiOjE1NTE0MzY0NjgsImF1dGhfdGltZSI6MTU1MTQzMjg2Nn0.px3GgAqpIZCy3Tpsf3CAGPWnc2JkOILD_yGkBEREgNYmt0O9rhA7DS_KH1POEVUWl7ispyH8zJM5krsCr_jv85BAReDWDN-IndYvda5XSeTWbsAtdMfGfDPITSZiKr7E0ncHrYOh4ai3Rr1ySYb_OcVbvYdM_Ag17C6wFeTRVFtCQu7Slvm_y4tpvuhUEmIIgVsKdcTIToRgOwu8zCS85H3K3nnYAy4_rAd6Ljc9bHtWHcAyfiR9prwOnBAngqhXKQE2qUFMf83YSN3-_rUMPGFsUBo-8PgAXVbz-CZP2oEUl8CrtpoDUBvFVfXCAE3PBPhmCdkFSFCeTG6_qYnVgA"  # noqa: E501

    def test_get_self_success(self):
        user = createUser()
        mock_decode = Mock(name="decode")
        mock_decode.return_value = {
            "iss": "https://auth.dataporten.no",
            "aud": "77ee33cd-cc7f-4b7a-bce9-241c96458f14",
            "sub": "55de7d71-4a25-4103-8e43-35df8c2d472a",
            "iat": 1551183190,
            "exp": 1551186790,
            "auth_time": 1551181621
        }
        with patch.object(jwt, "decode", mock_decode):
            response = self.app.test_client().get(
                "http://localhost:5000/user/",
                headers={"Authorization": self.token})
            assert response.data == jsonify(user.to_json()).data

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
