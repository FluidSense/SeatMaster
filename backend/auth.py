import json
from flask import Response, request, _request_ctx_stack
from functools import wraps
from jose import jwt
from urllib.request import urlopen
from services import userService
from utils import dataporten
from urllib.error import HTTPError


DOMAIN = 'https://auth.dataporten.no'
VERIFICATION_DOMAIN = DOMAIN + '/openid/jwks'
ALGORITHMS = ['RS256']


class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code


def get_token_auth_header(header):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get(header, None)
    if not auth:
        return Response(json.dumps({'error': 'Authorization_header_missing'}), 401)

    parts = auth.split()

    if parts[0].lower() != 'bearer':
        return Response(json.dumps({'error': 'Invalid_header'}), 401)

    elif len(parts) == 1:
        return Response(json.dumps({'error': 'Invalid_header'}), 401)

    elif len(parts) > 2:
        return Response(json.dumps({'error': 'Invalid_header'}), 401)

    token = parts[1]
    return token


def requiresIdToken(verify=True):

    def decorator(f):
        """Determines if the Access Token is valid
        """

        def wrapper(*args, **kwargs):
            token = get_token_auth_header("Authorization")
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
                        audience='77ee33cd-cc7f-4b7a-bce9-241c96458f14',
                        options={"verify_signature": verify,
                                 "verify_exp": verify}
                    )

                except jwt.ExpiredSignatureError:
                    return Response(json.dumps({'error': 'Token_expired'}), 401)

                except jwt.JWTClaimsError:
                    return Response(json.dumps({'error': 'Invalid_claims'}), 401)
                except Exception:
                    return Response(json.dumps({'error': 'Invalid_header'}), 401)

                _request_ctx_stack.top.idToken = payload
                return f(*args, **kwargs)
        return wrapper
    return decorator


def requiresUser(f):
    """Determines if the Access Token is valid
    """

    @wraps(f)
    @requiresIdToken()
    def decorated(*args, **kwargs):
        ctx = _request_ctx_stack.top
        sub = ctx.idToken.get("sub")
        user = userService.getUserFromSub(sub)
        if not user:
            return Response(json.dumps({'error': 'User_not_exist'}), 401)
        ctx.user = user
        return f(*args, **kwargs)

    return decorated


def requiresAdmin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        accessToken = get_token_auth_header("AccessToken")
        try:
            groups = dataporten.getDataportenGroups(accessToken)
        except HTTPError:
            return Response("Not Authenticated", 401)
        isAdmin = dataporten.checkIfAdmin(groups)
        if not isAdmin:
            return Response("Access Denied", 403)
        return f(*args, **kwargs)
    return decorated
