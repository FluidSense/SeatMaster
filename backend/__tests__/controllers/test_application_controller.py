from services import applicationService
from models.application import Application
from models.user import User
from flask import jsonify, url_for
from main import app
import json
from __tests__.testUtils.authentication import mock_authentication
from __tests__.testUtils.models import createApplication, createBasicSeason
from utils.enums import ApplicationStatus
from __tests__.testUtils.constants import accessToken


def test_getApplication_with_no_application(mocker, client):
    mock_authentication(mocker)
    mocker.patch.object(applicationService, "getApplicationById")
    applicationService.getApplicationById.return_value = {}
    with app.app_context():
        response = client.get(url_for("application.getApplication", id=123))
        assert "200 OK" == response.status
        assert b'{}' == response.data


def test_getApplication_with_application(mocker, client):
    mock_authentication(mocker)
    application = createApplication()
    mocker.patch.object(applicationService, "getApplicationById")
    with app.app_context():
        applicationService.getApplicationById.return_value = createApplication()
        response = client.get(url_for("application.getApplication", id=123))
        assert "200 OK" == response.status
        assert jsonify(application.to_json()).data == response.data


def test_getApplicationByUser_with_no_application(mocker, client):
    mock_authentication(mocker)
    mocker.patch.object(applicationService, "getApplicationByUserId")
    applicationService.getApplicationByUserId.return_value = {}
    with app.app_context():
        response = client.get(url_for("application.getApplicationByUser", userid=123))
        assert "200 OK" == response.status
        assert b'{}' == response.data


def test_getApplicationByUser_with_application(mocker, client):
    mock_authentication(mocker)
    application = createApplication()
    mocker.patch.object(applicationService, "getApplicationByUserId")
    applicationService.getApplicationByUserId.return_value = createApplication()
    with app.app_context():
        response = client.get(url_for("application.getApplicationByUser", userid=123))
        assert "200 OK" == response.status
        assert jsonify(application.to_json()).data == response.data


def registerApplicationMock(comments, user, needs, partnerUsername, preferredRoom, seatRollover, rank):
    return Application(
        status=ApplicationStatus.SUBMITTED,
        comments=comments,
        needs=needs,
        user=User(username="Darth plageus", sub="sub", email="email", fullname="Schnep Schmep"),
        partnerUsername=partnerUsername,
        preferredRoom="d1",
        seatRollover=True,
        rank=rank,
        applicationSeason=createBasicSeason()
    ).to_json(), 201


def test_registerNewApplication(mocker, client):
    mock_authentication(mocker)
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype,
        "AccessToken": f'Bearer {accessToken}'
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
                partnerUsername='Jar Jar Binks',
                preferredRoom="d1",
                seatRollover=True,
            )))
        assert "201 CREATED" == response.status
        assert json.loads(jsonify(
            comments='comments',
            needs='needs',
            user={"id": None, "username": "Darth plageus", "email": "email", "fullname": "Schnep Schmep"},
            id=None,
            status="SUBMITTED",
            preferredRoom="d1",
            seatRollover=True,
            partnerApplication={},
            rank="WRITING_MASTER"
        ).data) == json.loads(response.data)
