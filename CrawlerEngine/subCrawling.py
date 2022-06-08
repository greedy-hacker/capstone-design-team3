import argparse
import requests
import time
import signal
import base64
import os
import pprint
import boto3
import dbModel
import pandas as pd

from time import sleep
from selenium import webdriver
from bs4 import BeautifulSoup
from urllib.parse import quote
from bson.binary import Binary
from PIL import Image
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities



#proxies = {
#        'http': 'socks5://127.0.0.1:9050',
#        'https': 'socks5://127.0.0.1:9050'
#}

proxies = {'http': 'socks5h://127.0.0.1:9050', 'https': 'socks5h://127.0.0.1:9050'}

ENGINES = {
        "ahmia": "http://msydqstlz2kzerdg.onion",
        "phobos": "http://phobosxilamwcg75xt22id7aywkzol6q6rfl2flipcqoc4e4ahima5id.onion",
        "darksearchio": "http://darksearch.io",
        "onionSearchEngine": "https://onionsearchengine.com/search.php?",
}

EgineList = ENGINES

HTTPHEADER = 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0'

def clear(toclear):
    str = toclear.replace("\n", " ")
    str = ' '.join(str.split())
    return str

def header():
    return {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'}


def ScreenShot(filename, url):
    service_args = [
    '--proxy=127.0.0.1:9050',
    '--proxy-type=socks5',
    ]
    driver = webdriver.PhantomJS(service_args=service_args, executable_path=r"phantomjs-2.1.1-linux-x86_64/bin/phantomjs")
    driver.set_script_timeout(30)
    driver.set_window_size(1280, 995)
    driver.get(url)
    driver.save_screenshot(filename)
    driver.service.process.send_signal(signal.SIGTERM)
    driver.quit()



def crawler(url):
    with requests.Session() as s:
        s.proxies = proxies
        s.headers = header()
        s.proxies.update(proxies)
        resp = s.get(url, headers=header())
        soup = BeautifulSoup(resp.text, 'html5lib')
        print(type(soup))
        #f.write(resp.text)
        time.sleep(0.1)
        return resp.text

def process_browser_logs_for_network_events(logs):
    for entry in logs:
        log = json.loads(entry["message"])["message"]
        if (
                "Network.response" in log["method"]
                or "Network.request" in log["method"]
                or "Network.webSocket" in log["method"]
        ):
            yield log    

def GetResource(url):
    capabilities = DesiredCapabilities.PHANTOMJS
    capabilities["loggingPrefs"] = {"performance": "ALL"}    
    service_args = [
    '--proxy=127.0.0.1:9050',
    '--proxy-type=socks5',
    ]
    driver = webdriver.PhantomJS(service_args=service_args, executable_path=r"phantomjs-2.1.1-linux-x86_64/bin/phantomjs", desired_capabilities=capabilities)
    driver.set_script_timeout(4)
    driver.set_window_size(1280, 995)
    driver.get(url)
    sleep(2)
    output= driver.get_log('har')[0].get("message")
    result = "".join(output)
    i = 0
    total = 0
    for step in driver.get_log('har')[0].get("message").split("time\":"):
        if i == 0:
            i += 1
            continue
        total += int(step.split(",")[0])
        i += 1
    return total/i    

def ImgUploader(path):
    s3 = boto3.client("s3")
    now = str(time.time)
    s3.upload_file(path, "darkwebscreenshot", now)
    return now

def Crawling(target, parent, pid):
    DarkDB = dbModel.DBHandler()
    try:
        if not os.path.exists("data//"+target):
            os.makedirs("data//"+target)
    except OSError:
        print ('Error: Creating directory. ' +  "data//"+target)
    
    print(target)
    res = crawler(target)    
    if res == None:
        return
    ScreenShot("data//"+target+"//"+"upload.png", target)
    imageName = ImgUploader("data//"+target+"//"+"upload.png")
    os.remove("data//"+target+"//"+"upload.png")
    traffic = GetResource(target)
    data = {
        "url": target,
        "raw": res,
        "image": imageName,
        "parentId": pid,
        "parentUrl": parent,
        "is_analyzed": False,
        "traffic": traffic
    }
    DarkDB.insert_item(data)
    i += 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', required=True, help='Test')
    parser.add_argument('--parent', required=True, help='Test')
    parser.add_argument('--pid', required=True, help='Test')

    param = parser.parse_args()

    url = param.target
    parent = param.parent
    pid = param.pid

    if url.find("http://") == -1:
        url = "http://"+url

    Crawling(url, parent, pid)