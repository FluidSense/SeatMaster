from controllers import seatController
from services import seatService
from models.room import Room
from models.seat import Seat
from flask import jsonify, url_for, make_response
from main import app
import json


def createSeat():
    room = Room("name", "info")
    seat = Seat("D1", room, "info")
    return seat, room


def test_getSeat_with_noSeat(mocker):
    mocker.patch.object(seatService, "getSeatById")
    seatService.getSeatById.return_value = {}
    with app.app_context():
        response = seatController.getSeat(123, "124")
        assert "200 OK" == response.status
        assert b'{}' == response.data
        seatService.getSeatById.assert_called_with(123, "124")


def test_getSeat_with_seat(mocker):
    seat, room = createSeat()
    mocker.patch.object(seatService, "getSeatById")
    seatService.getSeatById.return_value = seat
    with app.app_context():
        response = seatController.getSeat(123, "124")
        assert "200 OK" == response.status
        assert jsonify(seat.to_json()).data == response.data


def createSeatMock(id, room, info):
    roomMock = Room("name", "info")
    return Seat(id, roomMock, info).to_json(), 201


def test_createSeat_success(mocker, client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    mocker.patch.object(seatService, "createSeat")
    seatService.createSeat = createSeatMock
    with app.app_context():
        response = client.post(
            url_for('seat.createSeat'),
            headers=headers,
            data=json.dumps(dict(
                id='D1',
                roomId='12',
                info='nice ship dude',
            )))
        assert "201 CREATED" == response.status
        assert make_response(
            jsonify(
                id="D1",
                roomId=None,
                info='nice ship dude',
            )).data == response.data


def test_createRoom_fails(mocker, client):
    mocker.patch.object(seatService, "createSeat")
    seatService.createSeat = createSeatMock
    with app.app_context():
        response = client.post(
            url_for('seat.createSeat'),
            data=json.dumps(dict(
                name='X-wing',
                info='nice ship dude',
            )))
        assert "400 BAD REQUEST" == response.status


def test_deleteSeat(mocker, client):
    mocker.patch.object(seatService, "deleteSeat")
    seatService.deleteSeat.return_value = "", 200
    with app.app_context():
        response = client.delete(url_for('seat.deleteSeat', roomId=1, id=2))
        assert "200 OK" == response.status
        seatService.deleteSeat.assert_called_with("1", "2")
