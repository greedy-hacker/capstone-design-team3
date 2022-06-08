import urllib.parse
from pymongo import MongoClient

class DBHandler:
    def __init__(self):
        self.client = MongoClient('mongodb://CapTeam3:'+urllib.parse.quote("Te@m3C@p")+'@127.0.0.1:27017')
    def insert_item2(self, data, db_name="DarkWebs", collection_name="DarkwebResult"):
        db = self.client[db_name]
        collection = db[collection_name]
        result = collection.insert_one(data)
        return result
    def insert_item(self, data, db_name="DarkDatas", collection_name="data"):
        db = self.client[db_name]
        collection = db[collection_name]
        result = collection.insert_one(data)
        return result

    def find_item(self, url, db_name="DarkWebs", collection_name="DarkwebResult"):
        query = {"url": url}
        db = self.client[db_name]
        collection = db[collection_name]
        result = collection.find(query)

        if not list(result):
            print(list(result))
            return True
        else:
            return False

    def UploadFile():
        pass
