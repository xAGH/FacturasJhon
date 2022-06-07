function generateItem() {
    let parent = document.getElementById('works');

    let parentLastChild = parent.lastElementChild;
    let count = parentLastChild ? parseInt(parent.lastElementChild.getAttribute('count')) : 0;

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
    let count = parseInt(parent.lastElementChild.getAttribute('count'));
    parent.removeChild(parent.lastElementChild);
}