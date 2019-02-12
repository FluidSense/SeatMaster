from controllers import roomController
from services import roomService
from models.room import Room
from flask import jsonify, url_for, make_response
from main import app
import json


def createRoom():
    return Room("name", "info")


def test_getRoom_with_no_room(mocker):
    mocker.patch.object(roomService, "getRoomById")
    roomService.getRoomById.return_value = {}
    with app.app_context():
        response = roomController.getRoom(123)
        assert "200 OK" == response.status
        assert b'{}' == response.data


def test_getApplication_with_room(mocker):
    room = createRoom()
    mocker.patch.object(roomService, "getRoomById")
    roomService.getRoomById.return_value = room
    with app.app_context():
        response = roomController.getRoom(123)
        assert "200 OK" == response.status
        assert jsonify(room.to_json()).data == response.data


def createRoomMock(name, info):
    return Room(name, info).to_json(), 201


def test_createRoom_success(mocker, client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    mocker.patch.object(roomService, "createRoom")
    roomService.createRoom = createRoomMock
    with app.app_context():
        response = client.post(
            url_for('room.createRoom'),
            headers=headers,
            data=json.dumps(dict(
                name='X-wing',
                info='nice ship dude',
            )))
        assert "201 CREATED" == response.status
        assert make_response(
            jsonify(
                id=None,
                name='X-wing',
                info='nice ship dude',
                    )).data == response.data


def test_createRoom_fails(mocker, client):
    mocker.patch.object(roomService, "createRoom")
    roomService.createRoom = createRoomMock
    with app.app_context():
        response = client.post(
            url_for('room.createRoom'),
            data=json.dumps(dict(
                name='X-wing',
                info='nice ship dude',
            )))
        assert "400 BAD REQUEST" == response.status


def test_deleteRoom(mocker, client):
    mocker.patch.object(roomService, "deleteRoom")
    roomService.deleteRoom.return_value = "", 200
    with app.app_context():
        response = client.delete(url_for('room.deleteRoom', id=1))
        assert "200 OK" == response.status


def updateRoomMock(id, form):
    return Room(form.get("name"), form.get("info")).to_json(), 200


def test_updateRoom_success(mocker, client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    mocker.patch.object(roomService, "updateRoom")
    roomService.updateRoom = updateRoomMock
    with app.app_context():
        response = client.put(
            url_for('room.updateRoom', id=1),
            headers=headers,
            data=json.dumps(dict(
                name='X-wing',
                info='nice ship dude',
            )))
        assert "200 OK" == response.status
        assert make_response(
            jsonify(
                id=None,
                name='X-wing',
                info='nice ship dude',
                    )).data == response.data


def test_updateRoom_fails(mocker, client):
    mocker.patch.object(roomService, "updateRoom")
    roomService.updateRoom = updateRoomMock
    with app.app_context():
        response = client.put(
            url_for('room.updateRoom', id=1),
            data=json.dumps(dict(
                name='X-wing',
                info='nice ship dude',
            )))
        assert "400 BAD REQUEST" == response.status
