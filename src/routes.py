from src.controllers.invoices_controller import InvoicesController, InvoicesQueryController

routes = {
    "invoices": "/invoices/create", "invoices_controller": InvoicesController.as_view("invoices"),
    "invoice_query": "/invoices/query", "invoice_query_controller": InvoicesQueryController.as_view("invoice_query")
}