from models.room import Room
from services import roomService
from shared import db


def setUp(mocker):
    room = Room("name", "info")
    mocker.patch.object(db.session, 'add')
    mocker.patch.object(db.session, 'commit')
    mocker.patch.object(db.session, 'delete')
    return room


def test_create_room_success(mocker):
    room = setUp(mocker)
    responseText, statusCode = roomService.createRoom("name", "info")
    assert room.to_json() == responseText
    assert 201 == statusCode
    db.session.add.assert_called()
    db.session.commit.assert_called()


def test_delete_room_success(mocker):
    room = setUp(mocker)
    mocker.patch.object(roomService, 'getRoomById')
    roomService.getRoomById.return_value = room
    responseText, statusCode = roomService.deleteRoom(1)
    assert "" == responseText
    assert 200 == statusCode
    db.session.delete.assert_called_with(room)
    db.session.commit.assert_called()


def test_update_room_success(mocker):
    room = setUp(mocker)
    room2 = Room("x-Wing", "yeah")
    mocker.patch.object(roomService, 'getRoomById')
    roomService.getRoomById.return_value = room
    form = dict(name="x-Wing", info="yeah")
    responseText, statusCode = roomService.updateRoom(1, form)
    assert room2.to_json() == responseText
    assert 200 == statusCode
    db.session.add.assert_called_with(room)
    db.session.commit.assert_called()


def test_update_room_fails(mocker):
    room = setUp(mocker)
    room2 = Room("x-Wing", "yeah")
    mocker.patch.object(roomService, 'getRoomById')
    roomService.getRoomById.return_value = room
    form = dict(name="x-Wing", info="yeah", cock="balls")
    responseText, statusCode = roomService.updateRoom(1, form)
    assert room2.to_json() == responseText
    assert 200 == statusCode
    db.session.add.assert_called_with(room)
    db.session.commit.assert_called()
