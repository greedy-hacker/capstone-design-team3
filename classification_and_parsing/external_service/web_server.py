import json
import requests
import os
from dotenv import load_dotenv

load_dotenv(verbose=True)

upload_url = os.getenv('WEB_SERVER_UPLOAD_URL')


def upload_one_data(data):
    headers = {'Content-Type': 'application/json', 'charset': 'UTF-8', 'Accept': '*/*'}
    try:
        requests.post(server_url, headers=headers, data=json.dumps(data))
        return True
    except:
        # Todo: logging
        return False


def upload_data(file_path):
    try:
        files = {'file': ('analyzed.csv', open(file_path, 'rb'), 'text/csv')}
        r = requests.post(upload_url, files=files)
        print(r.content)
        r.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:  # This is the correct syntax
        raise SystemExit(e)
