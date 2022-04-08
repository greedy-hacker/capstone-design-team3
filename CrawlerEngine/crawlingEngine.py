import argparse
import requests
import time
import signal
import base64
import os

import dbModel

from selenium import webdriver
from bs4 import BeautifulSoup
from urllib.parse import quote
from bson.binary import Binary
from PIL import Image

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



def crawler(select, domain, url):
    domain = domain.replace(" ", "")
    domain = domain.replace("/", "")
    #f = open("data//"+select+".txt", "x")
    try:
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


#phobos("buy drug")
#phobos("Credit Card")
#f = open('hacking.txt', "r")
'''
i = 0;
for l in f.readlines():
    do = l.split("name:")[1].split("\t")[0]
    urls = l.split("link:")[1]
    print(do+"\n"+urls)
    crawler("hacking//"+str(i), do, urls)
    i += 1
'''
#CrawlerBot = Crawler()
#CrawlerBot.ScreenShot("capture.png",r"http://olivq73nea2cnwdtgrt2urxhw7ub3eigxl2wrca2k3b2davfakai7zqd.onion/drugs")
#ScreenShot("capture2.png",r"http://tdef74zmruajphutbzuqlxzpi5btckiypgpfmug6bl235e4mn6xarvad.onion/tdwj/hackers-sell-best-australian-financial-data-on-dark-web/")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', required=True, help='Test')
    param = parser.parse_args()
    DarkDB = dbModel.DBHandler()
    try:
        if not os.path.exists("data//"+param.target):
            os.makedirs("data//"+param.target)
    except OSError:
        print ('Error: Creating directory. ' +  "data//"+param.target)

    crawlResult = phobos(param.target)
    i = 0
    for l in crawlResult:
        do = l.split("name:")[1].split("\"")[0]
        urls = l.split("link:")[1]
        print(do+"\n"+urls)
        res = crawler(param.target+"//"+str(i), do, urls)
        if res == None:
            continue
        ScreenShot("data//"+param.target+"//"+str(i)+".png", urls)
        img = open("data//"+param.target+"//"+str(i)+".png", "rb").read()
        data = {
            "url": urls,
            "raw": res,
            "image": base64.b64encode(img).decode('utf-8'),
            "parentId": None,
            "parentUrl": None,
            "is_analyzed": False
        }
        DarkDB.insert_item(data)
        i += 1

