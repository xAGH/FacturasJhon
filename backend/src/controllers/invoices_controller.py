from flask.views import MethodView
from flask import jsonify, make_response, request
from src.middlewares.requests_middleware import content_is_json
from src.services.invoice_service import InvoiceService
from src.validators.invoice_validator import InvoiceValidator

class InvoiceController(MethodView):
    
    def __init__(self):
        self.service = InvoiceService()
        self.validator = InvoiceValidator()

    @content_is_json
    def post(self):
        content = request.get_json()
        errors = self.validator.validate(content)
        if errors:
            return make_response(jsonify(dict(response=errors)), 400)
        response, status = self.service.insert(content)
        return make_response(jsonify(response), status)
