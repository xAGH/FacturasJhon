from flask import jsonify, make_response, request

def content_is_json(f):
    def wrap_validation(*args, **kwargs):
        if request.content_type != 'application/json':
            return make_response(jsonify(dict(response='Invalid content type')), 415)
        return f(*args, **kwargs)
    return wrap_validation