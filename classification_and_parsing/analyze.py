from functools import reduce

import process


def analyze_html(html:str):
    title = process.get_title(html)
    lang = process.get_language(html)
    words = []
    words = process.get_words(html)
    category = 'unknown'
    count = 0
    candidates = process.get_category(words)
    print (candidates)
    for key,value in candidates.items():
        if value >= 10 and value > count:
            count = value
            category = key

    site_tracking_codes = process.get_site_tracking_codes(html)
    personal_information = process.get_personal_information(html)
    others = process.get_others(html)

    return {
        'title': title,
        'language': lang,
        'category': category,
        'site_tracking_code': site_tracking_codes,
        'personal_information': personal_information,
        'others': others
    }
