from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from models.room import Room
from flask import jsonify
import json
from unittest import TestCase
from __tests__.testUtils.authentication import mock_authentication_context
from __tests__.testUtils.constants import token, accessToken
from __tests__.testUtils.models import createUser


def createRoom():
    room = Room("name", "info")
    db.session.add(room)
    db.session.commit()
    return room


class TestRoom(TestCase):

    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()
        self.token = f'Bearer {token}'
        self.accessToken = f'Bearer {accessToken}'

    def test_get_seat(self):
        room = createRoom()
        response = self.app.test_client().get(f"http://localhost:5000/room/{room.id}")
        assert response.data == jsonify(room.to_json()).data
        assert db.session.query(Room).first() == room

    @mock_authentication_context
    def test_delete_seat(self):
        createUser(db.session)
        headers = {
            'Authorization': self.token,
            'Accesstoken': self.accessToken
        }
        room = createRoom()
        response = self.app.test_client().delete(
            f"http://localhost:5000/room/{room.id}",
            headers=headers)
        assert response.status == "200 OK"
        assert db.session.query(Room).first() is None

    @mock_authentication_context
    def test_create_room(self):
        createUser(db.session)
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'Authorization': self.token,
            'Accesstoken': self.accessToken
        }
        data = dict(
            name='X-wing',
            info='nice ship dude',
            seats=dict(
                count=0,
                seats=[],
            ),
        )
        response = self.app.test_client().post(
            "http://localhost:5000/room/",
            headers=headers,
            data=json.dumps(data))
        assert "201 CREATED" == response.status
        data["id"] = 1
        assert db.session.query(Room).first().to_json() == data

    @mock_authentication_context
    def test_updateRoom_success(self):
        createUser(db.session)
        room = createRoom()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'Authorization': self.token,
            'Accesstoken': self.accessToken
        }
        response = self.app.test_client().put(
            'http://localhost:5000/room/1',
            headers=headers,
            data=json.dumps(dict(
                name='X-wing',
                info='nice ship dude',
            )))
        assert "200 OK" == response.status
        dbroom = db.session.query(Room).first()
        assert dbroom.name == 'X-wing'
        assert room.info == 'nice ship dude'

    def test_create_rooms_and_get_all(self):
        createUser(db.session)
        room1 = createRoom()
        room2 = createRoom()
        roomList = [room1, room2]
        jsonList = list(map(lambda x: x.to_json(), roomList))
        response = self.app.test_client().get(f"http://localhost:5000/room/")
        assert response.status == "200 OK"
        assert response.data == jsonify(jsonList).data
        assert db.session.query(Room).all() == roomList

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
