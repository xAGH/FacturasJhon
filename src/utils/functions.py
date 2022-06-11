from datetime import datetime
from src.config import APP

def get_datetime():
    return datetime.now().strftime(APP.DATE_FORMAT)

def format_date(date):
    date_split = date.split("-")
    months = {
            "01": "Enero",
            "02": "Febrero",
            "03": "Marzo",
            "04": "Abril",
            "05": "Mayo",
            "06": "Junio",
            "07": "Julio",
            "08": "Agosto",
            "09": "Septiembre",
            "10": "Octubre",
            "11": "Noviembre",
            "12": "Diciembre"
    }
    return "{0} de {1} del {2}".format(date_split[2], months.get(date_split[1]), date_split[0])