import json

import requests

server_url = '<server_url>'


def upload_one_data(data):
    headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
    try:
        requests.post(server_url, headers=headers, data=json.dumps(data))
        return True
    except:
        # Todo: logging
        return False
