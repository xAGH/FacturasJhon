from src.config import APP
from flask import Flask
from flask_cors import CORS
from src.routes import routes

class Application():

    @classmethod
    def create_app(cls):
        cls.app = Flask(__name__)
        cls.__configure()
        return cls.app

    @classmethod
    def __configure(cls):
        cls.app.config["RUN_CONFIG"] = dict(host=APP.HOST, port=APP.PORT, debug=APP.DEBUG)
        cls.app.config["SECRET_KEY"] = APP.SECRET
        CORS(cls.app, resources={
            r"/*": {
                "origins": [APP.CORS_ORIGINS, "*"]
            }
        }, supports_credentials=True)
        cls.__register_routes()

    @classmethod
    def __register_routes(cls):
        cls.app.add_url_rule(routes["documents"], view_func=routes["documents_controller"], methods=["GET", "POST"])
        cls.app.add_url_rule(routes["query"], view_func=routes["query_controller"], methods=["GET", "POST"])
        
        @cls.app.errorhandler(404)
        def page_not_found(e):
            return "404", 404