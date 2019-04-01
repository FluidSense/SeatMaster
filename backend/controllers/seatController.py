from flask import Blueprint, Response, jsonify, request, abort, make_response
from services import seatService
from auth import requiresAdmin

seat = Blueprint("seat", __name__, url_prefix="/seat")


@seat.route("/<id>")
def getSeat(id):
    seat = seatService.getSeatById(id)
    return jsonify(seat.to_json()) if seat else Response("{}", 200)


@seat.route("/<id>", methods=["DELETE"])
@requiresAdmin
def deleteSeat(id):
    responseText, statusCode = seatService.deleteSeat(id)
    return Response(responseText, statusCode)


@seat.route("/", methods=["POST"])
@requiresAdmin
def createSeat():
    if request.is_json:
        form = request.get_json()
        seat_name = form.get("name")
        roomId = form.get("roomId")
        info = form.get("info")
        responseText, successCode = seatService.createSeat(seat_name, roomId, info)
        return make_response(jsonify(responseText), successCode)
    return abort(400)


@seat.route("/<id>", methods=["PUT"])
@requiresAdmin
def renameSeat(id):
    if request.is_json:
        newName = request.get_json()
        responseText, statusCode = seatService.renameSeat(id, newName)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)


@seat.route("/assignSeat", methods=["PUT"])
@requiresAdmin
def assignSeat():
    if request.is_json:
        form = request.get_json()
        seatId = form.get("seatId")
        userId = form.get("userId")
        responseText, statusCode = seatService.assignSeat(seatId, userId)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)


@seat.route("/removeStudent", methods=["PUT"])
@requiresAdmin
def removeStudentFromSeat():
    if request.is_json:
        seatId = request.get_json()
        responseText, statusCode = seatService.removeStudentFromSeat(seatId)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)


@seat.route("/removeAllStudents", methods=["POST"])
@requiresAdmin
def removeAllStudentsFromSeats():
        responseText, statusCode = seatService.removeAllStudentsFromSeats()
        return make_response(jsonify(responseText), statusCode)
