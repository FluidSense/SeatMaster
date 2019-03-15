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
from __tests__.testUtils.authentication import mock_authentication_context
from __tests__.testUtils.constants import token, accessToken
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
        self.token = f'Bearer {token}'
        self.accessToken = f'Bearer {accessToken}'

    @mock_authentication_context
    def test_get_seat(self):
        room, seat = createSeatAndRoom()
        headers = {
            'AccessToken': self.accessToken,
            'Authorization': self.token
        }
        response = self.app.test_client().get(
            f"http://localhost:5000/seat/{room.id}/{seat.seat_id}",
            headers=headers)
        assert response.data == jsonify(seat.to_json()).data
        assert db.session.query(Seat).first() == seat

    @mock_authentication_context
    def test_delete_seat(self):
        headers = {
            'AccessToken': self.accessToken,
            'Authorization': self.token
        }
        room, seat = createSeatAndRoom()
        response = self.app.test_client().delete(
            f"http://localhost:5000/seat/{room.id}/{seat.seat_id}",
            headers=headers)
        assert response.status == "200 OK"
        assert db.session.query(Seat).first() is None

    @mock_authentication_context
    def test_create_seat(self):
        room, seat = createSeatAndRoom()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken,
        }
        data = dict(
            id='D2',
            roomId=room.id,
            info='nice ship dude',
        )
        response = self.app.test_client().post(
            "http://localhost:5000/seat/",
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

    @mock_authentication_context
    def test_assign_seat(self):
        room, seat = createSeatAndRoom()
        user = User("hello", "sub", "email")
        db.session.add(user)
        application = Application(
            status="lol",
            comments="lol",
            needs="needs",
            user=user,
            partnerUsername="no",
            preferredRoom="d1",
            seatRollover=True,
        )
        db.session.add(application)
        db.session.commit()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken,
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

    @mock_authentication_context
    def test_remove_student_from_seat(self):
        room, seat = createSeatAndRoom()
        user = User("hello", "sub", "email")
        db.session.add(user)
        application = Application(
            status="lol",
            comments="lol",
            needs="needs",
            user=user,
            partnerUsername="no",
            preferredRoom="d1",
            seatRollover=True,
        )
        db.session.add(application)
        db.session.commit()
        seat.assignedApplication = application
        db.session.add(seat)
        db.session.commit()

        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken
        }
        data = dict(
            seatId='D1',
            roomId=room.id,
        )
        response = self.app.test_client().put(
            "http://localhost:5000/seat/removeStudent",
            headers=headers,
            data=json.dumps(data))

        assert "200 OK" == response.status
        assert jsonify(seat.to_json()).data == response.data
        assert seat.assignedApplication is None
        assert application.seat is None

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
