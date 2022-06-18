from src.controllers.invoices_controller import InvoiceController
from src.controllers.querys_controller import QueryController

routes = {
    "invoice": "/create/invoice", "invoice_controller": InvoiceController.as_view("invoice"),
    "query": "/query/<doc_type>", "query_controller": QueryController.as_view("query")
}