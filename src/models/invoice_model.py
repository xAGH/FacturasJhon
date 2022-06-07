from pymongo import MongoClient

def create_collections(instance: MongoClient):
    try:
        invoices(instance)
    except:
        pass

def invoices(instance: MongoClient):
    instance.create_collection("invoices", validator={
        '$jsonSchema': {
            'bsonType': 'object',
            'additionalProperties': True,
            'required': ["invoice_no", "payment", "iva", "total", "client_name", "client_phone", "client_document", "works"],
            'properties': {
                'invoice_no': {
                    'bsonType': 'string'
                },
                'payment':{
                    'bsonType': 'double',
                },
                'iva': {
                    'bsonType': 'double',
                },
                'total': {
                    'bsonType': 'double',
                },
                'client_name': {
                    'bsonType': 'string',
                },
                'client_phone': {
                    'bsonType': 'string',
                },
                'client_document': {
                    'bsonType': 'string',
                },
                'works': {
                    'bsonType': 'array',
                    'minItems': 1,
                    'items': {
                        'bsonType': 'object',
                        'additionalProperties': False,
                        'required': ['concept', 'price', 'quantity', 'total'],
                        'properties': {
                            'concept': {
                                'bsonType': 'string',
                            },
                            'price': {
                                'bsonType': 'double',
                            },
                            'quantity': {
                                'bsonType': 'int',
                            },
                            'total': {
                                'bsonType': 'double',
                            },
                        }
                    }
                }
            }
        }
    })