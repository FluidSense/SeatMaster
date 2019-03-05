token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImIwMGE1MDYxYzMxMTQxMjA5Y2RmMjlkYWM3NjYwMTkxMWI2N2M4YWQifQ.eyJpc3MiOiJodHRwczpcL1wvYXV0aC5kYXRhcG9ydGVuLm5vIiwiYXVkIjoiNzdlZTMzY2QtY2M3Zi00YjdhLWJjZTktMjQxYzk2NDU4ZjE0Iiwic3ViIjoiNTVkZTdkNzEtNGEyNS00MTAzLThlNDMtMzVkZjhjMmQ0NzJhIiwiaWF0IjoxNTUxMTgzMTkwLCJleHAiOjE1NTExODY3OTAsImF1dGhfdGltZSI6MTU1MTE4MTYyMX0.L0G7cKUGIoforsRAECsClAKxTqtqCX2QthsQBoZUg1FZAgkDsUivvb1H_RhD-7WrbqAHHvl-hyFD-9qrJth88mjeAoQrpiMGjZNFTKnnLG2NIqXTo9LaHySWLGu30rtswlbua8mbu6R4-3MKGP0sPQriKKU-ngk_6pH93ZNNzBmb8hpDDz5gkzHbhJ1yNhYN2hQ-bvi7tlCBBlyewEw7T-cgKVFN7kBG1p4vf0zcpIiNC9ZgQF8YY6cwTqRUtvkMc88s2GI8E-qiq8YODaD4CPjqvhwHPZotf3J_yFPVLYRuZ8LKjl6QWqvDWqjam_pSFU-XOMDj2gF1-WZhUSUD8A"  # noqa: E501

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
