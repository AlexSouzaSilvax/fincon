import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-filtro-dialog',
  templateUrl: './filtro-dialog.component.html',
  styleUrls: ['./filtro-dialog.component.scss'],
})
export class FiltroDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FiltroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {}

  onConfirm() {
    this.data.onConfirm();
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
