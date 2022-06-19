from threading import currentThread
from src.utils.instances import db

class DocumentService:

    def create(self, data):       
        # Setting IVA to 21%
        IVA = 0.21

        # Generating work total. This is the multiplication of price and quantity.
        works = data["works"]
        for work in range(len(works)):
            work = works[work]
            work["price"] = float(work["price"])
            work["total"] = work["price"] * work["quantity"]

        # Generating raw_payment and IVA
        data["raw_payment"] = float(round(sum(work["total"] for work in data["works"]), 2))
        data["iva"] = float(round(data["raw_payment"] * IVA, 2))
        # Generating total
        data["total"] = float(round(data["raw_payment"] + data["iva"], 2))
        # Getting current invoice number
        doc_type = data.pop("doc_type")
        if doc_type == "invoice":
            current_invoice_number: int = db.counter.find_one(sort=[("invoice_number", -1)])["invoice_number"]
            # Updating counter
            db.counter.update_one({"invoice_number": current_invoice_number}, {"$set": {"invoice_number": current_invoice_number+1}})
            # Formatting invoice number
            current_invoice_number += 1
            current_invoice_number = "FAC-{0}".format(str(current_invoice_number).zfill(3))
            # Setting current invoice number
            data["invoice_no"] = current_invoice_number
            # Inserting data into database
            db.invoices.insert_one(data)

        else:
            current_budget_number: int = db.counter.find_one(sort=[("budget_number", -1)])["budget_number"]
            # Updating counter
            db.counter.update_one({"budget_number": current_budget_number}, {"$set": {"budget_number": current_budget_number+1}})
            # Formatting budget number
            current_budget_number += 1
            current_budget_number = "PRE-{0}".format(str(current_budget_number).zfill(3))
            # Setting current budget number
            data["budget_no"] = current_budget_number
            # Inserting data into database
            db.budgets.insert_one(data)

        data.pop("_id")
        return (
            {
                "response": data
            },
            200
        )
