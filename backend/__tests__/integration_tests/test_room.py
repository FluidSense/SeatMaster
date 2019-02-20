from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from models.room import Room
from flask import jsonify
import json
from unittest import TestCase


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

    def test_get_seat(self):
        room = createRoom()
        response = self.app.test_client().get(f"http://localhost:5000/room/{room.id}")
        assert response.data == jsonify(room.to_json()).data
        assert db.session.query(Room).first() == room

    def test_delete_seat(self):
        room = createRoom()
        response = self.app.test_client().delete(f"http://localhost:5000/room/deleteRoom/{room.id}")
        assert response.status == "200 OK"
        assert db.session.query(Room).first() is None

    def test_create_room(self):
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        data = dict(
            name='X-wing',
            info='nice ship dude',
        )
        response = self.app.test_client().post(
            "http://localhost:5000/room/createRoom",
            headers=headers,
            data=json.dumps(data))
        assert "201 CREATED" == response.status
        data["id"] = 1
        assert db.session.query(Room).first().to_json() == data

    def test_updateRoom_success(self):
        room = createRoom()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        response = self.app.test_client().put(
            'http://localhost:5000/room/updateRoom/1',
            headers=headers,
            data=json.dumps(dict(
                name='X-wing',
                info='nice ship dude',
            )))
        assert "200 OK" == response.status
        dbroom = db.session.query(Room).first()
        assert dbroom.name == 'X-wing'
        assert room.info == 'nice ship dude'

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
