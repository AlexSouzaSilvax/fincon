import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { NovoComponent } from './novo/novo.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'principal/novo', component: NovoComponent },
  { path: 'principal/detalhe', component: NovoComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinconRoutingModule { }
