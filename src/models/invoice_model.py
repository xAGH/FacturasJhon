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
            'required': ["client_name", "client_phone", "client_document", "client_address", "raw_payment","iva", "total", "date", "works"],
            'properties': {
                'client_name': {
                    'bsonType': 'string',
                },
                'client_phone': {
                    'bsonType': 'string',
                },
                'client_document': {
                    'bsonType': 'string',
                },
                'client_address': {
                    'bsonType': 'string',
                },
                'raw_payment': {
                    'bsonType': 'double',
                },
                'iva': {
                    'bsonType': 'double',
                },
                'total': {
                    'bsonType': 'double',
                },
                "date": {
                    "bsonType": "string",
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