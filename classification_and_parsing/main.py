import csv
import glob
from functools import reduce
from typing import List
import process
import analyze
from external_service import collect_db
from external_service import web_server


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
    docs = list(collect_db.get_new_data(10))

    n_docs = len(docs)
    if n_docs == 0:
        print('no data to be analyzed')
        return

    id_list = []

    f = open('./tmp/analyzed.csv', 'w', encoding='utf-8-sig', newline='\n')
    wr = csv.writer(f)
    wr.writerow(['url', 'title', 'language', 'category', 'site_tracking_codes', 'personal_information', 'others', 'reference_url'])
    for doc in docs:
        html = doc['raw']

        result = analyze.analyze_html(html)
        if result is None:
            continue

        analyzed = {
            'url': doc['url'].replace('\n', ''),
            'title': result['title'],
            'language': result['language'],
            'category': result['category'],
            'site_tracking_code': result['site_tracking_code'],
            'personal_information': result['personal_information'],
            'others': result['others'],
            'reference_url': doc['parentUrl'] or '',
        }
        wr.writerow(analyzed.values())
        id_list.append(doc['_id'])
    f.close()
    success = web_server.upload_data('./tmp/analyzed.csv')
    if success:
        print('success')
        collect_db.update_is_analyzed(id_list)
    return
        

        



def main():
    execute_tasks()


if __name__ == '__main__':
    main()
