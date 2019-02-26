from flask import Blueprint, Response, jsonify, request, abort, make_response
from services import roomService

room = Blueprint("room", __name__, url_prefix="/room")


@room.route("/<id>")
def getRoom(id):
    room = roomService.getRoomById(id)
    return jsonify(room.to_json()) if room else Response("{}", 200)


@room.route("/<id>", methods=["DELETE"])
def deleteRoom(id):
    responseText, statusCode = roomService.deleteRoom(id)
    return Response(responseText, statusCode)


@room.route("/", methods=["POST"])
def createRoom():
    if request.is_json:
        form = request.get_json()
        name = form.get("name")
        info = form.get("info")
        responseText, statusCode = roomService.createRoom(name, info)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)


@room.route("/<id>", methods=["PUT"])
def updateRoom(id):
    if request.is_json:
        form = request.get_json()
        responseText, statusCode = roomService.updateRoom(id, form)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)


@room.route("/")
def getAllRooms():
    rooms = roomService.getAllRooms()
    roomList = list(map(lambda x: x.to_json(), rooms))
    return jsonify(roomList) if rooms else Response("{}", 200)
