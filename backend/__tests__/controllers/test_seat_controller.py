from controllers import seatController
from services import seatService
from models.room import Room
from models.seat import Seat
from flask import jsonify, url_for, make_response
from main import app
import json
from __tests__.testUtils.authentication import mock_authentication


def createSeat():
    room = Room("name", "info")
    seat = Seat("D1", room, "info")
    return seat, room


def test_getSeat_when_no_seat(mocker):
    mock_authentication(mocker)
    mocker.patch.object(seatService, "getSeatById")
    seatService.getSeatById.return_value = {}
    with app.app_context():
        response = seatController.getSeat(1)
        assert "200 OK" == response.status
        assert b'{}' == response.data
        seatService.getSeatById.assert_called_with(1)


def test_getSeat_by_id(mocker):
    mock_authentication(mocker)
    seat, room = createSeat()
    mocker.patch.object(seatService, "getSeatById")
    seatService.getSeatById.return_value = seat
    with app.app_context():
        response = seatController.getSeat(1)
        assert "200 OK" == response.status
        assert jsonify(seat.to_json()).data == response.data


def createSeatMock(name, room, info):
    roomMock = Room("name", "info")
    return Seat(name, roomMock, info).to_json(), 201


def test_createSeat_success(mocker, client):
    mock_authentication(mocker)
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
                name='D1',
                roomId='12',
                info='nice ship dude',
                user=None
            )))
        assert "201 CREATED" == response.status
        assert make_response(
            jsonify(
                id=None,
                name="D1",
                roomId=None,
                info='nice ship dude',
                user=None
            )).data == response.data


def test_createSeat_fails(mocker, client):
    mock_authentication(mocker)
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
    mock_authentication(mocker)
    mocker.patch.object(seatService, "deleteSeat")
    seatService.deleteSeat.return_value = "", 200
    with app.app_context():
        response = client.delete(url_for('seat.deleteSeat', id=1))
        assert "200 OK" == response.status
        seatService.deleteSeat.assert_called_with("1")
