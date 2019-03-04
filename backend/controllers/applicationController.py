from flask import Blueprint, Response, jsonify, request, abort, make_response
import json
from services import applicationService

application = Blueprint("application", __name__, url_prefix="/application")

@application.route("/")
def getAllApplications():
    applications = applicationService.getAllApplications()
    applicationList = list(map(lambda x: x.to_json(), applications))
    return jsonify(applicationList) if applications else jsonify({})

@application.route("/<id>")
def getApplication(id):
    userApplication = applicationService.getApplicationById(id)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@application.route("/byUser/<userid>")
def getApplicationByUser(userid):
    userApplication = applicationService.getApplicationByUserId(userid)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@application.route("/", methods=["POST"])
def registerApplication():
    if request.is_json:
        form = request.get_json()
        username = form.get("username")
        needs = form.get("needs")
        comments = form.get("comments")
        partnerUsername = form.get("partnerUsername")
        responseText, statusCode = applicationService.registerApplication(
          comments=comments,
          needs=needs,
          username=username,
          partnerUsername=partnerUsername)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)
