from models.room import Room
from shared import db
from sqlalchemy.exc import SQLAlchemyError


def getRoomById(id):
    room = db.session.query(Room).get(id)
    return room


def createRoom(name, info):
    try:
        room = Room(name, info)
        db.session.add(room)
        db.session.commit()
        return room.to_json(), 201
    except SQLAlchemyError as err:
        print(err)
        return "", 400


def deleteRoom(id):
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