import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent, BudgetComponent, QuerysComponent } from './pages';

const routes: Routes = [
  { path: 'invoice', component: InvoiceComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'querys', component: QuerysComponent },
  { path: '**', redirectTo: 'invoice' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
