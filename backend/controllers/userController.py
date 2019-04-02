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
        try:
            accessToken = get_token_auth_header("AccessToken")
        except (HTTPError, TypeError):
            return Response("{'error':'Access token not valid'}", 401)

        try:
            userInfo = dataporten.getDataportenUserInfo(accessToken)
        except HTTPError:
            return abort(401)
        if(ctx.idToken.get("sub") == userInfo.get("sub")):
            response, statusCode = userService.registerUser(userInfo)

            userIsAdmin = False
            try:
                userIsAdmin = dataporten.checkIfAdmin(response.get("username", ""))
            except HTTPError:
                userIsAdmin = False
            response['admin'] = userIsAdmin
            return make_response(jsonify(response), statusCode)
        else:
            abort(401)
    return abort(400)


@user.route("/all")
@requiresAdmin
def getAllUsers():
    users = userService.getAllUsers()
    userList = list(map(lambda x: x.to_json(), users))
    return jsonify(userList) if users else Response("[]", 200)


@user.route("/")
@requiresUser
def getSelf():
    ctx = _request_ctx_stack.top
    user = ctx.user
    if not user:
        return Response("{}", 401)

    userIsAdmin = False
    try:
        userIsAdmin = dataporten.checkIfAdmin(user.username)
    except HTTPError:
        userIsAdmin = False
    userJson = user.to_json()
    userJson['admin'] = userIsAdmin
    return jsonify(userJson)


@user.route("/", methods=["DELETE"])
@requiresUser
def deleteSelf():
    ctx = _request_ctx_stack.top
    user = ctx.user
    response, successCode = userService.deleteUser(user.id)
    return make_response(jsonify(response), successCode)


@user.route("/<id>", methods=["DELETE"])
@requiresAdmin
def deleteUser(id):
    response, successCode = userService.deleteUser(id)
    return make_response(jsonify(response), successCode)


@user.route("/deleteAll", methods=["DELETE"])
@requiresAdmin
def deleteAllUsers():
    response, successCode = userService.deleteAllUsers()
    return make_response(jsonify(response), successCode)
