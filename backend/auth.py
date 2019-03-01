import json
from flask import request, _request_ctx_stack
from functools import wraps
from jose import jwt
from urllib.request import urlopen
from services import userService

DOMAIN = 'https://auth.dataporten.no'
VERIFICATION_DOMAIN = DOMAIN + '/openid/jwks'
ALGORITHMS = ['RS256']


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get('Authorization', None)
    if not auth:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected.'
        }, 401)

    parts = auth.split()

    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must start with "Bearer".'
        }, 401)

    elif len(parts) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found.'
        }, 401)

    elif len(parts) > 2:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must be bearer token.'
        }, 401)

    token = parts[1]
    return token


def requiresIdToken(f):
    """Determines if the Access Token is valid
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen(VERIFICATION_DOMAIN)
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'n': key['n'],
                    'e': key['e']
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    issuer=DOMAIN,
                    audience='77ee33cd-cc7f-4b7a-bce9-241c96458f14'
                )

            except jwt.ExpiredSignatureError:
                raise AuthError({
                    'code': 'token_expired',
                    'description': 'Token expired.'
                }, 401)

            except jwt.JWTClaimsError:
                raise AuthError({
                    'code': 'invalid_claims',
                    'description': 'Incorrect claims. Please, check the audience and issuer.'
                }, 401)
            except Exception:
                raise AuthError({
                    'code': 'invalid_header',
                    'description': 'Unable to parse authentication token.'
                }, 400)

            _request_ctx_stack.top.idToken = payload
            return f(*args, **kwargs)

        raise AuthError({
            'code': 'invalid_header',
            'description': 'Unable to find the appropriate key.'
        }, 400)

    return decorated


def requiresUser(f):
    """Determines if the Access Token is valid
    """

    @wraps(f)
    @requiresIdToken
    def decorated(*args, **kwargs):
        ctx = _request_ctx_stack.top
        sub = ctx.idToken.get("sub")
        user = userService.getUserFromSub(sub)
        if(not user):
            raise AuthError({
                'code': 'User_not_exist',
                'description': 'User not found in database'
            }, 400)
        ctx.user = user
        return f(*args, **kwargs)

    return decorated
