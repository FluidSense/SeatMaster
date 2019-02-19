from models.seat import Seat
from services import roomService
from shared import db
from sqlalchemy.exc import SQLAlchemyError


def getSeatById(roomId, seatId):
    seat = db.session.query(Seat).get((roomId, seatId))
    return seat


def createSeat(id, roomId, info):
    room = roomService.getRoomById(roomId)
    try:
        seat = Seat(id, room, info)
        db.session.add(seat)
        db.session.commit()
        return seat.to_json(), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def deleteSeat(roomId, seatId):
    try:
        seat = getSeatById(roomId, seatId)
        db.session.delete(seat)
        db.session.commit()
        return "", 200
    except SQLAlchemyError as err:
        print(err)
        return "", 400
