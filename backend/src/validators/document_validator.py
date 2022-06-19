from marshmallow import fields, Schema, validate
from src.config import APP

class DocumentValidator(Schema):

    doc_type = fields.String(required=True, validate=validate.OneOf(["invoice", "budget"]))
    client_name = fields.String(required=True, validate=validate.Length(min=1, max=40))
    client_phone = fields.String(required=True, validate=validate.Length(min=1, max=20))
    client_document = fields.String(required=True, validate=validate.Length(min=1, max=20))
    client_address = fields.String(required=True, validate=validate.Length(min=1, max=100))
    date = fields.DateTime(format=APP.DATE_FORMAT, required=True)
    expiration_date = fields.DateTime(format=APP.DATE_FORMAT, required=True)
    works = fields.List(fields.Nested({
        'concept': fields.String(required=True, validate=validate.Length(min=1, max=20)),
        'price': fields.Decimal(required=True),
        'quantity': fields.Integer(required=True)
    }), required=True, validate=validate.Length(min=1))