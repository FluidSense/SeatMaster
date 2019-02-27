import urllib
import json


def getDataportenUserInfo(token):
    request = urllib.request.Request("https://auth.dataporten.no/openid/userinfo")
    request.add_header("Authorization", f"Bearer {token}")
    result = urllib.request.urlopen(request)
    return json.load(result)
