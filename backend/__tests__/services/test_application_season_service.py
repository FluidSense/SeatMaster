import pytest
from shared import db
from models.applicationSeason import ApplicationSeason
from datetime import datetime, timedelta
from services import applicationSeasonService


def generateTestSeason(mocker, amount):
    mocker.patch.object(db.session, "query")
    start1 = datetime.now()
    end1 = datetime.now() + timedelta(days=180)
    acceptStart1 = datetime.now() + timedelta(days=7)
    acceptEnd1 = datetime.now() + timedelta(days=21)
    testSeason1 = ApplicationSeason(start1, end1, acceptStart1, acceptEnd1)
    if amount <= 1:
        return testSeason1
    else:
        start2 = datetime.now() + timedelta(days=190)
        end2 = datetime.now() + timedelta(days=360)
        seasonStart2 = datetime.now() + timedelta(days=160)
        seasonEnd2 = datetime.now() + timedelta(days=190)
        testSeason2 = ApplicationSeason(start2, end2, seasonStart2, seasonEnd2)
        return testSeason1, testSeason2


# Manual mock of nested functions filter and all of session query.
# Mocker patching returned None all the time
def mockFilterAll(returnValue=None):
    all = type('al', (object,), {'__init__': lambda x, y: None, 'all': lambda x: returnValue})
    filter = type('filt', (object,), {'__init__': lambda x: None, 'filter': all})
    return filter


def test_getCurrent_with_single_season(mocker):
    season = generateTestSeason(mocker, 1)
    filter = mockFilterAll(returnValue=[season])
    db.session.query.return_value = filter
    assert season == applicationSeasonService.getCurrentOrNext()


def test_getCurrent_with_two_seasons(mocker):
    season1, season2 = generateTestSeason(mocker, 2)
    filter = mockFilterAll(returnValue=[season1, season2])
    db.session.query.return_value = filter
    assert applicationSeasonService.getCurrentOrNext() == season1


def test_getCurrent_with_no_season(mocker):
    mocker.patch.object(db.session, "query")
    filter = mockFilterAll()
    db.session.query.return_value = filter
    with pytest.raises(TypeError):
        applicationSeasonService.getCurrentOrNext()


def test_registerSeason_period_end_too_early(mocker):
    mocker.patch.object(db.session, "add")
    mocker.patch.object(db.session, "commit")
    newPeriodStart = datetime.now()
    newPeriodEndTooEarly = newPeriodStart - timedelta(days=10)
    newRoomStart = newPeriodStart
    newRoomEnd = newPeriodStart + timedelta(days=10)
    resultText, resultCode = applicationSeasonService.registerNewSeason(
        newPeriodEnd=str(newPeriodEndTooEarly),
        newPeriodStart=str(newPeriodStart),
        newRoomEnd=str(newRoomEnd),
        newRoomStart=str(newRoomStart),
    )
    assert resultText == "Application start period should not be later than application end period"
    assert resultCode == 400


def test_registerSeason_room_end_too_early(mocker):
    mocker.patch.object(db.session, "add")
    mocker.patch.object(db.session, "commit")
    newPeriodStart = datetime.now()
    newPeriodEndTooEarly = newPeriodStart + timedelta(days=10)
    newRoomStart = newPeriodStart
    newRoomEnd = newPeriodStart - timedelta(days=10)
    resultText, resultCode = applicationSeasonService.registerNewSeason(
        newPeriodEnd=str(newPeriodEndTooEarly),
        newPeriodStart=str(newPeriodStart),
        newRoomEnd=str(newRoomEnd),
        newRoomStart=str(newRoomStart),
    )
    assert resultText == "Room start period should not be later than application end period"
    assert resultCode == 400


def test_registerSeason_success(mocker):
    newPeriodStart = datetime.now()
    newPeriodEnd = newPeriodStart + timedelta(days=10)
    newRoomStart = newPeriodStart
    newRoomEnd = newPeriodStart + timedelta(days=10)
    mocker.patch.object(db.session, "add")
    mocker.patch.object(db.session, "commit")
    applicationSeason = ApplicationSeason(
        applicationPeriodEnd=str(newPeriodEnd),
        applicationPeriodStart=str(newPeriodStart),
        start=str(newRoomStart),
        end=str(newRoomEnd),
    )
    resultText, resultCode = applicationSeasonService.registerNewSeason(
        newPeriodEnd=str(newPeriodEnd),
        newPeriodStart=str(newPeriodStart),
        newRoomEnd=str(newRoomEnd),
        newRoomStart=str(newRoomStart),
    )
    addargs = db.session.add.call_args
    assert type(addargs[0][0]) is ApplicationSeason
    db.session.commit.assert_called_once()
    assert resultCode == 201
    assert resultText == applicationSeason.to_json()


def test_registerSeason_fail(mocker):
    newPeriodStart = 123
    newPeriodEnd = 321
    newRoomStart = 123
    newRoomEnd = 321
    mocker.patch.object(db.session, "add")
    mocker.patch.object(db.session, "commit")
    resultText, resultCode = applicationSeasonService.registerNewSeason(
        newPeriodEnd=str(newPeriodEnd),
        newPeriodStart=str(newPeriodStart),
        newRoomEnd=str(newRoomEnd),
        newRoomStart=str(newRoomStart),
    )
    assert resultCode == 400
    assert resultText == "Input values are wrong or datetime object is not in the format yyyy-mm-dd hh:mm:ss.ms"
