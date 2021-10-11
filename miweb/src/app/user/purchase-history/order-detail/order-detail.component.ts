import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrdenesService } from 'src/app/services/ordenes/ordenes.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  public currentOrder: any;
  public orderDetail: any[] = [];
  public subtotal = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<OrderDetailComponent>,
    public dialog: MatDialog,
    private orden: OrdenesService,
  ) {
    this.currentOrder = data.orden;
    console.log(this.currentOrder);
  }

  ngOnInit(): void {
    this.loadOrderDetail();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadOrderDetail(): void{
    //this.orden.retrieveOrderDetail(this.currentOrder.carro)
    //.then((orden: any) => {
      //console.log(orden);
      this.orderDetail = [
      {
        nombre: "Producto 1",
        cantidad: 2,
        precio: 8
      },
      {
        nombre: "Producto 2",
        cantidad: 3,
        precio: 8
      }];

      this.subtotal = 40;
    //})
    //.catch((error: any) => {
      //console.log(error);
    //})
  }

}
