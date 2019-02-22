from unittest import TestCase
from __tests__.conftest import Postgresql
from main import create_app
from shared import db
from models.room import Room
from models.seat import Seat
from models.user import User
from models.application import Application
from flask import jsonify, make_response
import json
# Class-based test to keep test db alive during all tests,
# else testing.postgresql takes it down.


def createSeatAndRoom():
    room = Room("name", "info")
    db.session.add(room)
    seat = Seat("D1", room, "info")
    db.session.add(seat)
    db.session.commit()
    return room, seat


class TestSeat(TestCase):
    def setUp(self):
        self.postgres = Postgresql()
        self.app = create_app(db_url=self.postgres.url())
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        db.init_app(self.app)
        self.ctx = self.app.app_context()
        self.ctx.push()

    def test_get_seat(self):
        room, seat = createSeatAndRoom()
        response = self.app.test_client().get(f"http://localhost:5000/seat/{room.id}/{seat.seat_id}")
        assert response.data == jsonify(seat.to_json()).data
        assert db.session.query(Seat).first() == seat

    def test_delete_seat(self):
        room, seat = createSeatAndRoom()
        response = self.app.test_client().delete(f"http://localhost:5000/seat/deleteSeat/{room.id}/{seat.seat_id}")
        assert response.status == "200 OK"
        assert db.session.query(Seat).first() is None

    def test_create_seat(self):
        room, seat = createSeatAndRoom()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        data = dict(
            id='D2',
            roomId=room.id,
            info='nice ship dude',
        )
        response = self.app.test_client().post(
            "http://localhost:5000/seat/createSeat",
            headers=headers,
            data=json.dumps(data))

        assert "201 CREATED" == response.status
        assert make_response(
            jsonify(
                id="D2",
                roomId=room.id,
                info='nice ship dude',
            )).data == response.data
        assert db.session.query(Seat).all()[1].to_json() == data

    def test_assign_seat(self):
        room, seat = createSeatAndRoom()
        user = User("hello")
        db.session.add(user)
        application = Application("lol", "lol", user, "no")
        db.session.add(application)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype
        }
        data = dict(
            seatId='D1',
            roomId=room.id,
            userId=user.id,
        )
        response = self.app.test_client().put(
            "http://localhost:5000/seat/assignSeat",
            headers=headers,
            data=json.dumps(data))

        assert "200 OK" == response.status
        assert jsonify(seat.to_json()).data == response.data
        assert seat.assignedApplication == application
        assert application.seat == seat

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
