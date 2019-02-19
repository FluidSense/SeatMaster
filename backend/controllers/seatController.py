from flask import Blueprint, Response, jsonify, request, abort, make_response
from services import seatService

seat = Blueprint("seat", __name__, url_prefix="/seat")


@seat.route("/<roomId>/<id>")
def getSeat(roomId, id):
    seat = seatService.getSeatById(roomId, id)
    return jsonify(seat.to_json()) if seat else Response("{}", 200)


@seat.route("deleteSeat/<roomId>/<id>", methods=["DELETE"])
def deleteSeat(id):
    responseText, statusCode = seatService.deleteSeat(id)
    return Response(responseText, statusCode)


@seat.route("/createSeat", methods=["POST"])
def createSeat():
    if request.is_json:
        form = request.get_json()
        id = form.get("id")
        roomId = form.get("roomId")
        info = form.get("info")
        responseText, successCode = seatService.createSeat(id, roomId, info)
        return make_response(jsonify(responseText), successCode)
    return abort(400)


@seat.route("/updateSeat/<roomId>/<id>", methods=["PUT"])
def updateSeat(roomId, id):
    if request.is_json:
        form = request.get_json()
        responseText, successCode = seatService.updateSeat(id, roomId, form)
        return make_response(jsonify(responseText), successCode)
    return abort(400)
