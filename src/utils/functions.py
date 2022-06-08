from datetime import datetime
from src.config import APP

def get_datetime():
    return datetime.now().strftime(APP.DATE_FORMAT)