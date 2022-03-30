from pymongo import MongoClient

db_url = '<DB_URL>'
db_name = '<db_name>'
mongo_client = MongoClient(db_url)
db = mongo_client[db_name]
crawling_collection = db['<collection_name']


def get_new_data():
    query = {'is_analyzed': False}

    documents = crawling_collection.find(query)
    return documents


def update_is_analyzed(_id: str):
    find_query = {'_id': _id}
    update_query = {'is_analyzed': True}

    crawling_collection.update_one(find_query, update_query)
