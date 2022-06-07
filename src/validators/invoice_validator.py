from marshmallow import fields, Schema, validate

class InvoiceValidator(Schema):

    client_name = fields.String(required=True, validate=validate.Length(min=1, max=20))
    client_phone = fields.String(required=True, validate=validate.Length(min=1, max=20))
    client_document = fields.String(required=True, validate=validate.Length(min=1, max=20))
    works = fields.List(fields.Nested({
        'concept': fields.String(required=True, validate=validate.Length(min=1, max=20)),
        'price': fields.Decimal(required=True),
        'quantity': fields.Integer(required=True),
        'total': fields.Decimal(required=True),
    }), required=True, validate=validate.Length(min=1))
