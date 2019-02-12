from flask import Blueprint, Response, request, abort, jsonify, make_response
from services import applicationSeasonService
import json

applicationSeason = Blueprint('applicationSeason', __name__)


@applicationSeason.route("/getSeason")
def getCurrentSeason():
    currApplication = applicationSeasonService.getCurrentOrNext()
    return jsonify(currApplication.to_json()) if currApplication else Response("{}", 200)


@applicationSeason.route("/createSeason", methods=["POST"])
def createNewSeason():
    if request.is_json:
        form = request.get_json()
        newPeriodStart = form.get("newPeriodStart")
        newPeriodEnd = form.get("newPeriodEnd")
        newRoomStart = form.get("newRoomStart")
        newRoomEnd = form.get("newRoomEnd")
        responseText, successCode = applicationSeasonService.registerNewSeason(
            newPeriodEnd,
            newPeriodStart,
            newRoomEnd,
            newPeriodStart,
        )
        return make_response(jsonify(form), successCode)
    return abort(400)
