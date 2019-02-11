from controllers import applicationController
from services import applicationService
from models.application import Application
from models.user import User
from flask import jsonify, url_for
from main import app
import json


def createApplication():
    user = User("Darth plageus")
    application = Application("status", "infoText", user, "Jar Jar Binks")
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


def registerApplicationMock(infoText, username, partnerUsername):
    return Application("status", infoText, User("Darth Plageus"), partnerUsername), 201


def test_registerNewApplication_fails(mocker, client):
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
                infotext='infoText',
                partnerUsername='Jar Jar Binks')))
        assert "200 OK" == response.status
        assert jsonify(json.dumps(dict(
            username='Darth Plageus',
            infotext='infoText',
            partnerUsername='Jar Jar Binks')), 201).data == response.data
