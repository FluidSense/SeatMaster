from flask import Blueprint, Response, jsonify
from services import applicationSeasonService

applicationSeason = Blueprint('applicationSeason', __name__)


@applicationSeason.route("/getSeason")
def getCurrentSeason():
    currApplication = applicationSeasonService.getCurrentOrNext()
    return jsonify(currApplication.to_json()) if currApplication else Response("{}", 200)
