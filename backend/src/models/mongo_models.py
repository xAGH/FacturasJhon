from pymongo import MongoClient

def create_collections(instance: MongoClient):
    try:
        counter(instance)
        invoices(instance)
    except:
        pass

def counter(instance: MongoClient):
    if instance.list_collection_names().count("counter") == 0:
        instance.create_collection("counter")
        instance.counter.insert_one({'invoice_number': 0})

def invoices(instance: MongoClient):
    instance.create_collection("invoices", validator={
        '$jsonSchema': {
            'bsonType': 'object',
            'additionalProperties': True,
            'required': ["invoice_no", "client_name", "client_phone", "client_document", "client_address", "raw_payment","iva", "total", "date", "works"],
            'properties': {
                'invoice_no': {
                    'bsonType': 'string'
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