import json
from flask import Response, request, _request_ctx_stack, abort
from functools import wraps
from jose import jwt
from urllib.request import urlopen
from services import userService
from utils import dataporten
from urllib.error import HTTPError


DOMAIN = 'https://auth.dataporten.no'
VERIFICATION_DOMAIN = DOMAIN + '/openid/jwks'
ALGORITHMS = ['RS256']


def get_token_auth_header(header):
    """Obtains the token from a given header
    """

    try:
        headerString = request.headers.get(header, None)
    except HTTPError:
        raise HTTPError("Cannot parse header")

    if not headerString:
        raise TypeError("Header is missing")

    parts = headerString.split()

    if parts[0].lower() != 'bearer' or len(parts) == 1 or len(parts) > 2:
        raise TypeError("Header invalid")

    token = parts[1]
    return token


def getAccessToken():
    try:
        access_token = get_token_auth_header("AccessToken")
        return access_token, True
    except (HTTPError, TypeError):
        return None, False


def requiresIdToken(verify=True):

    def decorator(f):
        """Determines if the ID token is valid
        """

        def wrapper(*args, **kwargs):
            try:
                token = get_token_auth_header("Authorization")
            except (HTTPError, TypeError):
                return Response("{'error':'ID token not valid'}", 401)

            access_token, verify_at_hash = getAccessToken()
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
                                 "verify_exp": verify,
                                 "verify_at_hash": verify_at_hash},
                        access_token=access_token
                    )

                except jwt.ExpiredSignatureError:
                    return Response("{'error': 'Token_expired'}", 401)

                except jwt.JWTClaimsError:
                    return Response("{'error': 'Invalid_claims'}", 401)
                except Exception:
                    return Response("{'error': 'Invalid_header'}", 401)

                _request_ctx_stack.top.idToken = payload
                return f(*args, **kwargs)
        return wrapper
    return decorator


def requiresUser(f):
    """Determines if the user exists backend
    """

    @wraps(f)
    @requiresIdToken()
    def decorated(*args, **kwargs):
        ctx = _request_ctx_stack.top
        sub = ctx.idToken.get("sub")
        user = userService.getUserFromSub(sub)
        if not user:
            return Response("{'error': 'User_not_exist'}", 401)
        ctx.user = user
        return f(*args, **kwargs)

    return decorated


def requiresAdmin(f):
    @wraps(f)
    @requiresUser
    def decorated(*args, **kwargs):
        try:
            user =_request_ctx_stack.top.user
            isAdmin = dataporten.checkIfAdmin(user.username)
        except (HTTPError, TypeError) as e:
            print(e)
            return abort(401)
        if not isAdmin:
            return abort(403) 
        return f(*args, **kwargs)
    return decorated
