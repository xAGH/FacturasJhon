from datetime import datetime
from flask import jsonify, make_response, redirect, render_template, url_for
from src.utils.instances import db
from src.config import APP
from src.utils.functions import format_date
from jwt import encode

class InvoiceService:
    def __init__(self):
        pass

    def insert(self, data):       
        # Setting IVA to 21%
        IVA = 0.21
        # Generating work total. This is the multiplication of price and quantity.
        for work in range(len(data["works"])):
            data["works"][work]["total"] = data["works"][work]["price"] * data["works"][work]["quantity"]
        # Generating raw_payment and IVA
        data["raw_payment"] = sum(work["total"] for work in data["works"])
        data["iva"] = data["raw_payment"] * IVA
        # Generating total
        data["total"] = data["raw_payment"] + data["iva"]

        # Getting current invoice number
        current_invoice_number = db.counter.find_one(sort=[("invoice_number", -1)])["invoice_number"]
        # Updating counter
        db.counter.update_one({"invoice_number": current_invoice_number}, {"$set": {"invoice_number": current_invoice_number+1}})
        
        # Formatting invoice number
        current_invoice_number += 1
        current_invoice_number = "FAC{0}".format(str(current_invoice_number).zfill(4))
        # Setting current invoice number
        data["invoice_no"] = current_invoice_number
        
        # Inserting data into database and returning pdf
        inserted = db.invoices.insert_one(data)
        data.pop("_id")
        data['doc_type'] = "Factura"
        return self.generate_pdf(data)

    def generate_pdf(self, data):
        data['date'] = format_date(data['date'])
        data['genPDF'] = True
        data = str(encode(data, APP.SECRET, algorithm='HS256'))
        return redirect(url_for('invoices', data=data))
