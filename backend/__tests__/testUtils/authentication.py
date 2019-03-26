from __tests__.testUtils.constants import decodedToken, token, verify_at_hash, accessToken, testGroups
from models.user import User
from unittest.mock import Mock, patch
from functools import wraps


def mock_authentication(mocker):
    user = User(
        username="elevg",
        sub="76a7a061-3c55-430d-8ee0-6f82ec42501f",
        email="4s8j0rng@ELEV_GGGGGG.no",
        fullname="Asbjørn ELEVG baby"
        )
    mock_decode = mocker.Mock(name="decode")
    mock_decode.return_value = decodedToken
    mock_dataporten_getUserInfo = mocker.Mock(name="mock_dataporten")
    mock_dataporten_getUserInfo.return_value = {
        "sub": "55de7d71-4a25-4103-8e43-35df8c2d472a",
        "dataporten-userid_sec": [
            "feide:elevG@uninett.no"
        ],
        "name": "Asbjørn ELEVG baby",
        "email": "4s8j0rng@ELEV_GGGGGG.no",
        "email_verified": True,
        "picture": "https://auth.dataporten.no/openid/userinfo/v1/user/media/p:a3019954-902f-45a3-b4ee-bca7b48ab507"
    }
    mock_access_token = mocker.Mock(name="eval_access_token")
    mock_access_token.return_value = accessToken, True
    mocker.patch("utils.dataporten.getDataportenUserInfo", mock_dataporten_getUserInfo)
    mocker.patch("jose.jwt.decode", mock_decode)
    mocker.patch("jose.jwt.get_unverified_header", lambda x: decodedToken)
    mocker.patch("utils.dataporten.getDataportenGroups", lambda x: testGroups)
    mocker.patch("utils.dataporten.checkIfAdmin", lambda x: True)
    mocker.patch("auth.get_token_auth_header", lambda x: token)
    mocker.patch("auth.eval_access_token", mock_access_token)
    mocker.patch("services.userService.getUserFromSub", lambda x: user)


def mock_authentication_context(f):

    @wraps(f)
    def decorator(*args, **kwargs):
        mock_decode = Mock(name="decode")
        mock_decode.return_value = decodedToken
        mock_dataporten_getUserInfo = Mock(name="mock_dataporten")
        mock_dataporten_getUserInfo.return_value = {
            "sub": "55de7d71-4a25-4103-8e43-35df8c2d472a",
            "dataporten-userid_sec": [
                "feide:elevG@uninett.no"
            ],
            "name": "Asbjørn ELEVG baby",
            "email": "4s8j0rng@ELEV_GGGGGG.no",
            "email_verified": True,
            "picture": "https://auth.dataporten.no/openid/userinfo/v1/user/media/p:a3019954-902f-45a3-b4ee-bca7b48ab507"
        }
        with patch("utils.dataporten.getDataportenUserInfo", mock_dataporten_getUserInfo), \
                patch("jose.jwt.decode", mock_decode), \
                patch("jose.jwt.get_unverified_header", lambda x: decodedToken), \
                patch("utils.dataporten.getDataportenGroups", lambda x: testGroups):
            return f(*args, **kwargs)

    return decorator
