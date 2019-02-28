from flask import Blueprint, Response, jsonify, request, abort, make_response
import json
from services import userService
from auth import requires_auth
from flask import _request_ctx_stack
from utils.dataporten import getDataportenUserInfo

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/<id>")
def getUser(id):
    userApplication = userService.getUserById(id)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@user.route("/", methods=["POST"])
@requires_auth
def registerUser():
    if request.is_json:
        form = request.get_json()
        ctx = _request_ctx_stack.top
        accessToken = form.get("accessToken")
        userInfo = getDataportenUserInfo(accessToken)
        if(ctx.idToken.get("sub") == userInfo.get("sub")):
            response, statusCode = userService.registerUser(userInfo)
            return make_response(jsonify(response), statusCode)
        else:
            abort(401)
    return abort(400)


@user.route("/")
@requires_auth
def getSelf():
    ctx = _request_ctx_stack.top
    user = userService.getUserFromSub(ctx.current_user.sub)
    return jsonify(user.to_json()) if user else Response("{}", 401)
