import json
from flask import Blueprint, Response
from services import applicationSeasonService


applicationSeason = Blueprint('applicationSeason', __name__)

@applicationSeason.route("/getSeason")
def getCurrentSeason():
    currApplication = applicationSeasonService.getCurrentOrNext()
    return json.loads(currApplication) if currApplication else Response("", 200)
