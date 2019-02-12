from flask import Blueprint, Response, jsonify, request, abort, make_response
from services import roomService
import json

room = Blueprint("room", __name__, url_prefix="/room")


@room.route("/<id>")
def getRoom(id):
    room = roomService.getRoomById(id)
    return jsonify(room.to_json()) if room else Response("{}", 200)


@room.route("deleteRoom/<id>", methods=["DELETE"])
def deleteRoom(id):
    responseText, statusCode = roomService.deleteRoom(id)
    return Response(responseText, statusCode)


@room.route("/createRoom", methods=["POST"])
def createRoom():
    if request.is_json:
        form = request.get_json()
        name = form.get("name")
        info = form.get("info")
        responseText, successCode = roomService.createRoom(name, info)
        return make_response(jsonify(json.dumps(responseText)), successCode)
    return abort(400)


@room.route("/updateRoom/<id>", methods=["PUT"])
def updateRoom(id):
    if request.is_json:
        form = request.get_json()
        responseText, successCode = roomService.updateRoom(id, form)
        return make_response(jsonify(json.dumps(responseText)), successCode)
    return abort(400)
