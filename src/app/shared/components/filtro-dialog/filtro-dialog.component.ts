import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lancamento } from 'src/app/fincon/model/Lancamento';
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
  ) {}

  ngOnInit(): void {}

  onConfirm() {    
    this.onNoClick();
    this.data.onConfirm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
