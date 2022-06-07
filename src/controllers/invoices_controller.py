from flask.views import MethodView
from flask import jsonify, make_response, redirect, request, render_template, session, url_for
from src.services.invoice_service import InvoiceService
from src.validators.invoice_validator import InvoiceValidator

class InvoicesController(MethodView):
    
    def __init__(self):
        self.validator = InvoiceValidator()
        self.service = InvoiceService()

    def post(self):
        content = request.form.to_dict()
        works = []
        work_count = 1
        while True:
            if not content.get(f"concept{work_count}"):
                break;
            works.append({
                'concept': content.get(f"concept{work_count}"),
                'price': content.get(f"price{work_count}"),
                'quantity': content.get(f"quantity{work_count}"),
                'total': ((float(content.get(f"price{work_count}")) * (int(content.get(f"quantity{work_count}")))))
            })
            content.pop(f"concept{work_count}")
            content.pop(f"price{work_count}")
            content.pop(f"quantity{work_count}")
            work_count += 1
        content["works"] = works
        errors = self.validator.validate(content)
        if errors:
            return redirect(url_for("invoices"))
        return "Ok"

    def get(self):
        return render_template("generate_invoice.html") 