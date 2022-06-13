import { Component, ComponentRef, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WorkItemComponent } from 'src/app/components/work-item/work-item.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @ViewChild('workContainer', {static: false, read: ViewContainerRef}) target!: ViewContainerRef;
  
  date = new Date().toISOString().match(/\d{4}-\d{2}-\d{2}/);
  work_counter = 1;
  hiddenRemoveBtn$: Observable<true | null> = of(true);

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.work_counter = 1;
  }

  generateItem(){
    this.counter('+');
    const element = this.target.createComponent<WorkItemComponent>(WorkItemComponent).instance.work_number = `${this.work_counter}`;
  }

  removeItem(){
    this.counter('-');
    this.target.remove();
  }

  counter(operation: '-' | '+'){
    if (operation == '-') {
      if (this.work_counter > 1) {
        this.work_counter -= 1;
        if (this.work_counter == 1) {
          this.hiddenRemoveBtn$ = of(true);
        }
      }
    }
    else if (operation == '+'){
      if (this.work_counter >= 1) {
        this.hiddenRemoveBtn$ = of(null);
      }
      this.work_counter += 1;
    }
  }
}
