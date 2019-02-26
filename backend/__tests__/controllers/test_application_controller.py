from controllers import applicationController
from services import applicationService
from models.application import Application
from models.user import User
from flask import jsonify, url_for
from main import app
import json


def createApplication():
    user = User("Darth plageus")
    application = Application(
        status="status",
        needs="needs",
        comments="comments",
        user=user,
        partnerUsername="Jar Jar Binks",
    )
    return application


def test_getApplication_with_no_application(mocker):
    mocker.patch.object(applicationService, "getApplicationById")
    applicationService.getApplicationById.return_value = {}
    with app.app_context():
        response = applicationController.getApplication(123)
        assert "200 OK" == response.status
        assert b'{}' == response.data


def test_getApplication_with_application(mocker):
    application = createApplication()
    mocker.patch.object(applicationService, "getApplicationById")
    with app.app_context():
        applicationService.getApplicationById.return_value = createApplication()
        response = applicationController.getApplication(123)
        assert "200 OK" == response.status
        assert jsonify(application.to_json()).data == response.data


def test_getApplicationByUser_with_no_application(mocker):
    mocker.patch.object(applicationService, "getApplicationByUserId")
    applicationService.getApplicationByUserId.return_value = {}
    with app.app_context():
        response = applicationController.getApplicationByUser(123)
        assert "200 OK" == response.status
        assert b'{}' == response.data


def test_getApplicationByUser_with_application(mocker):
    application = createApplication()
    mocker.patch.object(applicationService, "getApplicationByUserId")
    applicationService.getApplicationByUserId.return_value = createApplication()
    with app.app_context():
        response = applicationController.getApplicationByUser(123)
        assert "200 OK" == response.status
        assert jsonify(application.to_json()).data == response.data


def registerApplicationMock(comments, username, needs, partnerUsername):
    return Application(
        status="SUBMITTED",
        comments=comments,
        needs=needs,
        user=User("Darth Plageus"),
        partnerUsername=partnerUsername,
    ).to_json(), 201


def test_registerNewApplication(mocker, client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    mocker.patch.object(applicationService, "registerApplication")
    applicationService.registerApplication = registerApplicationMock
    with app.app_context():
        response = client.post(
            url_for('application.registerApplication'),
            headers=headers,
            data=json.dumps(dict(
                username='Darth Plageus',
                needs='needs',
                comments='comments',
                partnerUsername='Jar Jar Binks')))
        assert "201 CREATED" == response.status
        assert jsonify(
            comments='comments',
            needs='needs',
            user={"id": None, "username": "Darth Plageus"},
            id=None,
            status="SUBMITTED",
            partnerApplication={},
            ).data == response.data
