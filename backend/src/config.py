from os import getenv

class DB():
    HOST = "localhost" if getenv("APP_MONGO_HOST") is None else getenv("APP_MONGO_HOST") 
    NAME = "invoices"
    PORT = 27017

class APP():
    HOST = "localhost" if getenv("PRODUCTION_ENV") is None else getenv("PRODUCTION_ENV")
    PORT = 3000
    DEBUG = True
    DATE_FORMAT = '%Y-%m-%d'
    CORS_ORIGINS = 'localhost:4200' if getenv("CORS_ORIGINS") is None else getenv("CORS_ORIGINS")
    SECRET = 'secret'