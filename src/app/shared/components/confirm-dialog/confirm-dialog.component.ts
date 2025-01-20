import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onConfirm() {
    //this.data.onConfirm();
    this.onNoClick();
  }

  onNoClick(): void {
    //this.dialogRef.close();
  }
}
