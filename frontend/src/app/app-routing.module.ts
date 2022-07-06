import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent, QuerysComponent } from './pages';

const routes: Routes = [
  { path: 'create', component: DocumentComponent },
  { path: 'querys', component: QuerysComponent },
  { path: '**', redirectTo: 'create' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
