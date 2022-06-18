from src.utils.instances import db

class InvoiceService:

    def insert(self, data):       
        # Setting IVA to 21%
        IVA = 0.21

        # Generating work total. This is the multiplication of price and quantity.
        works = data["works"]
        for work in range(len(works)):
            work = works[work]
            work["total"] = float(work["price"] * work["quantity"])

        # Generating raw_payment and IVA
        data["raw_payment"] = round(float(sum(work["total"] for work in data["works"])), 2)
        data["iva"] = round(float(data["raw_payment"] * IVA), 2)
        # Generating total
        data["total"] = round(float(data["raw_payment"] + data["iva"]), 2)

        # Getting current invoice number
        current_invoice_number = db.counter.find_one(sort=[("invoice_number", -1)])["invoice_number"]
        # Updating counter
        db.counter.update_one({"invoice_number": current_invoice_number}, {"$set": {"invoice_number": current_invoice_number+1}})
        
        # Formatting invoice number
        current_invoice_number += 1
        current_invoice_number = "FAC-{0}".format(str(current_invoice_number).zfill(4))
        # Setting current invoice number
        data["invoice_no"] = current_invoice_number
        # Inserting data into database
        try:
            db.invoices.insert_one(data)
            data.pop("_id")
            return (
                {
                    "response": data
                },
                200
            )

        except Exception as e:
            # If the insertion fails, the counter is updated to the previous value
            db.counter.update_one({"invoice_number": current_invoice_number}, {"$set": {"invoice_number": current_invoice_number-1}})
            return (
                {
                    "response": f"Error al insertar factura, contacte a Alejo. {str(e)}"
                },
                200
            )