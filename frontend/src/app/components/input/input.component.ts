import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() type!: string;
  @Input() name!: string;
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() controlValue?: any;
  @Input() controlValidators?: any;
  @Output() inputChange = new EventEmitter<any>();
  form!: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      [this.controlName]: [this.controlValue ? this.controlValue : null, this.controlValidators ? this.controlValidators : []]
    });
  }

  inputIsInValid(key: string): boolean{
    return this.form.get(key)!.invalid && this.form.get(key)!.touched;
  }

  emitFormValue(){
    this.inputChange.emit(this.form.value);
  }

}
