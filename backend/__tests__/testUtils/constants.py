token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImIwMGE1MDYxYzMxMTQxMjA5Y2RmMjlkYWM3NjYwMTkxMWI2N2M4YWQifQ.eyJpc3MiOiJodHRwczpcL1wvYXV0aC5kYXRhcG9ydGVuLm5vIiwiYXVkIjoiNzdlZTMzY2QtY2M3Zi00YjdhLWJjZTktMjQxYzk2NDU4ZjE0Iiwic3ViIjoiNTVkZTdkNzEtNGEyNS00MTAzLThlNDMtMzVkZjhjMmQ0NzJhIiwiaWF0IjoxNTUxMTgzMTkwLCJleHAiOjE1NTExODY3OTAsImF1dGhfdGltZSI6MTU1MTE4MTYyMX0.L0G7cKUGIoforsRAECsClAKxTqtqCX2QthsQBoZUg1FZAgkDsUivvb1H_RhD-7WrbqAHHvl-hyFD-9qrJth88mjeAoQrpiMGjZNFTKnnLG2NIqXTo9LaHySWLGu30rtswlbua8mbu6R4-3MKGP0sPQriKKU-ngk_6pH93ZNNzBmb8hpDDz5gkzHbhJ1yNhYN2hQ-bvi7tlCBBlyewEw7T-cgKVFN7kBG1p4vf0zcpIiNC9ZgQF8YY6cwTqRUtvkMc88s2GI8E-qiq8YODaD4CPjqvhwHPZotf3J_yFPVLYRuZ8LKjl6QWqvDWqjam_pSFU-XOMDj2gF1-WZhUSUD8A"  # noqa: E501
accessToken = "eca448c7-b0f0-487d-98c5-946c3bb29868"

decodedToken = {
    "typ": "JWT",
    "alg": "RS256",
    "kid": "b00a5061c31141209cdf29dac76601911b67c8ad",
    "iss": "https://auth.dataporten.no",
    "aud": "77ee33cd-cc7f-4b7a-bce9-241c96458f14",
    "sub": "55de7d71-4a25-4103-8e43-35df8c2d472a",
    "iat": 1551183190,
    "exp": 1551186790,
    "auth_time": 1551181621
}

rsa_key = {'kty': 'RSA',
           'kid': 'b00a5061c31141209cdf29dac76601911b67c8ad',
           'n': 'xFyeEkBwkozPqYqelBrXYsfxMGBMXYTZusE-1hj7WAZ6lNGhITiw6CSb42IIJd11g8TfwxmcV36QHejFguo918UYY2cwshSro9HzFx2Gjd4pulavMa1xLC5kOStEzZns8viPyvl3oXarP3-X5w1Nc1MzPPvtksTffB8cACL9lvADHt9vVDALxhm7ctlf2ysXJLeeZxlax1gQFZkX7ZA4s4cKDvb-zYNNvg2_u7KgD6vXMqmxIj3Gi8zhTP4qN2ro69YCImCHtWXXubUtvq16j_fxj8hQmv2KnPKtsMrGHQRso2a-NGAvHGe3N-0fyrJ-E_ANa3EpsbydmAMcneS8Ww',  # noqa: E501
           'e': 'AQAB'}


testGroups = [
    {
        "type": "fc:org",
        "public": True,
        "norEduOrgAcronym": "NTNU",
        "postalAddress": "N-7491 Trondheim $ NORWAY",
        "eduOrgLegalName": "NORGES TEKNISK-NATURVITENSKAPELIGE UNIVERSITET NTNU",
        "mail": "orakel@ntnu.no",
        "norEduOrgNIN": "NO974767880",
        "displayName": "NORGES TEKNISK-NATURVITENSKAPELIGE UNIVERSITET NTNU",
        "id": "fc:org:ntnu.no",
        "l": "Trondheim",
        "orgType": [
            "higher_education"
        ],
        "telephoneNumber": "+47 73595000",
        "eduOrgHomePageURI": "http://www.ntnu.no/",
        "membership": {
            "basic": "admin",
            "displayName": "Ansatt",
            "primaryAffiliation": "employee",
            "title": [
                "fast ansatt"
            ],
            "affiliation": [
                "employee",
                "member",
                "affiliate",
                "student"
            ]
        },
        "labeledURI": "http://www.ntnu.no/",
        "norEduOrgUniqueIdentifier": "194000000",
        "facsimileTelephoneNumber": "+47 73595310",
        "street": "N-7491",
        "postalCode": "N-7491"
    },
    {
        "displayName": "Institutt for datateknologi og informatikk",
        "id": "fc:org:ntnu.no:unit:631000",
        "type": "fc:orgunit",
        "membership": {
            "basic": "member",
            "primaryOrgUnit": True
        },
        "parent": "fc:org:ntnu.no",
        "public": True
    },
    {
        "displayName": "IE-ADM",
        "id": "fc:org:ntnu.no:unit:630100",
        "type": "fc:orgunit",
        "membership": {
            "basic": "member",
            "primaryOrgUnit": False
        },
        "parent": "fc:org:ntnu.no",
        "public": False
    },
    {
        "displayName": "Kunstig intelligens",
        "id": "fc:fs:fs:str:ntnu.no:MIT-KI",
        "type": "fc:fs:str",
        "parent": "fc:org:ntnu.no",
        "membership": {
            "basic": "member",
            "displayName": "Student",
            "fsroles": [
                "STUDENT"
            ],
            "active": True
        }
    },
    {
        "displayName": "Introduksjon til kunstig intelligens ",
        "id": "fc:fs:fs:emne:ntnu.no:TDT4136:1",
        "type": "fc:fs:emne",
        "parent": "fc:org:ntnu.no",
        "membership": {
            "displayName": "Student",
            "basic": "member",
            "fsroles": [
                "STUDENT"
            ],
            "active": True,
            "subjectRelations": "undervisning",
            "notAfter": "2016-12-14T23:00:00Z"
        }
    },
    {
        "displayName": "Kunstig intelligens programmering",
        "id": "fc:fs:fs:emne:ntnu.no:IT3105:1",
        "type": "fc:fs:emne",
        "parent": "fc:org:ntnu.no",
        "membership": {
            "displayName": "Student",
            "basic": "member",
            "fsroles": [
                "STUDENT"
            ],
            "active": True,
            "subjectRelations": "undervisning",
            "notAfter": "2017-12-14T23:00:00Z"
        }
    },
    {
        "url": "http://www.ntnu.no/studier/mit",
        "id": "fc:fs:fs:prg:ntnu.no:MIT",
        "type": "fc:fs:prg",
        "displayName": "Informatikk - masterstudium",
        "membership": {
            "basic": "member",
            "displayName": "Student",
            "fsroles": [
                "STUDENT"
            ],
            "active": True
        },
        "parent": "fc:org:ntnu.no"
    },

    {
        "displayName": "Masteroppgave i informatikk: Kunstig intelligens",
        "id": "fc:fs:fs:emne:ntnu.no:IT3903:1",
        "type": "fc:fs:emne",
        "parent": "fc:org:ntnu.no",
        "membership": {
            "basic": "member",
            "displayName": "Student",
            "fsroles": [
                "STUDENT"
            ],
            "active": True
        }
    },

]

LDAPGroupsResponse = [
        "idi_masterplassadmin",
        "fs_student_ntnu"
]
