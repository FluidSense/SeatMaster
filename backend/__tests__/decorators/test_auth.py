from unittest.mock import Mock
import auth
from jose import jwt
from flask import _request_ctx_stack
from main import app
from __tests__.testUtils.constants import token, accessToken, decodedToken, rsa_key
from services import userService
from models.user import User


def test_requires_id_token(mocker):
    mocker.patch.object(auth, "get_token_auth_header")
    mocker.patch.object(auth, "getAccessToken")
    auth.get_token_auth_header.return_value = token
    auth.getAccessToken.return_value = accessToken, True
    mocker.patch.object(jwt, "decode")
    mocker.patch.object(jwt, "get_unverified_header")
    jwt.decode.return_value = decodedToken
    jwt.get_unverified_header.return_value = decodedToken
    func = Mock()
    decorated_func = auth.requiresIdToken()(func)
    with app.test_request_context():
        decorated_func()
        assert _request_ctx_stack.top.idToken == decodedToken
        jwt.decode.assert_called_with(token,
                                      rsa_key,
                                      algorithms=["RS256"],
                                      issuer='https://auth.dataporten.no',
                                      audience='77ee33cd-cc7f-4b7a-bce9-241c96458f14',
                                      options={"verify_signature": True,
                                               "verify_exp": True,
                                               "verify_at_hash": True},
                                      access_token='eca448c7-b0f0-487d-98c5-946c3bb29868')


def test_requires_user(mocker):
    user = User(username="Username", sub=decodedToken.get("sub"), email="email", fullname="Full Name")
    mocker.patch.object(auth, "get_token_auth_header")
    auth.get_token_auth_header.return_value = token
    mocker.patch.object(jwt, "decode")
    mocker.patch.object(jwt, "get_unverified_header")
    jwt.decode.return_value = decodedToken
    jwt.get_unverified_header.return_value = decodedToken
    mocker.patch.object(userService, "getUserFromSub")
    userService.getUserFromSub.return_value = user
    auth.get_token_auth_header.return_value = token
    func = Mock()
    decorated_func = auth.requiresUser(func)
    with app.test_request_context():
        decorated_func()
        assert _request_ctx_stack.top.idToken == decodedToken
        assert _request_ctx_stack.top.user == user
        userService.getUserFromSub.assert_called_with(decodedToken.get("sub"))
