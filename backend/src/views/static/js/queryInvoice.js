function createElementFromSelect(value){
    let inputs = document.getElementsByClassName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].classList.remove('inline-block')
        inputs[i].classList.add('hidden');
    }

    switch (value) {
        case 'invoice_no':
            document.getElementById('invoice_no').classList.remove('hidden')
            document.getElementById('invoice_no').classList.add('inline-block');
            break;
        case 'client_name':
            document.getElementById('client_name').classList.remove('hidden')
            document.getElementById('client_name').classList.add('inline-block');
            break;
        case 'client_phone':
            document.getElementById('client_phone').classList.remove('hidden')
            document.getElementById('client_phone').classList.add('inline-block');
            break;
        case 'client_document':
            document.getElementById('client_document').classList.remove('hidden')
            document.getElementById('client_document').classList.add('inline-block');
            break;
        case 'client_address':
            document.getElementById('client_address').classList.remove('hidden')
            document.getElementById('client_address').classList.add('inline-block');
            break;
        case 'date':
            document.getElementById('date').classList.remove('hidden')
            document.getElementById('date').classList.add('inline-block');
            break;
        default:
            break;
    }
}

function getInvoiceData(){
    let inputs = document.getElementsByClassName('input');
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].classList.contains('inline-block')){
            var input = inputs[i];
        }
    }
    switch (input.id) {
        case 'invoice_no':
            if (/^FAC-\d{4}$/.test(input.value.toUpperCase())) {
                sendRequest(input.value.toUpperCase(), 'invoice_no');
            }
            else{
                alert('El numero de factura no es válido.');
            }
            break;
        case 'client_name':
            break;
        case 'client_phone':
            break;
        case 'client_document':
            break;
        case 'client_address':
            break;
        case 'date':
            break;
        default:
            break;
    }
}

async function sendRequest(value, field){
    const request = await fetch("/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            field: concept,
            value: value
        })
    })
    const response = await request.json();
    console.log(response);
}