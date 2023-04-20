import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinconRoutingModule } from './fincon-routing.module';
import { LoginComponent } from './screens/login/login.component';
import { PrincipalComponent } from './screens/principal/principal.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoComponent } from './screens/novo/novo.component';
import { UsuarioComponent } from './screens/usuario/usuario.component';

@NgModule({
  declarations: [
    LoginComponent,
    PrincipalComponent,
    NovoComponent,
    UsuarioComponent    
  ],
  imports: [
    CommonModule,
    FinconRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FinconModule { }
