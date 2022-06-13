import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  MONTH_NAMES = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
  DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  showDatepicker$: Observable<boolean> = of(false);
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];
  pattern = /\d{4}-\d{2}-\d{2}/;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }

  formatDate(date: Date): string{
    let dateSplitted = date.toISOString().match(this.pattern)![0].split('-');
    return this.datepickerValue = dateSplitted[2] + '-' + dateSplitted[1] + '-' + dateSplitted[0];
  }

  initDate() {
    let today = new Date();
    this.month = today.getMonth();
    this.year = today.getFullYear();
    this.datepickerValue = this.formatDate(new Date(this.year, this.month, today.getDate()));
  }

  getDateValue(date: any) {
    
    let selectedDate = new Date(this.year, this.month, date);
    
    this.datepickerValue = this.formatDate(selectedDate);
    this.showDatepicker$ = of(false);
  }

  getCurrentDay(date: number): boolean {
    return parseInt(this.datepickerValue.split('-')[0]) == date && 
           parseInt(this.datepickerValue.split('-')[1]) == this.month + 1 && 
           parseInt(this.datepickerValue.split('-')[2]) == this.year;
  }

  getNoOfDays() {
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    let dayOfWeek = new Date(this.year, this.month).getDay();
    let blankdaysArray = [];
    for (var i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (var i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  trackByIdentity = (index: number, item: any) => item;

  changeState(returnValue?: boolean): void {
    if (returnValue){
      this.showDatepicker$ = of(returnValue);
    }
    else{
      this.showDatepicker$.subscribe({next: (value) => this.showDatepicker$ = of(!value)});
    }
  }
}
