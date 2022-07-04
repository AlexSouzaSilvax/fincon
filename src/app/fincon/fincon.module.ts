import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinconRoutingModule } from './fincon-routing.module';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoComponent } from './novo/novo.component';

@NgModule({
  declarations: [
    LoginComponent,
    PrincipalComponent,
    NovoComponent    
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
