from flask import Blueprint, Response, request, abort, jsonify, make_response
from services import applicationSeasonService

applicationSeason = Blueprint('applicationSeason', __name__)


@applicationSeason.route("/")
def getCurrentSeason():
    currApplication = applicationSeasonService.getCurrentOrNext()
    return jsonify(currApplication.to_json()) if currApplication else Response("{}", 200)


@applicationSeason.route("/", methods=["POST"])
def createNewSeason():
    if request.is_json:
        form = request.get_json()
        newPeriodStart = form.get("newPeriodStart")
        newPeriodEnd = form.get("newPeriodEnd")
        newRoomStart = form.get("newRoomStart")
        newRoomEnd = form.get("newRoomEnd")
        responseText, statusCode = applicationSeasonService.registerNewSeason(
            newPeriodEnd=newPeriodEnd,
            newPeriodStart=newPeriodStart,
            newRoomEnd=newRoomEnd,
            newRoomStart=newRoomStart,
        )
        return make_response(jsonify(responseText), statusCode)
    return abort(400)
