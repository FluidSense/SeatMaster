import urllib
import json


def getDataportenUserInfo(token):
    request = urllib.request.Request("https://auth.dataporten.no/openid/userinfo")
    request.add_header("Authorization", f"Bearer {token}")
    result = urllib.request.urlopen(request)
    return json.load(result)


def getDataportenGroups(token):
    request = urllib.request.Request("https://groups-api.dataporten.no/groups/me/groups")
    request.add_header("Authorization", f"Bearer {token}")
    result = urllib.request.urlopen(request)
    return json.load(result)


def checkIfAdmin(groups):
    print(groups[0], flush=True)
    for group in groups:
        if(group.get('id', None) == "fc:fs:fs:emne:ntnu.no:TDT4136:1"):
            return True
    return False
