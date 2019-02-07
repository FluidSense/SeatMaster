from flask import Blueprint, Response, jsonify, request, abort
from services import roomService

room = Blueprint("application", __name__, url_prefix="/room")


@room.route("/<id>")
def getRoom(id):
    room = roomService.getRoomById(id)
    return jsonify(room.to_json()) if room else Response("", 200)


@room.route("/createRoom", methods=["POST"])
def registerNewApplication():
    if request.is_json:
        form = request.get_json()
        name = form.name
        info = form.info
        responseText, successCode = roomService.createRoom(name, info)
        return Response(responseText, successCode)
    return abort(400)