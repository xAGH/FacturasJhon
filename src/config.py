from os import getenv

class DB():
    HOST = getenv("DB_HOST")
    NAME = getenv("DB_NAME")
    PORT = int(getenv("DB_PORT"))

class APP():
    HOST = getenv("APP_HOST", "localhost")
    PORT = int(getenv("APP_PORT", 3000))
    DEBUG = bool(getenv("APP_DEBUG", True))
    CORS = getenv("CORS_ORIGIN", "localhost:4200")
    DATE_FORMAT = '%Y-%m-%d'
    SECRET_KEY = getenv("APP_SECRET_KEY", "secret")