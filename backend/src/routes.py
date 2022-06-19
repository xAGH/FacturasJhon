from src.controllers.documents_controller import DocumentsController
from src.controllers.querys_controller import QueryController

routes = {
    "documents": "/create", "documents_controller": DocumentsController.as_view("invoice"),
    "query": "/query", "query_controller": QueryController.as_view("query")
}