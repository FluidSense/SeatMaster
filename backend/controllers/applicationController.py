from flask import Blueprint, Response, jsonify, request, abort
from services import applicationService
import json

application = Blueprint("application", __name__, url_prefix="/application")


@application.route("/<id>")
def getApplication(id):
    userApplication = applicationService.getApplicationById(id)
    return jsonify(userApplication.to_json()) if userApplication else Response("", 200)


@application.route("/user/<userid>")
def getApplicationByUser(userid):
    userApplication = applicationService.getApplicationByUserId(userid)
    return jsonify(userApplication.to_json()) if userApplication else Response("", 200)


@application.route("/registerApplication", methods=["POST"])
def registerNewApplication():
    if request.is_json:
        form = request.get_json()
        applicationText = form.get("applicationText")
        username = form.get("username")
        partnerId = form.get("partnerId")
        responseText, successCode = applicationService.registerApplication(applicationText, username, partnerId)
        return Response(json.dumps(form), successCode)
    return abort(400)
