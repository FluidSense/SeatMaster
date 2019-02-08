from services import applicationSeasonService
from shared import db


def test_getCurrentOrNext(mocker):
    mockClass = mocker.patch(db)
    print(dir(mockClass))
