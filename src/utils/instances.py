from src.config import DB
from pymongo import MongoClient
from src.models.invoice_model import create_collections

uri = f"mongodb://{DB.HOST}:{DB.PORT}/"
client = MongoClient(uri)
db = client[DB.NAME]
create_collections(db)
