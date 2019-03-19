from flask import Blueprint, Response, jsonify, request, abort, make_response
from services import seatService
from auth import requiresAdmin

seat = Blueprint("seat", __name__, url_prefix="/seat")


@seat.route("/<roomId>/<id>")
def getSeat(roomId, id):
    seat = seatService.getSeatById(roomId, id)
    return jsonify(seat.to_json()) if seat else Response("{}", 200)


@seat.route("/<roomId>/<id>", methods=["DELETE"])
@requiresAdmin
def deleteSeat(roomId, id):
    responseText, statusCode = seatService.deleteSeat(roomId, id)
    return Response(responseText, statusCode)


@seat.route("/", methods=["POST"])
@requiresAdmin
def createSeat():
    if request.is_json:
        form = request.get_json()
        id = form.get("id")
        roomId = form.get("roomId")
        info = form.get("info")
        responseText, successCode = seatService.createSeat(id, roomId, info)
        return make_response(jsonify(responseText), successCode)
    return abort(400)


@seat.route("/assignSeat", methods=["PUT"])
@requiresAdmin
def assignSeat():
    if request.is_json:
        form = request.get_json()
        roomId = form.get("roomId")
        seatId = form.get("seatId")
        userId = form.get("userId")
        responseText, statusCode = seatService.assignSeat(roomId, seatId, userId)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)


@seat.route("/removeStudent", methods=["PUT"])
@requiresAdmin
def removeStudentFromSeat():
    if request.is_json:
        form = request.get_json()
        roomId = form.get("roomId")
        seatId = form.get("seatId")
        responseText, statusCode = seatService.removeStudentFromSeat(roomId, seatId)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)
