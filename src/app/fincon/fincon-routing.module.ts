import { LoginComponent } from './screens/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './screens/principal/principal.component';
import { NovoComponent } from './screens/novo/novo.component';
import { UsuarioComponent } from './screens/usuario/usuario.component';
import { LancamentosFixoComponent } from './screens/lancamentos_fixo/lancamentos_fixo.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  
  { path: 'principal', component: PrincipalComponent },
  { path: 'principal/novo', component: NovoComponent },  
  { path: 'principal/detalhe', component: NovoComponent },
  { path: 'principal/usuario', component: UsuarioComponent },  
  { path: 'principal/lancamento-fixo', component: LancamentosFixoComponent },
  { path: 'principal/usuario/lancamento-fixo', component: LancamentosFixoComponent },  
  { path: 'principal/lancamento-fixo/usuario', component: UsuarioComponent },
  { path: 'principal/detalhe/usuario', component: UsuarioComponent },
  { path: 'principal/detalhe/lancamento-fixo', component: LancamentosFixoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinconRoutingModule {}
