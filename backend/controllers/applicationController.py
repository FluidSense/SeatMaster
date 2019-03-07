from flask import Blueprint, Response, jsonify, request, abort, make_response, _request_ctx_stack
import json
from services import applicationService
from auth import requiresUser, requiresIdToken, requiresAdmin
from flask import _request_ctx_stack

application = Blueprint("application", __name__, url_prefix="/application")

@application.route("/")
@requiresUser
def getApplicationBySelf():
    ctx = _request_ctx_stack.top
    user = ctx.user
    userID = user.id
    userApplication = applicationService.getApplicationByUserId(userID)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


# TODO Should be admin protected
@application.route("/<id>")
@requiresAdmin
def getApplicationByApplicationId(id):
    userApplication = applicationService.getApplicationById(id)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


# TODO Should be admin protected
@application.route("/byUser/<userid>")
@requiresAdmin
def getApplicationByUser(userid):
    userApplication = applicationService.getApplicationByUserId(userid)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)

@application.route("/")
@requiresUser
def getOwnApplication():
    user = _request_ctx_stack.top.user
    userApplication = applicationService.getApplicationByUserId(user.userid)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)

# TODO Should fetch user from stack, not from form field
@application.route("/", methods=["POST"])
@requiresUser
def registerApplication():
    if request.is_json:
        ctx = _request_ctx_stack.top
        user = ctx.user
        userID = user.id

        form = request.get_json()
        needs = form.get("needs")
        comments = form.get("comments")
        username = _request_ctx_stack.top.user.username
        partnerUsername = form.get("partnerUsername")
        responseText, statusCode = applicationService.registerApplication(
          comments=comments,
          needs=needs,
          id=userID,
          partnerUsername=partnerUsername)
        return make_response(jsonify(responseText), statusCode)
    return abort(400)
