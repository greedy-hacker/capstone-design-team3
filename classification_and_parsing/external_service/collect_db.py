from pymongo import MongoClient
from urllib import parse
import os
from dotenv import load_dotenv

load_dotenv(verbose=True)

db_host = os.getenv('COLLECT_DB_HOST')
db_port = os.getenv('COLLECT_DB_PORT')
db_id = os.getenv('COLLECT_DB_ID')
db_pw = os.getenv('COLLECT_DB_PASSWORD')
db_name = os.getenv('COLLECT_DB_DATABASE_NAME')
collection_name = os.getenv('COLLECT_DB_COLLECTION_NAME')

print (db_pw)
db_url = f'mongodb://{db_id}:{parse.quote(db_pw)}@{db_host}:{db_port}'
mongo_client = MongoClient(db_url)
db = mongo_client[db_name]
collection = db[collection_name]

def get_test_data():
    return collection.find_one()

def get_new_data(n_row = 10):
    query = {'is_analyzed': False}

    documents = collection.find(query).limit(n_row)
    return documents


def update_is_analyzed(_ids):
    find_query = {'_id': {'$in': _ids}}
    update_query = {'$set':{'is_analyzed': True}}

    collection.update_many(find_query, update_query)
