from datetime import datetime
DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'

def get_datetime():
    return datetime.now().strftime(DATETIME_FORMAT)