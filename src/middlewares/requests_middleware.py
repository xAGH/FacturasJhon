from flask import make_response, request, jsonify

def content_is_json(fun):
    def wrapped(*args, **kwargs):

        no_json = make_response(jsonify({
            "response": "Send a json format"
        }), 400)

        return fun(*args, **kwargs) if request.is_json else no_json

    return wrapped
