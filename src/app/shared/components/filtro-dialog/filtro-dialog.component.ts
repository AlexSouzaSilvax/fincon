import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filtro-dialog',
  templateUrl: './filtro-dialog.component.html',
  styleUrls: ['./filtro-dialog.component.scss'],
})
export class FiltroDialogComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onConfirm() {
    this.onNoClick();
    this.dialog.open;
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }
}
