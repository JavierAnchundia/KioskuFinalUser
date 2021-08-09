import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase-credits',
  templateUrl: './purchase-credits.component.html',
  styleUrls: ['./purchase-credits.component.css']
})
export class PurchaseCreditsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PurchaseCreditsComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
