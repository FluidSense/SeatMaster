from services import userService
from shared import db


def setUp(mocker):
    mocker.patch.object(db.session, 'add')
    mocker.patch.object(db.session, 'commit')
    mocker.patch.object(db.session, 'delete')


def test_register_user(mocker):
    setUp(mocker)
    userInfo = {
        "sub": "123",
        "dataporten-userid_sec": [
            "feide:elevG@uninett.no"
        ],
        "name": "Asbjørn ELEVG baby",
        "email": "4s8j0rng@ELEV_GGGGGG.no",
        "email_verified": True,
        "picture": "https://auth.dataporten.no/openid/userinfo/v1/user/media/p:a3019954-902f-45a3-b4ee-bca7b48ab507"
    }
    responseText, statusCode = userService.registerUser(userInfo)
    user = dict(username="elevG", id=None, email="4s8j0rng@ELEV_GGGGGG.no")
    assert 201 == statusCode
    assert user == responseText
    db.session.add.assert_called()
    db.session.commit.assert_called()
