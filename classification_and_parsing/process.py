import re
from typing import List, Dict

from bs4 import BeautifulSoup
from nltk.corpus import stopwords

from category import adult, drug, leak, gambling, weapon, murder, hacking
import fasttext


def get_title(html: str) -> str:
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.find('title')
    return title.text


model = fasttext.load_model('lid.176.ftz')


def get_language(html: str) -> List[str]:
    soup = BeautifulSoup(html, 'html.parser')
    body = soup.find('body')
    for script in body(["script", "style"]):
        script.decompose()

    text = body.get_text()
    text = text.replace('\n', ' ')

    lang = 'unknown'

    langs, ratio = model.predict(text, k=1)
    if ratio[0] > 0.1:
        lang = langs[0]

    lang = lang.replace('__label__', '')

    return lang


# for en
def get_words(html: str) -> List[str]:
    stop_words = set(stopwords.words('english'))
    soup = BeautifulSoup(html, 'html.parser')
    body = soup.find('body')
    for script in body(["script", "style"]):
        script.decompose()
    text = body.get_text()
    symbols = '''!@#$%^&*()-+={[}]|\;:"‘'·<>?/.,'''
    symbols += '–≈'
    symbols += '01234556789'
    for i in range(len(symbols)):
        text = text.replace(symbols[i], ' ')

    lines = [line.strip() for line in text.splitlines() if line.strip() != '']
    words = [word.strip().lower() for line in lines for word in line.split()]
    words = [word for word in words if word not in stop_words and len(word) > 1]
    return words


# for en
def get_category(words: List[str]) -> Dict[str, int]:
    adult_count = 0
    hacking_count = 0
    drug_count = 0
    gambling_count = 0
    # leak_count = 0
    weapon_count = 0
    murder_count = 0
    for word in words:
        if word in adult:
            adult_count += 1
        if word in hacking:
            hacking_count += 1
        if word in drug:
            drug_count += 1
        if word in gambling:
            gambling_count += 1
        # if word in leak:
        #     leak_count += 1
        if word in weapon:
            weapon_count += 1
        if word in murder:
            murder_count += 1
    return {'adult': adult_count, 'hacking': hacking_count, 'drug': drug_count, 'gambling': gambling_count,
            'weapon': weapon_count, 'murder': murder_count}


def get_site_tracking_codes(html: bytes) -> Dict[str, List[str]]:
    google_analytics = re.compile(r'UA-\d+-\d+')
    google_site_verification1 = re.compile(r'<meta\s+name="google-site-verification"\s+content="([^"]+)"\s+/>')
    google_site_verification2 = re.compile(r'<meta\s+content="([^"]+)"\s+name="google-site-verification"\s+/>')
    gsv = google_site_verification1.findall(html)
    gsv += google_site_verification2.findall(html)
    return {
        'google_analytics': google_analytics.findall(html),
        'google_site_verification': gsv
    }


def get_personal_information(html: bytes) -> Dict[str, List[str]]:
    email = re.compile(r'[0-9a-zA-Z-_.]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}')
    phone = re.compile(r'01[0-9]-[0-9]{3,4}-[0.9]{4}')

    return {
        'email': email.findall(html),
        'phone': phone.findall(html),
    }


def get_others(html: bytes) -> Dict[str, List[str]]:
    telegram = re.compile(r'https?://(?:t(?:elegram)?.me|telegram.org)/(?:joinchat/)?(?:[a-zA-Z0-9_]{5,32})')
    bitcoin = re.compile(r'(?:[^a-zA-Z0-9]|\s|^)((?:[13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34})(?:[^a-zA-Z0-9]|\s|$)')
    return {
        'telegram': telegram.findall(html),
        'bitcoin': bitcoin.findall(html)
    }
