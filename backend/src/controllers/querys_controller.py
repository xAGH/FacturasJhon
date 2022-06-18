from flask import jsonify, make_response, request
from flask.views import MethodView
from src.utils.instances import db
import re

class QueryController(MethodView):

    def __init__(self):
        pass

    def get(self, doc_type):
        doc_types = ["invoice", "budget"]
        if doc_type not in doc_types:
            return make_response(jsonify(dict(response="Invalid doc_type")), 400)
        
        pass