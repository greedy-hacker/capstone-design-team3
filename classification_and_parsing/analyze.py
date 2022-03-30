from functools import reduce

from classification_and_parsing import process


def analyze_html(html: bytes):
    title = process.get_title(html)
    lang = process.get_language(html)
    words = []
    if '__label__en' in lang:
        words = process.get_words(html)
    category = ''
    if '__label__en' in lang:
        category = reduce(lambda acc, cur: cur if cur[1] > acc[1] else acc, process.get_category(words).items(),
                          ('', 0))[0]
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
