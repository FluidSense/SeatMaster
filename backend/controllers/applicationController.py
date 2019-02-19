from flask import Blueprint, Response, jsonify, request, abort, make_response
import json
from services import applicationService

application = Blueprint("application", __name__, url_prefix="/application")


@application.route("/<id>")
def getApplication(id):
    userApplication = applicationService.getApplicationById(id)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@application.route("/user/<userid>")
def getApplicationByUser(userid):
    userApplication = applicationService.getApplicationByUserId(userid)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@application.route("/registerApplication", methods=["POST"])
def registerApplication():
    if request.is_json:
        form = request.get_json()
        username = form.get("username")
        infoText = form.get("infoText")
        partnerUsername = form.get("partnerUsername")
        responseText, statusCode = applicationService.registerApplication(infoText, username, partnerUsername)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)
