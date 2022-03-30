import csv
import glob
from functools import reduce
from typing import List
import process
from classification_and_parsing import analyze
from classification_and_parsing.external_service import collect_db
from classification_and_parsing.external_service.web_server import upload_one_data


def retrieve_file_paths() -> List[str]:
    return glob.glob('raw-data/sample/*')


def main_legacy():
    paths = retrieve_file_paths()

    results = []
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
            result = analyze.analyze_html(html)
            results.append(result)
            wr.writerow(result.values())
            idx += 1
    f.close()


def execute_tasks():
    docs = collect_db.get_new_data()
    for doc in docs:
        html = doc['<raw html field name>']
        result = analyze.analyze_html(html)

        send_data = {
            'title': doc.title,
            'reference_url': doc.reference_url,
            'screenshot': doc.screenshot,
            **result
        }
        success = upload_one_data(send_data)
        if success:
            collect_db.update_is_analyzed(doc['_id'])


def main():
    execute_tasks()


if __name__ == '__main__':
    main()
