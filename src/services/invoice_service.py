from flask import render_template
from src.utils.instances import db

class InvoiceService:
    def __init__(self):
        pass

    def insert(self, data):
        th = db.invoices.insert_one(data)
        doc = db.invoices.find_one({"_id": th.inserted_id})
        db.invoices.update_one({"_id": th.inserted_id}, {"$set": {"invoice_no": "INV" + str(doc["invoice_no"])}})
        return "ok"