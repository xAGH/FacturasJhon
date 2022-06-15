import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  
  date = new Date().toISOString().match(/\d{4}-\d{2}-\d{2}/);
  work_counter = 0;
  invoiceForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group(this.formControls);
    this.pushWork(this.createWork());
    console.log(this.formControls.client_name[0]);
  }

  ngOnDestroy(): void {
    this.work_counter = 0;
  }

  get formControls(){
    return {
      date: ['', [Validators.required]],
      client_name: ['', [Validators.required]],
      client_phone: ['', [Validators.required]],
      client_document: ['', [Validators.required]],
      client_address: ['', [Validators.required]],
      works: this.fb.array([])
    }
  }

  get formWorkControls() {
    return {
        concept: ['', [Validators.required]],
        price: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
      };
  }

  createWork(): FormGroup {
    return this.fb.group(this.formWorkControls);
  }

  get worksArray() : FormArray {
    return this.invoiceForm.get("works") as FormArray
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
      this.invoiceForm.get(key)!.setValue(value[key]);
    });
  }

  onWorkFormValue(value: any, index: number){     
    let control = this.worksArray.controls[index];
    let keys = Object.keys(value);
    keys.forEach(key => {
      control.get(key)!.setValue(value[key]);
    });
  }

  onSubmit(){
    if(this.invoiceForm.valid){
      console.log(this.invoiceForm.value);
    }
    else{

    }
  }

}
