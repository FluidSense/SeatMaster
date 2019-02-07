from flask import Blueprint, Response, request, abort, jsonify
from services import applicationSeasonService

applicationSeason = Blueprint('applicationSeason', __name__)


@applicationSeason.route("/getSeason")
def getCurrentSeason():
    currApplication = applicationSeasonService.getCurrentOrNext()
    return jsonify(currApplication.to_json()) if currApplication else Response("", 200)

@applicationSeason.route("/createSeason", methods=["POST"])
def createNewSeason():
    if request.is_json:
        responseText, successCode = applicationSeasonService.registerNewSeason(request.get_json())
        return Response(responseText, successCode)
    return abort(400)
