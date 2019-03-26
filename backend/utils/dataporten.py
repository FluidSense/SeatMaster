import urllib
import json
from utils.groups import MASTERS, PROJECT_ASSIGNMENTS, MASTER_STUDIES, BACHELOR_STUDIES
from utils.enums import Rank


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


def checkIfAdmin(accessToken):
    groups = {}
    groups = getDataportenGroups(accessToken)
    for group in groups:
        # TODO: Make call to actual admin BAS endpoint
        if(group.get('id', None) == "fc:org:ntnu.no:unit:631000"):
            return True
    return False


def getRank(accessToken):
    groups = getDataportenGroups(accessToken)
    groupIds = list(map(lambda group: group["id"], groups))
    for subjectId in MASTERS:
        if(subjectId in groupIds):
            return Rank.WRITING_MASTER
    for subjectId in PROJECT_ASSIGNMENTS:
        if(subjectId in groupIds):
            return Rank.PROJECT_ASSIGNMENT
    for subjectId in MASTER_STUDIES:
        if(subjectId in groupIds):
            return Rank.MASTER_STUDENT
    for subjectId in BACHELOR_STUDIES:
        if(subjectId in groupIds):
            return Rank.BACHELOR_STUDENT
    return Rank.OTHER
