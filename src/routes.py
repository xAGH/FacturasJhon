from src.controllers.invoices_controller import InvoicesController

routes = {
    "invoices": "/", "invoices_controller": InvoicesController.as_view("invoices")
}