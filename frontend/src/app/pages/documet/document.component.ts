import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PDFService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  
  date = new Date().toISOString().match(/\d{4}-\d{2}-\d{2}/);
  work_counter = 0;
  form!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private pdf: PDFService
    ) {}

  ngOnInit(): void {
    this.form = this._fb.group(this.formControls);
    this.pushWork(this.createWork());
  }

  ngOnDestroy(): void {
    this.work_counter = 0;
  }

  get formControls(){
    return {
      doc_type: ['invoice', [Validators.required, Validators.pattern(/invoice|budget/)]],
      date: [null, [Validators.required]],
      client_name: ['Alejo', [Validators.required]],
      client_phone: ['3013258495', [Validators.required]],
      client_document: ['10049916686', [Validators.required]],
      client_address: ['Bosques de pinares Mz 11 # 45', [Validators.required]],
      expiration_date: [null, [Validators.required]],
      works: this._fb.array([])
    }
  }

  get formWorkControls() {
    let numberDecimalPattern = /^\d{0,10}(?:[.,]\d{1,4})?$/
    let numberParttern = /^\d{0,4}$/
    return {
        concept: ['Pintura de casa', [Validators.required]],
        price: [1000, [Validators.required, Validators.pattern(numberDecimalPattern)]],
        quantity: [1, [Validators.required, Validators.pattern(numberParttern)]],
      };
  }

  get worksArray() : FormArray {
    return this.form.get("works") as FormArray
  }

  createWork(): FormGroup {
    return this._fb.group(this.formWorkControls);
  }

  pushWork(work: FormGroup){
    this.worksArray.push(work);
  }

  removeWork(index: number){
    if (index != 0){
      this.worksArray.removeAt(index);
    }
  }

  onFormValue(value: any){
    let keys = Object.keys(value);
    keys.forEach(key => {
      this.form.get(key)!.setValue(value[key]);
    });
  }

  onWorkFormValue(value: any, index: number){     
    let control = this.worksArray.controls[index];
    let keys = Object.keys(value);
    keys.forEach(key => {
      control.get(key)!.setValue(value[key]);
    });
  }

  selectIsValid(): string{
    return this.form.controls['doc_type'].invalid ? 'invalid' : 'valid'
  }

  onSubmit(){
    if(this.form.valid){
      let data = this.form.value;
      data.date = data.date.match(/\d{4}-\d{2}-\d{2}/) ? data.date : data.date.split('-').reverse().join('-');
      data.expiration_date = data.expiration_date.match(/\d{4}-\d{2}-\d{2}/) ? data.expiration_date : data.expiration_date.split('-').reverse().join('-');
      data.works.forEach((work: any) => {
        work.price = parseFloat(work.price);
        work.quantity = parseInt(work.quantity);
      })
      this.pdf.generate(data)
    }
    else{
      alert('Rellene todos los campos del formulario.')
    }
  }
}
