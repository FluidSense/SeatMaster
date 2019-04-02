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
from __tests__.testUtils.models import createApplication, createUser
from utils.enums import ApplicationStatus
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
        createUser(db.session)
        room, seat = createSeatAndRoom()
        headers = {
            'AccessToken': self.accessToken,
            'Authorization': self.token
        }
        response = self.app.test_client().get(
            f"http://localhost:5000/seat/{seat.id}",
            headers=headers)
        assert response.data == jsonify(seat.to_json()).data
        assert db.session.query(Seat).first() == seat

    @mock_authentication_context
    def test_delete_seat(self):
        createUser(db.session)
        headers = {
            'AccessToken': self.accessToken,
            'Authorization': self.token
        }
        room, seat = createSeatAndRoom()
        response = self.app.test_client().delete(
            f"http://localhost:5000/seat/{seat.id}",
            headers=headers)
        assert response.status == "200 OK"
        assert db.session.query(Seat).first() is None

    @mock_authentication_context
    def test_create_seat(self):
        createUser(db.session)
        room, seat = createSeatAndRoom()
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken,
        }
        data = dict(
            name='D2',
            roomId=room.id,
            info='nice ship dude'
        )
        response = self.app.test_client().post(
            "http://localhost:5000/seat/",
            headers=headers,
            data=json.dumps(data))

        assert "201 CREATED" == response.status
        assert make_response(
            jsonify(
                id=2,
                name="D2",
                roomId=room.id,
                info='nice ship dude',
                user=None
            )).data == response.data
        assert db.session.query(Seat).all()[1].to_json()["info"] == data["info"]

    @mock_authentication_context
    def test_assign_seat(self):
        room, seat = createSeatAndRoom()
        application = createApplication(db.session)
        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken,
        }
        data = dict(
            seatId=1,
            roomId=room.id,
            userId=application.user.id,
        )
        response = self.app.test_client().put(
            "http://localhost:5000/seat/assignSeat",
            headers=headers,
            data=json.dumps(data))

        assert "200 OK" == response.status
        assert jsonify(seat.to_json()).data == response.data
        assert seat.application == application
        assert application.seat == seat

    @mock_authentication_context
    def test_remove_student_from_seat(self):
        room, seat = createSeatAndRoom()
        application = createApplication()
        seat.application = application
        db.session.add(seat)
        db.session.commit()

        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken
        }
        seatId = 1
        response = self.app.test_client().put(
            "http://localhost:5000/seat/removeStudent",
            headers=headers,
            data=json.dumps(seatId))

        assert "200 OK" == response.status
        assert jsonify(seat.to_json()).data == response.data
        assert seat.application is None
        assert application.seat is None

    @mock_authentication_context
    def test_remove_all_students_from_seat(self):
        room, seat = createSeatAndRoom()
        room2, seat2 = createSeatAndRoom()
        application1 = createApplication(db.session)
        user = User(username="username2", sub="sub", email="email2", fullname="fullname2")
        application2 = Application(
            ApplicationStatus.APPROVED,
            "Fanta is better than solo",
            user=user,
            partnerUsername="Monster",
            preferredRoom="d1",
            seatRollover=True,
            applicationSeason=application1.applicationSeason,
            comments="Not Pepsi, but Pepsi Max")
        db.session.add(user)
        db.session.add(application2)
        seat.application = application1
        seat2.application = application2
        db.session.add(seat)
        db.session.add(seat2)
        db.session.commit()

        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken
        }
        seatId = 1
        response = self.app.test_client().post(
            "http://localhost:5000/seat/removeAllStudents",
            headers=headers,
            data=json.dumps(seatId))

        assert "200 OK" == response.status
        assert seat.application is None
        assert seat2.application is None
        assert application1.seat is None
        assert application2.seat is None
        assert application1.status is ApplicationStatus.SUBMITTED
        assert application2.status is ApplicationStatus.SUBMITTED

    @mock_authentication_context
    def test_rename_seat(self):
        room, seat = createSeatAndRoom()
        createUser(db.session)
        oldName = seat.seat_name
        newName = "New Name"
        seatId = seat.id

        mimetype = 'application/json'
        headers = {
            'Content-Type': mimetype,
            'Accept': mimetype,
            'AccessToken': self.accessToken,
        }
        response = self.app.test_client().put(
            "http://localhost:5000/seat/" + str(seatId),
            headers=headers,
            data=json.dumps(newName))
        assert "200 OK" == response.status
        assert jsonify(seat.to_json()).data == response.data
        assert seat.seat_name == newName
        assert seat.seat_name != oldName

    def tearDown(self):
        self.postgres.stop()
        self.ctx.pop()
