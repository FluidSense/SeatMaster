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
