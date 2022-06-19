import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent, QuerysComponent } from './pages';

const routes: Routes = [
  { path: 'create', component: InvoiceComponent },
  { path: 'querys', component: QuerysComponent },
  { path: '**', redirectTo: 'create' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
