from models.seat import Seat
from services import roomService
from shared import db
from sqlalchemy.exc import SQLAlchemyError


def getSeatById(id, room_id):
    room = db.session.query(Seat).get((id, room_id))
    return room


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


''' def deleteRoom(id):
    try:
        room = getRoomById(id)
        db.session.delete(room)
        db.session.commit()
        return "", 200
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def updateRoom(id, form):
    try:
        room = getRoomById(id)
        for field in form.keys():
            if(form[field]):
                setattr(room, field, form[field])
        db.session.add(room)
        db.session.commit()
        return room.to_json(), 200
    except SQLAlchemyError as err:
        print(err)
        return "", 400

'''