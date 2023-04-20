import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fincon' },
  { path: 'fincon', loadChildren: () => import('./fincon/fincon.module').then(m => m.FinconModule) },
  { path: 'principal', loadChildren: () => import('./fincon/fincon.module').then(m => m.FinconModule) },
  { path: 'novo', loadChildren: () => import('./fincon/fincon.module').then(m => m.FinconModule) },
  { path: 'usuario', loadChildren: () => import('./fincon/fincon.module').then(m => m.FinconModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
