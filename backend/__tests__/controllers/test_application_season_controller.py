from controllers import applicationSeasonController
from services import applicationSeasonService
from models.applicationSeason import ApplicationSeason
from datetime import datetime, timedelta
from flask import jsonify, url_for
from main import app
import json


def createBasicSeason():
    date1 = datetime.now()
    date2 = datetime.now() + timedelta(days=365)
    date3 = datetime.now() + timedelta(days=7)
    date4 = datetime.now() + timedelta(days=21)
    return ApplicationSeason(date1, date2, date3, date4)


def test_getCurrentSeason_with_a_season(mocker):
    aSeason = createBasicSeason()
    mocker.patch.object(applicationSeasonService, "getCurrentOrNext")
    applicationSeasonService.getCurrentOrNext.return_value = aSeason
    seasonJson = {
        'start': str(aSeason.start),
        'end': str(aSeason.end),
        'applicationPeriodStart': str(aSeason.applicationPeriodStart),
        'applicationPeriodEnd': str(aSeason.applicationPeriodEnd),
    }
    with app.app_context():
        response = applicationSeasonController.getCurrentSeason()
        assert "200 OK" == response.status
        assert seasonJson == response.get_json()


def test_getCurrentSeason_without_a_season(mocker):
    mocker.patch.object(applicationSeasonService, "getCurrentOrNext")
    applicationSeasonService.getCurrentOrNext.return_value = {}
    with app.app_context():
        response = applicationSeasonController.getCurrentSeason()
        assert "200 OK" == response.status
        assert b'{}' == response.data

def registerApplicationSeasonMock(newPeriodStart, newPeriodEnd, newRoomStart, newRoomEnd):
    return ApplicationSeason(newPeriodStart, newPeriodEnd, newRoomStart, newRoomEnd), 201

def test_createSeason(mocker, client):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    starttime = datetime.now() + timedelta(days=+5)
    endtime = starttime + timedelta(days=+150)
    acceptstart = starttime
    acceptend = starttime + timedelta(days=+7)
    mocker.patch.object(applicationSeasonService, "registerNewSeason")
    applicationSeasonService.registerNewSeason = registerApplicationSeasonMock
    with app.app_context():
        response = client.post(
            url_for('applicationSeason.createNewSeason'),
            headers=headers,
            data=json.dumps(dict(
                newPeriodEnd=acceptend,
                newPeriodStart=acceptstart,
                newRoomEnd=starttime,
                newRoomStart=endtime),
                default=str))
        assert "201 CREATED" == response.status
        assert jsonify(
            newPeriodEnd=str(acceptend),
            newPeriodStart=str(acceptstart),
            newRoomEnd=str(starttime),
            newRoomStart=str(endtime)).data == response.data
