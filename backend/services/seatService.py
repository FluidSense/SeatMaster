from models.seat import Seat
from services import roomService
from shared import db
from sqlalchemy.exc import SQLAlchemyError
from services import applicationService
from utils.enums import ApplicationStatus


def getSeatById(id):
    seat = db.session.query(Seat).get(id)
    return seat


def createSeat(name, roomId, info):
    room = roomService.getRoomById(roomId)
    try:
        seat = Seat(name, room, info)
        db.session.add(seat)
        db.session.commit()
        return seat.to_json(), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def deleteSeat(id):
    try:
        seat = getSeatById(id)
        db.session.delete(seat)
        db.session.commit()
        return "", 200
    except SQLAlchemyError as err:
        print(err, flush=True)
        return "", 400


def renameSeat(id, newName):
    try:
        seat = getSeatById(id)
        seat.seat_name = newName
        db.session.add(seat)
        db.session.commit()
        return seat.to_json(), 200
    except SQLAlchemyError as err:
        print(err, flush=True)
        return "", 400


def assignSeat(seatId, userId):
    try:
        seat = getSeatById(seatId)
        application = applicationService.getApplicationByUserId(userId)
        seat.application = application
        db.session.add(application)
        db.session.commit()
        return application.seat.to_json(), 200
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def removeStudentFromSeat(seatId):
    try:
        seat = getSeatById(seatId)
        seat.application = None
        db.session.add(seat)
        db.session.commit()
        return seat.to_json(), 200
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def removeAllStudentsFromSeats():
    applications = applicationService.getAllApplications()
    for application in applications:
        if(application.seat):
            response = removeStudentFromSeat(application.seat.id)
            application.status = ApplicationStatus.SUBMITTED if response[0] else application.status
    return "{}", 200
