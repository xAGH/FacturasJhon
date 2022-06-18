from src.config import APP
from flask import Flask
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
        cls.app.template_folder = 'views/templates'
        cls.app.static_folder = 'views/static'
        cls.__register_routes()

    @classmethod
    def __register_routes(cls):
        cls.app.add_url_rule(routes["invoice"], view_func=routes["invoice_controller"], methods=["GET", "POST"])
        cls.app.add_url_rule(routes["query"], view_func=routes["query_controller"], methods=["GET", "POST"])
        
        @cls.app.errorhandler(404)
        def page_not_found(e):
            return "404", 404