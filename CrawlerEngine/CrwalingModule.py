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

def ahmia(searchString):
    result = []
    url = EgineList['ahmia'] + "/search/?q={}"
    response = requests.get(url.format(quote(searchString)), proxies=proxies, headers=header())
    soup = BeautifulSoup(response.text, 'html5lib')
    result = get_link(soup)

def get_link(result):
    for r in result.select('li.result h4'):
            name = clear(r.get_text())
            link = r.find('a')['href'].split('redirect_url=')[1]
            print(link)

def phobos(searchString):
    result = []
    url = EgineList['phobos'] + "/search?query={}&p={}"
    max_nb_page = 14
    f = open(searchString+".txt", "w")
    result = []

    with requests.Session() as s:
        s.proxies = proxies
        s.headers = header()
        s.proxies.update(proxies)
        resp = s.get(url.format(quote(searchString), 1), headers=header())
        soup = BeautifulSoup(resp.text, 'html5lib')
        print(resp)
        page_number = 1
        pages = soup.find("div", attrs={"class": "pages"}).find_all('a')
        if pages is not None:
            for i in pages:
                page_number = int(i.get_text())
            if page_number > max_nb_page:
                page_number = max_nb_page
        for n in range(2, page_number + 1):
            resp = s.get(url.format(quote(searchString), n), headers=header())
            soup = BeautifulSoup(resp.text, 'html5lib')
            for r in soup.select('.serp .titles'):
                name = clear(r.get_text())
                link = clear(r['href'])
                print(""+name+"\n\tlink:"+link)
                result.append("name:"+name+"\"link:"+link+"\n")
                f.write("name:"+name+"\tlink:"+link+"\n")
        return result


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
    '''try:
        with requests.Session() as s:
            s.proxies = proxies
            s.headers = header()
            s.proxies.update(proxies)
            resp = s.get(url, headers=header())
            soup = BeautifulSoup(resp.text, 'html5lib')
            #f.write(resp.text)
            time.sleep(0.1)
            return resp.text
    except:
        print("Connection Error")
        return None
    #f.close()
'''

def process_browser_logs_for_network_events(logs):
    """
    Return only logs which have a method that start with "Network.response", "Network.request", or "Network.webSocket"
    since we're interested in the network events specifically.
    """
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

def childUrl(respText, url, pid):
    soup = BeautifulSoup(respText, 'html5lib')
    for a in soup.find_all('a', href=True):
        data = a['href']
        if "http://" in data and ".onion" in data:
            ChildCrawling(data, url, pid)
            print("Found the URL:", data)


#GetResource(r"http://olivq73nea2cnwdtgrt2urxhw7ub3eigxl2wrca2k3b2davfakai7zqd.onion/drugs")
#1651924936222
#phobos("buy drug")
#CrawlerBot = Crawler()
#CrawlerBot.ScreenShot("capture.png",r"http://olivq73nea2cnwdtgrt2urxhw7ub3eigxl2wrca2k3b2davfakai7zqd.onion/drugs")
#ScreenShot("capture2.png",r"http://tdef74zmruajphutbzuqlxzpi5btckiypgpfmug6bl235e4mn6xarvad.onion/tdwj/hackers-sell-best-australian-financial-data-on-dark-web/")

def ChildCrawling(target, parents, pid):
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
        "parentUrl": parents,
        "is_analyzed": False,
        "traffic": traffic
        "SearchTime": str(time.time())
    }
    DarkDB.insert_item(data)

def Crawling(target):
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
        "parentId": None,
        "parentUrl": None,
        "is_analyzed": False,
        "traffic": traffic
        "SearchTime": str(time.time())
    }
    DarkDB.insert_item(data)
    childUrl(res, target, str(time.time()))

   

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', required=True, help='Test')
    param = parser.parse_args()

    url = param.target

    if url.find("http://") == -1:
        url = "http://"+url

    Crawling(url)


    