function generateItem() {

    let parent = document.getElementById('works');
    let count = 0;
    let parentLastChild = parent.lastElementChild;

    if (parentLastChild && parentLastChild != document.getElementById('noWorks')){
        count = parseInt(parent.lastElementChild.getAttribute('count'));
    } else {
        activateButtons(parent);
    }

    let div = document.createElement('div');
    div.setAttribute("class", "work-item");
    div.setAttribute("count", count + 1);

    let lblConcept = document.createElement('label');
    lblConcept.setAttribute("for", `concept${count+1}`);
    lblConcept.innerHTML = "Concepto:";

    let inputConcept = document.createElement('input');
    inputConcept.setAttribute("class", "rounded-lg");
    inputConcept.setAttribute("type", "text");
    inputConcept.setAttribute("id", `concept${count+1}`);
    inputConcept.setAttribute("placeholder", "Ej. Pintura");
    inputConcept.setAttribute('required', '');
    inputConcept.setAttribute('name', `concept${count+1}`)
    inputConcept.setAttribute('maxLength', '20')

    let lblPrice = document.createElement('label');
    lblPrice.setAttribute("for", `price${count+1}`);
    lblPrice.innerHTML = "Valor:";

    let inputPrice = document.createElement('input');
    inputPrice.setAttribute("class", "rounded-lg");
    inputPrice.setAttribute("type", "number");
    inputPrice.setAttribute("id", `price${count+1}`);
    inputPrice.setAttribute("placeholder", "Ej. 1000");
    inputPrice.setAttribute('required', '');
    inputPrice.setAttribute('name', `price${count+1}`)

    let lblQuantity = document.createElement('label');
    lblQuantity.setAttribute("for", `quantity${count+1}`);
    lblQuantity.innerHTML = "Cantidad:";

    let inputQuantity = document.createElement('input');
    inputQuantity.setAttribute("class", "rounded-lg");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("id", `quantity${count+1}`);
    inputQuantity.setAttribute("placeholder", "Ej. 1");
    inputQuantity.setAttribute('required', '');
    inputQuantity.setAttribute('name', `quantity${count+1}`)

    div.appendChild(lblConcept);
    div.appendChild(inputConcept);
    div.appendChild(lblPrice);
    div.appendChild(inputPrice);
    div.appendChild(lblQuantity);
    div.appendChild(inputQuantity);

    parent.appendChild(div);
}

function removeItem(){
    let parent = document.getElementById('works');
    if (parent.lastElementChild){
        parent.removeChild(parent.lastElementChild);
        if (!parent.lastElementChild){
            desativateButtons(parent);
        }
    }
}

function activateButtons(parent){
    let noWorks = document.getElementById('noWorks');
    document.getElementById('removeItemButton').style.visibility = "visible";
    document.getElementById('generateInvoiceButton').style.visibility = "visible";
    parent.removeChild(noWorks);
}

function desativateButtons(parent){
    let noWorks = document.createElement('p');
    noWorks.innerHTML = "Agregue al menos un trabajo";
    noWorks.setAttribute("id", "noWorks");
    noWorks.classList.add("text-2xl")
    noWorks.classList.add("m-10")
    noWorks.classList.add("text-red-500")
    parent.appendChild(noWorks);

    let removeItemButton = document.getElementById('removeItemButton').style.visibility = "hidden";
    let generateInvoiceButton = document.getElementById('generateInvoiceButton').style.visibility = "hidden";
}

