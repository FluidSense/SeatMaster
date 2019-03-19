from flask import Blueprint, Response, jsonify, request, abort, make_response
import json
from services import userService
from auth import requiresUser, requiresIdToken, requiresAdmin, get_token_auth_header
from flask import _request_ctx_stack
from utils import dataporten
from urllib.error import HTTPError

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/<id>")
@requiresAdmin
def getUser(id):
    userApplication = userService.getUserById(id)
    return jsonify(userApplication.to_json()) if userApplication else Response(json.dumps({}), 200)


@user.route("/", methods=["POST"])
@requiresIdToken()
def registerUser():
    if request.is_json:
        ctx = _request_ctx_stack.top
        accessToken = get_token_auth_header("AccessToken")
        try:
            userInfo = dataporten.getDataportenUserInfo(accessToken)
        except HTTPError:
            return abort(401)
        if(ctx.idToken.get("sub") == userInfo.get("sub")):
            response, statusCode = userService.registerUser(userInfo)
            return make_response(jsonify(response), statusCode)
        else:
            abort(401)
    return abort(400)


@user.route("/")
@requiresUser
def getSelf():
    ctx = _request_ctx_stack.top
    user = ctx.user
    if not user:
        return Response("{}", 401)

    accessToken = get_token_auth_header("AccessToken")
    userIsAdmin = False
    try:
        userIsAdmin = dataporten.checkIfAdmin(accessToken)
    except HTTPError:
        userIsAdmin = False
    userJson = user.to_json()
    userJson['admin'] = userIsAdmin
    return jsonify(userJson)