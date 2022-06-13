import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InvoiceComponent, BudgetComponent, QuerysComponent } from './pages';
import { InputComponent } from './components/input/input.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { WorkItemComponent } from './components/work-item/work-item.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvoiceComponent,
    BudgetComponent,
    QuerysComponent,
    InputComponent,
    DatePickerComponent,
    WorkItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
