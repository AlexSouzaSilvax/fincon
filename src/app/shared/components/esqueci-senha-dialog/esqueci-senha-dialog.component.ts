import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmDialogData } from '../../../fincon/model/confirmDialogData';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-esqueci-senha-dialog',
  templateUrl: './esqueci-senha-dialog.component.html',
  styleUrls: ['./esqueci-senha-dialog.component.css'],
})
export class EsqueciSenhaDialogComponent implements OnInit {
  email!: string;
  constructor(
    @Inject(ConfirmDialogComponent) public data: ConfirmDialogData
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
  }
}
