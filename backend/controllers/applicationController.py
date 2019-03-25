from flask import Blueprint, Response, jsonify, request, abort, make_response, _request_ctx_stack
import json
from services import applicationService
from auth import requiresUser, requiresAdmin, get_token_auth_header
from utils.enums import Rank, ApplicationStatus
from utils import dataporten
application = Blueprint("application", __name__, url_prefix="/application")


@application.route("/")
@requiresUser
def getApplicationBySelf():
    ctx = _request_ctx_stack.top
    user = ctx.user
    userID = user.id
    userApplication = applicationService.getApplicationByUserId(userID)
    return jsonify(filterOnStatus(userApplication.to_json())) if userApplication else Response(json.dumps({}), 200)


@application.route("/<id>")
@requiresAdmin
def getApplication(id):
    userApplication = applicationService.getApplicationById(id)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@application.route("/byUser/<userid>")
@requiresAdmin
def getApplicationByUser(userid):
    userApplication = applicationService.getApplicationByUserId(userid)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@application.route("/all")
@requiresAdmin
def getAllApplications():
    applications = applicationService.getAllApplications()
    applicationList = list(map(lambda x: x.to_json(), applications))
    return jsonify(applicationList) if applications else jsonify({})


@application.route("/", methods=["POST"])
@requiresUser
def registerApplication():
    if request.is_json:
        ctx = _request_ctx_stack.top
        user = ctx.user
        accessToken = get_token_auth_header("accessToken")
        form = request.get_json()
        needs = form.get("needs")
        comments = form.get("comments")
        partnerUsername = form.get("partnerUsername")
        seatRollover = form.get("seatRollover")
        preferredRoom = form.get("preferredRoom")
        rank = dataporten.getRank(accessToken) if accessToken else Rank.OTHER
        responseText, statusCode = applicationService.registerApplication(
            comments=comments,
            needs=needs,
            user=user,
            partnerUsername=partnerUsername,
            seatRollover=seatRollover,
            preferredRoom=preferredRoom,
            rank=rank,
        )
        if "seat" in responseText:
            del responseText["seat"]
        if "partnerApplication" in responseText and "seat" in responseText["partnerApplication"]:
            del responseText["partnerApplication"]["seat"]
        return make_response(jsonify(responseText), statusCode)
    return abort(400)


@application.route("/", methods=["PUT"])
@requiresUser
def updateApplication():
    if request.is_json:
        ctx = _request_ctx_stack.top
        user = ctx.user
        form = request.get_json()
        response, statusCode = applicationService.updateApplication(userid=user.id, form=form)
        return make_response(jsonify(response), statusCode)
    return abort(400)


@application.route("/<id>", methods=["PUT"])
@requiresAdmin
def updateApplicationByApplicationId(id):
    if request.is_json:
        form = request.get_json()
        response, statusCode = applicationService.updateApplicationById(id=id, form=form)
        return make_response(jsonify(response), statusCode)
    return abort(400)


def filterOnStatus(applicationJson):
    if not applicationJson["status"] is ApplicationStatus.APPROVED:
        del applicationJson["seat"]
        return applicationJson
    return applicationJson
