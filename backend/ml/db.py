from flask import Flask
from flask_pymongo import pymongo
import os

CONNECTION_STRING = os.environ.get('MONGO_URI')
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('test_db')
sensor_data_collection = pymongo.collection.Collection(db, 'sensor_test')