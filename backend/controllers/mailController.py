from flask import Blueprint, jsonify, request, abort, make_response
from services import userService
from auth import requiresAdmin
from utils.mail import sendMail

mail = Blueprint("mail", __name__, url_prefix="/mail")


@mail.route("/<id>", methods=["POST"])
@requiresAdmin
def sendMailToId(id):
    if request.is_json:
        form = request.get_json()
        message = form.get("content")
        subject = form.get("subject")
        user = userService.getUserById(id)
        sendMail(subjectText=subject, contentText=message, recipientsList=[user.email])
        return make_response(jsonify(form), 200)
    return abort(400)


@mail.route("/", methods=["POST"])
@requiresAdmin
def sendMailToList():
    if request.is_json:
        form = request.get_json()
        userids = form.get("ids")
        message = form.get("content")
        subject = form.get("subject")
        users = list(map(lambda userid: userService.getUserById(userid), userids))
        usersEmail = list(map(lambda user: user.email, users))
        sendMail(subjectText=subject, contentText=message, recipientsList=[usersEmail])
        return make_response(jsonify(form), 200)
    return abort(400)
