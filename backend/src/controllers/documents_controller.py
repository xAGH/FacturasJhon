from flask.views import MethodView
from flask import jsonify, make_response, request
from src.middlewares.requests_middleware import content_is_json
from src.services.document_service import DocumentService
from src.validators.document_validator import DocumentValidator

class DocumentsController(MethodView):
    
    def __init__(self):
        self.validator = DocumentValidator()
        self.service = DocumentService()

    @content_is_json
    def post(self):
        content = request.get_json()
        errors = self.validator.validate(content)
        if errors:
            return make_response(jsonify(dict(response=errors)), 400)
        response, status = self.service.create(content)
        return make_response(jsonify(response), status)
