import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent, ConfirmDialogComponent],
  imports: [AppMaterialModule, CommonModule],
  exports: [ErrorDialogComponent, ConfirmDialogComponent],
})
export class SharedModule {}
