import pytest
from models.applicationSeason import ApplicationSeason
from datetime import datetime, timedelta
from sqlalchemy.exc import ProgrammingError


def test_add_applicationseason(db_session):
    start = datetime.now()
    end = datetime.now() + timedelta(days=180)
    applicationStart = start + timedelta(days=7)
    applicationEnd = start + timedelta(days=21)
    season = ApplicationSeason(start, end, applicationStart, applicationEnd)
    db_session.add(season)
    db_session.commit()
    assert season == db_session.query(ApplicationSeason).get(1)


def test_no_submit_on_wrong_data(db_session):
    start = 1
    end = True
    applicationStart = 12.02
    applicationEnd = "No"
    season = ApplicationSeason(start, end, applicationStart, applicationEnd)
    db_session.add(season)
    with pytest.raises(ProgrammingError):
        db_session.commit()


def test_no_submit_on_missing_data():
    with pytest.raises(TypeError):
        ApplicationSeason(None, None)
