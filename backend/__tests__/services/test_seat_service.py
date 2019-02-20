from models.seat import Seat
from models.room import Room
from services import seatService, roomService
from shared import db


def setUp(mocker):
    room = Room("name", "info")
    seat = Seat("D1", room, "info")
    mocker.patch.object(db.session, 'add')
    mocker.patch.object(db.session, 'commit')
    mocker.patch.object(db.session, 'delete')
    return room, seat


def test_create_seat_success(mocker):
    room, seat = setUp(mocker)
    mocker.patch.object(roomService, "getRoomById")
    roomService.getRoomById.return_value = room
    responseText, statusCode = seatService.createSeat("D1", room.id, "info")
    assert seat.to_json() == responseText
    assert 201 == statusCode
    db.session.add.assert_called()
    db.session.commit.assert_called()


def test_delete_seat_success(mocker):
    room, seat = setUp(mocker)
    mocker.patch.object(seatService, 'getSeatById')
    seatService.getSeatById.return_value = seat
    responseText, statusCode = seatService.deleteSeat(room.id, seat.seat_id)
    assert "" == responseText
    assert 200 == statusCode
    db.session.delete.assert_called_with(seat)
    db.session.commit.assert_called()


def mockQuery(mocker, returnValue=None):
    query = type('filt', (object,), {'__init__': lambda x: None, 'get': lambda x:  returnValue})
    session = type('filt', (object,), {'__init__': lambda x: None, 'query': lambda x:  query})
    return session


def test_get_seat_by_id(mocker):
    room, seat = setUp(mocker)
    mocker.patch.object(db, "session")
    db.session = mockQuery(mocker, returnValue=seat)
    response = seatService.getSeatById(room.id, seat.seat_id)
    assert response == seat
