import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { EsqueciSenhaDialogComponent } from './components/esqueci-senha-dialog/esqueci-senha-dialog.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ErrorDialogComponent, ConfirmDialogComponent, HeaderComponent, EsqueciSenhaDialogComponent],
  imports: [AppMaterialModule, CommonModule, FormsModule],
  exports: [ErrorDialogComponent, ConfirmDialogComponent, HeaderComponent],
})
export class SharedModule {}
