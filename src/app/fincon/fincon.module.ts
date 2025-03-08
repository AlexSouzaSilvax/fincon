import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { FinconRoutingModule } from './fincon-routing.module';
import { LoginComponent } from './screens/login/login.component';
import { NovoComponent } from './screens/novo/novo.component';
import { PrincipalComponent } from './screens/principal/principal.component';
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
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FinconModule { }
