import csv
import glob
from typing import List
import process


def retrieve_file_paths() -> List[str]:
    return glob.glob('raw-data/sample/*')


def main():
    paths = retrieve_file_paths()
    print(paths)

    result = []
    idx = 0

    f = open('result/test.csv', 'w', encoding='utf-8-sig', newline='')
    wr = csv.writer(f)
    wr.writerow(['title', 'language', 'category', 'site tracking code', 'personal information', 'others'])

    for path in paths:
        # print('===========================================')
        # print(path)
        with open(path, 'rb') as f:
            html = f.read()
            if html == b'':
                # print('No Content')
                continue
            title = process.get_title(html)
            lang = process.get_language(html)
            words = []
            if '__label__en' in lang:
                words = process.get_words(html)
            category = ''
            if '__label__en' in lang:
                category = process.get_category(words)
            site_tracking_codes = process.get_site_tracking_codes(html)
            personal_information = process.get_personal_information(html)
            others = process.get_others(html)
            # print('title: ', title)
            # print('lang: ', lang)
            # print('words: ', words)
            # print('category: ', category)
            # print('site_tracking_codes: ', site_tracking_codes)
            # print('personal_information: ', personal_information)
            # print('others: ', others)
            result.append({
                'id': idx,
                'title': title,
                'lang': lang,
                'words': words,
                'category': category,
                'site_tracking_code': site_tracking_codes,
                'personal_information': personal_information,
                'others': others
            })
            wr.writerow([title, lang, category, site_tracking_codes, personal_information, others])
            idx += 1
    print(result)
    f.close()


if __name__ == '__main__':
    main()
