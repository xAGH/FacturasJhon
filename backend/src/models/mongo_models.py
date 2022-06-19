from pymongo import MongoClient

def create_collections(instance: MongoClient):
    try:
        counters(instance)
        invoices(instance)
        budgets(instance)
    except:
        pass

def counters(instance: MongoClient):
    if instance.list_collection_names().count("counter") == 0:
        instance.create_collection("counter")
        instance.counter.insert_many([{'invoice_number': 0}, {'budget_number': 0}])

def invoices(instance: MongoClient):
    if instance.list_collection_names().count("invoices") == 0:
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
                    "expiration_date": {
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

def budgets(instance: MongoClient):
    if instance.list_collection_names().count("budgets") == 0:
        instance.create_collection("budgets", validator={
            '$jsonSchema': {
                'bsonType': 'object',
                'additionalProperties': True,
                'required': ["budget_no", "client_name", "client_phone", "client_document", "client_address", "raw_payment","iva", "total", "date", "works"],
                'properties': {
                    'budget_no': {
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
                    "expiration_date": {
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